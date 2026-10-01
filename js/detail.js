(function () {
  const slug = document.body.dataset.slug;
  if (!slug || !window.ReelIndex) return;
  const movie = ReelIndex.getMovie(slug);
  if (!movie) return;

  function hoursMinutes(mins) {
    if (!mins) return "—";
    return Math.floor(mins / 60) + "h " + (mins % 60) + "m";
  }

  function personLink(name) {
    if (!name) return "—";
    const people = ReelIndex.PEOPLE || {};
    const slugify =
      ReelIndex.slugify ||
      function (n) {
        return String(n)
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/['\u2019]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      };
    const s = slugify(name);
    if (people[s]) {
      return (
        '<a class="person-link" href="../../people/' + s + '/">' + name + "</a>"
      );
    }
    return name;
  }

  function glanceWatchProviders() {
    var watch = movie.watch;
    var list = [];
    if (Array.isArray(watch)) {
      list = watch.slice(0, 6);
    } else if (watch && typeof watch === "object") {
      list = []
        .concat(watch.paid || [])
        .concat(watch.free || [])
        .slice(0, 6);
    }
    return list.filter(function (p) {
      return p && (p.id || p.label);
    });
  }

  function glanceLogo(p) {
    var icon = PROVIDER_ICONS[p.id];
    if (icon) {
      return (
        '<img class="glance-watch-logo" src="https://cdn.simpleicons.org/' +
        icon +
        '" alt="' +
        escapeHtml(p.label || p.id) +
        '" width="30" height="30" loading="lazy" title="' +
        escapeHtml(p.label || p.id) +
        '" />'
      );
    }
    var label = (p.label || p.id || "?").charAt(0).toUpperCase();
    return (
      '<span class="glance-watch-fallback" title="' +
      escapeHtml(p.label || p.id || "") +
      '" aria-hidden="true">' +
      label +
      "</span>"
    );
  }

  function buildGlancePanel() {
    var stats = [];
    if (movie.year) {
      stats.push({ label: "Year", value: String(movie.year) });
    }
    if (movie.runtime) {
      stats.push({ label: "Runtime", value: hoursMinutes(movie.runtime) });
    }
    if (movie.rating) {
      stats.push({ label: "Rated", value: String(movie.rating) });
    }
    if (movie.voteAverage != null && !isNaN(Number(movie.voteAverage))) {
      stats.push({
        label: "Score",
        value: Math.round(Number(movie.voteAverage) * 10) + "%"
      });
    }

    var statsHtml =
      '<div class="glance-stats">' +
      stats
        .map(function (s) {
          return (
            '<div class="glance-stat"><span class="glance-stat-label">' +
            escapeHtml(s.label) +
            '</span><span class="glance-stat-value">' +
            escapeHtml(s.value) +
            "</span></div>"
          );
        })
        .join("") +
      "</div>";

    var genres = (movie.genres || []).slice(0, 5);
    var genresHtml = genres.length
      ? '<div class="glance-block"><p class="glance-block-label">Genres</p><div class="glance-chips">' +
        genres
          .map(function (g) {
            return '<span class="glance-chip">' + escapeHtml(g) + "</span>";
          })
          .join("") +
        "</div></div>"
      : "";

    var directorHtml = movie.director
      ? '<div class="glance-block"><p class="glance-block-label">Director</p><div class="glance-chips"><span class="glance-chip accent">' +
        personLink(movie.director) +
        "</span></div></div>"
      : "";

    var cast = (movie.cast || []).slice(0, 4);
    var castHtml = "";
    if (cast.length) {
      var people = ReelIndex.PEOPLE || {};
      var slugify =
        ReelIndex.slugify ||
        function (n) {
          return String(n)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/['\u2019]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
        };
      castHtml =
        '<div class="glance-block"><p class="glance-block-label">Key cast</p><div class="glance-cast">' +
        cast
          .map(function (p) {
            var s = slugify(p.name);
            var initial = (p.name || "?").charAt(0).toUpperCase();
            var photo = p.photo
              ? '<img class="glance-cast-dot" src="' +
                p.photo +
                '" alt="" width="22" height="22" loading="lazy" />'
              : '<span class="glance-cast-dot" aria-hidden="true">' +
                initial +
                "</span>";
            var label = escapeHtml(p.name || "");
            if (people[s]) {
              return (
                '<a class="glance-cast-chip" href="../../people/' +
                s +
                '/">' +
                photo +
                label +
                "</a>"
              );
            }
            return (
              '<span class="glance-cast-chip">' + photo + label + "</span>"
            );
          })
          .join("") +
        "</div></div>";
    }

    var providers = glanceWatchProviders();
    var watchHtml = providers.length
      ? '<div class="glance-block"><p class="glance-block-label">Watch on</p><div class="glance-watch" aria-label="Streaming providers">' +
        providers
          .map(function (p) {
            var logo = glanceLogo(p);
            if (p.href) {
              return (
                '<a href="' +
                p.href +
                '" target="_blank" rel="noopener" title="' +
                escapeHtml(p.label || p.id) +
                '">' +
                logo +
                "</a>"
              );
            }
            return logo;
          })
          .join("") +
        "</div></div>"
      : "";

    return (
      '<aside class="trailer-glance" aria-label="At a glance">' +
      '<p class="trailer-glance-title">At a glance</p>' +
      statsHtml +
      genresHtml +
      directorHtml +
      castHtml +
      watchHtml +
      "</aside>"
    );
  }

  function showTrailer(youtubeId) {
    const section = document.getElementById("trailer-section");
    const wrap = document.getElementById("trailer");
    if (!section || !wrap || !youtubeId) {
      if (section) section.hidden = true;
      return;
    }
    var heading = section.querySelector("h2");
    if (heading) heading.textContent = "Trailer";
    wrap.innerHTML =
      '<div class="trailer-layout">' +
      buildGlancePanel() +
      '<div class="trailer-player">' +
      '<p class="trailer-player-label">Official trailer</p>' +
      '<div class="trailer-frame"><div class="trailer-wrap"><iframe src="https://www.youtube-nocookie.com/embed/' +
      encodeURIComponent(youtubeId) +
      '" title="' +
      escapeHtml(movie.title || "Trailer") +
      ' trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe></div></div>' +
      "</div></div>";
    section.hidden = false;
  }

  function starsFromTen(score) {
    if (score == null || isNaN(Number(score))) return "";
    var n = Math.max(0, Math.min(10, Number(score)));
    return (
      '<span class="review-rating" title="' +
      n.toFixed(1) +
      ' / 10"><span aria-hidden="true">★</span> ' +
      n.toFixed(1) +
      "</span>"
    );
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderReviews(list) {
    var section = document.getElementById("reviews-section");
    var grid = document.getElementById("reviews");
    if (!section || !grid) return;
    var reviews = list || movie.reviews || (ReelIndex.REVIEWS && ReelIndex.REVIEWS[slug]) || [];
    if (!reviews.length) {
      section.hidden = true;
      return;
    }
    grid.innerHTML = reviews
      .map(function (r) {
        return (
          '<article class="review-card">' +
          '<div class="review-card-header">' +
          "<div><p class=\"review-author\">" +
          escapeHtml(r.author || "Staff") +
          "</p>" +
          (r.role
            ? '<p class="review-role">' + escapeHtml(r.role) + "</p>"
            : "") +
          "</div>" +
          starsFromTen(r.rating) +
          "</div>" +
          '<p class="review-quote">' +
          escapeHtml(r.quote || "") +
          "</p>" +
          '<p class="review-source">' +
          escapeHtml(r.source || "ReelIndex Editorial") +
          "</p>" +
          "</article>"
        );
      })
      .join("");
    section.hidden = false;
  }

  async function maybeFetchTrailer(apiKey) {
    if (!movie.tmdbId || !apiKey) return movie.trailerYouTubeId || null;
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movie.tmdbId +
          "/videos?api_key=" +
          encodeURIComponent(apiKey)
      );
      const data = await res.json();
      const vids = data.results || [];
      const trailer =
        vids.find(function (v) {
          return v.site === "YouTube" && v.type === "Trailer" && v.official;
        }) ||
        vids.find(function (v) {
          return v.site === "YouTube" && v.type === "Trailer";
        });
      return trailer ? trailer.key : movie.trailerYouTubeId || null;
    } catch (e) {
      return movie.trailerYouTubeId || null;
    }
  }

  const PROVIDER_ICONS = {
    netflix: "netflix/E50914",
    hulu: "hulu/1CE783",
    "disney-plus": "disneyplus/113CCF",
    max: "max/002BE7",
    peacock: "peacock/000000",
    "paramount-plus": "paramountplus/0064FF",
    amazon: "prime/00A8E1",
    "amazon-prime": "prime/00A8E1",
    apple: "appletv/000000",
    tubi: "tubi/FA382F",
    pluto: "plutotv/FFFFFF",
    plex: "plex/E5A00D",
    theaters: null,
    tmdb: "themoviedb/01B4E4",
    imax: null
  };

  function providerLogo(p) {
    const icon = PROVIDER_ICONS[p.id];
    if (icon) {
      return (
        '<img class="watch-logo" src="https://cdn.simpleicons.org/' +
        icon +
        '" alt="" width="28" height="28" loading="lazy" />'
      );
    }
    // inline SVG mark for theaters / imax / unknown
    const label = (p.label || p.id || "?").charAt(0).toUpperCase();
    return (
      '<span class="watch-logo watch-logo-fallback" aria-hidden="true">' +
      label +
      "</span>"
    );
  }

  function renderWatchGroup(title, items) {
    if (!items || !items.length) return "";
    const cards = items
      .map(function (p) {
        const inner =
          providerLogo(p) +
          '<span class="watch-label">' +
          (p.label || p.id) +
          "</span>" +
          (p.note ? '<span class="watch-note">' + p.note + "</span>" : "");
        if (p.href) {
          return (
            '<a class="watch-card" href="' +
            p.href +
            '" target="_blank" rel="noopener">' +
            inner +
            "</a>"
          );
        }
        return '<div class="watch-card watch-card-static">' + inner + "</div>";
      })
      .join("");
    return (
      '<div class="watch-group"><h3 class="watch-group-title">' +
      title +
      '</h3><div class="watch-grid">' +
      cards +
      "</div></div>"
    );
  }

  function renderWatch(watch) {
    const el = document.getElementById("watch");
    if (!el) return;
    // New shape: { paid:[], free:[] } — also tolerate legacy array
    if (Array.isArray(watch)) {
      el.innerHTML =
        '<div class="watch-grid">' +
        watch
          .map(function (w) {
            return w.href
              ? '<a class="watch-card" href="' +
                  w.href +
                  '" target="_blank" rel="noopener"><span class="watch-label">' +
                  w.label +
                  "</span>" +
                  (w.note
                    ? '<span class="watch-note">' + w.note + "</span>"
                    : "") +
                  "</a>"
              : '<div class="watch-card watch-card-static"><span class="watch-label">' +
                  w.label +
                  "</span>" +
                  (w.note
                    ? '<span class="watch-note">' + w.note + "</span>"
                    : "") +
                  "</div>";
          })
          .join("") +
        "</div>";
      return;
    }
    if (!watch || typeof watch !== "object") {
      el.innerHTML = "";
      return;
    }
    let html = "";
    html += renderWatchGroup("Stream with a subscription", watch.paid);
    html += renderWatchGroup("Watch free (ads)", watch.free);
    if (watch.other && watch.other.length) {
      html += renderWatchGroup("Also available", watch.other);
    }
    el.innerHTML = html || "<p class=\"muted\">Availability varies by region.</p>";
  }

  const hero = document.getElementById("detail-hero");
  if (hero) {
    var bd = movie.backdrop || "";
    // Prefer w780 paths for full-bleed heroes
    if (bd.indexOf("/original/") !== -1) bd = bd.replace("/original/", "/w780/");
    hero.style.setProperty("--backdrop", "url('" + bd + "')");
  }
  const poster = document.getElementById("poster");
  if (poster) {
    poster.src = movie.poster;
    poster.alt = movie.title + " poster";
  }
  const set = function (id, v) {
    const el = document.getElementById(id);
    if (el) el.textContent = v;
  };
  set("title", movie.title);
  set("tagline", movie.tagline || movie.director + " · " + movie.year);
  set("overview", movie.overview);
  set("overviewShort", movie.overview);

  const chips = document.getElementById("chips");
  if (chips) {
    const items = [
      movie.year,
      movie.rating,
      hoursMinutes(movie.runtime)
    ]
      .concat(movie.genres || [])
      .filter(Boolean);
    chips.innerHTML = items
      .map(function (c, i) {
        return '<span class="chip' + (i < 3 ? " accent" : "") + '">' + c + "</span>";
      })
      .join("");
  }

  const scoreRing = document.getElementById("score-ring");
  const scoreValue = document.getElementById("score-value");
  const scoreLabel = document.getElementById("score-label");
  if (scoreRing && movie.voteAverage != null) {
    var pct = Math.round(Number(movie.voteAverage) * 10);
    scoreRing.style.setProperty("--p", String(pct));
    if (scoreValue) scoreValue.textContent = pct + "%";
    scoreRing.hidden = false;
    if (scoreLabel) scoreLabel.hidden = false;
  }

  function castCardHtml(p) {
    const people = ReelIndex.PEOPLE || {};
    const slugify =
      ReelIndex.slugify ||
      function (n) {
        return String(n)
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/['\u2019]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      };
    const s = slugify(p.name);
    const hasPerson = !!people[s];
    const initial = (p.name || "?").charAt(0).toUpperCase();
    const photo =
      p.photo ||
      ("data:image/svg+xml," +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect fill="#1a1f2b" width="100%" height="100%"/><text x="50%" y="54%" fill="#e8b86d" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="32" font-weight="700">' +
            initial +
            "</text></svg>"
        ));
    const inner =
      '<img class="cast-photo" src="' +
      photo +
      '" alt="" width="90" height="90" loading="lazy" onerror="this.onerror=null;this.src=\'data:image/svg+xml,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect fill="#1a1f2b" width="100%" height="100%"/><text x="50%" y="54%" fill="#e8b86d" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="32">' +
          initial +
          "</text></svg>"
      ) +
      '\'" />' +
      '<div class="cast-meta"><div class="name">' +
      p.name +
      '</div><div class="role">' +
      (p.character || "—") +
      "</div></div>";
    if (hasPerson) {
      return (
        '<a class="cast-card cast-card-link" href="../../people/' +
        s +
        '/">' +
        inner +
        "</a>"
      );
    }
    return '<div class="cast-card">' + inner + "</div>";
  }

  const cast = document.getElementById("cast");
  if (cast) {
    cast.innerHTML = (movie.cast || []).map(castCardHtml).join("");
  }

  function renderRelated(slugs) {
    const section = document.getElementById("related-section");
    const grid = document.getElementById("related");
    if (!section || !grid) return;
    const list = (slugs || []).filter(function (s) {
      return s && s !== movie.slug && ReelIndex.getMovie(s);
    });
    if (!list.length) {
      section.hidden = true;
      return;
    }
    grid.innerHTML = list
      .map(function (s) {
        const m = ReelIndex.getMovie(s);
        return (
          '<a class="card related-card" href="../../movies/' +
          s +
          '/">' +
          '<img class="card-poster" src="' +
          m.poster +
          '" alt="' +
          m.title +
          ' poster" loading="lazy" />' +
          '<div class="card-body"><div class="card-title">' +
          m.title +
          '</div><div class="card-meta">' +
          (m.year || "") +
          "</div></div></a>"
        );
      })
      .join("");
    section.hidden = false;
  }

  renderRelated(movie.related);

  async function maybeFetchSimilar(apiKey) {
    if (!apiKey || !movie.tmdbId) return;
    const section = document.getElementById("related-section");
    const grid = document.getElementById("related");
    if (!section || !grid || (movie.related && movie.related.length)) return;
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movie.tmdbId +
          "/similar?api_key=" +
          encodeURIComponent(apiKey)
      );
      const data = await res.json();
      const local = ReelIndex.listMovies ? ReelIndex.listMovies() : [];
      const byTmdb = {};
      local.forEach(function (m) {
        if (m.tmdbId) byTmdb[m.tmdbId] = m;
      });
      const hits = (data.results || [])
        .map(function (r) {
          return byTmdb[r.id];
        })
        .filter(Boolean)
        .slice(0, 4);
      if (hits.length) renderRelated(hits.map(function (m) { return m.slug; }));
    } catch (e) { /* ignore */ }
  }

  const crew = document.getElementById("crew");
  if (crew) {
    const writers = (movie.writers || []).map(personLink).join(", ") || "—";
    const producers = (movie.producers || []).map(personLink).join(", ") || "—";
    crew.innerHTML =
      "<p><strong>Director:</strong> " +
      personLink(movie.director) +
      "</p>" +
      "<p><strong>Writers:</strong> " +
      writers +
      "</p>" +
      "<p><strong>Producers:</strong> " +
      producers +
      "</p>" +
      "<p><strong>Executive Producer:</strong> " +
      personLink(movie.executiveProducer) +
      "</p>";
  }

  renderWatch(movie.watch);

  renderReviews(movie.reviews);

  showTrailer(movie.trailerYouTubeId || null);
  const apiKey = ReelIndex.getApiKey ? ReelIndex.getApiKey() : "";
  if (apiKey && movie.tmdbId) {
    maybeFetchTrailer(apiKey).then(function (id) {
      if (id) showTrailer(id);
    });
    maybeFetchSimilar(apiKey);
  }
})();
