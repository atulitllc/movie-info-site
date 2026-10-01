/**
 * Curated “Trending now” mix (movies + series) for hub, homepage rail, What’s On.
 */
(function (global) {
  var ReelIndex = global.ReelIndex || (global.ReelIndex = {});

  // Popular / recent titles from the existing catalog (order = display order)
  ReelIndex.TRENDING_SLUGS = [
    { slug: "the-odyssey", type: "movie" },
    { slug: "stranger-things", type: "series" },
    { slug: "the-last-of-us", type: "series" },
    { slug: "dune-part-two", type: "movie" },
    { slug: "severance", type: "series" },
    { slug: "arcane", type: "series" },
    { slug: "oppenheimer", type: "movie" },
    { slug: "the-boys", type: "series" },
    { slug: "wednesday", type: "series" },
    { slug: "squid-game", type: "series" },
    { slug: "barbie", type: "movie" },
    { slug: "spider-man-across-the-spider-verse", type: "movie" },
    { slug: "house-of-the-dragon", type: "series" },
    { slug: "interstellar", type: "movie" },
    { slug: "the-bear", type: "series" },
    { slug: "avatar-the-way-of-water", type: "movie" }
  ];

  /**
   * @param {string} prefix Path prefix to site root, e.g. "./", "../", "../../"
   * @returns {Array<object>} Resolved catalog items with _kind and _href
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
      if (entry.type === "series") {
        item = bySeries[entry.slug];
        if (!item) return null;
        return Object.assign({}, item, {
          _kind: "series",
          _href: prefix + "series/" + item.slug + "/"
        });
      }
      item = byMovie[entry.slug];
      if (!item) return null;
      return Object.assign({}, item, {
        _kind: "movie",
        _href: prefix + "movies/" + item.slug + "/"
      });
    }).filter(Boolean);
  };
})(typeof window !== "undefined" ? window : globalThis);
