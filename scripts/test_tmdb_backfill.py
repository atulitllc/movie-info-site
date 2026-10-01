#!/usr/bin/env python3
"""Offline tests for the TMDB bulk metadata backfill. No network and no real key."""
from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import tmdb_backfill as tb

SECRET = "super-secret-tmdb-key"
ATTR_OLD = tb.ATTR_OLD


def _crew(job, name):
    return {"job": job, "name": name}


def movie_details():
    cast = []
    for index in range(12):
        cast.append({
            "name": f"Actor {index}",
            "character": f"Role {index}",
            "profile_path": None if index == 1 else f"/actor{index}.jpg",
        })
    return {
        "id": 11,
        "overview": "A real TMDB overview for the bulk title.",
        "tagline": "Hold fast.",
        "release_date": "2024-03-15",
        "runtime": 111,
        "poster_path": "/poster.jpg",
        "backdrop_path": "/backdrop.jpg",
        "videos": {"results": [
            {"site": "YouTube", "type": "Trailer", "key": "late", "official": False, "published_at": "2024-02-01"},
            {"site": "YouTube", "type": "Trailer", "key": "officialkey", "official": True, "published_at": "2024-01-01"},
        ]},
        "release_dates": {"results": [
            {"iso_3166_1": "US", "release_dates": [{"certification": "PG-13"}]},
        ]},
        "credits": {
            "cast": cast,
            "crew": [
                _crew("Director", "Ava DuVernay"),
                _crew("Director", "Barry Jenkins"),
                _crew("Director", "Ava DuVernay"),
                _crew("Co-Director", "Ignored Co"),
                _crew("Producer", "Emma Thomas"),
                _crew("Producer", "Emma Thomas"),
                _crew("Producer", "Jordan Peele"),
                _crew("Co-Producer", "Not A Producer"),
                _crew("Executive Producer", "Thomas Hayslip"),
                _crew("Screenplay", "Drew Goddard"),
            ],
        },
        "watch/providers": {"results": {"US": {
            "link": "https://www.themoviedb.org/movie/11/watch?locale=US",
            "flatrate": [
                {"provider_name": "Netflix", "display_priority": 1},
                {"provider_name": "Netflix Standard with Ads", "display_priority": 0},
            ],
            "ads": [{"provider_name": "Tubi TV", "display_priority": 3}],
            "free": [{"provider_name": "Pluto TV", "display_priority": 4}],
            "rent": [{"provider_name": "Vudu", "display_priority": 8}],
        }}},
    }


def series_details():
    return {
        "id": 22,
        "overview": "A real series overview from TMDB.",
        "first_air_date": "2020-01-20",
        "poster_path": "/should-not-replace.jpg",
        "backdrop_path": "/series-backdrop.jpg",
        "episode_run_time": [47],
        "number_of_seasons": 5,
        "number_of_episodes": 62,
        "networks": [{"name": "AMC"}],
        "created_by": [{"name": "Vince Gilligan"}],
        "content_ratings": {"results": [{"iso_3166_1": "US", "rating": "TV-MA"}]},
        "credits": {
            "cast": [{"name": "Bryan Cranston", "character": "Walter White", "profile_path": "/bryan.jpg"}],
            "crew": [
                _crew("Producer", "Mark Johnson"),
                _crew("Creator", "Ignored Because Created By Wins"),
            ],
        },
        "watch/providers": {"results": {"US": {
            "link": "https://www.themoviedb.org/tv/22/watch?locale=US",
            "flatrate": [{"provider_name": "Hulu", "display_priority": 1}],
            "ads": [{"provider_name": "Pluto TV", "display_priority": 2}],
        }}},
    }


def empty_provider_details():
    return {
        "id": 33,
        "overview": "Still a directory stub should be replaced in the WhereToWatchFree directory wait no.",
        "release_date": "2026-07-17",
        "poster_path": "/new-poster.jpg",
        "backdrop_path": "/new-backdrop.jpg",
        "credits": {"cast": [], "crew": [_crew("Director", "Christopher Nolan")]},
        "watch/providers": {"results": {"US": {}}},
    }


