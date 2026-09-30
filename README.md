# ReelIndex

SEO-friendly static movie-info site (GitHub Pages) with cinematic detail pages, cast, trailers, where-to-watch, related titles, person pages, and light/dark theme.

**Live:** https://atulitllc.github.io/movie-info-site/

## Features

- 20 movies with verified TMDB `image.tmdb.org` posters (`w500`), backdrops (`w780`), and cast photos (`w185`)
- Full-bleed cinematic detail heroes (poster overlay, score ring, horizontal cast scroller)
- Light/dark mode toggle (persisted as `theme=light|dark` in `localStorage`; default dark)
- Person pages linked from cast/crew
- Optional TMDB API key refresh for The Odyssey

## Structure

- `index.html` — home grid + search
- `movies/<slug>/` — per-title SEO pages
- `people/<slug>/` — person bios
- `js/data.js` — movie catalog
- `js/people-data.js` — people catalog
- `css/styles.css` — themes + layout

## Local

Open `index.html` or serve the folder:

```bash
python3 -m http.server 8080
```
