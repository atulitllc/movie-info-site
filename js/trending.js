(function () {
  if (!window.ReelIndex || !ReelIndex.listTrending) return;

  var FALLBACK_POSTER =
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

  function rootPrefix() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute("src") || "";
      var m = src.match(/^(.*)js\/trending\.js(?:\?.*)?$/);
      if (m) return m[1] === "" ? "./" : m[1];
    }
    return "./";
  }

  function card(item, rail) {
    var badge = ReelIndex.typeBadge
      ? ReelIndex.typeBadge(item)
      : { label: item._label || "Movie", mod: item._badgeMod || "movie" };
    return (
      '<a class="card' +
      (rail ? " rail-card" : "") +
      '" href="' +
      item._href +
      '">' +
      '<span class="type-badge type-badge--' +
      escapeHtml(badge.mod) +
      '" aria-label="' +
      escapeHtml(badge.label) +
      '">' +
      escapeHtml(badge.label) +
      "</span>" +
      '<img class="card-poster" src="' +
      escapeHtml(item.poster || FALLBACK_POSTER) +
      '" alt="' +
      escapeHtml(item.title) +
      ' poster" loading="lazy" width="300" height="450" onerror="this.onerror=null;this.src=\'' +
      FALLBACK_POSTER +
      '\'"/>' +
      '<div class="card-body">' +
      '<h2 class="card-title">' +
      escapeHtml(item.title) +
      "</h2>" +
      '<div class="card-meta">' +
      escapeHtml(item.year || "") +
      " · ★ " +
      Number(item.voteAverage || 0).toFixed(1) +
      "</div></div></a>"
    );
  }

  var prefix = rootPrefix();
  var list = ReelIndex.listTrending(prefix);

  var grid = document.getElementById("trending-grid");
  if (grid) {
    grid.innerHTML =
      list.map(function (item) {
        return card(item, false);
      }).join("") || '<p class="tagline">Nothing trending yet.</p>';
  }

  var rail = document.getElementById("trending-rail");
  if (rail) {
    rail.innerHTML = list
      .slice(0, 10)
      .map(function (item) {
        return card(item, true);
      })
      .join("");
  }
})();