class Router:
    def __init__(self):
        self.urls = []

    def __call__(self, url, headers):
        self.urls.append(url)
        if "api_key=" not in url:
            raise AssertionError("expected api_key query parameter")
        path = url.split("api.themoviedb.org/3", 1)[-1].split("?", 1)[0]
        if path == "/find/tt0000001":
            return 200, json.dumps({"movie_results": [{"id": 11}], "tv_results": []}), {}
        if path == "/movie/11":
            return 200, json.dumps(movie_details()), {}
        if path == "/find/tt0000002":
            return 200, json.dumps({"movie_results": [], "tv_results": [{"id": 22}]}), {}
        if path == "/tv/22":
            return 200, json.dumps(series_details()), {}
        if path == "/find/tt0000003":
            return 200, json.dumps({"movie_results": [{"id": 33}], "tv_results": []}), {}
        if path == "/movie/33":
            return 200, json.dumps(empty_provider_details()), {}
        if path == "/find/tt0000004":
            return 500, "{}", {}
        raise AssertionError("unexpected path " + path)


def page_html(payload):
    return (
        "<!DOCTYPE html><html><head>"
        '<meta name="description" content="OLD" />'
        '<meta property="og:description" content="OLD" />'
        "</head><body><p class=\"tmdb-attr\">"
        + ATTR_OLD
        + '</p><script type="application/json" id="title-json">'
        + json.dumps(payload, separators=(",", ":")).replace("<", "\\u003c")
        + "</script></body></html>"
    )


def sample_catalog():
    return {
        "generated": "2026-10-01",
        "source": "old",
        "movies": [
            {
                "slug": "example",
                "mediaType": "movie",
                "title": "Example",
                "year": "2024",
                "runtime": 90,
                "overview": "Example (2024) is a Drama film in the WhereToWatchFree directory.",
                "poster": "https://images.metahub.space/poster/medium/tt0000001/img",
                "backdrop": "",
                "imdbId": "tt0000001",
                "inTheaters": False,
                "releaseDate": "2024-01-01",
                "director": "",
                "watch": {
                    "free": [],
                    "paid": [],
                    "other": [{"id": "imdb", "label": "IMDb", "href": "https://www.imdb.com/title/tt0000001/"}],
                },
                "related": ["other"],
            },
            {
                "slug": "in-theaters-title",
                "mediaType": "movie",
                "title": "In Theaters Title",
                "year": "2026",
                "overview": "Keep this custom overview.",
                "poster": "",
                "backdrop": "https://images.metahub.space/background/medium/tt0000003/img",
                "imdbId": "tt0000003",
                "inTheaters": True,
                "releaseDate": "2026-01-01",
                "director": "",
                "watch": {
                    "free": [],
                    "paid": [{
                        "id": "theaters",
                        "label": "In theaters",
                        "note": "2026 release",
                        "href": "https://www.imdb.com/title/tt0000003/",
                    }],
                    "other": [{"id": "imdb", "label": "IMDb", "href": "https://www.imdb.com/title/tt0000003/"}],
                },
            },
        ],
        "series": [
            {
                "slug": "example-show",
                "mediaType": "series",
                "title": "Example Show",
                "year": "2020",
                "overview": "Example Show (2020) is a Drama series in the WhereToWatchFree directory.",
                "poster": "keep-me",
                "backdrop": "",
                "imdbId": "tt0000002",
                "inTheaters": False,
                "firstAirDate": "2020-01-01",
                "creators": [],
                "watch": {"free": [], "paid": [], "other": []},
            }
        ],
    }


def build_tree(root: Path, catalog=None):
    catalog = sample_catalog() if catalog is None else catalog
    (root / "data").mkdir(parents=True)
    (root / "js").mkdir()
    (root / "movies" / "example").mkdir(parents=True)
    (root / "movies" / "curated-title").mkdir(parents=True)
    (root / "movies" / "in-theaters-title").mkdir(parents=True)
    (root / "series" / "example-show").mkdir(parents=True)
    (root / "data" / "catalog.json").write_text(json.dumps(catalog), encoding="utf-8")
    movie = catalog["movies"][0]
    page_rec = dict(movie)
    page_rec["relatedItems"] = [{"slug": "other", "title": "Other"}]
    (root / "movies" / "example" / "index.html").write_text(page_html(page_rec), encoding="utf-8")
    (root / "movies" / "in-theaters-title" / "index.html").write_text(
        page_html(catalog["movies"][1]), encoding="utf-8"
    )
    (root / "series" / "example-show" / "index.html").write_text(
        page_html(catalog["series"][0]), encoding="utf-8"
    )
    curated = root / "movies" / "curated-title" / "index.html"
    curated.write_text("<html><body><h1>Curated title</h1></body></html>", encoding="utf-8")
    (root / "js" / "data.js").write_text("CURATED_MOVIES = true;\n", encoding="utf-8")
    (root / "js" / "series-data.js").write_text("CURATED_SERIES = true;\n", encoding="utf-8")
    return curated


