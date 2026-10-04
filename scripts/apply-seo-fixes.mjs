/**
 * One-shot HTML pass for the SEO fixes:
 *   - title overview, poster alt/src, word-boundary meta descriptions
 *   - home / what's on / trending first-screen links and movie pagination
 *   - thin people noindex (authored bios stay indexable) and sitemap
 *   - search index used by functions/_middleware.js
 *
 *   node scripts/apply-seo-fixes.mjs
 */
import fs from "fs";
import path from "path";
import { createContext, runInContext } from "vm";
import { fileURLToPath } from "url";
import { clipMeta } from "./seo-text.mjs";
import { renderSearchPage } from "../functions/search-render.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://wheretowatchfree.com";
const PAGE_SIZE = 48;
const TITLE_JSON_RE = /<script type="application\/json" id="title-json">(.*?)<\/script>/s;

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function unescapeHtml(value) {
  return String(value || "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function loadReel() {
  const ctx = {};
  ctx.window = ctx;
  ctx.globalThis = ctx;
  const sandbox = createContext(ctx);
  for (const file of ["js/data.js", "js/series-data.js", "js/trending-data.js", "js/people-data.js"]) {
    runInContext(fs.readFileSync(path.join(root, file), "utf8"), sandbox, { filename: file });
  }
  const reel = ctx.ReelIndex;
  const catalog = JSON.parse(fs.readFileSync(path.join(root, "data", "catalog.json"), "utf8"));

  function fillArtwork(item) {
    if (!item || !item.imdbId) return;
    const id = String(item.imdbId);
    if (id.indexOf("tt") !== 0) return;
    if (!item.poster) item.poster = "https://images.metahub.space/poster/medium/" + id + "/img";
    if (!item.backdrop) item.backdrop = "https://images.metahub.space/background/medium/" + id + "/img";
  }

  function merge(list, bucket) {
    const map = reel[bucket] || (reel[bucket] = {});
    (list || []).forEach(function (item) {
      if (!item || !item.slug) return;
      fillArtwork(item);
      const existing = map[item.slug];
      if (existing) {
        fillArtwork(existing);
        if (!existing.poster && item.poster) existing.poster = item.poster;
        if (!existing.backdrop && item.backdrop) existing.backdrop = item.backdrop;
        return;
      }
      map[item.slug] = item;
    });
  }

  merge(catalog.movies, "MOVIES");
  merge(catalog.series, "SERIES");
  return reel;
}

function hasTheatersWatch(item) {
  if (!item || !item.watch || !item.watch.paid) return false;
  return item.watch.paid.some(function (provider) {
    return provider && (provider.id === "theaters" || /theater/i.test(provider.label || ""));
  });
}

function haystack(item, kind) {
  const theater = item.inTheaters || hasTheatersWatch(item);
  return [
    item.title,
    item.year,
    (item.genres || []).join(" "),
    kind === "series" ? "series tv show" : "movie film",
    theater ? "theaters theater" : "",
  ]
    .join(" ")
    .toLowerCase();
}

function moviesSorted(reel) {
  return reel.listMovies().slice().sort(function (a, b) {
    return String(b.releaseDate || b.year || "").localeCompare(String(a.releaseDate || a.year || ""));
  });
}

function seriesSorted(reel) {
  return reel.listSeries().slice().sort(function (a, b) {
    const date = String(b.firstAirDate || b.year || "").localeCompare(String(a.firstAirDate || a.year || ""));
    if (date) return date;
    return Number(b.voteAverage || 0) - Number(a.voteAverage || 0);
  });
}

function hasFree(item) {
  const watch = item && item.watch;
  if (!watch || Array.isArray(watch)) return false;
  return !!(watch.free && watch.free.length);
}

function sortDate(a, b) {
  return String(b.releaseDate || b.firstAirDate || b.year || "").localeCompare(
    String(a.releaseDate || a.firstAirDate || a.year || "")
  );
}

function sortScore(a, b) {
  return Number(b.voteAverage || 0) - Number(a.voteAverage || 0);
}

function movieCard(item, prefix) {
  const href = prefix + "movies/" + item.slug + "/";
  const meta =
    escapeHtml(item.year || "") +
    (item.rating ? " · " + escapeHtml(item.rating) : "") +
    " · ★ " +
    Number(item.voteAverage || 0).toFixed(1);
  return (
    '<a class="card" href="' +
    href +
    '">' +
    (item.poster
      ? '<img class="card-poster" src="' +
        escapeHtml(item.poster) +
        '" alt="' +
        escapeHtml(item.title) +
        ' poster" width="300" height="450" />'
      : "") +
    '<div class="card-body"><h2 class="card-title">' +
    escapeHtml(item.title) +
    "</h2><div class=\"card-meta\">" +
    meta +
    "</div></div></a>"
  );
}

function railCard(item, prefix) {
  const kind = item._kind === "series" ? "series" : "movies";
  const href = item._href || prefix + kind + "/" + item.slug + "/";
  const badge = item._label || (item._kind === "series" ? "Series" : "Movie");
  const mod = item._badgeMod || item._kind || "movie";
  return (
    '<a class="card rail-card" href="' +
    href +
    '">' +
    '<span class="type-badge type-badge--' +
    escapeHtml(mod) +
    '">' +
    escapeHtml(badge) +
    "</span>" +
    (item.poster
      ? '<img class="card-poster" src="' +
        escapeHtml(item.poster) +
        '" alt="' +
        escapeHtml(item.title) +
        ' poster" width="300" height="450" />'
      : "") +
    '<div class="card-body"><h3 class="card-title">' +
    escapeHtml(item.title) +
    "</h3><div class=\"card-meta\">" +
    escapeHtml(item.year || "") +
    " · ★ " +
    Number(item.voteAverage || 0).toFixed(1) +
    "</div></div></a>"
  );
}

function withKind(item, kind, prefix) {
  const copy = Object.assign({}, item, {
    _kind: kind,
    _href: prefix + (kind === "series" ? "series/" : "movies/") + item.slug + "/",
  });
  return copy;
}

function setElementInner(html, id, inner) {
  const openRe = new RegExp('<div\\b[^>]*\\bid="' + id + '"[^>]*>');
  const match = openRe.exec(html);
  if (!match) throw new Error("missing #" + id);
  let index = match.index + match[0].length;
  let depth = 1;
  while (index < html.length && depth > 0) {
    const nextOpen = html.indexOf("<div", index);
    const nextClose = html.indexOf("</div>", index);
    if (nextClose < 0) throw new Error("unclosed #" + id);
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      index = nextOpen + 4;
    } else {
      depth -= 1;
      if (depth === 0) {
        return html.slice(0, match.index + match[0].length) + inner + html.slice(nextClose);
      }
      index = nextClose + 6;
    }
  }
  throw new Error("unclosed #" + id);
}

