#!/usr/bin/env python3
"""Fill bulk catalog cast, crew, and where-to-watch data from TMDB.

Curated titles in js/data.js and js/series-data.js are not modified.
Requires TMDB_API_KEY or TMDB_READ_ACCESS_TOKEN in the environment.
The key is never written to disk.

    TMDB_API_KEY=… python scripts/build-catalog.py

For each bulk record with an imdbId:

1. GET /find/{imdb_id}?external_source=imdb_id
2. GET /movie/{id} or /tv/{id} with credits, videos, and watch/providers

Field mapping (into the shapes detail.js already renders):

- director: crew job Director (else Co-Director), names joined with ", "
- producers: crew job Producer, list of names (max 8)
- executiveProducer: crew job Executive Producer, joined with ", " (max 4)
- writers: crew jobs Screenplay, Writer, Teleplay (max 6)
- creators (series): TV created_by, else crew job Creator
- cast: top billed {name, character, photo} (max 10); photo is TMDB w185
- watch.paid: US flatrate providers, id/label/href matching site logos
- watch.free: US free and ads providers (Tubi, Pluto, Plex, and others)
- watch.other: US rent and buy, plus a TMDB watch link
- existing theaters cards and IMDb listing links are kept
- poster / backdrop: kept when already set; empty values use TMDB w500 / w780
- overview: replaced only when empty or still the directory stub
- releaseDate / firstAirDate: replaced only when they are year-precision (YYYY-01-01)
- trailerYouTubeId, rating, tagline, runtime, network, seasons, episodes, tmdbId:
  filled when TMDB has them and the bulk field is empty (runtime/rating/tagline)
  or always set when TMDB has them (tmdbId, seasons, episodes, network)

Requests stay near a few per second. HTTP 429 is retried with Retry-After.
A gitignored resume cache is data/.tmdb-backfill-cache.json.
"""
from __future__ import annotations

import argparse
import html
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

TMDB_API = "https://api.themoviedb.org/3"
IMG_BASE = "https://image.tmdb.org/t/p"
CAST_LIMIT = 10
PRODUCER_LIMIT = 8
EXEC_LIMIT = 4
WRITER_LIMIT = 6
PROVIDER_LIMIT = 8
CHECKPOINT = 25
MAX_RETRIES = 5
RUN_COMMAND = "TMDB_API_KEY=… python scripts/build-catalog.py"
STUB_OVERVIEW = "in the WhereToWatchFree directory"
YEAR_PRECISION = re.compile(r"^\d{4}-01-01$")
FULL_DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
TITLE_JSON_RE = re.compile(
    r'(<script type="application/json" id="title-json">)(.*?)(</script>)',
    re.S,
)
ATTR_OLD = (
    "Directory listing from public IMDb title and rating data. "
    "Not endorsed by IMDb. Poster art may be unavailable for this title."
)

# Normalized TMDB provider_name -> site id used by js/detail.js PROVIDER_ICONS.
ALIASES = {
    "netflix": "netflix",
    "netflix standard with ads": "netflix",
    "hulu": "hulu",
    "disney plus": "disney-plus",
    "max": "max",
    "hbo max": "max",
    "peacock": "peacock",
    "peacock premium": "peacock",
    "peacock premium plus": "peacock",
    "paramount plus": "paramount-plus",
    "paramount plus essential": "paramount-plus",
    "paramount plus premium": "paramount-plus",
    "amazon prime video": "amazon-prime",
    "amazon prime video with ads": "amazon-prime",
    "prime video": "amazon-prime",
    "amazon video": "amazon",
    "apple tv": "apple",
    "apple tv plus": "apple",
    "tubi": "tubi",
    "tubi tv": "tubi",
    "pluto tv": "pluto",
    "plex": "plex",
    "plex channel": "plex",
}
ALIAS_PREFIXES = sorted(ALIASES.items(), key=lambda item: len(item[0]), reverse=True)

