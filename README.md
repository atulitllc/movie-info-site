# ReelIndex (movie-info-site)

SEO-first static movie info site prototype for ATULIT LLC.

## Open locally
```bash
cd movie-info-site
python3 -m http.server 8080
```
Then visit http://localhost:8080/

## Structure
- `/` homepage grid
- `/movies/<slug>/` detail pages (add a movie in `js/data.js` + a folder)

## TMDB
Optional API key on the homepage refreshes Odyssey (TMDB id 1368337). Embedded fallback works without a key.

## Deploy
GitHub Pages from `main` (root). Canonical base: `https://atulitllc.github.io/movie-info-site/`
