/**
 * Loads data/catalog.json and merges it into window.ReelIndex.
 * Curated records already on MOVIES / SERIES stay as authored
 * (crew, cast, watch, overview). Only an empty poster or backdrop
 * is filled from the bulk catalog.
 * Empty poster/backdrop values are filled from the IMDb id with static
 * MetaHub image URLs (no API key in the browser).
 * Relative paths keep GitHub Pages project sites and Cloudflare Pages working.
 */
(function (global) {
  var R = global.ReelIndex || (global.ReelIndex = {});
  var METAHUB = "https://images.metahub.space";

  function fillArtwork(item) {
    if (!item || !item.imdbId) return;
    var id = String(item.imdbId);
    if (id.indexOf("tt") !== 0) return;
    if (!item.poster) item.poster = METAHUB + "/poster/medium/" + id + "/img";
    if (!item.backdrop) item.backdrop = METAHUB + "/background/medium/" + id + "/img";
  }

  function prefixFromScript() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute("src") || "";
      var m = src.match(/^(.*)js\/catalog-loader\.js(?:\?.*)?$/);
      if (m) return m[1] === "" ? "./" : m[1];
    }
    return "./";
  }

  function merge(list, bucket) {
    var map = R[bucket] || (R[bucket] = {});
    (list || []).forEach(function (item) {
      if (!item || !item.slug) return;
      fillArtwork(item);
      var existing = map[item.slug];
      if (existing) {
        fillArtwork(existing);
        if (!existing.poster && item.poster) existing.poster = item.poster;
        if (!existing.backdrop && item.backdrop) existing.backdrop = item.backdrop;
        return;
      }
      map[item.slug] = item;
    });
  }

  var url = prefixFromScript() + "data/catalog.json";
  R.whenCatalog = fetch(url)
    .then(function (res) {
      if (!res.ok) throw new Error("Catalog failed to load (" + res.status + ")");
      return res.json();
    })
    .then(function (data) {
      merge(data && data.movies, "MOVIES");
      merge(data && data.series, "SERIES");
      R.CATALOG_META = {
        generated: data && data.generated,
        source: data && data.source,
        movies: data && data.movies ? data.movies.length : 0,
        series: data && data.series ? data.series.length : 0
      };
      return data;
    })
    .catch(function (err) {
      R.CATALOG_ERROR = String((err && err.message) || err);
      return null;
    });
})(typeof window !== "undefined" ? window : globalThis);