SITES = {
    "netflix": ("netflix", "Netflix", "https://www.netflix.com/"),
    "hulu": ("hulu", "Hulu", "https://www.hulu.com/"),
    "disney-plus": ("disney-plus", "Disney+", "https://www.disneyplus.com/"),
    "max": ("max", "Max", "https://www.max.com/"),
    "peacock": ("peacock", "Peacock", "https://www.peacocktv.com/"),
    "paramount-plus": ("paramount-plus", "Paramount+", "https://www.paramountplus.com/"),
    "amazon-prime": ("amazon-prime", "Amazon Prime Video", "https://www.amazon.com/primevideo"),
    "amazon": ("amazon", "Amazon Video", "https://www.amazon.com/gp/video/storefront"),
    "apple": ("apple", "Apple TV", "https://tv.apple.com/"),
    "tubi": ("tubi", "Tubi", "https://tubitv.com/"),
    "pluto": ("pluto", "Pluto TV", "https://pluto.tv/"),
    "plex": ("plex", "Plex", "https://www.plex.tv/"),
    "theaters": ("theaters", "In theaters", "https://www.fandango.com/"),
}

MONETIZATION_NOTES = {
    "flatrate": "Subscription",
    "free": "Free",
    "ads": "Free with ads",
    "rent": "Rent",
    "buy": "Buy",
}
PAID_TYPES = ("flatrate",)
FREE_TYPES = ("free", "ads")
OTHER_TYPES = ("rent", "buy")


class TmdbError(Exception):
    def __init__(self, message: str, status: int | None = None):
        super().__init__(message)
        self.status = status


class TmdbAuthError(TmdbError):
    pass


def credentials() -> tuple[str, str]:
    """Return (api_key, read_token). A v3 key wins when both are set."""
    api_key = os.environ.get("TMDB_API_KEY", "").strip()
    token = os.environ.get("TMDB_READ_ACCESS_TOKEN", "").strip()
    if api_key:
        return api_key, ""
    return "", token


def require_credentials() -> tuple[str, str]:
    api_key, token = credentials()
    if not api_key and not token:
        raise SystemExit(
            "Missing TMDB credentials. Set TMDB_API_KEY or TMDB_READ_ACCESS_TOKEN.\n"
            f"Run: {RUN_COMMAND}"
        )
    return api_key, token


def source_text(region: str) -> str:
    return (
        f"Bulk cast, crew, and {region} watch providers from TMDB "
        "(find by IMDb id, details, credits, watch/providers). "
        "Existing posters and backdrops are kept; empty artwork is filled from TMDB. "
        "Curated titles in js/data.js and js/series-data.js are not modified."
    )


def redact(text: str, secrets: list[str]) -> str:
    cleaned = re.sub(r"api_key=[^&\s]+", "api_key=REDACTED", text)
    cleaned = re.sub(r"Bearer\s+\S+", "Bearer REDACTED", cleaned)
    for secret in secrets:
        if secret:
            cleaned = cleaned.replace(secret, "REDACTED")
    return cleaned


def _header(headers: dict, name: str) -> str | None:
    for key, value in headers.items():
        if str(key).lower() == name.lower():
            return None if value is None else str(value)
    return None


def default_transport(url: str, headers: dict) -> tuple[int, str, dict]:
    request = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            body = response.read().decode("utf-8")
            return response.status, body, {k.lower(): v for k, v in response.headers.items()}
    except urllib.error.HTTPError as err:
        body = err.read().decode("utf-8", "replace")
        err_headers = {k.lower(): v for k, v in (err.headers.items() if err.headers else [])}
        return err.code, body, err_headers


