(function () {
  const grid = document.getElementById("movie-grid");
  const search = document.getElementById("search");
  const status = document.getElementById("search-status");
  const emptyBox = document.getElementById("search-empty");
  const emptyTitle = document.getElementById("search-empty-title");
  const movieHeading = document.getElementById("movie-heading");
  const moreRow = document.getElementById("load-more-row");
  const moreBtn = document.getElementById("load-more");
  const rails = [
    document.getElementById("trending-rail-section"),
    document.getElementById("series-rail-section")
  ];
  function boot() {
  if (!window.ReelIndex) return;

  const FALLBACK_POSTER =
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450"><rect fill="#1a1f2b" width="100%" height="100%"/><text x="50%" y="50%" fill="#9aa3b5" text-anchor="middle" font-family="sans-serif" font-size="18">No poster</text></svg>'
    );

  function allMovies() {
    return (
      (ReelIndex.listMovies && ReelIndex.listMovies()) ||
      (ReelIndex.getMovies && ReelIndex.getMovies()) ||
      Object.values(ReelIndex.MOVIES || {})
    );
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---- Featured rotating banner (compact) ---- */
  function initHeroBanner() {
    const root = document.getElementById("hero-banner");
    const track = document.getElementById("hero-banner-track");
    const dotsEl = document.getElementById("hero-banner-dots");
    const prevBtn = document.getElementById("hero-banner-prev");
    const nextBtn = document.getElementById("hero-banner-next");
    if (!root || !track || !dotsEl) return;

    const featured = allMovies()
      .slice()
      .sort(function (a, b) {
        return String(b.releaseDate || b.year || "").localeCompare(
          String(a.releaseDate || a.year || "")
        );
      })
      .slice(0, 7);

    if (!featured.length) {
      root.hidden = true;
      return;
    }

    var index = 0;
    var timer = null;
    var INTERVAL = 4500;

    track.innerHTML = featured
      .map(function (m, i) {
        var bg = m.backdrop || m.poster || "";
        return (
          '<a class="hero-slide' +
          (i === 0 ? " is-active" : "") +
          '" href="movies/' +
          encodeURIComponent(m.slug) +
          '/" data-i="' +
          i +
          '" aria-label="' +
          escapeHtml(m.title) +
          (m.year ? " (" + escapeHtml(m.year) + ")" : "") +
          ' — open movie page" style="--slide-bg:url(\'' +
          bg +
          "')\">" +
          '<span class="hero-slide-scrim" aria-hidden="true"></span>' +
          '<img class="hero-slide-poster" src="' +
          escapeHtml(m.poster || FALLBACK_POSTER) +
          '" alt="" width="72" height="108" loading="' +
          (i === 0 ? "eager" : "lazy") +
          '" />' +
          '<span class="hero-slide-meta">' +
          '<span class="hero-slide-kicker">Latest</span>' +
          '<span class="hero-slide-title">' +
          escapeHtml(m.title) +
          "</span>" +
          '<span class="hero-slide-sub">' +
          escapeHtml(m.year || "") +
          (m.genres && m.genres[0] ? " · " + escapeHtml(m.genres[0]) : "") +
          "</span>" +
          "</span></a>"
        );
      })
      .join("");

    dotsEl.innerHTML = featured
      .map(function (_, i) {
        return (
          '<button type="button" class="hero-dot' +
          (i === 0 ? " is-active" : "") +
          '" aria-label="Show featured movie ' +
          (i + 1) +
          '" data-i="' +
          i +
          '"></button>'
        );
      })
      .join("");

    function show(i) {
      index = (i + featured.length) % featured.length;
      var slides = track.querySelectorAll(".hero-slide");
      var dots = dotsEl.querySelectorAll(".hero-dot");
      for (var s = 0; s < slides.length; s++) {
        slides[s].classList.toggle("is-active", s === index);
      }
      for (var d = 0; d < dots.length; d++) {
        dots[d].classList.toggle("is-active", d === index);
      }
    }

    function next() {
      show(index + 1);
    }
    function prev() {
      show(index - 1);
    }

    function start() {
      stop();
      timer = setInterval(next, INTERVAL);
    }
    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); start(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); start(); });
    dotsEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".hero-dot");
      if (!btn) return;
      show(Number(btn.getAttribute("data-i")) || 0);
      start();
    });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", function (e) {
      if (!root.contains(e.relatedTarget)) start();
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });

    start();
  }

  /* ---- Movie grid ---- */
  function card(m) {
    const href = "movies/" + m.slug + "/";
    const poster = m.poster || FALLBACK_POSTER;
    return (
      '<a class="card" href="' +
      href +
      '">' +
      '<img class="card-poster" src="' +
      poster +
      '" alt="' +
      escapeHtml(m.title) +
      ' poster" loading="lazy" width="300" height="450" onerror="this.onerror=null;this.src=\'' +
      FALLBACK_POSTER +
      '\'"/>' +
      '<div class="card-body">' +
      '<h2 class="card-title">' +
      escapeHtml(m.title) +
      "</h2>" +
      '<div class="card-meta">' +
      escapeHtml(m.year || "") +
      (m.rating ? " · " + escapeHtml(m.rating) : "") +
      " · ★ " +
      Number(m.voteAverage || 0).toFixed(1) +
      "</div>" +
      "</div></a>"
    );
  }

  var PAGE = 48;
  var pageCount = 1;
  var query = "";

  function moviesSorted() {
    return allMovies().slice().sort(function (a, b) {
      return String(b.releaseDate || b.year || "").localeCompare(
        String(a.releaseDate || a.year || "")
      );
    });
  }

  function allTitles() {
    var movies = allMovies().map(function (m) {
      return Object.assign({ _kind: "movie" }, m);
    });
    var series = (ReelIndex.listSeries ? ReelIndex.listSeries() : []).map(function (s) {
      return Object.assign({ _kind: "series" }, s);
    });
    return movies.concat(series);
  }

  function haystack(item) {
    var theater =
      item.inTheaters ||
      (ReelIndex.hasTheatersWatch && ReelIndex.hasTheatersWatch(item));
    return [
      item.title,
      item.year,
      (item.genres || []).join(" "),
      item._kind === "series" ? "series tv show" : "movie film",
      theater ? "theaters theater" : ""
    ]
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

  function resultCard(item) {
    var isSeries = item._kind === "series";
    var href = (isSeries ? "series/" : "movies/") + item.slug + "/";
    var badge = ReelIndex.typeBadge
      ? ReelIndex.typeBadge(item)
      : {
          label: isSeries ? "Series" : "Movie",
          mod: isSeries ? "series" : "movie"
        };
    var poster = item.poster || FALLBACK_POSTER;
    return (
      '<a class="card" href="' +
      href +
      '">' +
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
      "</div></div></a>"
    );
  }

  function setRailsHidden(hidden) {
    rails.forEach(function (el) {
      if (el) el.hidden = hidden;
    });
    if (movieHeading) movieHeading.hidden = hidden;
  }

  function renderBrowse() {
    var list = moviesSorted();
    var slice = list.slice(0, pageCount * PAGE);
    setRailsHidden(false);
    if (emptyBox) emptyBox.hidden = true;
    if (status) {
      status.hidden = false;
      status.textContent =
        "Showing " +
        slice.length +
        " of " +
        list.length +
        " movies. Search also covers series.";
    }
    if (grid) grid.innerHTML = slice.map(card).join("");
    if (moreRow) moreRow.hidden = slice.length >= list.length;
  }

  function renderSearch(tokens) {
    var hits = allTitles().filter(function (item) {
      return matches(item, tokens);
    });
    hits.sort(function (a, b) {
      return String(b.year || "").localeCompare(String(a.year || ""));
    });
    setRailsHidden(true);
    if (moreRow) moreRow.hidden = true;
    if (!hits.length) {
      if (grid) grid.innerHTML = "";
      if (status) {
        status.hidden = false;
        status.textContent = "No titles match “" + query + "”.";
      }
      if (emptyBox) {
        emptyBox.hidden = false;
        if (emptyTitle) emptyTitle.textContent = "No titles match “" + query + "”.";
      }
      return;
    }
    if (emptyBox) emptyBox.hidden = true;
    var shown = hits.slice(0, 120);
    if (status) {
      status.hidden = false;
      status.textContent =
        shown.length === hits.length
          ? hits.length +
            (hits.length === 1 ? " title matches “" : " titles match “") +
            query +
            "”."
          : "Showing " +
            shown.length +
            " of " +
            hits.length +
            " titles for “" +
            query +
            "”. Add a year or genre to narrow it.";
    }
    if (grid) grid.innerHTML = shown.map(resultCard).join("");
  }

  function render() {
    var tokens = query ? query.split(/\s+/).filter(Boolean) : [];
    if (!tokens.length) renderBrowse();
    else renderSearch(tokens);
  }

  initHeroBanner();

  /* ---- Series rail ---- */
  function seriesCard(s) {
    const href = "series/" + s.slug + "/";
    const poster = s.poster || FALLBACK_POSTER;
    const badge = s.kind === "web-series" ? "Web series" : "Series";
    return (
      '<a class="card rail-card" href="' +
      href +
      '">' +
      '<span class="type-badge">' +
      badge +
      "</span>" +
      '<img class="card-poster" src="' +
      poster +
      '" alt="' +
      escapeHtml(s.title) +
      ' poster" loading="lazy" width="300" height="450" onerror="this.onerror=null;this.src=\'' +
      FALLBACK_POSTER +
      '\'"/>' +
      '<div class="card-body">' +
      '<h2 class="card-title">' +
      escapeHtml(s.title) +
      "</h2>" +
      '<div class="card-meta">' +
      escapeHtml(s.year || "") +
      " · ★ " +
      Number(s.voteAverage || 0).toFixed(1) +
      "</div></div></a>"
    );
  }

  function renderSeriesRail() {
    const rail = document.getElementById("series-rail");
    if (!rail || !ReelIndex.listSeries) return;
    const list = ReelIndex.listSeries()
      .slice()
      .sort(function (a, b) {
        var y = String(b.firstAirDate || b.year || "").localeCompare(
          String(a.firstAirDate || a.year || "")
        );
        if (y) return y;
        return Number(b.voteAverage || 0) - Number(a.voteAverage || 0);
      })
      .slice(0, 12);
    rail.innerHTML = list.map(seriesCard).join("");
  }

  renderSeriesRail();

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
