/**
 * Lena's WhereToWatchFree HTML fixes:
 *   related-title anchors on every movie and series page
 *   series index pagination in raw HTML
 *   31 template meta descriptions replaced with the visible storyline
 *   /people/ lists only the indexable filmography pages
 *   Movie/TVSeries JSON-LD where a storyline is already in the HTML, no AggregateRating
 *   static /search/ noindex (the function uses the same renderer)
 *
 *   node scripts/apply-lena-seo.mjs
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

const TUBI_MOVIES = [
  "avatar-the-way-of-water",
  "avengers-infinity-war",
  "barbie",
  "blade-runner-2049",
  "dune",
  "dune-part-two",
  "fight-club",
  "forrest-gump",
  "inception",
  "interstellar",
  "oppenheimer",
  "parasite",
  "pulp-fiction",
  "return-of-the-king",
  "spider-man-across-the-spider-verse",
  "star-wars",
  "the-dark-knight",
  "the-matrix",
  "the-odyssey",
  "the-shawshank-redemption",
];
const TUBI_SERIES = ["breaking-bad", "game-of-thrones"];
const DIR_MOVIES = [
  "100-days-love-story",
  "don-t-look-back-in-anger",
  "ee-paata-korinavaaru-nemalipaalem-nundi",
  "gharga",
  "knock-at-the-cabin",
  "zamana",
];
const DIR_SERIES = [
  "bleach-thousand-year-blood-war",
  "monster-2022",
  "steel-ball-run-jojo-s-bizarre-adventure",
];

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
    .replace(/&#x27;/g, "'")
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

  function merge(list, bucket, mediaType) {
    const map = reel[bucket] || (reel[bucket] = {});
    (list || []).forEach(function (item) {
      if (!item || !item.slug) return;
      const existing = map[item.slug];
      if (existing) {
        if (!existing.mediaType) existing.mediaType = mediaType;
        return;
      }
      item.mediaType = item.mediaType || mediaType;
      map[item.slug] = item;
    });
  }

  merge(catalog.movies, "MOVIES", "movie");
  merge(catalog.series, "SERIES", "series");
  return reel;
}

function bySlugMap(reel) {
  const map = new Map();
  reel.listMovies().forEach(function (item) {
    map.set(item.slug, Object.assign({}, item, { mediaType: "movie" }));
  });
  reel.listSeries().forEach(function (item) {
    map.set(item.slug, Object.assign({}, item, { mediaType: "series" }));
  });
  return map;
}

function seriesSorted(reel) {
  return reel.listSeries().slice().sort(function (a, b) {
    const date = String(b.firstAirDate || b.year || "").localeCompare(String(a.firstAirDate || a.year || ""));
    if (date) return date;
    return Number(b.voteAverage || 0) - Number(a.voteAverage || 0);
  });
}

function recordForPage(html, slug, kind, reel) {
  const match = html.match(/<script type="application\/json" id="title-json">(.*?)<\/script>/s);
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

function overviewFrom(html) {
  const match = html.match(/<p id="overview">([\s\S]*?)<\/p>/);
  if (!match) return "";
  return unescapeHtml(match[1]).replace(/\s+/g, " ").trim();
}

function descriptionFrom(html) {
  const match = html.match(/<meta name="description" content="([^"]*)"/);
  return match ? unescapeHtml(match[1]) : "";
}

function templateKind(plain, kind) {
  if (plain.includes("WhereToWatchFree directory")) return "directory";
  if (/with ads on Tubi/i.test(plain)) return "tubi";
  if (kind === "series" && /free on Tubi/i.test(plain)) return "tubi";
  return "";
}

function expectedBucket(kind, slug) {
  if (kind === "movies" && TUBI_MOVIES.includes(slug)) return "tubi";
  if (kind === "series" && TUBI_SERIES.includes(slug)) return "tubi";
  if (kind === "movies" && DIR_MOVIES.includes(slug)) return "directory";
  if (kind === "series" && DIR_SERIES.includes(slug)) return "directory";
  return "";
}

function resolveRelated(rec, bySlug) {
  const seen = new Set([rec.slug]);
  const out = [];
  const raw = []
    .concat(rec.related || [])
    .concat((rec.relatedItems || []).map(function (item) {
      return item && item.slug;
    }));
  for (const slug of raw) {
    const key = typeof slug === "string" ? slug : "";
    if (!key || seen.has(key)) continue;
    const other = bySlug.get(key);
    if (!other) continue;
    seen.add(key);
    out.push(other);
  }
  if (out.length) return out.slice(0, 8);
  const genres = new Set(rec.genres || []);
  const year = Number(rec.year) || 0;
  const mediaType = rec.mediaType === "series" ? "series" : "movie";
  const pool = [];
  for (const other of bySlug.values()) {
    if (other.slug === rec.slug) continue;
    if ((other.mediaType === "series" ? "series" : "movie") !== mediaType) continue;
    const shared = (other.genres || []).some(function (genre) {
      return genres.has(genre);
    })
      ? 0
      : 1;
    pool.push([shared, Math.abs((Number(other.year) || 0) - year), other.slug, other]);
  }
  pool.sort(function (a, b) {
    return a[0] - b[0] || a[1] - b[1] || String(a[2]).localeCompare(String(b[2]));
  });
  return pool.slice(0, 4).map(function (row) {
    return row[3];
  });
}

function relatedCard(item) {
  const kind = item.mediaType === "series" ? "series" : "movies";
  const href = "../../" + kind + "/" + item.slug + "/";
  const title = escapeHtml(item.title || item.slug);
  const year = escapeHtml(item.year || "");
  const poster = item.poster
    ? '<img class="card-poster" src="' +
      escapeHtml(item.poster) +
      '" alt="' +
      title +
      ' poster" loading="lazy" width="300" height="450" />'
    : "";
  return (
    '<a class="card related-card" href="' +
    href +
    '">' +
    poster +
    '<div class="card-body"><div class="card-title">' +
    title +
    '</div><div class="card-meta">' +
    year +
    "</div></div></a>"
  );
}

function relatedSection(items) {
  return (
    '<section class="section" id="related-section">\n        <h2>You might also like</h2>\n        <div class="related-grid" id="related">\n' +
    items.map(relatedCard).join("\n") +
    "\n        </div>\n      </section>"
  );
}

const RELATED_RE = /<section class="section" id="related-section"[^>]*>[\s\S]*?<\/section>/;

function posterFrom(html) {
  const tag = html.match(/<img\b[^>]*\bid="poster"[^>]*>/);
  if (!tag) return "";
  const src = tag[0].match(/\bsrc="([^"]*)"/);
  return src ? unescapeHtml(src[1]) : "";
}

function canonicalFrom(html, fallback) {
  const match = html.match(/<link rel="canonical" href="([^"]+)"/);
  return match ? unescapeHtml(match[1]) : fallback;
}

function applyJsonLd(html, kind, overview, canonical, fallbackName, poster) {
  const type = kind === "series" ? "TVSeries" : "Movie";
  const visible = String(overview || "").replace(/\s+/g, " ").trim();
  const re = /<script type="application\/ld\+json"([^>]*)>([\s\S]*?)<\/script>/;
  const match = html.match(re);
  if (!visible) {
    if (!match) return html;
    try {
      const data = JSON.parse(match[2]);
      delete data.aggregateRating;
      delete data.offers;
      const payload = JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
      const stripped = '<script type="application/ld+json"' + match[1] + ">\n" + payload + "\n  </script>";
      return html.replace(re, function () { return stripped; });
    } catch (err) {
      return html;
    }
  }
  let data = {
    "@context": "https://schema.org",
    "@type": type,
    name: fallbackName,
    url: canonical,
    description: visible,
  };
  let attrs = "";
  if (match) {
    attrs = match[1] || "";
    try {
      const parsed = JSON.parse(match[2]);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) data = parsed;
    } catch (err) {
      data = {
        "@context": "https://schema.org",
        "@type": type,
        name: fallbackName,
        url: canonical,
        description: visible,
      };
    }
  }
  data["@context"] = "https://schema.org";
  if (data["@type"] !== "Movie" && data["@type"] !== "TVSeries") data["@type"] = type;
  if (!data.name) data.name = fallbackName;
  if (!data.url) data.url = canonical;
  data.description = visible;
  delete data.aggregateRating;
  delete data.offers;
  if (!data.image && poster) data.image = poster;
  const payload = JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
  const block = '<script type="application/ld+json"' + attrs + ">\n" + payload + "\n  </script>";
  if (match) return html.replace(re, function () { return block; });
  return html.replace("</head>", function () { return "  " + block + "\n</head>"; });
}

function replaceDescriptions(html, clipped) {
  const value = escapeHtml(clipped);
  return html.replace(
    /(<meta\b[^>]*\b(?:name|property)="(?:description|og:description|twitter:description)"[^>]*\bcontent=")([^"]*)(")/g,
    function (_full, open, _content, close) {
      return open + value + close;
    }
  );
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

function seriesCard(item, href) {
  const badge = item.kind === "web-series" ? "Web series" : "Series";
  const meta =
    escapeHtml(item.year || "") +
    (item.rating ? " · " + escapeHtml(item.rating) : "") +
    " · ★ " +
    Number(item.voteAverage || 0).toFixed(1) +
    (item.seasons ? " · " + escapeHtml(String(item.seasons)) + " seasons" : "");
  const poster = item.poster
    ? '<img class="card-poster" src="' +
      escapeHtml(item.poster) +
      '" alt="' +
      escapeHtml(item.title || item.slug) +
      ' poster" loading="lazy" width="300" height="450" />'
    : "";
  return (
    '<a class="card" href="' +
    href +
    '"><span class="type-badge">' +
    escapeHtml(badge) +
    "</span>" +
    poster +
    '<div class="card-body"><h2 class="card-title">' +
    escapeHtml(item.title || item.slug) +
    '</h2><div class="card-meta">' +
    meta +
    "</div></div></a>"
  );
}

function writeSeriesPage(page, series, total) {
  const start = (page - 1) * PAGE_SIZE;
  const slice = series.slice(start, start + PAGE_SIZE);
  const last = Math.ceil(total / PAGE_SIZE);
  const canonical = SITE + "/series/page/" + page + "/";
  const prev = page === 2 ? SITE + "/series/" : SITE + "/series/page/" + (page - 1) + "/";
  const next = page < last ? SITE + "/series/page/" + (page + 1) + "/" : "";
  const prevHref = page === 2 ? "../../" : "../" + (page - 1) + "/";
  const nextHref = page < last ? "../" + (page + 1) + "/" : "";
  const cards = slice
    .map(function (item) {
      return seriesCard(item, "../../" + item.slug + "/");
    })
    .join("\n");
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>TV &amp; web series — Page ${page} | WhereToWatchFree</title>
  <meta name="description" content="Page ${page} of TV and web series on WhereToWatchFree, with cast, storylines, and legal where-to-watch guides." />
  <link rel="canonical" href="${canonical}" />
  <link rel="prev" href="${prev}" />${next ? '\n  <link rel="next" href="' + next + '" />' : ""}
  <meta property="og:title" content="TV &amp; web series — Page ${page} | WhereToWatchFree" />
  <meta property="og:url" content="${canonical}" />
  <script src="../../../js/theme-boot.js"></script>
  <link rel="stylesheet" href="../../../css/styles.css" />
</head>
<body>
${header("../../../")}
  <main>
    <section class="hero-home">
      <div class="container">
        <h1>TV &amp; web series</h1>
        <p>Page ${page} of ${last}. Showing ${start + 1}–${start + slice.length} of ${total} series.</p>
      </div>
    </section>
    <div class="container">
      <h2 class="home-section-title">All series</h2>
      <div id="series-grid" class="grid">
${cards}
      </div>
      <div class="load-more-row">
        <a class="btn" href="${prevHref}">Previous</a>${nextHref ? '\n        <a class="btn" id="load-more" href="' + nextHref + '">Show more series</a>' : ""}
      </div>
    </div>
  </main>
  <footer class="site-footer"></footer>
  <script src="../../../js/theme.js"></script>
  <script src="../../../js/footer.js"></script>
</body>
</html>
`;
  const dir = path.join(root, "series", "page", String(page));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

function writeSeriesIndex(series) {
  const file = path.join(root, "series", "index.html");
  let html = fs.readFileSync(file, "utf8");
  const total = series.length;
  const last = Math.ceil(total / PAGE_SIZE);
  const slice = series.slice(0, PAGE_SIZE);
  const cards = slice
    .map(function (item) {
      return seriesCard(item, item.slug + "/");
    })
    .join("\n");
  html = setElementInner(html, "series-grid", "\n" + cards + "\n      ");
  const status = "Showing 1–" + slice.length + " of " + total + " series.";
  html = html.replace(
    /<p id="search-status" class="search-status" role="status">[^<]*<\/p>/,
    '<p id="search-status" class="search-status" role="status">' + status + "</p>"
  );
  html = html.replace(
    /<button type="button" class="btn" id="load-more">Show more series<\/button>/,
    '<a class="btn" id="load-more" href="page/2/">Show more series</a>'
  );
  if (last > 1 && !html.includes('rel="next"')) {
    html = html.replace(
      '<link rel="canonical" href="https://wheretowatchfree.com/series/" />',
      '<link rel="canonical" href="https://wheretowatchfree.com/series/" />\n  <link rel="next" href="https://wheretowatchfree.com/series/page/2/" />'
    );
  }
  if (!html.includes('id="load-more" href="page/2/"')) throw new Error("series load-more link missing");
  fs.writeFileSync(file, html);
  return { shown: slice.length, pages: last };
}

function writeSeriesPagination(series) {
  if (bySlugHas(series, "page")) throw new Error("series slug page would collide with /series/page/");
  const total = series.length;
  const pages = Math.ceil(total / PAGE_SIZE);
  const pageRoot = path.join(root, "series", "page");
  fs.mkdirSync(pageRoot, { recursive: true });
  for (const name of fs.readdirSync(pageRoot)) {
    if (/^[0-9]+$/.test(name) && Number(name) === 1) fs.rmSync(path.join(pageRoot, name), { recursive: true, force: true });
    if (/^[0-9]+$/.test(name) && Number(name) > pages) fs.rmSync(path.join(pageRoot, name), { recursive: true, force: true });
  }
  for (let page = 2; page <= pages; page++) writeSeriesPage(page, series, total);
  const index = writeSeriesIndex(series);
  return { pages, shown: index.shown, total };
}

function bySlugHas(series, slug) {
  return series.some(function (item) {
    return item.slug === slug;
  });
}

function updateSitemap(seriesPages) {
  const sitemapPath = path.join(root, "sitemap.xml");
  let xml = fs.readFileSync(sitemapPath, "utf8");
  xml = xml.replace(/\n  <url><loc>https:\/\/wheretowatchfree\.com\/search\/<\/loc><\/url>/g, "");
  xml = xml.replace(/\n  <url><loc>https:\/\/wheretowatchfree\.com\/series\/page\/\d+\/<\/loc><\/url>/g, "");
  const locs = [];
  for (let page = 2; page <= seriesPages; page++) locs.push(SITE + "/series/page/" + page + "/");
  const block = locs
    .map(function (loc) {
      return "  <url><loc>" + loc + "</loc></url>";
    })
    .join("\n");
  if (!xml.includes("</urlset>")) throw new Error("sitemap missing urlset");
  xml = xml.replace("</urlset>", block + "\n</urlset>\n");
  fs.writeFileSync(sitemapPath, xml);
}

function writePeopleIndex() {
  const peopleDir = path.join(root, "people");
  const rows = [];
  for (const name of fs.readdirSync(peopleDir)) {
    if (name === "index.html" || name === "_profile") continue;
    const file = path.join(peopleDir, name, "index.html");
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, "utf8");
    if (/noindex/i.test(html)) continue;
    if (!html.includes('class="card person-movie-card"')) continue;
    const h1 = html.match(/<h1 id="person-name">([^<]*)<\/h1>/);
    rows.push({ slug: name, name: h1 ? unescapeHtml(h1[1]) : name });
  }
  rows.sort(function (a, b) {
    return a.name.localeCompare(b.name) || a.slug.localeCompare(b.slug);
  });
  if (rows.length !== 11) {
    throw new Error("expected 11 filmography pages, found " + rows.map(function (row) { return row.slug; }).join(","));
  }
  const links = rows
    .map(function (row) {
      return '        <li><a href="./' + escapeHtml(row.slug) + '/">' + escapeHtml(row.name) + "</a></li>";
    })
    .join("\n");
  const indexFile = path.join(peopleDir, "index.html");
  let html = fs.readFileSync(indexFile, "utf8");
  html = html.replace(
    /Browse cast and crew pages in the WhereToWatchFree catalog\./g,
    "Featured cast and crew with filmography on WhereToWatchFree."
  );
  html = html.replace(
    /<p class="muted">[\s\S]*?<\/p>/,
    '<p class="muted">' +
      rows.length +
      " featured cast and crew pages with filmography. Other cast and crew pages are not listed here.</p>"
  );
  if (!/<ul class="people-index-list"[\s\S]*?<\/ul>/.test(html)) throw new Error("people index list missing");
  const listHtml =
    '<ul class="people-index-list" style="columns:2;gap:2rem;list-style:disc;padding-left:1.25rem">\n' +
    links +
    "\n        </ul>";
  html = html.replace(/<ul class="people-index-list"[\s\S]*?<\/ul>/, function () { return listHtml; });
  if (/<meta name="robots"[^>]*noindex/i.test(html)) throw new Error("people index became noindex");
  fs.writeFileSync(indexFile, html);
  return rows.map(function (row) {
    return row.slug;
  });
}

function patchTitles(reel, bySlug) {
  const seen = new Set();
  let pages = 0;
  let relatedFilled = 0;
  let jsonLd = 0;
  let metas = 0;
  const unexpected = [];
  for (const kind of ["movies", "series"]) {
    const base = path.join(root, kind);
    for (const name of fs.readdirSync(base)) {
      const file = path.join(base, name, "index.html");
      if (!fs.existsSync(file)) continue;
      let html = fs.readFileSync(file, "utf8");
      if (!html.includes('id="overview"')) continue;
      const rec = recordForPage(html, name, kind, reel) || {
        slug: name,
        title: name,
        mediaType: kind === "series" ? "series" : "movie",
        related: [],
      };
      rec.slug = rec.slug || name;
      rec.mediaType = kind === "series" ? "series" : "movie";
      const overview = overviewFrom(html);
      const bucket = expectedBucket(kind, name);
      const found = templateKind(descriptionFrom(html), kind);
      if (found && found !== bucket) unexpected.push(kind + "/" + name + ":" + found);
      if (bucket) {
        if (!overview) throw new Error("template page missing storyline " + kind + "/" + name);
        html = replaceDescriptions(html, clipMeta(overview));
        if (descriptionFrom(html) !== clipMeta(overview)) {
          throw new Error("meta was not the storyline " + kind + "/" + name);
        }
        if (bucket === "tubi" && /Tubi/.test(descriptionFrom(html))) {
          throw new Error("tubi line remained " + kind + "/" + name);
        }
        seen.add(kind + "/" + name);
        metas += 1;
      }
      const related = resolveRelated(rec, bySlug);
      if (!related.length) throw new Error("no related titles for " + kind + "/" + name);
      const section = relatedSection(related);
      if (RELATED_RE.test(html)) html = html.replace(RELATED_RE, function () { return section; });
      else if (html.includes("</article>")) html = html.replace("</article>", function () { return section + "\n    </article>"; });
      else throw new Error("no related slot " + file);
      const canonical = canonicalFrom(html, SITE + "/" + kind + "/" + name + "/");
      html = applyJsonLd(html, kind, overview, canonical, rec.title || name, posterFrom(html) || rec.poster || "");
      if (overview) {
        const ld = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
        if (!ld) throw new Error("missing json-ld " + kind + "/" + name);
        const data = JSON.parse(ld[1]);
        if (data.description !== overview) throw new Error("json-ld description mismatch " + kind + "/" + name);
        if (data.aggregateRating) throw new Error("aggregateRating remained " + kind + "/" + name);
        if (data["@type"] !== "Movie" && data["@type"] !== "TVSeries") {
          throw new Error("json-ld type " + kind + "/" + name);
        }
        jsonLd += 1;
      }
      if (!html.includes('class="card related-card" href="')) throw new Error("related anchor missing " + kind + "/" + name);
      fs.writeFileSync(file, html);
      pages += 1;
      relatedFilled += 1;
    }
  }
  const expected = []
    .concat(TUBI_MOVIES.map(function (slug) { return "movies/" + slug; }))
    .concat(TUBI_SERIES.map(function (slug) { return "series/" + slug; }))
    .concat(DIR_MOVIES.map(function (slug) { return "movies/" + slug; }))
    .concat(DIR_SERIES.map(function (slug) { return "series/" + slug; }));
  const missing = expected.filter(function (key) { return !seen.has(key); });
  if (unexpected.length || missing.length || seen.size !== 31) {
    throw new Error(
      "template set mismatch unexpected=" + unexpected.join(",") + " missing=" + missing.join(",") + " seen=" + seen.size
    );
  }
  return { pages, relatedFilled, jsonLd, metas };
}

const reel = loadReel();
const titles = patchTitles(reel, bySlugMap(reel));
const series = writeSeriesPagination(seriesSorted(reel));
updateSitemap(series.pages);
const people = writePeopleIndex();
const searchTitles = JSON.parse(fs.readFileSync(path.join(root, "data", "search-index.json"), "utf8"));
fs.writeFileSync(path.join(root, "search", "index.html"), renderSearchPage({ query: "", titles: searchTitles }));

console.log(JSON.stringify({ titles, series, people }, null, 2));