class TmdbClient:
    def __init__(self, api_key: str, token: str, transport=None, min_interval: float = 0.28, sleep=time.sleep):
        self.api_key = api_key
        self.token = token
        self.transport = transport or default_transport
        self.min_interval = max(0.0, float(min_interval))
        self.sleep = sleep
        self._next = 0.0
        self.requests = 0
        self.retries_429 = 0
        self.retries_other = 0

    def _pace(self) -> None:
        wait = self._next - time.monotonic()
        if wait > 0:
            self.sleep(wait)
        self._next = time.monotonic() + self.min_interval

    def _retry_wait(self, headers: dict, attempt: int) -> float:
        raw = _header(headers, "retry-after")
        if raw:
            try:
                return min(120.0, max(0.0, float(raw)))
            except ValueError:
                pass
        return min(60.0, float(2 ** attempt))

    def get(self, path: str, params: dict) -> dict | None:
        query = dict(params)
        headers = {"Accept": "application/json"}
        if self.api_key:
            query["api_key"] = self.api_key
        elif self.token:
            headers["Authorization"] = "Bearer " + self.token
        url = TMDB_API + path + "?" + urllib.parse.urlencode(query)
        secrets = [self.api_key, self.token]
        attempt = 0
        while True:
            self._pace()
            self.requests += 1
            try:
                status, body, resp_headers = self.transport(url, headers)
            except (urllib.error.URLError, TimeoutError, ConnectionError) as err:
                attempt += 1
                self.retries_other += 1
                if attempt > MAX_RETRIES:
                    raise TmdbError(redact(f"TMDB request failed: {err.__class__.__name__}", secrets)) from None
                self.sleep(self._retry_wait({}, attempt))
                continue
            if status == 429:
                attempt += 1
                self.retries_429 += 1
                if attempt > MAX_RETRIES:
                    raise TmdbError("TMDB rate limit persisted after retries", status=429)
                self.sleep(self._retry_wait(resp_headers, attempt))
                continue
            if status in (500, 502, 503, 504):
                attempt += 1
                self.retries_other += 1
                if attempt > MAX_RETRIES:
                    raise TmdbError(f"TMDB server error HTTP {status}", status=status)
                self.sleep(self._retry_wait(resp_headers, attempt))
                continue
            if status in (401, 403):
                raise TmdbAuthError(
                    redact(
                        f"TMDB rejected the credentials (HTTP {status}). "
                        f"Check TMDB_API_KEY or TMDB_READ_ACCESS_TOKEN and run: {RUN_COMMAND}",
                        secrets,
                    )
                )
            if status == 404:
                return None
            if status != 200:
                message = _status_message(body)
                detail = f": {message}" if message else ""
                raise TmdbError(redact(f"TMDB HTTP {status}{detail}", secrets), status=status)
            try:
                payload = json.loads(body)
            except json.JSONDecodeError:
                attempt += 1
                self.retries_other += 1
                if attempt > MAX_RETRIES:
                    raise TmdbError("TMDB returned invalid JSON") from None
                self.sleep(self._retry_wait({}, attempt))
                continue
            if not isinstance(payload, dict):
                raise TmdbError("TMDB returned an unexpected payload")
            return payload


def _status_message(body: str) -> str:
    try:
        data = json.loads(body)
    except json.JSONDecodeError:
        return ""
    if isinstance(data, dict):
        return str(data.get("status_message") or "")
    return ""


def normalize_provider_name(name: str) -> str:
    text = name.lower().replace("+", " plus ")
    text = re.sub(r"[^a-z0-9]+", " ", text).strip()
    return text


def canonical_provider(name: str) -> str | None:
    norm = normalize_provider_name(name)
    if norm in ALIASES:
        return ALIASES[norm]
    for key, dest in ALIAS_PREFIXES:
        if norm.startswith(key + " "):
            return dest
    return None


