(function () {
  const slug = document.body.dataset.slug;
  if (!slug || !window.ReelIndex) return;
  const mediaType = document.body.dataset.media || "movie";
  const isSeries = mediaType === "series" || mediaType === "tv";
  const movie = isSeries
    ? (ReelIndex.getSeries && ReelIndex.getSeries(slug))
    : ReelIndex.getMovie(slug);
  if (!movie) return;
  const mediaBase = isSeries ? "../../series/" : "../../movies/";
  const mediaLabel = isSeries ? "series" : "movie";

  function hoursMinutes(mins) {
    if (!mins) return "—";
    return Math.floor(mins / 60) + "h " + (mins % 60) + "m";
  }

  function slugifyName(name) {
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
    return slugify(name || "");
  }

  function personRecord(slug) {
    if (!slug || !ReelIndex.getPerson) return null;
    return ReelIndex.getPerson(slug);
  }

  function personHref(name, explicitSlug) {
    var label = name;
    var explicit = explicitSlug || "";
    if (name && typeof name === "object") {
      label = name.name || name.actor || name.person || "";
      explicit = explicit || name.slug || name.personSlug || "";
    }
    function safeSlug(slug) {
      return slug && /^[a-z0-9-]+$/.test(slug) ? slug : "";
    }
    var byName = safeSlug(slugifyName(label));
    var token = safeSlug(explicit ? String(explicit).split("/").filter(Boolean).pop() : "");
    // Prefer a resolved person when people-data.js is loaded (curated title pages).
    if (byName && personRecord(byName)) return "../../people/" + byName + "/";
    if (token && personRecord(token)) return "../../people/" + token + "/";
    // Bulk #title-json pages only run title-boot.js — they never load people-data.js,
    // so getPerson is missing. Still link by slug so cast/crew stay clickable;
    // /people/:slug/ is rewritten to the shared profile shell (see _redirects).
    if (byName) return "../../people/" + byName + "/";
    if (token) return "../../people/" + token + "/";
    return "";
  }

  function personLink(name) {
    var label = name;
    if (name && typeof name === "object") {
      label = name.name || name.actor || name.person || "";
    }
    if (!label) return "—";
    var href = personHref(name);
    if (href) {
      return (
        '<a class="person-link" href="' + href + '">' + escapeHtml(label) + "</a>"
      );
    }
    return escapeHtml(label);
  }

  function castEntries(list) {
    return (list || [])
      .map(function (p) {
        if (typeof p === "string") return { name: p, character: "", photo: "", slug: "" };
        if (!p || typeof p !== "object") return null;
        return {
          name: p.name || p.actor || p.person || "",
          character: p.character || p.role || "",
          photo: p.photo || p.profile || p.image || "",
          slug: p.slug || p.personSlug || ""
        };
      })
      .filter(function (p) {
        return p && p.name;
      });
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
        '<img class="glance-watch-logo" src="' +
        providerAssetUrl(icon) +
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
    if (isSeries && movie.seasons) {
      stats.push({
        label: "Seasons",
        value: String(movie.seasons) + (movie.episodes ? " · " + movie.episodes + " ep" : "")
      });
    } else if (movie.runtime) {
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

    var directorHtml = "";
    if (isSeries && movie.creators && movie.creators.length) {
      directorHtml =
        '<div class="glance-block"><p class="glance-block-label">Creators</p><div class="glance-chips">' +
        movie.creators
          .slice(0, 3)
          .map(function (c) {
            return (
              '<span class="glance-chip accent">' + personLink(c) + "</span>"
            );
          })
          .join("") +
        "</div></div>";
    } else if (movie.director) {
      var directorNames = String(movie.director)
        .split(/\s*,\s*/)
        .map(function (name) { return name.trim(); })
        .filter(Boolean)
        .slice(0, 3);
      directorHtml =
        '<div class="glance-block"><p class="glance-block-label">' +
        (directorNames.length > 1 ? "Directors" : "Director") +
        '</p><div class="glance-chips">' +
        directorNames
          .map(function (name) {
            return '<span class="glance-chip accent">' + personLink(name) + "</span>";
          })
          .join("") +
        "</div></div>";
    }

    var cast = castEntries(movie.cast).slice(0, 4);
    var castHtml = "";
    if (cast.length) {
      castHtml =
        '<div class="glance-block"><p class="glance-block-label">Key cast</p><div class="glance-cast">' +
        cast
          .map(function (p) {
            var initial = (p.name || "?").charAt(0).toUpperCase();
            var photo = p.photo
              ? '<img class="glance-cast-dot" src="' +
                escapeHtml(p.photo) +
                '" alt="" width="22" height="22" loading="lazy" />'
              : '<span class="glance-cast-dot" aria-hidden="true">' +
                escapeHtml(initial) +
                "</span>";
            var label = escapeHtml(p.name || "");
            var href = personHref(p.name, p.slug);
            if (href) {
              return (
                '<a class="glance-cast-chip" href="' +
                href +
                '">' +
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
          escapeHtml(r.source || "WhereToWatchFree Editorial") +
          "</p>" +
          "</article>"
        );
      })
      .join("");
    section.hidden = false;
  }

  const PROVIDER_ICONS = {
    netflix: "netflix.svg",
    hulu: "hulu.svg",
    "disney-plus": "disney-plus.svg",
    max: "max.svg",
    peacock: "peacock.svg",
    "paramount-plus": "paramount-plus.svg",
    amazon: "amazon-prime.svg",
    "amazon-prime": "amazon-prime.svg",
    apple: "apple.svg",
    tubi: "tubi.svg",
    pluto: "pluto.svg",
    plex: "plex.svg",
    theaters: "theaters.svg",
    tmdb: "tmdb.svg",
    imax: "imax.svg"
  };

  function providerAssetUrl(filename) {
    // Movie pages live at /movies/<slug>/
    return "../../assets/providers/" + filename;
  }

  function providerLogo(p) {
    const icon = PROVIDER_ICONS[p.id];
    if (icon) {
      return (
        '<img class="watch-logo" src="' +
        providerAssetUrl(icon) +
        '" alt="" width="28" height="28" loading="lazy" />'
      );
    }
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


  function setWatchSeoCopy(watch) {
    var heading = document.getElementById("watch-heading");
    var intro = document.getElementById("watch-intro");
    var free = (watch && watch.free) || [];
    var paid = (watch && watch.paid) || [];
    if (Array.isArray(watch)) {
      free = [];
      paid = watch;
    }
    var freeNames = free.map(function (p) { return p.label || p.id; }).filter(Boolean);
    var paidNames = paid
      .map(function (p) { return p.label || p.id; })
      .filter(function (n) { return n && !/theater|imax/i.test(n); });
    if (heading) {
      heading.textContent = freeNames.length
        ? "Watch online free & where to stream"
        : "Where to watch online";
    }
    if (intro) {
      if (freeNames.length) {
        intro.textContent =
          "Legal free-with-ads options to check for " +
          (movie.title || "this title") +
          ": " +
          freeNames.join(", ") +
          ". Availability varies by region — we only list legitimate platforms, never piracy or illegal downloads." +
          (paidNames.length ? " Also stream on " + paidNames.slice(0, 4).join(", ") + "." : "");
      } else if (paidNames.length) {
        intro.textContent =
          "Where to watch " +
          (movie.title || "this title") +
          " online on legal services such as " +
          paidNames.slice(0, 4).join(", ") +
          ". Availability varies by region.";
      } else {
        intro.textContent =
          "Streaming availability varies by region. Check legal platforms linked below.";
      }
    }
  }

  function renderWatch(watch) {
    const el = document.getElementById("watch");
    if (!el) return;
    setWatchSeoCopy(watch);
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
    poster.src =
      movie.poster ||
      "data:image/svg+xml," +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450"><rect fill="#122536" width="100%" height="100%"/><text x="50%" y="50%" fill="#F4F0E6" text-anchor="middle" font-family="sans-serif" font-size="18">No poster</text></svg>'
        );
    poster.alt = (movie.title || "Title") + " poster";
  }
  const set = function (id, v) {
    const el = document.getElementById(id);
    if (el) el.textContent = v;
  };
  set("title", movie.title);
  set(
    "tagline",
    movie.tagline ||
      (isSeries
        ? ((movie.creators && movie.creators[0]) || movie.network || "Series") +
          " · " +
          movie.year
        : (movie.director || "") + " · " + movie.year)
  );
  set("overview", movie.overview);
  set("overviewShort", movie.overview);

  const chips = document.getElementById("chips");
  if (chips) {
    const items = [
      movie.year,
      movie.rating,
      isSeries
        ? (movie.seasons ? movie.seasons + " season" + (movie.seasons > 1 ? "s" : "") : null)
        : hoursMinutes(movie.runtime),
      isSeries && movie.network ? movie.network : null,
      isSeries ? "TV Series" : null
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
    const initial = (p.name || "?").charAt(0).toUpperCase();
    const fallbackSvg =
      "data:image/svg+xml," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect fill="#1a1f2b" width="100%" height="100%"/><text x="50%" y="54%" fill="#e8b86d" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="32" font-weight="700">' +
          initial +
          "</text></svg>"
      );
    const photo = p.photo || fallbackSvg;
    const href = personHref(p.name, p.slug);
    const inner =
      '<img class="cast-photo" src="' +
      escapeHtml(photo) +
      '" alt="" width="90" height="90" loading="lazy" onerror="this.onerror=null;this.src=\'' +
      fallbackSvg +
      '\'" />' +
      '<div class="cast-meta"><div class="name">' +
      escapeHtml(p.name) +
      '</div><div class="role">' +
      escapeHtml(p.character || "—") +
      "</div></div>";
    if (href) {
      return (
        '<a class="cast-card cast-card-link" href="' +
        href +
        '">' +
        inner +
        "</a>"
      );
    }
    return '<div class="cast-card">' + inner + "</div>";
  }

  const cast = document.getElementById("cast");
  if (cast) {
    var castHtml = castEntries(movie.cast).map(castCardHtml).join("");
    cast.innerHTML = castHtml;
    if (!castHtml && cast.parentElement) cast.parentElement.hidden = true;
  }

  function resolveTitle(s) {
    if (ReelIndex.getSeries && ReelIndex.getSeries(s)) {
      return { item: ReelIndex.getSeries(s), href: "../../series/" + s + "/" };
    }
    if (ReelIndex.getMovie(s)) {
      return { item: ReelIndex.getMovie(s), href: "../../movies/" + s + "/" };
    }
    return null;
  }

  function renderRelated(slugs) {
    const section = document.getElementById("related-section");
    const grid = document.getElementById("related");
    if (!section || !grid) return;
    const list = (slugs || [])
      .map(function (s) {
        return s && s !== movie.slug ? resolveTitle(s) : null;
      })
      .filter(Boolean);
    if (!list.length) {
      section.hidden = true;
      return;
    }
    grid.innerHTML = list
      .map(function (entry) {
        const m = entry.item;
        return (
          '<a class="card related-card" href="' +
          entry.href +
          '">' +
          '<img class="card-poster" src="' +
          m.poster +
          '" alt="' +
          m.title +
          ' poster" loading="lazy" />' +
          '<div class="card-body"><div class="card-title">' +
          m.title +
          '</div><div class="card-meta">' +
          (m.year || "") +
          (m.seasons ? " · Series" : "") +
          "</div></div></a>"
        );
      })
      .join("");
    section.hidden = false;
  }

  renderRelated(movie.related);

  const crew = document.getElementById("crew");
  if (crew) {
    if (isSeries) {
      const creators = (movie.creators || []).map(personLink).join(", ") || "—";
      const seriesProducers = (movie.producers || []).map(personLink).join(", ");
      crew.innerHTML =
        "<p><strong>Creators:</strong> " +
        creators +
        "</p>" +
        (seriesProducers
          ? "<p><strong>Producers:</strong> " + seriesProducers + "</p>"
          : "") +
        "<p><strong>Network:</strong> " +
        (movie.network || "—") +
        "</p>" +
        "<p><strong>Seasons:</strong> " +
        (movie.seasons || "—") +
        (movie.episodes ? " (" + movie.episodes + " episodes)" : "") +
        "</p>" +
        "<p><strong>First aired:</strong> " +
        (movie.firstAirDate || movie.year || "—") +
        "</p>";
      var crewHeading = crew.previousElementSibling;
      if (crewHeading && crewHeading.tagName === "H2") {
        crewHeading.textContent = "Creators & Details";
      }
    } else {
      const writers = (movie.writers || []).map(personLink).join(", ") || "—";
      const producers = (movie.producers || []).map(personLink).join(", ") || "—";
      const directorNames = movie.director
        ? String(movie.director).split(/\s*,\s*/).map(function (name) { return name.trim(); }).filter(Boolean)
        : [];
      crew.innerHTML =
        "<p><strong>Director:</strong> " +
        (directorNames.map(personLink).join(", ") || "—") +
        "</p>" +
        "<p><strong>Writers:</strong> " +
        writers +
        "</p>" +
        "<p><strong>Producers:</strong> " +
        producers +
        "</p>" +
        "<p><strong>Executive Producer:</strong> " +
        (movie.executiveProducer
          ? String(movie.executiveProducer).split(/\s*,\s*/).map(personLink).join(", ")
          : "—") +
        "</p>";
    }
  }

  renderWatch(movie.watch);

  renderReviews(movie.reviews);

  showTrailer(movie.trailerYouTubeId || null);
})();
