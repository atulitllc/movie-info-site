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
- `/movies/<slug>/` detail pages (cast photos, trailer, where-to-watch cards, related movies)
- `/people/<slug>/` person pages (bio + known-for links back to movies)

Add a movie in `js/data.js` + a folder under `movies/`. Add a person in `js/people-data.js` + a folder under `people/`.

## Features
- Bidirectional movie ↔ person links
- YouTube trailers (`trailerYouTubeId`) with optional TMDB `/videos` refresh
- Subscription + free (ads) watch-provider cards (Simple Icons CDN)
- Cast cards with photos linking to person pages
- Related movies grid

## TMDB
Optional API key on the homepage refreshes live details. Embedded fallback works without a key.

## Deploy
GitHub Pages from `main` (root). Canonical base: `https://atulitllc.github.io/movie-info-site/`