def slug_provider_id(name: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", normalize_provider_name(name)).strip("-")
    return slug or "provider"


def _priority(provider: dict) -> tuple:
    value = provider.get("display_priority")
    if value is None:
        return (1, 0)
    try:
        return (0, int(value))
    except (TypeError, ValueError):
        return (1, 0)


def _provider_card(provider: dict, note: str, region_link: str) -> dict:
    name = (provider.get("provider_name") or "Provider").strip() or "Provider"
    site_id = canonical_provider(name)
    if site_id and site_id in SITES:
        card_id, label, href = SITES[site_id]
    else:
        card_id = slug_provider_id(name)
        label = name
        href = region_link
    return {"id": card_id, "label": label, "note": note, "href": href}


def _tagged(block: dict, key: str, region: str) -> list[tuple]:
    note = f"{MONETIZATION_NOTES[key]} · {region}"
    return [
        (provider, note)
        for provider in (block.get(key) or [])
        if isinstance(provider, dict)
    ]


def _collect_tagged(pairs: list[tuple], region_link: str) -> list[dict]:
    cards = []
    seen = set()
    for provider, note in sorted(pairs, key=lambda item: _priority(item[0])):
        card = _provider_card(provider, note, region_link)
        if card["id"] in seen:
            continue
        seen.add(card["id"])
        cards.append(card)
        if len(cards) >= PROVIDER_LIMIT:
            break
    return cards


def map_watch(details: dict, *, region: str, tmdb_id: int, kind: str, existing: dict, in_theaters: bool) -> dict | None:
    """Map TMDB watch/providers into {free, paid, other}. None keeps the existing watch block."""
    results = ((details or {}).get("watch/providers") or {}).get("results") or {}
    block = results.get(region) or {}
    if not isinstance(block, dict):
        return None
    region_link = block.get("link") or (
        f"https://www.themoviedb.org/{'tv' if kind == 'tv' else 'movie'}/{tmdb_id}/watch?locale={region}"
    )
    any_rows = any(block.get(key) for key in PAID_TYPES + FREE_TYPES + OTHER_TYPES)
    if not any_rows:
        return None
    paid = _collect_tagged(_tagged(block, "flatrate", region), region_link)
    free = _collect_tagged(
        _tagged(block, "free", region) + _tagged(block, "ads", region),
        region_link,
    )
    other = _collect_tagged(
        _tagged(block, "rent", region) + _tagged(block, "buy", region),
        region_link,
    )
    theaters = [
        dict(item)
        for item in (existing.get("paid") or [])
        if isinstance(item, dict) and item.get("id") == "theaters"
    ]
    if in_theaters and not theaters:
        theaters = [{
            "id": "theaters",
            "label": "In theaters",
            "note": "Check local listings",
            "href": "https://www.fandango.com/",
        }]
    if not any(card.get("id") == "theaters" for card in paid):
        paid = theaters + paid
    other.append({
        "id": "tmdb",
        "label": "TMDB",
        "note": f"All providers · {region}",
        "href": region_link if "themoviedb.org" in region_link else (
            f"https://www.themoviedb.org/{'tv' if kind == 'tv' else 'movie'}/{tmdb_id}/watch?locale={region}"
        ),
    })
    for item in existing.get("other") or []:
        if isinstance(item, dict) and item.get("id") == "imdb" and not any(card.get("id") == "imdb" for card in other):
            other.append(dict(item))
    return {"free": free, "paid": paid, "other": other}


def names_with_job(credits: dict, jobs: set[str], limit: int | None = None) -> list[str]:
    seen = set()
    names = []
    for person in (credits or {}).get("crew") or []:
        if not isinstance(person, dict) or person.get("job") not in jobs:
            continue
        name = (person.get("name") or "").strip()
        key = name.casefold()
        if not name or key in seen:
            continue
        seen.add(key)
        names.append(name)
        if limit is not None and len(names) >= limit:
            break
    return names


def map_cast(credits: dict) -> list[dict]:
    cast = []
    for person in (credits or {}).get("cast") or []:
        if not isinstance(person, dict):
            continue
        name = (person.get("name") or "").strip()
        if not name:
            continue
        photo = ""
        profile = person.get("profile_path") or ""
        if profile:
            photo = IMG_BASE + "/w185" + (profile if profile.startswith("/") else "/" + profile)
        cast.append({
            "name": name,
            "character": person.get("character") or "",
            "photo": photo,
        })
        if len(cast) >= CAST_LIMIT:
            break
    return cast


def map_creators(details: dict, credits: dict) -> list[str]:
    seen = set()
    names = []
    for person in details.get("created_by") or []:
        if not isinstance(person, dict):
            continue
        name = (person.get("name") or "").strip()
        key = name.casefold()
        if not name or key in seen:
            continue
        seen.add(key)
        names.append(name)
    if names:
        return names
    return names_with_job(credits, {"Creator"})


def pick_trailer(details: dict) -> str:
    videos = ((details or {}).get("videos") or {}).get("results") or []
    trailers = []
    for video in videos:
        if not isinstance(video, dict):
            continue
        if video.get("site") != "YouTube" or video.get("type") != "Trailer" or not video.get("key"):
            continue
        trailers.append(video)
    trailers.sort(key=lambda video: (0 if video.get("official") else 1, video.get("published_at") or ""))
    return trailers[0]["key"] if trailers else ""


def tmdb_image(path: str | None, size: str) -> str:
    if not path:
        return ""
    if not str(path).startswith("/"):
        path = "/" + str(path)
    return f"{IMG_BASE}/{size}{path}"


def us_certification(details: dict, kind: str) -> str:
    if kind == "tv":
        for block in ((details.get("content_ratings") or {}).get("results") or []):
            if isinstance(block, dict) and block.get("iso_3166_1") == "US" and (block.get("rating") or "").strip():
                return block["rating"].strip()
        return ""
    for block in ((details.get("release_dates") or {}).get("results") or []):
        if not isinstance(block, dict) or block.get("iso_3166_1") != "US":
            continue
        for release in block.get("release_dates") or []:
            cert = (release.get("certification") or "").strip()
            if cert:
                return cert
    return ""


def fresher_date(current: str, incoming: str) -> str:
    incoming = (incoming or "").strip()
    current = (current or "").strip()
    if not FULL_DATE.fullmatch(incoming):
        return current
    if not current or YEAR_PRECISION.fullmatch(current):
        return incoming
    return current


def overview_is_stub(text: str) -> bool:
    text = (text or "").strip()
    return not text or STUB_OVERVIEW in text


def _blank_flags() -> dict:
    return {
        "director": False,
        "producers": False,
        "cast": False,
        "creators": False,
        "writers": False,
        "watch_free": False,
        "watch_paid": False,
        "watch_other": False,
        "poster": False,
        "backdrop": False,
        "overview": False,
        "trailer": False,
    }


def enrich_record(rec: dict, details: dict, *, kind: str, region: str) -> dict:
    """Mutate a bulk catalog record from one TMDB details payload. Return fill flags."""
    flags = _blank_flags()
    credits = details.get("credits") or {}
    tmdb_id = details.get("id")
    if tmdb_id:
        rec["tmdbId"] = tmdb_id

    if rec.get("mediaType") == "series":
        creators = map_creators(details, credits)
        if creators:
            rec["creators"] = creators
            flags["creators"] = True
        networks = [n.get("name") for n in (details.get("networks") or []) if isinstance(n, dict) and n.get("name")]
        if networks:
            rec["network"] = networks[0]
        if details.get("number_of_seasons") is not None:
            rec["seasons"] = details["number_of_seasons"]
        if details.get("number_of_episodes") is not None:
            rec["episodes"] = details["number_of_episodes"]
        if details.get("first_air_date"):
            updated = fresher_date(rec.get("firstAirDate") or "", details["first_air_date"])
            if updated and updated != rec.get("firstAirDate"):
                rec["firstAirDate"] = updated
    else:
        directors = names_with_job(credits, {"Director"}) or names_with_job(credits, {"Co-Director"})
        if directors:
            rec["director"] = ", ".join(directors)
            flags["director"] = True
        if details.get("release_date"):
            updated = fresher_date(rec.get("releaseDate") or "", details["release_date"])
            if updated and updated != rec.get("releaseDate"):
                rec["releaseDate"] = updated

    producers = names_with_job(credits, {"Producer"}, PRODUCER_LIMIT)
    if producers:
        rec["producers"] = producers
        flags["producers"] = True
    executives = names_with_job(credits, {"Executive Producer"}, EXEC_LIMIT)
    if executives:
        rec["executiveProducer"] = ", ".join(executives)
    writers = names_with_job(credits, {"Screenplay", "Writer", "Teleplay"}, WRITER_LIMIT)
    if writers:
        rec["writers"] = writers
        flags["writers"] = True

    cast = map_cast(credits)
    if cast:
        rec["cast"] = cast
        flags["cast"] = True

    if tmdb_id:
        watch_kind = kind if kind in ("movie", "tv") else "movie"
        watch = map_watch(
            details,
            region=region,
            tmdb_id=int(tmdb_id),
            kind=watch_kind,
            existing=rec.get("watch") if isinstance(rec.get("watch"), dict) else {},
            in_theaters=bool(rec.get("inTheaters")),
        )
        if watch is not None:
            rec["watch"] = watch
            flags["watch_free"] = bool(watch["free"])
            flags["watch_paid"] = any(item.get("id") != "theaters" for item in watch["paid"])
            flags["watch_other"] = any(item.get("id") not in ("tmdb", "imdb") for item in watch["other"])

    if not rec.get("poster"):
        poster = tmdb_image(details.get("poster_path"), "w500")
        if poster:
            rec["poster"] = poster
            flags["poster"] = True
    if not rec.get("backdrop"):
        backdrop = tmdb_image(details.get("backdrop_path"), "w780")
        if backdrop:
            rec["backdrop"] = backdrop
            flags["backdrop"] = True

    overview = (details.get("overview") or "").strip()
    if overview and overview_is_stub(rec.get("overview") or ""):
        rec["overview"] = overview
        flags["overview"] = True
    tagline = (details.get("tagline") or "").strip()
    if tagline and not (rec.get("tagline") or "").strip():
        rec["tagline"] = tagline
    trailer = pick_trailer(details)
    if trailer and not (rec.get("trailerYouTubeId") or "").strip():
        rec["trailerYouTubeId"] = trailer
        flags["trailer"] = True
    if not rec.get("runtime") and details.get("runtime"):
        rec["runtime"] = details["runtime"]
    elif not rec.get("runtime") and isinstance(details.get("episode_run_time"), list) and details["episode_run_time"]:
        rec["runtime"] = details["episode_run_time"][0]
    rating = us_certification(details, "tv" if rec.get("mediaType") == "series" or kind == "tv" else "movie")
    if rating and not (rec.get("rating") or "").strip():
        rec["rating"] = rating
    return flags


def find_title(client: TmdbClient, imdb_id: str, prefer: str) -> tuple[str, int] | None:
    payload = client.get("/find/" + urllib.parse.quote(imdb_id), {"external_source": "imdb_id"})
    if not payload:
        return None
    movie = _first(payload.get("movie_results"))
    tv = _first(payload.get("tv_results"))
    if prefer == "tv":
        if tv and tv.get("id"):
            return "tv", int(tv["id"])
        if movie and movie.get("id"):
            return "movie", int(movie["id"])
    else:
        if movie and movie.get("id"):
            return "movie", int(movie["id"])
        if tv and tv.get("id"):
            return "tv", int(tv["id"])
    return None


def fetch_details(client: TmdbClient, kind: str, tmdb_id: int) -> dict | None:
    append = "credits,videos,watch/providers," + ("content_ratings" if kind == "tv" else "release_dates")
    return client.get(
        f"/{kind}/{tmdb_id}",
        {"append_to_response": append, "language": "en-US"},
    )


def _first(items) -> dict | None:
    if not items:
        return None
    item = items[0]
    return item if isinstance(item, dict) else None


def _bucket_stats() -> dict:
    return {
        "total": 0,
        "skipped_no_imdb": 0,
        "processed": 0,
        "not_found": 0,
        "failed": 0,
        "filled": {key: 0 for key in _blank_flags()},
    }


def _add_flags(bucket: dict, flags: dict) -> None:
    for key, value in flags.items():
        if value:
            bucket["filled"][key] = bucket["filled"].get(key, 0) + 1


def still_empty_counts(records: list, series: bool) -> dict:
    no_crew = no_cast = no_producers = no_watch = 0
    for rec in records:
        if series:
            if not rec.get("creators"):
                no_crew += 1
        elif not (rec.get("director") or "").strip():
            no_crew += 1
        if not rec.get("cast"):
            no_cast += 1
        if not rec.get("producers"):
            no_producers += 1
        watch = rec.get("watch") if isinstance(rec.get("watch"), dict) else {}
        paid = [item for item in (watch.get("paid") or []) if isinstance(item, dict) and item.get("id") != "theaters"]
        if not paid and not watch.get("free"):
            no_watch += 1
    crew_key = "creators" if series else "director"
    return {crew_key: no_crew, "cast": no_cast, "producers": no_producers, "watch_free_and_paid": no_watch}


def cache_path(root: Path) -> Path:
    return root / "data" / ".tmdb-backfill-cache.json"


def load_cache(path: Path) -> dict:
    if not path.exists():
        return {}
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as err:
        print(f"ignoring unreadable cache {path}: {err.__class__.__name__}", flush=True)
        return {}
    return data if isinstance(data, dict) else {}


def write_json(path: Path, payload) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(payload, ensure_ascii=True, separators=(",", ":")), encoding="utf-8")
    tmp.replace(path)