class TmdbBackfillTests(unittest.TestCase):
    def setUp(self):
        self._env = {
            "TMDB_API_KEY": os.environ.get("TMDB_API_KEY"),
            "TMDB_READ_ACCESS_TOKEN": os.environ.get("TMDB_READ_ACCESS_TOKEN"),
        }
        os.environ["TMDB_API_KEY"] = SECRET
        os.environ.pop("TMDB_READ_ACCESS_TOKEN", None)

    def tearDown(self):
        for key, value in self._env.items():
            if value is None:
                os.environ.pop(key, None)
            else:
                os.environ[key] = value

    def test_missing_credentials_names_the_command(self):
        os.environ.pop("TMDB_API_KEY", None)
        os.environ.pop("TMDB_READ_ACCESS_TOKEN", None)
        with self.assertRaises(SystemExit) as caught:
            tb.require_credentials()
        self.assertIn("TMDB_API_KEY=… python scripts/build-catalog.py", str(caught.exception))

    def test_retries_429_and_paces(self):
        calls = {"n": 0}
        slept = []

        def transport(url, headers):
            calls["n"] += 1
            if calls["n"] == 1:
                return 429, "", {"Retry-After": "2"}
            return 200, "{}", {}

        client = tb.TmdbClient(SECRET, "", transport=transport, min_interval=0.25, sleep=slept.append)
        self.assertEqual(client.get("/configuration", {}), {})
        self.assertEqual(client.retries_429, 1)
        self.assertIn(2.0, slept)
        self.assertTrue(any(item >= 0.25 for item in slept))

    def test_auth_error_redacts_secret(self):
        def transport(url, headers):
            return 401, json.dumps({"status_message": "Invalid API key: " + SECRET}), {}

        client = tb.TmdbClient(SECRET, "", transport=transport, min_interval=0, sleep=lambda _s: None)
        with self.assertRaises(tb.TmdbAuthError) as caught:
            client.get("/movie/1", {})
        self.assertNotIn(SECRET, str(caught.exception))
        self.assertIn("HTTP 401", str(caught.exception))

    def test_bearer_token_when_key_absent(self):
        os.environ.pop("TMDB_API_KEY", None)
        os.environ["TMDB_READ_ACCESS_TOKEN"] = "read-token-value"
        seen = {}

        def transport(url, headers):
            seen["url"] = url
            seen["headers"] = headers
            return 200, "{}", {}

        api_key, token = tb.credentials()
        client = tb.TmdbClient(api_key, token, transport=transport, min_interval=0, sleep=lambda _s: None)
        client.get("/movie/1", {})
        self.assertNotIn("api_key=", seen["url"])
        self.assertEqual(seen["headers"]["Authorization"], "Bearer read-token-value")

    def test_provider_and_crew_mapping(self):
        rec = {
            "mediaType": "movie",
            "poster": "https://images.metahub.space/poster/medium/tt0000001/img",
            "backdrop": "",
            "overview": "Stub in the WhereToWatchFree directory.",
            "releaseDate": "2024-01-01",
            "runtime": 90,
            "director": "",
            "inTheaters": True,
            "watch": {
                "free": [],
                "paid": [{"id": "theaters", "label": "In theaters", "note": "keep me", "href": "https://example.test/theaters"}],
                "other": [{"id": "imdb", "label": "IMDb", "href": "https://www.imdb.com/title/tt0000001/"}],
            },
        }
        flags = tb.enrich_record(rec, movie_details(), kind="movie", region="US")
        self.assertEqual(rec["director"], "Ava DuVernay, Barry Jenkins")
        self.assertEqual(rec["producers"], ["Emma Thomas", "Jordan Peele"])
        self.assertEqual(rec["executiveProducer"], "Thomas Hayslip")
        self.assertEqual(rec["writers"], ["Drew Goddard"])
        self.assertEqual(len(rec["cast"]), 10)
        self.assertEqual(rec["cast"][0]["photo"], "https://image.tmdb.org/t/p/w185/actor0.jpg")
        self.assertEqual(rec["cast"][1]["photo"], "")
        self.assertEqual(rec["poster"], "https://images.metahub.space/poster/medium/tt0000001/img")
        self.assertEqual(rec["backdrop"], "https://image.tmdb.org/t/p/w780/backdrop.jpg")
        self.assertTrue(flags["backdrop"])
        self.assertFalse(flags["poster"])
        self.assertEqual(rec["overview"], "A real TMDB overview for the bulk title.")
        self.assertEqual(rec["releaseDate"], "2024-03-15")
        self.assertEqual(rec["runtime"], 90)
        self.assertEqual(rec["rating"], "PG-13")
        self.assertEqual(rec["trailerYouTubeId"], "officialkey")
        self.assertEqual(rec["watch"]["paid"][0]["id"], "theaters")
        self.assertEqual(rec["watch"]["paid"][0]["href"], "https://example.test/theaters")
        self.assertEqual(rec["watch"]["paid"][1]["id"], "netflix")
        self.assertEqual(rec["watch"]["paid"][1]["href"], "https://www.netflix.com/")
        self.assertEqual([item["id"] for item in rec["watch"]["free"]], ["tubi", "pluto"])
        self.assertEqual(rec["watch"]["other"][0]["id"], "vudu")
        self.assertEqual(rec["watch"]["other"][0]["note"], "Rent · US")
        self.assertEqual(rec["watch"]["other"][1]["id"], "tmdb")
        self.assertEqual(rec["watch"]["other"][2]["id"], "imdb")

    def test_empty_providers_do_not_wipe_watch_and_custom_overview_stays(self):
        rec = {
            "mediaType": "movie",
            "poster": "",
            "backdrop": "keep-backdrop",
            "overview": "Keep this custom overview.",
            "releaseDate": "2024-05-02",
            "director": "Existing",
            "watch": {"free": [{"id": "tubi", "label": "Tubi"}], "paid": [], "other": []},
        }
        details = empty_provider_details()
        details["overview"] = "TMDB overview that must not replace a custom one."
        details["release_date"] = "2024-06-01"
        tb.enrich_record(rec, details, kind="movie", region="US")
        self.assertEqual(rec["watch"]["free"][0]["id"], "tubi")
        self.assertEqual(rec["overview"], "Keep this custom overview.")
        self.assertEqual(rec["releaseDate"], "2024-05-02")
        self.assertEqual(rec["poster"], "https://image.tmdb.org/t/p/w500/new-poster.jpg")
        self.assertEqual(rec["backdrop"], "keep-backdrop")
        self.assertEqual(rec["director"], "Christopher Nolan")

    def test_provider_cap(self):
        providers = [{"provider_name": f"Service {index}", "display_priority": index} for index in range(12)]
        details = {"watch/providers": {"results": {"US": {"flatrate": providers, "link": "https://watch.example/all"}}}}
        watch = tb.map_watch(
            details, region="US", tmdb_id=5, kind="movie", existing={}, in_theaters=False
        )
        paid = [item for item in watch["paid"] if item["id"] != "theaters"]
        self.assertEqual(len(paid), 8)
        self.assertEqual(paid[0]["id"], "service-0")
        self.assertEqual(paid[0]["href"], "https://watch.example/all")

    def test_backfill_updates_bulk_pages_and_leaves_curated_files(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            curated = build_tree(root)
            curated_bytes = curated.read_bytes()
            data_js = (root / "js" / "data.js").read_bytes()
            series_js = (root / "js" / "series-data.js").read_bytes()
            router = Router()
            summary = tb.backfill_catalog(
                root, argv=[], transport=router, sleep=lambda _s: None, min_interval=0
            )
            catalog = json.loads((root / "data" / "catalog.json").read_text(encoding="utf-8"))
            movie = catalog["movies"][0]
            series = catalog["series"][0]
            theaters = catalog["movies"][1]
            self.assertEqual(movie["director"], "Ava DuVernay, Barry Jenkins")
            self.assertEqual(movie["poster"], "https://images.metahub.space/poster/medium/tt0000001/img")
            self.assertTrue(movie["backdrop"].endswith("/w780/backdrop.jpg"))
            self.assertEqual(series["creators"], ["Vince Gilligan"])
            self.assertEqual(series["producers"], ["Mark Johnson"])
            self.assertEqual(series["network"], "AMC")
            self.assertEqual(series["poster"], "keep-me")
            self.assertEqual(series["watch"]["paid"][0]["id"], "hulu")
            self.assertEqual(series["watch"]["free"][0]["id"], "pluto")
            self.assertEqual(theaters["director"], "Christopher Nolan")
            self.assertEqual(theaters["watch"]["paid"][0]["id"], "theaters")
            self.assertEqual(theaters["watch"]["paid"][0]["note"], "2026 release")
            self.assertEqual(theaters["overview"], "Keep this custom overview.")
            self.assertTrue(theaters["poster"].endswith("/w500/new-poster.jpg"))
            self.assertNotIn(SECRET, (root / "data" / "catalog.json").read_text(encoding="utf-8"))
            self.assertIn("Bulk cast, crew", catalog["source"])
            self.assertEqual(summary["movies"]["filled"]["director"], 2)
            self.assertEqual(summary["movies"]["filled"]["cast"], 1)
            self.assertEqual(summary["series"]["filled"]["creators"], 1)
            self.assertEqual(summary["movies"]["failed"], 0)
            page = (root / "movies" / "example" / "index.html").read_text(encoding="utf-8")
            embedded = json.loads(tb.TITLE_JSON_RE.search(page).group(2))
            self.assertEqual(embedded["director"], movie["director"])
            self.assertEqual(embedded["relatedItems"], [{"slug": "other", "title": "Other"}])
            self.assertIn("uses the TMDB API but is not endorsed", page)
            self.assertIn("A real TMDB overview", page)
            self.assertEqual(curated.read_bytes(), curated_bytes)
            self.assertEqual((root / "js" / "data.js").read_bytes(), data_js)
            self.assertEqual((root / "js" / "series-data.js").read_bytes(), series_js)
            self.assertGreaterEqual(summary["pages"]["curated_pages_skipped"], 1)

            calls_after_first = len(router.urls)
            tb.backfill_catalog(root, argv=[], transport=router, sleep=lambda _s: None, min_interval=0)
            self.assertEqual(len(router.urls), calls_after_first)

    def test_failed_title_exits_nonzero_and_is_not_cached(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            catalog = {
                "movies": [{
                    "slug": "broken",
                    "mediaType": "movie",
                    "title": "Broken",
                    "imdbId": "tt0000004",
                    "director": "",
                    "poster": "keep",
                    "watch": {"free": [], "paid": [], "other": []},
                }],
                "series": [],
            }
            (root / "data").mkdir()
            (root / "data" / "catalog.json").write_text(json.dumps(catalog), encoding="utf-8")
            router = Router()
            with self.assertRaises(SystemExit) as caught:
                tb.backfill_catalog(root, argv=[], transport=router, sleep=lambda _s: None, min_interval=0)
            self.assertEqual(caught.exception.code, 1)
            saved = json.loads((root / "data" / "catalog.json").read_text(encoding="utf-8"))
            self.assertEqual(saved["movies"][0]["director"], "")
            self.assertEqual(saved["movies"][0]["poster"], "keep")
            cache = json.loads((root / "data" / ".tmdb-backfill-cache.json").read_text(encoding="utf-8"))
            self.assertNotIn("tt0000004", cache)
            self.assertGreaterEqual(sum(1 for url in router.urls if "/find/tt0000004" in url), 2)

    def test_cli_without_key_does_not_touch_repo_catalog(self):
        catalog = ROOT / "data" / "catalog.json"
        before = catalog.read_bytes()
        env = os.environ.copy()
        env.pop("TMDB_API_KEY", None)
        env.pop("TMDB_READ_ACCESS_TOKEN", None)
        proc = subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "build-catalog.py"), "--backfill-tmdb"],
            env=env,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        self.assertNotEqual(proc.returncode, 0)
        combined = proc.stdout + proc.stderr
        self.assertIn("TMDB_API_KEY=… python scripts/build-catalog.py", combined)
        self.assertEqual(catalog.read_bytes(), before)
        bare = subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "build-catalog.py")],
            env=env,
            cwd=ROOT,
            capture_output=True,
            text=True,
        )
        self.assertNotEqual(bare.returncode, 0)
        self.assertIn("TMDB_API_KEY=… python scripts/build-catalog.py", bare.stdout + bare.stderr)
        self.assertEqual(catalog.read_bytes(), before)

    def test_bulk_builder_still_leaves_director_empty(self):
        text = (ROOT / "scripts" / "build-catalog.py").read_text(encoding="utf-8")
        self.assertIn('rec["director"] = ""', text)


if __name__ == "__main__":
    unittest.main()
