(function () {
  function personSlugFromLocation() {
    var path = String(location.pathname || "").replace(/\/+$/, "");
    var parts = path.split("/").filter(Boolean);
    var i = parts.indexOf("people");
    if (i < 0 || !parts[i + 1]) return "";
    var slug = parts[i + 1];
    if (slug === "index.html") return "";
    // Shared shell path (local or direct); allow ?slug= for local http.server.
    if (slug === "_profile") {
      try {
        return new URLSearchParams(location.search).get("slug") || "";
      } catch (e) {
        return "";
      }
    }
    return slug;
  }

  function setMeta(selector, attr, value) {
    if (!value) return;
    var el = document.querySelector(selector);
    if (!el) return;
    if (attr === "text") el.textContent = value;
    else el.setAttribute(attr, value);
  }

  function boot() {
    var slug =
      (document.body && document.body.dataset.personSlug) || personSlugFromLocation();
    if (!slug || !/^[a-z0-9-]+$/.test(slug) || !window.ReelIndex || !ReelIndex.getPerson) {
      var known = document.getElementById("person-known-for");
      if (known) known.innerHTML = '<p class="muted">Person not found.</p>';
      return;
    }
    var person = ReelIndex.getPerson(slug);
    if (!person) {
      var miss = document.getElementById("person-known-for");
      if (miss) miss.innerHTML = '<p class="muted">Person not found.</p>';
      return;
    }

    function escapeHtml(s) {
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    var pageUrl = "https://wheretowatchfree.com/people/" + slug + "/";
    var title = (person.name || slug) + " — Movies & Series | WhereToWatchFree";
    var description =
      person.biography ||
      (person.name || slug) + " — movies and series in the WhereToWatchFree catalog.";
    if (description.length > 160) {
      var cut = description.slice(0, 159);
      var space = cut.lastIndexOf(" ");
      description = (space > 40 ? cut.slice(0, space) : cut).trim() + "…";
    }
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", pageUrl);
    setMeta('meta[property="og:title"]', "content", (person.name || slug) + " | WhereToWatchFree");
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", pageUrl);
    if (person.photo && String(person.photo).indexOf("https://") === 0) {
      var ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement("meta");
        ogImage.setAttribute("property", "og:image");
        document.head.appendChild(ogImage);
      }
      ogImage.setAttribute("content", person.photo);
    }
    setMeta('meta[name="twitter:title"]', "content", (person.name || slug) + " | WhereToWatchFree");
    setMeta('meta[name="twitter:description"]', "content", description);
    if (document.body) document.body.dataset.personSlug = slug;

    var photo = document.getElementById("person-photo");
    if (photo) {
      photo.src = person.photo || ReelIndex.PERSON_PLACEHOLDER || "";
      photo.alt = (person.name || "Person") + " portrait";
    }

    var nameEl = document.getElementById("person-name");
    if (nameEl && person.name) nameEl.textContent = person.name;

    var bioEl = document.getElementById("person-bio");
    if (bioEl) bioEl.textContent = person.biography || "";

    function setFact(id, value) {
      var el = document.getElementById(id);
      if (!el) return;
      var wrap = el.parentElement;
      if (!value) {
        el.textContent = "";
        if (wrap) wrap.hidden = true;
        return;
      }
      el.textContent = value;
      if (wrap) wrap.hidden = false;
    }
    setFact("person-birthday", person.birthday);
    setFact("person-place", person.placeOfBirth);
    var facts = document.querySelector(".person-facts");
    if (facts && !person.birthday && !person.placeOfBirth) facts.hidden = true;

    var known = document.getElementById("person-known-for");
    if (!known) return;
    var heading = known.parentElement && known.parentElement.querySelector("h2");
    if (heading) heading.textContent = "Movies & series";

    var items = person.credits || [];
    if (!items.length) {
      known.innerHTML = '<p class="muted">No titles linked yet.</p>';
      return;
    }

    known.innerHTML = items
      .map(function (m) {
        var kind = m.kind === "series" ? "series" : "movie";
        var titleSlug = String(m.slug || "");
        if (!/^[a-z0-9-]+$/.test(titleSlug)) return "";
        var href = "../../" + (kind === "series" ? "series" : "movies") + "/" + titleSlug + "/";
        var creditTitle = m.title || titleSlug;
        var metaParts = [];
        if (m.year) metaParts.push(String(m.year));
        if (kind === "series") metaParts.push("Series");
        if (m.role) metaParts.push(String(m.role));
        var poster = m.poster || "";
        return (
          '<a class="card person-movie-card" href="' +
          href +
          '">' +
          (poster
            ? '<img class="card-poster" src="' +
              escapeHtml(poster) +
              '" alt="' +
              escapeHtml(creditTitle) +
              ' poster" loading="lazy" />'
            : '<div class="card-poster person-movie-placeholder"></div>') +
          '<div class="card-body"><div class="card-title">' +
          escapeHtml(creditTitle) +
          '</div><div class="card-meta">' +
          escapeHtml(metaParts.join(" · ")) +
          "</div></div></a>"
        );
      })
      .join("");
  }

  // Shared profile shell (+ any leftover per-slug shells) load catalog-loader.js
  // so filmography includes bulk TMDB cast.
  if (window.ReelIndex && ReelIndex.whenCatalog) {
    ReelIndex.whenCatalog.then(boot, boot);
  } else {
    boot();
  }
})();
