/**
 * Generated title pages embed one catalog record in #title-json.
 * Registers it (and slim related cards) on window.ReelIndex before detail.js runs.
 */
(function (global) {
  var el = document.getElementById("title-json");
  if (!el) return;
  var rec;
  try {
    rec = JSON.parse(el.textContent);
  } catch (e) {
    return;
  }
  if (!rec || !rec.slug) return;

  var R = global.ReelIndex || (global.ReelIndex = {});

  function put(item) {
    if (!item || !item.slug) return;
    var series = item.mediaType === "series";
    var bucket = series ? "SERIES" : "MOVIES";
    R[bucket] = R[bucket] || {};
    if (!R[bucket][item.slug]) R[bucket][item.slug] = item;
  }

  put(rec);
  (rec.relatedItems || []).forEach(put);

  R.getMovie = function (slug) {
    return (R.MOVIES || {})[slug] || null;
  };
  R.getSeries = function (slug) {
    return (R.SERIES || {})[slug] || null;
  };
})(typeof window !== "undefined" ? window : globalThis);
