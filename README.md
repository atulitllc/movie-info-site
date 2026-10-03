# WhereToWatchFree

SEO-friendly static movie/TV info site (GitHub Pages) with cinematic detail pages, cast, trailers, where-to-watch, TV/web series, What’s On hubs, related titles, person pages, and light/dark theme.

**Brand:** WhereToWatchFree — locked Clapperboard mark and condensed Barlow wordmark (navy `#0B1C2C`, paper `#F4F0E6`, coral `#FF6B4A`, amber hinge `#F5A524`). `window.ReelIndex` remains the script namespace only.

**Live:** https://wheretowatchfree.com/

## Features

- 20 movies + 12 TV/web series with verified TMDB `image.tmdb.org` posters (`w500`), backdrops (`w780`), and cast photos (`w185`)
- `/series/` index + `/series/<slug>/` detail pages (TVSeries JSON-LD)
- `/whats-on/` curated hubs (Trending, Free to Watch, New, Top Rated)
- Full-bleed cinematic detail heroes (poster overlay, score ring, horizontal cast scroller)
- Light/dark mode toggle (persisted as `theme=light|dark` in `localStorage`; default dark)
- Person pages linked from cast/crew
- Static directory in `data/catalog.json`. Bulk posters and backdrops stay on static `images.metahub.space` URLs keyed by IMDb id (`scripts/build-catalog.py --backfill-posters`). Cast, directors, producers, and US where-to-watch providers are filled from TMDB with `TMDB_API_KEY=… python scripts/build-catalog.py`. Curated titles in `js/data.js` and `js/series-data.js` are not rewritten.
- Brand pack in `assets/brand/` (Clapperboard mark, condensed lockups, favicons)

## Structure

- `index.html` — home grid, series rail, search
- `movies/<slug>/` — per-title SEO pages
- `series/` + `series/<slug>/` — TV & web series
- `whats-on/` — curated movie + series rows
- `people/` — HTML index of kept cast/crew pages; `people/<slug>/` static shells for the top ~17k people by catalog credit count (curated bios in `js/people-data.js` always kept). Shells that are only a name and a credit count are `noindex` and omitted from the sitemap. Unknown `/people/:slug/` URLs 404 (`/404.html` disables the Cloudflare Pages homepage fallback). Run `node scripts/build-people-pages.mjs` to regenerate shells, index, and sitemap.
- `js/data.js` — movie catalog (`window.ReelIndex` API namespace retained)
- `js/series-data.js` — series catalog
- `js/people-data.js` — people catalog
- `css/styles.css` — themes + layout
- `assets/brand/` — WhereToWatchFree marks, lockups, favicons

## Local

Open `index.html` or serve the folder:

```bash
python3 -m http.server 8080
```

## Refresh bulk cast, crew, and where to watch

Curated titles in `js/data.js` and `js/series-data.js` already have crew and providers. Leave them alone. The bulk rows in `data/catalog.json`, and the generated `movies/<slug>/` and `series/<slug>/` pages that embed `#title-json`, start without cast, director, or streaming providers.

The TMDB key stays in the environment for one run. Do not commit it.

```bash
TMDB_API_KEY=… python scripts/build-catalog.py
```

A v4 read token works the same way:

```bash
TMDB_READ_ACCESS_TOKEN=… python scripts/build-catalog.py
```

For each bulk title with an `imdbId` the script calls TMDB find by IMDb id, then movie or TV details with credits and US watch providers (`TMDB_WATCH_REGION` overrides the region, default `US`). It keeps a poster or backdrop that is already set and fills only empty artwork from TMDB. It prints per-title lines plus a JSON summary of fill counts, `not_found`, `failed`, and `retries_429`. `still_empty` in that summary is the whole catalog, including titles skipped by `--limit`. Requests stay near 3 per second and retry HTTP 429. An interrupted run resumes from `data/.tmdb-backfill-cache.json` (gitignored). Pass `--refresh` to ignore that cache, or `--limit 20` to process the first 20 bulk titles.

`--backfill-posters` still fills MetaHub artwork with no API key. `--from-imdb` rebuilds the title list from local IMDb dataset dumps and does not call TMDB. Neither path is the crew backfill.