function recordForPage(html, slug, kind, reel) {
  const match = html.match(TITLE_JSON_RE);
  if (match) {
    try {
      return JSON.parse(match[1]);
    } catch (err) {
      /* fall through */
    }
  }
  if (kind === "series" && reel.getSeries) return reel.getSeries(slug);
  if (reel.getMovie) return reel.getMovie(slug);
  return null;
}

function patchTitlePage(html, rec) {
  if (!rec) return { html, metaUpdated: false, overviewUpdated: false };
  const overview = String(rec.overview || "").trim();
  const title = String(rec.title || "Title");
  let next = html;
  let overviewUpdated = false;
  if (overview && /<p id="overview">\s*<\/p>/.test(next)) {
    next = next.replace(
      /<p id="overview">\s*<\/p>/,
      '<p id="overview">' + escapeHtml(overview) + "</p>"
    );
    overviewUpdated = true;
  }
  const alt = escapeHtml(title + " poster");
  const poster = String(rec.poster || "").trim();
  next = next.replace(/<img\b[^>]*\bid="poster"[^>]*>/g, function (tag) {
    let updated = tag;
    if (/\balt="/.test(updated)) {
      if (/\balt=""/.test(updated)) updated = updated.replace(/\balt=""/, 'alt="' + alt + '"');
    } else {
      updated = updated.replace(/<img\b/, '<img alt="' + alt + '"');
    }
    if (poster && !/\bsrc=/.test(updated)) {
      updated = updated.replace(/<img\b/, '<img src="' + escapeHtml(poster) + '"');
    }
    return updated;
  });
  let metaUpdated = false;
  if (overview.length > 155) {
    const mechanical = overview.slice(0, 155);
    const clipped = escapeHtml(clipMeta(overview, 155));
    const metaRe =
      /(<meta\b[^>]*\b(?:name|property)="(?:description|og:description|twitter:description)"[^>]*\bcontent=")([^"]*)(")/g;
    next = next.replace(metaRe, function (full, open, content, close) {
      if (unescapeHtml(content) !== mechanical) return full;
      metaUpdated = true;
      return open + clipped + close;
    });
  }
  return { html: next, metaUpdated, overviewUpdated };
}

