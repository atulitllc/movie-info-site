#!/usr/bin/env python3
"""One-shot static directory from IMDb public datasets.

Reads title.basics.tsv.gz and title.ratings.tsv.gz (already downloaded or
from https://datasets.imdbws.com/) and writes data/catalog.json plus
movies/<slug>/ and series/<slug>/ shells for titles that do not already
have a curated page.

No TMDB or OMDb API key. Release dates are year-precision (YYYY-01-01).
Poster and backdrop URLs are static MetaHub images keyed by IMDb id:
  https://images.metahub.space/poster/medium/{imdbId}/img
  https://images.metahub.space/background/medium/{imdbId}/img
"""
from __future__ import annotations

import gzip
import html
import json
import re
import sys
import unicodedata
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IMDB = Path("/tmp/imdb")
SITE = "https://wheretowatchfree.com"
METAHUB = "https://images.metahub.space"
SOURCE = (
    "IMDb public datasets title.basics and title.ratings. "
    "Release dates are year-precision. No TMDB API key. "
    "Poster and backdrop URLs are static MetaHub images keyed by IMDb id."
)
TITLE_JSON_RE = re.compile(
    r'(<script type="application/json" id="title-json">)(.*?)(</script>)',
    re.S,
)

MOVIE_TAKE = {2026: 400, 2025: 400, 2024: 350, 2023: 250, 2022: 180, 2021: 120, 2020: 100}
SERIES_TAKE = {2026: 80, 2025: 80, 2024: 70, 2023: 60, 2022: 50, 2021: 40, 2020: 40, 2019: 40, 2018: 40}
MIN_VOTES = 200


def artwork_urls(imdb_id: str) -> tuple[str, str]:
    """Static poster and backdrop URLs. Empty when there is no IMDb id."""
    imdb_id = (imdb_id or "").strip()
    if not imdb_id.startswith("tt"):
        return "", ""
    return (
        f"{METAHUB}/poster/medium/{imdb_id}/img",
        f"{METAHUB}/background/medium/{imdb_id}/img",
    )


def apply_artwork(rec: dict) -> tuple[bool, bool]:
    """Fill empty poster/backdrop from imdbId. Returns (poster_filled, backdrop_filled)."""
    poster, backdrop = artwork_urls(rec.get("imdbId") or "")
    poster_filled = backdrop_filled = False
    if poster and not rec.get("poster"):
        rec["poster"] = poster
        poster_filled = True
    if backdrop and not rec.get("backdrop"):
        rec["backdrop"] = backdrop
        backdrop_filled = True
    return poster_filled, backdrop_filled


def slugify(title: str) -> str:
    text = unicodedata.normalize("NFKD", title).encode("ascii", "ignore").decode()
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text


def curated_years() -> dict[str, str]:
    found = {}
    for path in (ROOT / "js/data.js", ROOT / "js/series-data.js"):
        text = path.read_text(encoding="utf-8")
        for slug, year in re.findall(r'"slug":\s*"([^"]+)"[\s\S]{0,240}?"year":\s*"(\d{4})"', text):
            found[slug] = year
    return found


def load_ratings() -> dict[str, tuple[float, int]]:
    ratings = {}
    with gzip.open(IMDB / "title.ratings.tsv.gz", "rt", encoding="utf-8", errors="replace") as handle:
        next(handle)
        for line in handle:
            parts = line.rstrip("\n").split("\t")
            if len(parts) < 3:
                continue
            try:
                votes = int(parts[2])
                rating = float(parts[1])
            except ValueError:
                continue
            if votes >= MIN_VOTES:
                ratings[parts[0]] = (rating, votes)
    return ratings


def collect(ratings):
    movies = defaultdict(list)
    series = defaultdict(list)
    with gzip.open(IMDB / "title.basics.tsv.gz", "rt", encoding="utf-8", errors="replace") as handle:
        next(handle)
        for line in handle:
            parts = line.rstrip("\n").split("\t")
            if len(parts) < 9:
                continue
            tconst, ttype, title, _original, adult, start, _end, runtime, genres = parts[:9]
            if adult == "1" or tconst not in ratings:
                continue
            if start in ("\\N", ""):
                continue
            try:
                year = int(start)
            except ValueError:
                continue
            if genres in ("\\N", ""):
                continue
            rating, votes = ratings[tconst]
            try:
                minutes = int(runtime) if runtime not in ("\\N", "") else None
            except ValueError:
                minutes = None
            row = {
                "imdbId": tconst,
                "title": title,
                "year": str(year),
                "voteAverage": round(rating, 1),
                "votes": votes,
                "genres": [g for g in genres.split(",") if g and g != "\\N"][:4],
                "runtime": minutes,
            }
            if ttype == "movie" and year in MOVIE_TAKE:
                movies[year].append(row)
            elif ttype in ("tvSeries", "tvMiniSeries") and year in SERIES_TAKE:
                series[year].append(row)
    return movies, series


