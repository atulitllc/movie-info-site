/**
 * Create /people/<slug>/ shells for everyone credited in curated data and data/catalog.json.
 * Existing curated pages are kept; this only adds series-data.js and the filmography heading.
 * Filmography itself is filled at runtime by js/person.js — do not hardcode TMDB person ids.
 *
 *   node scripts/build-people-pages.mjs
 */
import fs from "fs";
import path from "path";
import { createContext, runInContext } from "vm";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const peopleDir = path.join(root, "people");
const siteBase = "https://wheretowatchfree.com";

function mergeBulkCatalog(R) {
  const catalogPath = path.join(root, "data", "catalog.json");
  if (!fs.existsSync(catalogPath)) return;
  const data = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  R.MOVIES = R.MOVIES || {};
  R.SERIES = R.SERIES || {};
  // Curated records already on MOVIES/SERIES win (same rule as catalog-loader.js).
  for (const item of data.movies || []) {
    if (item && item.slug && !R.MOVIES[item.slug]) R.MOVIES[item.slug] = item;
  }
  for (const item of data.series || []) {
    if (item && item.slug && !R.SERIES[item.slug]) R.SERIES[item.slug] = item;
  }
}

function loadCatalog() {
  const ctx = {};
  ctx.window = ctx;
  ctx.globalThis = ctx;
  const sandbox = createContext(ctx);
  for (const file of ["js/data.js", "js/series-data.js", "js/people-data.js"]) {
    runInContext(fs.readFileSync(path.join(root, file), "utf8"), sandbox, { filename: file });
  }
  mergeBulkCatalog(ctx.ReelIndex);
  return ctx.ReelIndex;
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clip(s, max) {
  const text = String(s || "").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return (space > 40 ? cut.slice(0, space) : cut).trim() + "…";
}

function pageHtml(person) {
  const slug = person.slug;
  const name = person.name || slug;
  const url = siteBase + "/people/" + slug + "/";
  const description = clip(
    person.biography || name + " — movies and series in the WhereToWatchFree catalog.",
    160
  );
  const photo = typeof person.photo === "string" && person.photo.startsWith("https://") ? person.photo : "";
  const ld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: name,
    url: url,
    description: description,
    image: photo || undefined
  }).replace(/</g, "\\u003c");
  const imageMeta = photo
    ? '\n  <meta property="og:image" content="' + esc(photo) + '" />'
    : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(name)} — Movies &amp; Series | WhereToWatchFree</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${esc(url)}" />
  <meta property="og:type" content="profile" />
  <meta property="og:title" content="${esc(name)} | WhereToWatchFree" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(url)}" />${imageMeta}
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${esc(name)} | WhereToWatchFree" />
  <meta name="twitter:description" content="${esc(description)}" />
  <script src="../../js/theme-boot.js"></script>
  <link rel="stylesheet" href="../../css/styles.css" />
  <script type="application/ld+json">
  ${ld}
  </script>
</head>
<body data-person-slug="${esc(slug)}">
  <header class="site-header">
    <div class="container nav">
      <a class="logo" href="../../" aria-label="WhereToWatchFree"><img class="logo-lockup logo-lockup--dark" src="../../assets/brand/lockup-horizontal-dark.svg" alt="WhereToWatchFree" width="155" height="36" decoding="async" /><img class="logo-lockup logo-lockup--light" src="../../assets/brand/lockup-horizontal-light.svg" alt="" width="155" height="36" decoding="async" /></a>
      <div class="nav-right">
                <nav class="nav-links" aria-label="Primary">
          <a href="../../">Home</a>
          <a href="../../whats-on/">What&rsquo;s On</a>
          <a href="../../trending/">Trending</a>
          <a href="../../series/">Series</a>
          <a href="../../watch-free/">Watch free</a>
        </nav>
        <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle color theme" title="Toggle theme">
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z"/></svg>
        </button>
      </div>
    </div>
  </header>
  <header class="person-hero">
    <div class="container person-grid">
      <img class="person-photo" id="person-photo" alt="" width="400" height="600" />
      <div>
        <h1 id="person-name">${esc(name)}</h1>
        <div class="person-facts">
          <span><strong>Born</strong> <span id="person-birthday">—</span></span>
          <span><strong>Place</strong> <span id="person-place">—</span></span>
        </div>
        <p class="person-bio" id="person-bio"></p>
      </div>
    </div>
  </header>
  <main class="container">
    <article>
      <section class="section">
        <h2>Movies &amp; series</h2>
        <div class="person-known-grid" id="person-known-for"></div>
      </section>
    </article>
  </main>
  <footer class="site-footer"></footer>
  <script src="../../js/data.js"></script>
  <script src="../../js/series-data.js"></script>
  <script src="../../js/catalog-loader.js"></script>
  <script src="../../js/people-data.js"></script>
  <script src="../../js/theme.js"></script>
  <script src="../../js/footer.js"></script>
  <script src="../../js/person.js"></script>
</body>
</html>
`;
}

function patchExisting(html) {
  let next = html;
  if (!next.includes("js/series-data.js")) {
    next = next.replace(
      '<script src="../../js/data.js"></script>\n  <script src="../../js/people-data.js"></script>',
      '<script src="../../js/data.js"></script>\n  <script src="../../js/series-data.js"></script>\n  <script src="../../js/people-data.js"></script>'
    );
  }
  if (!next.includes("js/catalog-loader.js")) {
    next = next.replace(
      '<script src="../../js/series-data.js"></script>\n  <script src="../../js/people-data.js"></script>',
      '<script src="../../js/series-data.js"></script>\n  <script src="../../js/catalog-loader.js"></script>\n  <script src="../../js/people-data.js"></script>'
    );
    if (!next.includes("js/catalog-loader.js")) {
      next = next.replace(
        '<script src="../../js/data.js"></script>\n  <script src="../../js/people-data.js"></script>',
        '<script src="../../js/data.js"></script>\n  <script src="../../js/catalog-loader.js"></script>\n  <script src="../../js/people-data.js"></script>'
      );
    }
  }
  next = next.replace("<h2>Known for</h2>", "<h2>Movies &amp; series</h2>");
  return next;
}

function updateSitemap(slugs) {
  const sitemapPath = path.join(root, "sitemap.xml");
  let xml = fs.readFileSync(sitemapPath, "utf8");
  xml = xml.replace(/\s*<url><loc>https:\/\/atulitllc\.github\.io\/movie-info-site\/people\/[^<]+<\/loc><\/url>/g, "");
  const block =
    slugs
      .slice()
      .sort()
      .map(function (slug) {
        return "  <url><loc>" + siteBase + "/people/" + slug + "/</loc></url>";
      })
      .join("\n") + "\n";
  xml = xml.replace("</urlset>", block + "</urlset>\n");
  fs.writeFileSync(sitemapPath, xml);
}

const reel = loadCatalog();
const people = reel.listCatalogPeople();
let created = 0;
let patched = 0;
const slugs = [];

for (const person of people) {
  const slug = person.slug;
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    console.warn("skip invalid slug", slug, person.name);
    continue;
  }
  slugs.push(slug);
  const dir = path.join(peopleDir, slug);
  const file = path.join(dir, "index.html");
  if (fs.existsSync(file)) {
    const prev = fs.readFileSync(file, "utf8");
    const next = patchExisting(prev);
    if (next !== prev) {
      fs.writeFileSync(file, next);
      patched++;
    }
    continue;
  }
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, pageHtml(person));
  created++;
}

updateSitemap(slugs);
console.log("people", people.length, "created", created, "patched", patched);
