(function () {
  if (!window.ReelIndex) return;

  const FALLBACK_POSTER =
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450"><rect fill="#1a1f2b" width="100%" height="100%"/><text x="50%" y="50%" fill="#9aa3b5" text-anchor="middle" font-family="sans-serif" font-size="18">No poster</text></svg>'
    );

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function movies() {
    return (
      (ReelIndex.listMovies && ReelIndex.listMovies()) ||
      Object.values(ReelIndex.MOVIES || {})
    ).map(function (m) {
      return Object.assign({}, m, { _kind: "movie", _href: "../movies/" + m.slug + "/" });
    });
  }

  function series() {
    return (ReelIndex.listSeries ? ReelIndex.listSeries() : []).map(function (s) {
      return Object.assign({}, s, { _kind: "series", _href: "../series/" + s.slug + "/" });
    });
  }

  function all() {
    return movies().concat(series());
  }

  function hasFree(item) {
    var w = item.watch;
    if (!w) return false;
    if (Array.isArray(w)) return false;
    return !!(w.free && w.free.length);
  }

  function sortDate(a, b) {
    var da = a.releaseDate || a.firstAirDate || a.year || "";
    var db = b.releaseDate || b.firstAirDate || b.year || "";
    return String(db).localeCompare(String(da));
  }

  function sortScore(a, b) {
    return Number(b.voteAverage || 0) - Number(a.voteAverage || 0);
  }

  function card(item) {
    var badge = item._kind === "series" ? (item.kind === "web-series" ? "Web series" : "Series") : "Movie";
    return (
      '<a class="card rail-card" href="' +
      item._href +
      '">' +
      '<span class="type-badge">' +
      badge +
      "</span>" +
      '<img class="card-poster" src="' +
      escapeHtml(item.poster || FALLBACK_POSTER) +
      '" alt="' +
      escapeHtml(item.title) +
      ' poster" loading="lazy" width="300" height="450" onerror="this.onerror=null;this.src=\'' +
      FALLBACK_POSTER +
      '\'"/>' +
      '<div class="card-body">' +
      '<h3 class="card-title">' +
      escapeHtml(item.title) +
      "</h3>" +
      '<div class="card-meta">' +
      escapeHtml(item.year || "") +
      " · ★ " +
      Number(item.voteAverage || 0).toFixed(1) +
      "</div></div></a>"
    );
  }

  function fill(id, list) {
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = list.map(card).join("") || '<p class="tagline">Nothing here yet.</p>';
  }

  var catalog = all();

  // Trending: mix recent-ish high scores + popular series
  var trending = catalog
    .slice()
    .sort(function (a, b) {
      return sortScore(a, b) || sortDate(a, b);
    })
    .slice(0, 10);

  // Prefer a hand-picked mix for prototype polish
  var trendingSlugs = [
    "the-odyssey",
    "stranger-things",
    "the-last-of-us",
    "dune-part-two",
    "severance",
    "arcane",
    "oppenheimer",
    "the-boys",
    "wednesday",
    "squid-game"
  ];
  var bySlug = {};
  catalog.forEach(function (i) {
    bySlug[i.slug] = i;
  });
  trending = trendingSlugs.map(function (s) { return bySlug[s]; }).filter(Boolean);
  if (trending.length < 8) {
    trending = catalog.slice().sort(sortScore).slice(0, 10);
  }

  var freeList = catalog.filter(hasFree).sort(sortScore).slice(0, 12);

  var newList = catalog.slice().sort(sortDate).slice(0, 10);

  var topList = catalog.slice().sort(sortScore).slice(0, 10);

  fill("rail-trending", trending);
  fill("rail-free", freeList);
  fill("rail-new", newList);
  fill("rail-top", topList);
})();