def _replace_meta(page: str, attr: str, value: str, content: str) -> str:
    pattern = re.compile(rf'(<meta {attr}="{re.escape(value)}" content=")([^"]*)(")')
    escaped = html.escape(content, quote=True)
    return pattern.sub(lambda match: match.group(1) + escaped + match.group(3), page, count=1)


def patch_pages(root: Path, by_slug: dict, only: set[str], region: str) -> dict:
    updated = 0
    curated = 0
    attr_new = (
        f"Cast, crew, and {region} watch providers from TMDB. "
        "This product uses the TMDB API but is not endorsed or certified by TMDB."
    )
    for kind in ("movies", "series"):
        base = root / kind
        if not base.exists():
            continue
        for index in base.glob("*/index.html"):
            text = index.read_text(encoding="utf-8")
            match = TITLE_JSON_RE.search(text)
            if not match:
                curated += 1
                continue
            try:
                page_rec = json.loads(match.group(2))
            except json.JSONDecodeError:
                continue
            slug = page_rec.get("slug")
            if slug not in only or slug not in by_slug:
                continue
            merged = dict(page_rec)
            merged.update(by_slug[slug])
            if "relatedItems" in page_rec:
                merged["relatedItems"] = page_rec["relatedItems"]
            payload = json.dumps(merged, ensure_ascii=True, separators=(",", ":")).replace("<", "\\u003c")
            new_text = text[: match.start(2)] + payload + text[match.end(2) :]
            if ATTR_OLD in new_text:
                new_text = new_text.replace(ATTR_OLD, attr_new)
            overview = merged.get("overview") or ""
            if overview and overview_is_stub(page_rec.get("overview") or "") and not overview_is_stub(overview):
                desc = overview[:155]
                new_text = _replace_meta(new_text, "name", "description", desc)
                new_text = _replace_meta(new_text, "property", "og:description", desc)
            if new_text != text:
                index.write_text(new_text, encoding="utf-8")
                updated += 1
    return {"pages_updated": updated, "curated_pages_skipped": curated}


