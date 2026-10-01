/**
 * Curated “Trending now” mix (movies, series, in theaters) for hub, homepage rail, What’s On.
 */
(function (global) {
  var ReelIndex = global.ReelIndex || (global.ReelIndex = {});

  // Popular / recent titles from the existing catalog (order = display order)
  // type: "movie" | "series" | "theater" — theater = In theaters badge (still links to movie page)
  ReelIndex.TRENDING_SLUGS = [
    { slug: "the-odyssey", type: "theater" },
    { slug: "stranger-things", type: "series" },
    { slug: "barbie", type: "movie" },
    { slug: "dune-part-two", type: "theater" },
    { slug: "the-last-of-us", type: "series" },
    { slug: "spider-man-across-the-spider-verse", type: "movie" },
    { slug: "oppenheimer", type: "theater" },
    { slug: "severance", type: "series" },
    { slug: "avatar-the-way-of-water", type: "theater" },
    { slug: "arcane", type: "series" },
    { slug: "the-boys", type: "series" },
    { slug: "wednesday", type: "series" },
    { slug: "interstellar", type: "movie" },
    { slug: "squid-game", type: "series" },
    { slug: "house-of-the-dragon", type: "series" },
    { slug: "the-bear", type: "series" }
  ];

  ReelIndex.hasTheatersWatch = function (item) {
    if (!item || !item.watch || !item.watch.paid) return false;
    return item.watch.paid.some(function (p) {
      return p && (p.id === "theaters" || /theater/i.test(p.label || ""));
    });
  };

  /**
   * Human label + CSS modifier for a trending/catalog card.
   * @returns {{ label: string, kind: string, mod: string }}
   */
  ReelIndex.typeBadge = function (item) {
    if (!item) return { label: "Movie", kind: "movie", mod: "movie" };
    if (item._kind === "theater" || item.type === "theater") {
      return { label: "In theaters", kind: "theater", mod: "theater" };
    }
    if (item._kind === "series" || item.type === "series") {
      if (item.kind === "web-series") {
        return { label: "Web series", kind: "series", mod: "series" };
      }
      return { label: "Series", kind: "series", mod: "series" };
    }
    if (ReelIndex.hasTheatersWatch(item)) {
      return { label: "In theaters", kind: "theater", mod: "theater" };
    }
    return { label: "Movie", kind: "movie", mod: "movie" };
  };

  /**
   * @param {string} prefix Path prefix to site root, e.g. "./", "../", "../../"
   * @returns {Array<object>} Resolved catalog items with _kind, _label, _badgeMod, _href
   */
  ReelIndex.listTrending = function (prefix) {
    prefix = prefix == null ? "./" : prefix;
    var movies =
      (ReelIndex.listMovies && ReelIndex.listMovies()) ||
      Object.values(ReelIndex.MOVIES || {});
    var series = ReelIndex.listSeries ? ReelIndex.listSeries() : [];
    var byMovie = {};
    var bySeries = {};
    movies.forEach(function (m) {
      byMovie[m.slug] = m;
    });
    series.forEach(function (s) {
      bySeries[s.slug] = s;
    });

    return ReelIndex.TRENDING_SLUGS.map(function (entry) {
      var item;
      var kind;
      if (entry.type === "series") {
        item = bySeries[entry.slug];
        if (!item) return null;
        kind = "series";
      } else {
        item = byMovie[entry.slug];
        if (!item) return null;
        // Explicit theater type, or auto-detect from catalog theaters watch
        if (entry.type === "theater" || ReelIndex.hasTheatersWatch(item)) {
          kind = "theater";
        } else {
          kind = "movie";
        }
      }
      var resolved = Object.assign({}, item, {
        _kind: kind,
        type: entry.type,
        _href:
          kind === "series"
            ? prefix + "series/" + item.slug + "/"
            : prefix + "movies/" + item.slug + "/"
      });
      var badge = ReelIndex.typeBadge(resolved);
      resolved._label = badge.label;
      resolved._badgeMod = badge.mod;
      return resolved;
    }).filter(Boolean);
  };
})(typeof window !== "undefined" ? window : globalThis);