function patchTitles(reel) {
  let pages = 0;
  let overviewUpdated = 0;
  let metaUpdated = 0;
  let missing = 0;
  for (const kind of ["movies", "series"]) {
    const base = path.join(root, kind);
    for (const name of fs.readdirSync(base)) {
      const file = path.join(base, name, "index.html");
      if (!fs.existsSync(file)) continue;
      const html = fs.readFileSync(file, "utf8");
      const rec = recordForPage(html, name, kind, reel);
      if (!rec) {
        missing += 1;
        continue;
      }
      const patched = patchTitlePage(html, rec);
      if (patched.html !== html) fs.writeFileSync(file, patched.html);
      pages += 1;
      if (patched.overviewUpdated) overviewUpdated += 1;
      if (patched.metaUpdated) metaUpdated += 1;
    }
  }
  return { pages, overviewUpdated, metaUpdated, missing };
}

function authoredBios(reel) {
  const bios = new Map();
  const people = reel.PEOPLE || {};
  for (const slug of Object.keys(people)) {
    const bio = String((people[slug] && people[slug].biography) || "").trim();
    if (bio) bios.set(slug, bio);
  }
  return bios;
}

function patchPeople(bios) {
  const peopleDir = path.join(root, "people");
  let noindexed = 0;
  let kept = 0;
  let biosFilled = 0;
  const indexable = new Set();
  for (const name of fs.readdirSync(peopleDir)) {
    if (name === "index.html") continue;
    const file = path.join(peopleDir, name, "index.html");
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, "utf8");
    const bio = name === "_profile" ? "" : bios.get(name) || "";
    if (bio) {
      kept += 1;
      indexable.add(name);
      if (/<p class="person-bio" id="person-bio">\s*<\/p>/.test(html)) {
        html = html.replace(
          /<p class="person-bio" id="person-bio">\s*<\/p>/,
          '<p class="person-bio" id="person-bio">' + escapeHtml(bio) + "</p>"
        );
        biosFilled += 1;
      }
    } else if (!/name="robots"/i.test(html)) {
      html = html.replace(
        /<meta name="viewport"[^>]*>/,
        function (tag) {
          return tag + '\n  <meta name="robots" content="noindex, follow" />';
        }
      );
      noindexed += 1;
    } else {
      noindexed += 1;
    }
    const previous = fs.readFileSync(file, "utf8");
    if (previous !== html) fs.writeFileSync(file, html);
  }
  const indexFile = path.join(peopleDir, "index.html");
  let indexHtml = fs.readFileSync(indexFile, "utf8");
  indexHtml = indexHtml.replace(
    "Cast links on title pages stay clickable; anyone without a dedicated shell uses the shared profile fallback.",
    "Cast links on title pages open these shells. A name without a shell has no page."
  );
  fs.writeFileSync(indexFile, indexHtml);
  return { noindexed, kept, biosFilled, indexable };
}

