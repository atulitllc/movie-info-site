# WhereToWatchFree

SEO-friendly static movie/TV info site (GitHub Pages) with cinematic detail pages, cast, trailers, where-to-watch, TV/web series, What’s On hubs, related titles, person pages, and light/dark theme.

**Brand:** WhereToWatchFree (aperture mark — navy / paper / amber). Prototype name ReelIndex is retired for customer-facing brand.

**Live:** https://atulitllc.github.io/movie-info-site/

## Features

- 20 movies + 12 TV/web series with verified TMDB `image.tmdb.org` posters (`w500`), backdrops (`w780`), and cast photos (`w185`)
- `/series/` index + `/series/<slug>/` detail pages (TVSeries JSON-LD)
- `/whats-on/` curated hubs (Trending, Free to Watch, New, Top Rated)
- Full-bleed cinematic detail heroes (poster overlay, score ring, horizontal cast scroller)
- Light/dark mode toggle (persisted as `theme=light|dark` in `localStorage`; default dark)
- Person pages linked from cast/crew
- Optional TMDB API key refresh for The Odyssey
- Brand pack assets in `assets/brand/` (mark, lockups, favicons)

## Structure

- `index.html` — home grid, series rail, search
- `movies/<slug>/` — per-title SEO pages
- `series/` + `series/<slug>/` — TV & web series
- `whats-on/` — curated movie + series rows
- `people/<slug>/` — person bios
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
