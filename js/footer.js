(function () {
  function rootPrefix() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute("src") || "";
      var m = src.match(/^(.*)js\/footer\.js(?:\?.*)?$/);
      if (m) return m[1] === "" ? "./" : m[1];
    }
    var logo = document.querySelector("a.logo");
    if (logo) {
      var href = logo.getAttribute("href") || "./";
      return href;
    }
    return "./";
  }

  function build(prefix) {
    var year = new Date().getFullYear();
    return (
      '<div class="container footer-inner">' +
        '<div class="footer-brand">' +
          '<a class="footer-logo" href="' + prefix + '" aria-label="WhereToWatchFree">' +
            '<img class="logo-lockup logo-lockup--dark" src="' + prefix + 'assets/brand/lockup-horizontal-dark.svg" alt="WhereToWatchFree" width="155" height="36" decoding="async" />' +
            '<img class="logo-lockup logo-lockup--light" src="' + prefix + 'assets/brand/lockup-horizontal-light.svg" alt="WhereToWatchFree" width="155" height="36" decoding="async" />' +
          "</a>" +
          '<p class="footer-tagline">Browse movies &amp; series. Find where to watch online — legally, including free-with-ads.</p>' +
          '<p class="footer-copy">&copy; ' + year + " WhereToWatchFree</p>" +
        "</div>" +
        '<div class="footer-cols">' +
          '<nav class="footer-col" aria-label="Browse">' +
            "<h3>Browse</h3>" +
            '<ul>' +
              '<li><a href="' + prefix + '">Home</a></li>' +
              '<li><a href="' + prefix + 'whats-on/">What&rsquo;s On</a></li>' +
              '<li><a href="' + prefix + 'trending/">Trending</a></li>' +
              '<li><a href="' + prefix + 'series/">Series</a></li>' +
              '<li><a href="' + prefix + 'watch-free/">Watch free</a></li>' +
              '<li><a href="' + prefix + 'people/">People</a></li>' +
              '<li><a href="' + prefix + '#movie-grid">Movies</a></li>' +
            "</ul>" +
          "</nav>" +
          '<nav class="footer-col" aria-label="Explore">' +
            "<h3>Explore</h3>" +
            "<ul>" +
              '<li><a href="' + prefix + 'movies/inception/">Inception</a></li>' +
              '<li><a href="' + prefix + 'movies/oppenheimer/">Oppenheimer</a></li>' +
              '<li><a href="' + prefix + 'movies/dune-part-two/">Dune: Part Two</a></li>' +
              '<li><a href="' + prefix + 'series/breaking-bad/">Breaking Bad</a></li>' +
              '<li><a href="' + prefix + 'series/stranger-things/">Stranger Things</a></li>' +
              '<li><a href="' + prefix + 'series/the-last-of-us/">The Last of Us</a></li>' +
            "</ul>" +
          "</nav>" +
          '<div class="footer-col footer-legal">' +
            "<h3>Legal / About</h3>" +
            "<ul>" +
              '<li><a href="' + prefix + 'about/">About</a></li>' +
            "</ul>" +
            '<p class="footer-note">Legal streaming guides only. Availability varies by region. Not affiliated with Universal or any studio.</p>' +
            '<div class="footer-tmdb">' +
              '<a class="footer-tmdb-logo" href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" title="The Movie Database">' +
                '<img src="' + prefix + 'assets/providers/tmdb.svg" alt="The Movie Database (TMDB)" width="48" height="48" loading="lazy" />' +
              "</a>" +
              '<p class="footer-tmdb-notice">Featured images include material from TMDB. This product is not endorsed or certified by TMDB.</p>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }


  function injectAnalyticsBeacon() {
    if (document.querySelector('script[data-cf-beacon], script[src*="static.cloudflareinsights.com/beacon"]')) {
      return;
    }
    var s = document.createElement("script");
    s.defer = true;
    s.src = "https://static.cloudflareinsights.com/beacon.min.js";
    s.setAttribute("data-cf-beacon", '{"token": "de61c709c93f4eefad90a1a4feea9e71"}');
    document.head.appendChild(s);
  }

  function inject() {
    injectAnalyticsBeacon();
    var prefix = rootPrefix();
    var existing = document.querySelector("footer.site-footer");
    var footer = existing || document.createElement("footer");
    footer.className = "site-footer";
    footer.setAttribute("role", "contentinfo");
    footer.innerHTML = build(prefix);
    if (!existing) {
      var scriptsParent = document.body;
      var firstScript = document.querySelector("body > script");
      if (firstScript) {
        scriptsParent.insertBefore(footer, firstScript);
      } else {
        scriptsParent.appendChild(footer);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