def _fingerprint(path: Path) -> str | None:
    if not path.exists():
        return None
    import hashlib
    return hashlib.sha256(path.read_bytes()).hexdigest()


def parse_args(argv: list[str] | None):
    parser = argparse.ArgumentParser(add_help=False)
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--refresh", action="store_true")
    parser.add_argument("--region", default=None)
    parser.add_argument("--backfill-tmdb", action="store_true")
    return parser.parse_known_args(argv)[0]


def backfill_catalog(root: Path, argv: list[str] | None = None, transport=None, sleep=time.sleep, min_interval: float | None = None) -> dict:
    args = parse_args(sys.argv[1:] if argv is None else argv)
    region = (args.region or os.environ.get("TMDB_WATCH_REGION") or "US").strip() or "US"
    if min_interval is None:
        min_interval = float(os.environ.get("TMDB_MIN_INTERVAL", "0.28"))
    api_key, token = require_credentials()
    catalog_file = root / "data" / "catalog.json"
    if not catalog_file.exists():
        raise SystemExit(f"Missing {catalog_file}")

    guarded = {
        "js/data.js": _fingerprint(root / "js" / "data.js"),
        "js/series-data.js": _fingerprint(root / "js" / "series-data.js"),
    }

    data = json.loads(catalog_file.read_text(encoding="utf-8"))
    stats = {"movies": _bucket_stats(), "series": _bucket_stats()}
    cache_file = cache_path(root)
    cache = {} if args.refresh else load_cache(cache_file)
    client = TmdbClient(api_key, token, transport=transport, min_interval=min_interval, sleep=sleep)

    queue = []
    for bucket in ("movies", "series"):
        records = data.get(bucket) or []
        stats[bucket]["total"] = len(records)
        for rec in records:
            imdb_id = (rec.get("imdbId") or "").strip()
            if not imdb_id.startswith("tt"):
                stats[bucket]["skipped_no_imdb"] += 1
                continue
            queue.append((bucket, rec, imdb_id))
    if args.limit is not None:
        if args.limit < 0:
            raise SystemExit("--limit must be >= 0")
        queue = queue[: args.limit]

    print(
        f"tmdb backfill region={region} titles={len(queue)} "
        f"min_interval={min_interval}s cache={'refresh' if args.refresh else cache_file.name}",
        flush=True,
    )
    touched = set()
    for index, (bucket, rec, imdb_id) in enumerate(queue, start=1):
        prefer = "tv" if bucket == "series" else "movie"
        slug = rec.get("slug") or imdb_id
        try:
            cached = cache.get(imdb_id)
            if isinstance(cached, dict) and cached.get("not_found"):
                found = None
                details = None
            elif isinstance(cached, dict) and cached.get("details") and cached.get("kind"):
                found = (cached["kind"], int(cached["tmdb_id"]))
                details = cached["details"]
            else:
                found = find_title(client, imdb_id, prefer)
                if not found:
                    cache[imdb_id] = {"not_found": True}
                    details = None
                else:
                    kind, tmdb_id = found
                    details = fetch_details(client, kind, tmdb_id)
                    if details:
                        cache[imdb_id] = {"kind": kind, "tmdb_id": tmdb_id, "details": details}
                    else:
                        cache[imdb_id] = {"not_found": True}
                        found = None
        except TmdbAuthError as err:
            raise SystemExit(str(err)) from None
        except TmdbError as err:
            stats[bucket]["failed"] += 1
            stats[bucket]["processed"] += 1
            print(f"fail {imdb_id} {slug} {err}", flush=True)
            continue

        stats[bucket]["processed"] += 1
        if not found or not details:
            stats[bucket]["not_found"] += 1
            print(f"miss {imdb_id} {slug}", flush=True)
        else:
            flags = enrich_record(rec, details, kind=found[0], region=region)
            _add_flags(stats[bucket], flags)
            touched.add(slug)
            bits = [name for name, on in (
                ("director", flags["director"]),
                ("creators", flags["creators"]),
                ("producers", flags["producers"]),
                ("cast", flags["cast"]),
                ("watch", flags["watch_free"] or flags["watch_paid"] or flags["watch_other"]),
                ("poster", flags["poster"]),
                ("backdrop", flags["backdrop"]),
            ) if on]
            print(f"ok {slug} {','.join(bits) or 'no-new-fields'}", flush=True)

        if index % CHECKPOINT == 0:
            data["source"] = source_text(region)
            data["generated"] = time.strftime("%Y-%m-%d")
            write_json(catalog_file, data)
            write_json(cache_file, cache)
            print(
                f"progress {index}/{len(queue)} failed={stats['movies']['failed'] + stats['series']['failed']} "
                f"not_found={stats['movies']['not_found'] + stats['series']['not_found']}",
                flush=True,
            )

    data["source"] = source_text(region)
    data["generated"] = time.strftime("%Y-%m-%d")
    write_json(catalog_file, data)
    write_json(cache_file, cache)
    by_slug = {}
    for bucket in ("movies", "series"):
        for rec in data.get(bucket) or []:
            if rec.get("slug"):
                by_slug[rec["slug"]] = rec
    pages = patch_pages(root, by_slug, touched, region)

    for label, digest in guarded.items():
        current = _fingerprint(root / label)
        if digest != current:
            raise SystemExit(f"Refusing to finish: {label} changed during backfill")

    summary = {
        "region": region,
        "requests": client.requests,
        "retries_429": client.retries_429,
        "retries_other": client.retries_other,
        "movies": stats["movies"],
        "series": stats["series"],
        "still_empty": {
            "movies": still_empty_counts(data.get("movies") or [], series=False),
            "series": still_empty_counts(data.get("series") or [], series=True),
        },
        "pages": pages,
        "curated_js_untouched": ["js/data.js", "js/series-data.js"],
        "catalog": str(catalog_file),
    }
    print(json.dumps(summary, indent=2), flush=True)
    if stats["movies"]["failed"] or stats["series"]["failed"]:
        raise SystemExit(1)
    return summary


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    try:
        backfill_catalog(root)
    except TmdbAuthError as err:
        raise SystemExit(str(err)) from None


if __name__ == "__main__":
    main()
