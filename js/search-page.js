/**
 * Fills /search/ when the static file is served without the Pages Function
 * (local preview). If the HTML already contains results, leave it alone.
 * Matching matches functions/search-render.mjs (haystack field `h`).
 */
(function () {
  var box = document.getElementById("search-results");
  if (!box) return;
  if (box.querySelector(".card, .search-empty")) return;

  var params;
  try {
    params = new URLSearchParams(window.location.search);
  } catch (e) {
    return;
  }
  var query = (params.get("q") || "").trim();
  var input = document.getElementById("q");
  if (input && query && !input.value) input.value = query;
  if (!query) return;

  var tokens = query.toLowerCase().split(/\s+/).filter(Boolean).slice(0, 12);
  fetch("/data/search-index.json")
    .then(function (res) {
      if (!res.ok) throw new Error("search index");
      return res.json();
    })
    .then(function (titles) {
      var hits = (titles || []).filter(function (item) {
        var hay = String(item.h || "");
        for (var i = 0; i < tokens.length; i++) {
          if (hay.indexOf(tokens[i]) === -1) return false;
        }
        return true;
      });
      hits.sort(function (a, b) {
        var year = String(b.y || "").localeCompare(String(a.y || ""));
        if (year) return year;
        return String(a.t || "").localeCompare(String(b.t || ""));
      });
      var total = hits.length;
      var shown = hits.slice(0, 120);
      var status = document.getElementById("search-status");
      if (!shown.length) {
        if (status) status.textContent = "No titles match “" + query + "”.";
        box.innerHTML =
          '<div class="search-empty"><p>No titles match “' +
          escapeHtml(query) +
          "”.</p></div>";
        return;
      }
      if (status) {
        status.textContent =
          shown.length === total
            ? total + (total === 1 ? " title matches “" : " titles match “") + query + "”."
            : "Showing " + shown.length + " of " + total + " titles for “" + query + "”.";
      }
      box.innerHTML =
        '<div class="grid">' +
        shown
          .map(function (item) {
            var kind = item.k === "series" ? "series" : "movies";
            var href = "/" + kind + "/" + encodeURIComponent(item.s) + "/";
            return (
              '<a class="card" href="' +
              href +
              '"><span class="type-badge">' +
              (item.k === "series" ? "Series" : "Movie") +
              "</span>" +
              (item.p
                ? '<img class="card-poster" src="' +
                  escapeHtml(item.p) +
                  '" alt="' +
                  escapeHtml(item.t) +
                  ' poster" width="300" height="450" />'
                : "") +
              '<div class="card-body"><h2 class="card-title">' +
              escapeHtml(item.t) +
              "</h2><div class=\"card-meta\">" +
              escapeHtml(item.y || "") +
              "</div></div></a>"
            );
          })
          .join("") +
        "</div>";
    })
    .catch(function () {
      var status = document.getElementById("search-status");
      if (status) status.textContent = "Search is unavailable.";
    });

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
