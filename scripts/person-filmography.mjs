/**
 * Filmography markup for indexable person pages.
 * Matches the cards js/person.js writes into #person-known-for.
 */
const METAHUB = "https://images.metahub.space";

export function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function filmographyMarkup(credits) {
  const items = credits || [];
  if (!items.length) return '<p class="muted">No titles linked yet.</p>';
  return items
    .map(function (m) {
      const kind = m.kind === "series" ? "series" : "movie";
      const titleSlug = String(m.slug || "");
      if (!/^[a-z0-9-]+$/.test(titleSlug)) return "";
      const href = "../../" + (kind === "series" ? "series" : "movies") + "/" + titleSlug + "/";
      const creditTitle = m.title || titleSlug;
      const metaParts = [];
      if (m.year) metaParts.push(String(m.year));
      if (kind === "series") metaParts.push("Series");
      if (m.role) metaParts.push(String(m.role));
      const poster = m.poster || "";
      return (
        '<a class="card person-movie-card" href="' +
        href +
        '">' +
        (poster
          ? '<img class="card-poster" src="' +
            escapeHtml(poster) +
            '" alt="' +
            escapeHtml(creditTitle) +
            ' poster" loading="lazy" />'
          : '<div class="card-poster person-movie-placeholder"></div>') +
        '<div class="card-body"><div class="card-title">' +
        escapeHtml(creditTitle) +
        '</div><div class="card-meta">' +
        escapeHtml(metaParts.join(" · ")) +
        "</div></div></a>"
      );
    })
    .join("");
}

function fillArtwork(item) {
  if (!item || !item.imdbId) return;
  const id = String(item.imdbId);
  if (id.indexOf("tt") !== 0) return;
  if (!item.poster) item.poster = METAHUB + "/poster/medium/" + id + "/img";
  if (!item.backdrop) item.backdrop = METAHUB + "/background/medium/" + id + "/img";
}

/** Same merge as js/catalog-loader.js: curated records win; empty artwork is filled. */
export function mergeCatalogLikeBrowser(reel, data) {
  reel.MOVIES = reel.MOVIES || {};
  reel.SERIES = reel.SERIES || {};
  function merge(list, bucket) {
    const map = reel[bucket];
    for (const item of list || []) {
      if (!item || !item.slug) continue;
      fillArtwork(item);
      const existing = map[item.slug];
      if (existing) {
        fillArtwork(existing);
        if (!existing.poster && item.poster) existing.poster = item.poster;
        if (!existing.backdrop && item.backdrop) existing.backdrop = item.backdrop;
        continue;
      }
      map[item.slug] = item;
    }
  }
  merge(data && data.movies, "MOVIES");
  merge(data && data.series, "SERIES");
}
