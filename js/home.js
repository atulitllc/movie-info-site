(function () {
  const grid = document.getElementById("movie-grid");
  const search = document.getElementById("search");
  const status = document.getElementById("status");
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
      " · " +
      escapeHtml(m.rating || "") +
      " · ★ " +
      Number(m.voteAverage || 0).toFixed(1) +
      "</div>" +
      "</div></a>"
    );
  }

  function render(list) {
    if (!grid) return;
    grid.innerHTML =
      list.map(card).join("") || '<p class="tagline">No movies match.</p>';
  }

  initHeroBanner();

  if (grid) {
    render(allMovies());
    if (search) {
      search.addEventListener("input", function () {
        const q = search.value.trim().toLowerCase();
        const all = allMovies();
        render(
          !q
            ? all
            : all.filter(function (m) {
                return (m.title + m.year + (m.genres || []).join(" "))
                  .toLowerCase()
                  .includes(q);
              })
        );
      });
    }
  }

  const keyInput = document.getElementById("apiKey");
  const loadBtn = document.getElementById("loadBtn");
  if (keyInput && loadBtn && ReelIndex.TMDB) {
    const saved = localStorage.getItem("tmdb_api_key");
    if (saved) keyInput.value = saved;
    loadBtn.addEventListener("click", async function () {
      const key = keyInput.value.trim();
      if (!key) {
        status.textContent = "Enter an API key first.";
        return;
      }
      localStorage.setItem("tmdb_api_key", key);
      status.textContent = "Refreshing Odyssey from TMDB…";
      try {
        await ReelIndex.TMDB.refreshSlug("the-odyssey", key);
        render(allMovies());
        status.textContent = "Updated live TMDB data for Odyssey (session).";
      } catch (e) {
        status.textContent = "TMDB failed: " + (e.message || e);
      }
    });
  }
})();