def pick(buckets, quotas):
    chosen = []
    for year, limit in sorted(quotas.items(), reverse=True):
        rows = sorted(buckets.get(year, []), key=lambda r: r["votes"], reverse=True)[:limit]
        chosen.extend(rows)
    return chosen


def assign_slugs(rows, media, reserved_years, used):
    out = []
    for row in rows:
        base = slugify(row["title"]) or row["imdbId"].lower()
        year = row["year"]
        if reserved_years.get(base) == year:
            continue
        slug = base
        if slug in used or (base in reserved_years and reserved_years[base] != year):
            slug = f"{base}-{year}"
        if slug in used:
            slug = f"{base}-{row['imdbId'].lower()}"
        if slug in used:
            continue
        used.add(slug)
        imdb = "https://www.imdb.com/title/" + row["imdbId"] + "/"
        genres = row["genres"]
        genre_bit = ", ".join(genres[:3]) if genres else ("series" if media == "series" else "film")
        overview = (
            row["title"]
            + " ("
            + year
            + ") is a "
            + genre_bit
            + (" series" if media == "series" else " film")
            + " in the WhereToWatchFree directory. "
            + "The score is the IMDb user rating. Availability varies by region."
        )
        in_theaters = media == "movie" and int(year) >= 2026
        watch = {"free": [], "paid": [], "other": [
            {"id": "imdb", "label": "IMDb", "note": "Title listing", "href": imdb}
        ]}
        if in_theaters:
            watch["paid"].append({
                "id": "theaters",
                "label": "In theaters",
                "note": "2026 release — check local listings",
                "href": imdb,
            })
        poster, backdrop = artwork_urls(row["imdbId"])
        rec = {
            "slug": slug,
            "mediaType": media,
            "title": row["title"],
            "year": year,
            "voteAverage": row["voteAverage"],
            "genres": genres,
            "overview": overview,
            "poster": poster,
            "backdrop": backdrop,
            "imdbId": row["imdbId"],
            "inTheaters": in_theaters,
            "watch": watch,
            "related": [],
        }
        if media == "series":
            rec["firstAirDate"] = year + "-01-01"
            rec["kind"] = "series"
            rec["creators"] = []
        else:
            rec["releaseDate"] = year + "-01-01"
            if row["runtime"]:
                rec["runtime"] = row["runtime"]
            rec["director"] = ""
        out.append(rec)
    return out


def link_related(records):
    by_genre = defaultdict(list)
    for rec in records:
        for genre in rec["genres"][:2]:
            by_genre[genre].append(rec)
    for rec in records:
        related = []
        seen = {rec["slug"]}
        for genre in rec["genres"]:
            for other in by_genre.get(genre, []):
                if other["slug"] in seen or other["mediaType"] != rec["mediaType"]:
                    continue
                if other["year"] != rec["year"] and abs(int(other["year"]) - int(rec["year"])) > 1:
                    continue
                seen.add(other["slug"])
                related.append(other["slug"])
                if len(related) == 4:
                    break
            if len(related) == 4:
                break
        rec["related"] = related


PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title} ({year}) — Where to Watch | WhereToWatchFree</title>
  <meta name="description" content="{desc}" />
  <link rel="canonical" href="{canonical}" />
  <meta property="og:title" content="{title} ({year}) | WhereToWatchFree" />
  <meta property="og:description" content="{desc}" />
  <meta property="og:url" content="{canonical}" />
  <script src="../../js/theme-boot.js"></script>
  <link rel="stylesheet" href="../../css/styles.css" />