function updateSitemap(indexable, pageCount) {
  const sitemapPath = path.join(root, "sitemap.xml");
  let xml = fs.readFileSync(sitemapPath, "utf8");
  let removed = 0;
  xml = xml.replace(
    /\n  <url><loc>https:\/\/wheretowatchfree\.com\/people\/([^<]+)\/<\/loc><\/url>/g,
    function (full, slug) {
      if (indexable.has(slug)) return full;
      removed += 1;
      return "";
    }
  );
  xml = xml.replace(/\n  <url><loc>https:\/\/wheretowatchfree\.com\/search\/<\/loc><\/url>/g, "");
  const extras = [];
  for (let page = 2; page <= pageCount; page++) extras.push(SITE + "/page/" + page + "/");
  const block = extras
    .filter(function (loc) {
      return xml.indexOf("<loc>" + loc + "</loc>") === -1;
    })
    .map(function (loc) {
      return "  <url><loc>" + loc + "</loc></url>";
    })
    .join("\n");
  if (block) xml = xml.replace("</urlset>", block + "\n</urlset>");
  fs.writeFileSync(sitemapPath, xml.endsWith("\n") ? xml : xml + "\n");
  const locs = xml.match(/<loc>/g) || [];
  const peopleLocs = xml.match(/\/people\//g) || [];
  return { removed, urls: locs.length, peopleUrls: peopleLocs.length };
}

function header(prefix) {
  return `  <header class="site-header">
    <div class="container nav">
      <a class="logo" href="${prefix}" aria-label="WhereToWatchFree"><img class="logo-lockup logo-lockup--dark" src="${prefix}assets/brand/lockup-horizontal-dark.svg" alt="WhereToWatchFree" width="155" height="36" decoding="async" /><img class="logo-lockup logo-lockup--light" src="${prefix}assets/brand/lockup-horizontal-light.svg" alt="WhereToWatchFree" width="155" height="36" decoding="async" /></a>
      <div class="nav-right">
        <nav class="nav-links" aria-label="Primary">
          <a href="${prefix}">Home</a>
          <a href="${prefix}whats-on/">What&rsquo;s On</a>
          <a href="${prefix}trending/">Trending</a>
          <a href="${prefix}series/">Series</a>
          <a href="${prefix}watch-free/">Watch free</a>
        </nav>
        <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle color theme" title="Toggle theme">
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z"/></svg>
        </button>
      </div>
    </div>
  </header>`;
}

function writeMoviePage(page, movies, total) {
  const start = (page - 1) * PAGE_SIZE;
  const slice = movies.slice(start, start + PAGE_SIZE);
  const last = Math.ceil(total / PAGE_SIZE);
  const canonical = SITE + "/page/" + page + "/";
  const prev = page === 2 ? SITE + "/" : SITE + "/page/" + (page - 1) + "/";
  const next = page < last ? SITE + "/page/" + (page + 1) + "/" : "";
  const prevHref = page === 2 ? "../../" : "../" + (page - 1) + "/";
  const nextHref = page < last ? "../" + (page + 1) + "/" : "";
  const cards = slice.map(function (item) {
    return movieCard(item, "../../");
  }).join("\n");
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Latest movies — Page ${page} | WhereToWatchFree</title>
  <meta name="description" content="Page ${page} of movies on WhereToWatchFree, with cast, storylines, and legal where-to-watch guides." />
  <link rel="canonical" href="${canonical}" />
  <link rel="prev" href="${prev}" />${next ? '\n  <link rel="next" href="' + next + '" />' : ""}
  <meta property="og:title" content="Latest movies — Page ${page} | WhereToWatchFree" />
  <meta property="og:url" content="${canonical}" />
  <script src="../../js/theme-boot.js"></script>
  <link rel="stylesheet" href="../../css/styles.css" />
</head>
<body>
${header("../../")}
  <main>
    <section class="hero-home">
      <div class="container">
        <h1>Latest movies</h1>
        <p>Page ${page} of ${last}. Showing ${start + 1}–${start + slice.length} of ${total} movies.</p>
      </div>
    </section>
    <div class="container">
      <h2 class="home-section-title">Latest movies</h2>
      <div id="movie-grid" class="grid">
${cards}
      </div>
      <div class="load-more-row">
        <a class="btn" href="${prevHref}">Previous</a>${nextHref ? '\n        <a class="btn" id="load-more" href="' + nextHref + '">Show more movies</a>' : ""}
      </div>
    </div>
  </main>
  <footer class="site-footer"></footer>
  <script src="../../js/theme.js"></script>
  <script src="../../js/footer.js"></script>
</body>
</html>
`;
  const dir = path.join(root, "page", String(page));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

function writePagination(movies) {
  const total = movies.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const pageRoot = path.join(root, "page");
  fs.mkdirSync(pageRoot, { recursive: true });
  for (const name of fs.readdirSync(pageRoot)) {
    if (/^[0-9]+$/.test(name)) fs.rmSync(path.join(pageRoot, name), { recursive: true, force: true });
  }
  for (let page = 2; page <= pages; page++) writeMoviePage(page, movies, total);
  return pages;
}

function patchHome(reel, movies) {
  const file = path.join(root, "index.html");
  let html = fs.readFileSync(file, "utf8");
  const shown = Math.min(PAGE_SIZE, movies.length);
  html = html.replace(
    "https://wheretowatchfree.com/?q={search_term_string}",
    "https://wheretowatchfree.com/search/?q={search_term_string}"
  );
  html = html.replace(
    'src="assets/brand/lockup-horizontal-light.svg" alt=""',
    'src="assets/brand/lockup-horizontal-light.svg" alt="WhereToWatchFree"'
  );
  html = html.replace(
    /<div class="toolbar">\s*<label class="visually-hidden" for="search">Search movies and series<\/label>\s*<input id="search" type="search" placeholder="Search movies and series, years, genres…" autocomplete="off" \/>\s*<\/div>/,
    `<form class="toolbar" action="/search/" method="get" role="search">
        <label class="visually-hidden" for="search">Search movies and series</label>
        <input id="search" name="q" type="search" placeholder="Search movies and series, years, genres…" autocomplete="off" />
        <button class="btn" type="submit">Search</button>
      </form>`
  );
  html = html.replace(
    /<p id="search-status" class="search-status" role="status">[^<]*<\/p>/,
    '<p id="search-status" class="search-status" role="status">Showing ' +
      shown +
      " of " +
      movies.length +
      " movies. Search also covers series.</p>"
  );
  const trending = reel.listTrending("./").slice(0, 10).map(function (item) {
    return railCard(item, "./");
  }).join("");
  const series = seriesSorted(reel).slice(0, 12).map(function (item) {
    const copy = withKind(item, "series", "");
    copy._label = item.kind === "web-series" ? "Web series" : "Series";
    copy._badgeMod = "series";
    copy._kind = "series";
    return railCard(copy, "");
  }).join("");
  html = setElementInner(html, "trending-rail", trending);
  html = setElementInner(html, "series-rail", series);
  html = setElementInner(
    html,
    "movie-grid",
    movies.slice(0, PAGE_SIZE).map(function (item) {
      return movieCard(item, "");
    }).join("")
  );
  html = html.replace(
    /<button type="button" class="btn" id="load-more">Show more movies<\/button>/,
    '<a class="btn" id="load-more" href="page/2/">Show more movies</a>'
  );
  if (!html.includes('href="page/2/"')) {
    throw new Error("home load-more link missing");
  }
  fs.writeFileSync(file, html);
}

function patchWhatsOn(reel) {
  const file = path.join(root, "whats-on", "index.html");
  let html = fs.readFileSync(file, "utf8");
  const prefix = "../";
  const movies = reel.listMovies().map(function (item) {
    return withKind(item, "movie", prefix);
  });
  const series = reel.listSeries().map(function (item) {
    return withKind(item, "series", prefix);
  });
  const catalog = movies.concat(series);
  const trending = reel.listTrending(prefix).slice(0, 10);
  const freeList = catalog.filter(hasFree).sort(sortScore).slice(0, 12);
  const newList = catalog.slice().sort(sortDate).slice(0, 10);
  const topList = catalog.slice().sort(sortScore).slice(0, 10);
  function decorate(item) {
    if (item._label) return item;
    const copy = Object.assign({}, item);
    if (copy._kind === "series") {
      copy._label = copy.kind === "web-series" ? "Web series" : "Series";
      copy._badgeMod = "series";
    } else if (hasTheatersWatch(copy) || copy.inTheaters) {
      copy._label = "In theaters";
      copy._badgeMod = "theater";
      copy._kind = "theater";
    } else {
      copy._label = "Movie";
      copy._badgeMod = "movie";
    }
    return copy;
  }
  html = setElementInner(html, "rail-trending", trending.map(function (item) {
    return railCard(item, prefix);
  }).join(""));
  html = setElementInner(html, "rail-free", freeList.map(decorate).map(function (item) {
    return railCard(item, prefix);
  }).join(""));
  html = setElementInner(html, "rail-new", newList.map(decorate).map(function (item) {
    return railCard(item, prefix);
  }).join(""));
  html = setElementInner(html, "rail-top", topList.map(decorate).map(function (item) {
    return railCard(item, prefix);
  }).join(""));
  fs.writeFileSync(file, html);
  return { trending: trending.length, free: freeList.length, fresh: newList.length, top: topList.length };
}

function patchTrending(reel) {
  const file = path.join(root, "trending", "index.html");
  let html = fs.readFileSync(file, "utf8");
  const list = reel.listTrending("../");
  html = setElementInner(
    html,
    "trending-grid",
    list.map(function (item) {
      const card = railCard(item, "../").replace("<h3 ", "<h2 ").replace("</h3>", "</h2>");
      return card.replace(' class="card rail-card"', ' class="card"');
    }).join("")
  );
  fs.writeFileSync(file, html);
  return list.length;
}

function writeSearchIndex(reel) {
  const titles = [];
  reel.listMovies().forEach(function (item) {
    if (!item || !item.slug) return;
    titles.push({
      s: item.slug,
      t: item.title || item.slug,
      y: String(item.year || ""),
      k: "movie",
      h: haystack(item, "movie"),
      p: item.poster || "",
    });
  });
  reel.listSeries().forEach(function (item) {
    if (!item || !item.slug) return;
    titles.push({
      s: item.slug,
      t: item.title || item.slug,
      y: String(item.year || ""),
      k: "series",
      h: haystack(item, "series"),
      p: item.poster || "",
    });
  });
  const json = JSON.stringify(titles);
  fs.writeFileSync(path.join(root, "data", "search-index.json"), json);
  fs.writeFileSync(
    path.join(root, "functions", "search-index.mjs"),
    "export default " + json + ";\n"
  );
  fs.mkdirSync(path.join(root, "search"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "search", "index.html"),
    renderSearchPage({ query: "", titles })
  );
  return titles.length;
}

const reel = loadReel();
const movies = moviesSorted(reel);
const titles = patchTitles(reel);
const bios = authoredBios(reel);
const people = patchPeople(bios);
const pages = writePagination(movies);
patchHome(reel, movies);
const whatsOn = patchWhatsOn(reel);
const trending = patchTrending(reel);
const searchCount = writeSearchIndex(reel);
const sitemap = updateSitemap(people.indexable, pages);

console.log(JSON.stringify({
  titles,
  people: {
    noindexed: people.noindexed,
    indexable: people.kept,
    biosFilled: people.biosFilled,
  },
  moviePages: pages,
  movieCount: movies.length,
  whatsOn,
  trending,
  searchCount,
  sitemap,
}, null, 2));
