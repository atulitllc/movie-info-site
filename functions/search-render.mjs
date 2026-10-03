/** HTML for /search/ and /?q=. Used by the Pages Function and local checks. */

const SITE = "https://wheretowatchfree.com";
const RESULT_LIMIT = 120;

export function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function tokensOf(query) {
  return String(query || "")
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 12);
}

export function searchTitles(titles, query) {
  const tokens = tokensOf(query);
  if (!tokens.length) return { tokens, hits: [], total: 0 };
  const hits = (titles || []).filter(function (item) {
    const hay = String(item.h || "");
    for (let i = 0; i < tokens.length; i++) {
      if (hay.indexOf(tokens[i]) === -1) return false;
    }
    return true;
  });
  hits.sort(function (a, b) {
    const year = String(b.y || "").localeCompare(String(a.y || ""));
    if (year) return year;
    return String(a.t || "").localeCompare(String(b.t || ""));
  });
  return { tokens, hits: hits.slice(0, RESULT_LIMIT), total: hits.length };
}

export function searchCanonical(query) {
  const trimmed = String(query || "").trim();
  if (!trimmed) return SITE + "/search/";
  return SITE + "/search/?q=" + encodeURIComponent(trimmed);
}

function resultCard(item) {
  const kind = item.k === "series" ? "series" : "movies";
  const label = item.k === "series" ? "Series" : "Movie";
  const href = "/" + kind + "/" + encodeURIComponent(item.s) + "/";
  const poster = item.p
    ? '<img class="card-poster" src="' +
      escapeHtml(item.p) +
      '" alt="' +
      escapeHtml(item.t) +
      ' poster" width="300" height="450" />'
    : "";
  return (
    '<a class="card" href="' +
    href +
    '">' +
    '<span class="type-badge">' +
    label +
    "</span>" +
    poster +
    '<div class="card-body"><h2 class="card-title">' +
    escapeHtml(item.t) +
    "</h2><div class=\"card-meta\">" +
    escapeHtml(item.y || "") +
    "</div></div></a>"
  );
}

export function renderSearchPage({ query, titles }) {
  const trimmed = String(query || "").trim().slice(0, 120);
  const { hits, total } = searchTitles(titles, trimmed);
  const canonical = searchCanonical(trimmed);
  const heading = trimmed
    ? "Search results for “" + trimmed + "”"
    : "Search movies and series";
  const title = heading + " | WhereToWatchFree";
  const description = trimmed
    ? "Search results for “" + trimmed + "” on WhereToWatchFree."
    : "Search the WhereToWatchFree catalog of movies and series.";
  let status;
  let grid;
  if (!trimmed) {
    status = "Enter a title, year, or genre.";
    grid = "";
  } else if (!total) {
    status = "No titles match “" + trimmed + "”.";
    grid =
      '<div class="search-empty"><p>No titles match “' +
      escapeHtml(trimmed) +
      "”.</p><p class=\"muted\">Try a movie or series name, a year, or a genre.</p></div>";
  } else if (hits.length === total) {
    status =
      total + (total === 1 ? " title matches “" : " titles match “") + trimmed + "”.";
    grid = '<div class="grid">' + hits.map(resultCard).join("") + "</div>";
  } else {
    status =
      "Showing " +
      hits.length +
      " of " +
      total +
      " titles for “" +
      trimmed +
      "”. Add a year or genre to narrow it.";
    grid = '<div class="grid">' + hits.map(resultCard).join("") + "</div>";
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(canonical)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <script src="/js/theme-boot.js"></script>
  <link rel="stylesheet" href="/css/styles.css" />
</head>
<body>
  <header class="site-header">
    <div class="container nav">
      <a class="logo" href="/" aria-label="WhereToWatchFree"><img class="logo-lockup logo-lockup--dark" src="/assets/brand/lockup-horizontal-dark.svg" alt="WhereToWatchFree" width="155" height="36" decoding="async" /><img class="logo-lockup logo-lockup--light" src="/assets/brand/lockup-horizontal-light.svg" alt="WhereToWatchFree" width="155" height="36" decoding="async" /></a>
      <div class="nav-right">
        <nav class="nav-links" aria-label="Primary">
          <a href="/">Home</a>
          <a href="/whats-on/">What&rsquo;s On</a>
          <a href="/trending/">Trending</a>
          <a href="/series/">Series</a>
          <a href="/watch-free/">Watch free</a>
        </nav>
        <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle color theme" title="Toggle theme">
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z"/></svg>
        </button>
      </div>
    </div>
  </header>
  <main>
    <section class="hero-home">
      <div class="container">
        <h1>${escapeHtml(heading)}</h1>
        <p>Cast, trailers, and legal where-to-watch guides from the WhereToWatchFree catalog.</p>
      </div>
    </section>
    <div class="container">
      <form class="toolbar" action="/search/" method="get" role="search">
        <label class="visually-hidden" for="q">Search movies and series</label>
        <input id="q" name="q" type="search" value="${escapeHtml(trimmed)}" placeholder="Search movies and series, years, genres…" autocomplete="off" />
        <button class="btn" type="submit">Search</button>
      </form>
      <p id="search-status" class="search-status" role="status">${escapeHtml(status)}</p>
      <div id="search-results">${grid}</div>
    </div>
  </main>
  <footer class="site-footer"></footer>
  <script src="/js/theme.js"></script>
  <script src="/js/footer.js"></script>
  <script src="/js/search-page.js"></script>
</body>
</html>
`;
}