</head>
<body data-slug="{slug}"{media}>
  <header class="site-header">
    <div class="container nav">
      <a class="logo" href="../../" aria-label="WhereToWatchFree"><img class="logo-lockup logo-lockup--dark" src="../../assets/brand/lockup-horizontal-dark.svg" alt="WhereToWatchFree" width="155" height="36" decoding="async" /><img class="logo-lockup logo-lockup--light" src="../../assets/brand/lockup-horizontal-light.svg" alt="" width="155" height="36" decoding="async" /></a>
      <div class="nav-right">
        <nav class="nav-links" aria-label="Primary">
          <a href="../../">Home</a>
          <a href="../../whats-on/">What&rsquo;s On</a>
          <a href="../../trending/">Trending</a>
          <a href="../../series/">Series</a>
          <a href="../../watch-free/">Watch free</a>
        </nav>
        <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle color theme" title="Toggle theme">
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z"/></svg>
        </button>
      </div>
    </div>
  </header>
  <header class="detail-hero" id="detail-hero">
    <div class="container detail-grid">
      <div class="poster-wrap"><img class="poster" id="poster" alt="" width="560" height="840" /></div>
      <div>
        <h1 id="title">{title}</h1>
        <p class="tagline" id="tagline"></p>
        <div class="facts-row">
          <div class="score-ring" id="score-ring" style="--p:0" hidden><span id="score-value">—</span></div>
          <div>
            <div class="score-label" id="score-label" hidden>User Score</div>
            <div class="chips" id="chips"></div>
          </div>
        </div>
        <p id="overviewShort" class="overview-short"></p>
      </div>
    </div>
  </header>
  <main class="container detail-main">
    <article>
      <section class="section" id="trailer-section" hidden><h2>Trailer</h2><div id="trailer"></div></section>
      <section class="section"><h2>Storyline</h2><p id="overview"></p></section>
      <section class="section" id="reviews-section" hidden><h2>Reviews</h2><div class="reviews-grid" id="reviews"></div></section>
      <section class="section"><h2>Top Billed Cast</h2><div class="cast-scroller" id="cast"></div></section>
      <section class="section"><h2>Details</h2><div id="crew"></div></section>
      <section class="section" id="watch-section">
        <h2 id="watch-heading">Where to watch</h2>
        <p class="watch-intro" id="watch-intro"></p>
        <div class="watch" id="watch"></div>
      </section>
      <section class="section" id="related-section" hidden>
        <h2>You might also like</h2>
        <div class="related-grid" id="related"></div>
      </section>
      <p class="tmdb-attr">Directory listing from public IMDb title and rating data. Not endorsed by IMDb. Poster art may be unavailable for this title.</p>
    </article>
  </main>
  <footer class="site-footer"></footer>
  <script type="application/json" id="title-json">{payload}</script>
  <script src="../../js/title-boot.js"></script>
  <script src="../../js/theme.js"></script>
  <script src="../../js/footer.js"></script>
  <script src="../../js/detail.js"></script>
