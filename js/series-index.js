(function () {
  function boot() {
    if (!window.ReelIndex || !ReelIndex.listSeries) return;

    var grid = document.getElementById("series-grid");
    var search = document.getElementById("search");
    var status = document.getElementById("search-status");
    var empty = document.getElementById("search-empty");
    var emptyTitle = document.getElementById("search-empty-title");
    var heading = document.getElementById("series-heading");
    var moreRow = document.getElementById("load-more-row");
    var moreBtn = document.getElementById("load-more");
    if (!grid) return;

    var FALLBACK_POSTER =
      "data:image/svg+xml," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450"><rect fill="#122536" width="100%" height="100%"/><text x="50%" y="50%" fill="#F4F0E6" text-anchor="middle" font-family="sans-serif" font-size="18">No poster</text></svg>'
      );

    var PAGE = 48;
    var pageCount = 1;
    var query = "";

    function escapeHtml(s) {
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function allSeries() {
      return ReelIndex.listSeries().slice().sort(function (a, b) {
        var y = String(b.firstAirDate || b.year || "").localeCompare(
          String(a.firstAirDate || a.year || "")
        );
        if (y) return y;
        return Number(b.voteAverage || 0) - Number(a.voteAverage || 0);
      });
    }

    function haystack(item) {
      return [item.title, item.year, (item.genres || []).join(" "), "series", "tv"]
        .join(" ")
        .toLowerCase();
    }

    function matches(item, tokens) {
      var hay = haystack(item);
      for (var i = 0; i < tokens.length; i++) {
        if (hay.indexOf(tokens[i]) === -1) return false;
      }
      return true;
    }

    function card(item) {
      var badge = ReelIndex.typeBadge
        ? ReelIndex.typeBadge(Object.assign({ _kind: "series" }, item))
        : { label: "Series", mod: "series" };
      var poster = item.poster || FALLBACK_POSTER;
      return (
        '<a class="card" href="' +
        item.slug +
        '/">' +
        '<span class="type-badge type-badge--' +
        escapeHtml(badge.mod) +
        '">' +
        escapeHtml(badge.label) +
        "</span>" +
        '<img class="card-poster" src="' +
        escapeHtml(poster) +
        '" alt="' +
        escapeHtml(item.title) +
        ' poster" loading="lazy" width="300" height="450" onerror="this.onerror=null;this.src=\'' +
        FALLBACK_POSTER +
        '\'"/>' +
        '<div class="card-body"><h2 class="card-title">' +
        escapeHtml(item.title) +
        "</h2><div class=\"card-meta\">" +
        escapeHtml(item.year || "") +
        " · ★ " +
        Number(item.voteAverage || 0).toFixed(1) +
        (item.seasons ? " · " + escapeHtml(String(item.seasons)) + " seasons" : "") +
        "</div></div></a>"
      );
    }

    function render() {
      var list = allSeries();
      var tokens = query ? query.split(/\s+/).filter(Boolean) : [];
      var filtered = tokens.length
        ? list.filter(function (item) {
            return matches(item, tokens);
          })
        : list;
      if (heading) {
        heading.textContent = "All series (" + list.length + ")";
      }
      if (!tokens.length) {
        if (status) {
          status.hidden = false;
          status.textContent =
            "Showing " +
            Math.min(pageCount * PAGE, list.length) +
            " of " +
            list.length +
            " series.";
        }
        if (empty) empty.hidden = true;
        var slice = filtered.slice(0, pageCount * PAGE);
        grid.innerHTML = slice.map(card).join("");
        if (moreRow) moreRow.hidden = slice.length >= filtered.length;
        return;
      }
      if (moreRow) moreRow.hidden = true;
      if (!filtered.length) {
        grid.innerHTML = "";
        if (status) {
          status.hidden = false;
          status.textContent = "No series match “" + query + "”.";
        }
        if (empty) {
          empty.hidden = false;
          if (emptyTitle) emptyTitle.textContent = "No series match “" + query + "”.";
        }
        return;
      }
      if (empty) empty.hidden = true;
      if (status) {
        status.hidden = false;
        status.textContent =
          filtered.length +
          (filtered.length === 1 ? " series matches “" : " series match “") +
          query +
          "”.";
      }
      grid.innerHTML = filtered.map(card).join("");
    }

    render();
    if (search) {
      search.addEventListener("input", function () {
        query = search.value.trim().toLowerCase();
        pageCount = 1;
        render();
      });
    }
    if (moreBtn) {
      moreBtn.addEventListener("click", function () {
        pageCount += 1;
        render();
      });
    }
  }

  var pending = window.ReelIndex && ReelIndex.whenCatalog;
  if (pending && typeof pending.then === "function") pending.then(boot);
  else boot();
})();