</body>
</html>
"""


def write_pages(records, by_slug):
    written = 0
    for rec in records:
        folder = ROOT / ("series" if rec["mediaType"] == "series" else "movies") / rec["slug"]
        dest = folder / "index.html"
        if dest.exists():
            continue
        related_items = []
        for slug in rec["related"]:
            other = by_slug.get(slug)
            if not other:
                continue
            related_items.append({
                "slug": other["slug"],
                "mediaType": other["mediaType"],
                "title": other["title"],
                "year": other["year"],
                "poster": other.get("poster") or "",
                "voteAverage": other.get("voteAverage"),
                "genres": other.get("genres") or [],
            })
        page_rec = dict(rec)
        page_rec["relatedItems"] = related_items
        payload = json.dumps(page_rec, ensure_ascii=True, separators=(",", ":")).replace("<", "\\u003c")
        desc = html.escape(rec["overview"][:155], quote=True)
        title = html.escape(rec["title"], quote=True)
        kind = "series" if rec["mediaType"] == "series" else "movies"
        canonical = f"{SITE}/{kind}/{rec['slug']}/"
        media = ' data-media="series"' if rec["mediaType"] == "series" else ""
        folder.mkdir(parents=True, exist_ok=True)
        dest.write_text(PAGE.format(
            title=title,
            year=html.escape(rec["year"]),
            desc=desc,
            canonical=canonical,
            slug=html.escape(rec["slug"]),
            media=media,
            payload=payload,
        ), encoding="utf-8")
        written += 1
    return written


def refresh_generated_pages(by_slug: dict) -> dict:
    """Patch embedded title JSON on generated pages. Curated pages have no title-json."""
    updated = 0
    unchanged = 0
    curated = 0
    for kind in ("movies", "series"):
        base = ROOT / kind
        if not base.exists():
            continue
        for index in base.glob("*/index.html"):
            text = index.read_text(encoding="utf-8")
            match = TITLE_JSON_RE.search(text)
            if not match:
                curated += 1
                continue
            rec = json.loads(match.group(2))
            changed = False
            if apply_artwork(rec) != (False, False):
                changed = True
            for rel in rec.get("relatedItems") or []:
                other = by_slug.get(rel.get("slug") or "")
                poster = (other or {}).get("poster") or ""
                if poster and not rel.get("poster"):
                    rel["poster"] = poster
                    changed = True
            if not changed:
                unchanged += 1
                continue
            payload = json.dumps(rec, ensure_ascii=True, separators=(",", ":")).replace("<", "\\u003c")
            index.write_text(
                text[: match.start(2)] + payload + text[match.end(2) :],
                encoding="utf-8",
            )
            updated += 1
    return {"updated": updated, "unchanged": unchanged, "curated_skipped": curated}


def backfill_committed_catalog() -> None:
    """Fill artwork on data/catalog.json and generated pages. Does not re-read IMDb dumps."""
    path = ROOT / "data" / "catalog.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    counts = {}
    by_slug = {}
    for bucket in ("movies", "series"):
        filled_poster = filled_backdrop = still_poster = still_backdrop = 0
        missing_imdb = 0
        for rec in data.get(bucket) or []:
            if not (rec.get("imdbId") or "").startswith("tt"):
                missing_imdb += 1
            poster_filled, backdrop_filled = apply_artwork(rec)
            filled_poster += int(poster_filled)
            filled_backdrop += int(backdrop_filled)
            if not rec.get("poster"):
                still_poster += 1
            if not rec.get("backdrop"):
                still_backdrop += 1
            by_slug[rec["slug"]] = rec
        counts[bucket] = {
            "total": len(data.get(bucket) or []),
            "posters_filled": filled_poster,
            "backdrops_filled": filled_backdrop,
            "posters_still_empty": still_poster,
            "backdrops_still_empty": still_backdrop,
            "missing_imdb": missing_imdb,
        }
    data["source"] = SOURCE
    path.write_text(json.dumps(data, ensure_ascii=True, separators=(",", ":")), encoding="utf-8")
    pages = refresh_generated_pages(by_slug)
    print(json.dumps({"catalog": counts, "pages": pages}, indent=2))


def write_sitemap():
    locs = [
        f"{SITE}/",
        f"{SITE}/whats-on/",
        f"{SITE}/trending/",
        f"{SITE}/series/",
        f"{SITE}/watch-free/",
        f"{SITE}/about/",
    ]
    for kind in ("movies", "series", "people"):
        base = ROOT / kind
        if not base.exists():
            continue
        for child in sorted(p for p in base.iterdir() if (p / "index.html").exists()):
            locs.append(f"{SITE}/{kind}/{child.name}/")
    body = ["<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
            "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">"]
    body.extend(f"  <url><loc>{loc}</loc></url>" for loc in locs)
    body.append("</urlset>\n")
    (ROOT / "sitemap.xml").write_text("\n".join(body), encoding="utf-8")
    return len(locs)


def main():
    print("ratings…")
    ratings = load_ratings()
    print("basics…", len(ratings))
    movie_buckets, series_buckets = collect(ratings)
    movies = assign_slugs(pick(movie_buckets, MOVIE_TAKE), "movie", curated_years(), set(curated_years()))
    used = {r["slug"] for r in movies} | set(curated_years())
    series = assign_slugs(pick(series_buckets, SERIES_TAKE), "series", curated_years(), used)
    # drop related across the combined list after both exist
    all_recs = movies + series
    link_related(movies)
    link_related(series)
    by_slug = {r["slug"]: r for r in all_recs}
    out = {
        "generated": "2026-10-01",
        "source": SOURCE,
        "movies": movies,
        "series": series,
    }
    data_dir = ROOT / "data"
    data_dir.mkdir(exist_ok=True)
    path = data_dir / "catalog.json"
    path.write_text(json.dumps(out, ensure_ascii=True, separators=(",", ":")), encoding="utf-8")
    print("catalog", path, "movies", len(movies), "series", len(series), "bytes", path.stat().st_size)
    pages = write_pages(all_recs, by_slug)
    print("pages", pages)
    refreshed = refresh_generated_pages(by_slug)
    print("refreshed", refreshed)
    print("sitemap", write_sitemap())


if __name__ == "__main__":
    if "--backfill-posters" in sys.argv:
        backfill_committed_catalog()
    else:
        main()
