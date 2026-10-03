/**
 * Cap static /people/<slug>/ shells so Cloudflare Pages stays under the 20k-file limit.
 *
 * Strategy:
 *   - Rank catalog people by credit count (cast+crew titles across movies+series).
 *   - Always keep curated bios from js/people-data.js.
 *   - Emit at most SHELL_CAP per-slug shells (~17k) for the highest-credit set.
 *   - Shared shell at /people/_profile/ + root `_redirects` 200-rewrite for anyone
 *     without a static shell (static assets win over 200 rewrites on CF Pages).
 *   - /people/index.html lists the kept shells (SEO + discovery).
 *   - sitemap.xml lists only kept people URLs (+ /people/).
 *
 *   node scripts/build-people-pages.mjs
 */
import fs from "fs";
import path from "path";
import { createContext, runInContext } from "vm";
import { fileURLToPath } from "url";
import { filmographyMarkup, mergeCatalogLikeBrowser } from "./person-filmography.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const peopleDir = path.join(root, "people");
const profileDir = path.join(peopleDir, "_profile");
const profileFile = path.join(profileDir, "index.html");
const indexFile = path.join(peopleDir, "index.html");
const siteBase = "https://wheretowatchfree.com";

/** Max per-slug shells (excludes people/index.html and people/_profile/). */
const SHELL_CAP = 17000;

const PROFILE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, follow" />
  <title>Person — Movies &amp; Series | WhereToWatchFree</title>
  <meta name="description" content="Filmography and credits in the WhereToWatchFree catalog." />
  <link rel="canonical" href="${siteBase}/people/" />
  <meta property="og:type" content="profile" />
  <meta property="og:title" content="Person | WhereToWatchFree" />
  <meta property="og:description" content="Filmography and credits in the WhereToWatchFree catalog." />
  <meta property="og:url" content="${siteBase}/people/" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Person | WhereToWatchFree" />
  <meta name="twitter:description" content="Filmography and credits in the WhereToWatchFree catalog." />
  <script src="../../js/theme-boot.js"></script>
  <link rel="stylesheet" href="../../css/styles.css" />
</head>
<body>
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
        <h1 id="person-name">Person</h1>
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

function mergeBulkCatalog(R) {
  const catalogPath = path.join(root, "data", "catalog.json");
  if (!fs.existsSync(catalogPath)) return;
  const data = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  mergeCatalogLikeBrowser(R, data);
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

function authoredBiography(reel, slug) {
  const curated = reel.PEOPLE && reel.PEOPLE[slug];
  return (curated && String(curated.biography || "").trim()) || "";
}

function pageHtml(person, options) {
  const indexable = !!(options && options.indexable);
  const authoredBio = (options && options.authoredBio) || "";
  const slug = person.slug;
  const name = person.name || slug;
  const url = siteBase + "/people/" + slug + "/";
  const description = clip(
    person.biography || name + " — movies and series in the WhereToWatchFree catalog.",
    160
  );
  const photo = typeof person.photo === "string" && person.photo.startsWith("https://") ? person.photo : "";
  const filmography = indexable ? filmographyMarkup(person.credits) : "";
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
  <meta name="viewport" content="width=device-width, initial-scale=1" />${indexable ? "" : '\n  <meta name="robots" content="noindex, follow" />'}
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
        <p class="person-bio" id="person-bio">${indexable ? esc(authoredBio) : ""}</p>
      </div>
    </div>
  </header>
  <main class="container">
    <article>
      <section class="section">
        <h2>Movies &amp; series</h2>
        <div class="person-known-grid" id="person-known-for">${filmography}</div>
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

function selectPeople(reel) {
  const curatedSlugs = new Set(Object.keys(reel.PEOPLE || {}));
  const all = reel.listCatalogPeople().filter(function (p) {
    return p && p.slug && /^[a-z0-9-]+$/.test(p.slug);
  });
  const ranked = all
    .map(function (p) {
      return {
        person: p,
        credits: (p.credits && p.credits.length) || 0,
        curated: curatedSlugs.has(p.slug)
      };
    })
    .sort(function (a, b) {
      if (a.curated !== b.curated) return a.curated ? -1 : 1;
      if (b.credits !== a.credits) return b.credits - a.credits;
      return String(a.person.slug).localeCompare(String(b.person.slug));
    });

  const kept = [];
  const seen = new Set();
  // Curated first (always), then fill by credit rank up to SHELL_CAP.
  for (const row of ranked) {
    if (kept.length >= SHELL_CAP) break;
    if (seen.has(row.person.slug)) continue;
    seen.add(row.person.slug);
    kept.push(row);
  }
  // If curated somehow exceeded cap (shouldn't), still force them in by replacing lowest.
  for (const slug of curatedSlugs) {
    if (seen.has(slug)) continue;
    const person = reel.getPerson(slug);
    if (!person || !/^[a-z0-9-]+$/.test(slug)) continue;
    if (kept.length < SHELL_CAP) {
      kept.push({ person, credits: (person.credits || []).length, curated: true });
      seen.add(slug);
      continue;
    }
    // Replace the last (lowest priority) non-curated entry.
    for (let i = kept.length - 1; i >= 0; i--) {
      if (!kept[i].curated) {
        seen.delete(kept[i].person.slug);
        kept[i] = { person, credits: (person.credits || []).length, curated: true };
        seen.add(slug);
        break;
      }
    }
  }
  kept.sort(function (a, b) {
    return String(a.person.name || a.person.slug).localeCompare(
      String(b.person.name || b.person.slug)
    );
  });
  return { kept, total: all.length, curatedCount: curatedSlugs.size };
}

function ensureProfileShell() {
  fs.mkdirSync(profileDir, { recursive: true });
  fs.writeFileSync(profileFile, PROFILE_HTML);
}

function writePeopleIndex(keptRows) {
  const links = keptRows
    .map(function (row) {
      const p = row.person;
      const name = p.name || p.slug;
      return (
        '        <li><a href="./' +
        esc(p.slug) +
        '/">' +
        esc(name) +
        "</a></li>"
      );
    })
    .join("\n");
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>People — Cast &amp; Crew | WhereToWatchFree</title>
  <meta name="description" content="Browse cast and crew pages in the WhereToWatchFree catalog." />
  <link rel="canonical" href="${siteBase}/people/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="People | WhereToWatchFree" />
  <meta property="og:description" content="Browse cast and crew pages in the WhereToWatchFree catalog." />
  <meta property="og:url" content="${siteBase}/people/" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="People | WhereToWatchFree" />
  <meta name="twitter:description" content="Browse cast and crew pages in the WhereToWatchFree catalog." />
  <script src="../js/theme-boot.js"></script>
  <link rel="stylesheet" href="../css/styles.css" />
</head>
<body>
  <header class="site-header">
    <div class="container nav">
      <a class="logo" href="../" aria-label="WhereToWatchFree"><img class="logo-lockup logo-lockup--dark" src="../assets/brand/lockup-horizontal-dark.svg" alt="WhereToWatchFree" width="155" height="36" decoding="async" /><img class="logo-lockup logo-lockup--light" src="../assets/brand/lockup-horizontal-light.svg" alt="" width="155" height="36" decoding="async" /></a>
      <div class="nav-right">
                <nav class="nav-links" aria-label="Primary">
          <a href="../">Home</a>
          <a href="../whats-on/">What&rsquo;s On</a>
          <a href="../trending/">Trending</a>
          <a href="../series/">Series</a>
          <a href="../watch-free/">Watch free</a>
        </nav>
        <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle color theme" title="Toggle theme">
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z"/></svg>
        </button>
      </div>
    </div>
  </header>
  <main class="container">
    <article>
      <header class="section" style="padding-bottom:0">
        <h1>People</h1>
        <p class="muted">${keptRows.length.toLocaleString("en-US")} cast and crew pages with filmography from the catalog. Cast links on title pages open these shells. A name without a shell has no page.</p>
      </header>
      <section class="section">
        <ul class="people-index-list" style="columns:2;gap:2rem;list-style:disc;padding-left:1.25rem">
${links}
        </ul>
      </section>
    </article>
  </main>
  <footer class="site-footer"></footer>
  <script src="../js/theme.js"></script>
  <script src="../js/footer.js"></script>
</body>
</html>
`;
  fs.writeFileSync(indexFile, html);
}

function syncShells(keptRows, reel) {
  const keep = new Set(keptRows.map(function (r) {
    return r.person.slug;
  }));
  keep.add("_profile");

  let created = 0;
  let updated = 0;
  let removed = 0;

  fs.mkdirSync(peopleDir, { recursive: true });

  // Remove excess per-slug dirs (and stray files except index.html / _profile).
  if (fs.existsSync(peopleDir)) {
    for (const name of fs.readdirSync(peopleDir)) {
      if (name === "index.html") continue;
      if (name === "_profile") continue;
      const full = path.join(peopleDir, name);
      const stat = fs.lstatSync(full);
      if (stat.isDirectory()) {
        if (!keep.has(name)) {
          fs.rmSync(full, { recursive: true, force: true });
          removed++;
        }
      } else {
        fs.rmSync(full, { force: true });
        removed++;
      }
    }
  }

  for (const row of keptRows) {
    const slug = row.person.slug;
    const dir = path.join(peopleDir, slug);
    const file = path.join(dir, "index.html");
    const bio = authoredBiography(reel, slug);
    const html = pageHtml(row.person, { indexable: !!bio, authoredBio: bio });
    const existed = fs.existsSync(file);
    fs.mkdirSync(dir, { recursive: true });
    if (existed) {
      const prev = fs.readFileSync(file, "utf8");
      if (prev !== html) {
        fs.writeFileSync(file, html);
        updated++;
      }
    } else {
      fs.writeFileSync(file, html);
      created++;
    }
  }

  return { created, updated, removed };
}

function updateSitemap(entries) {
  const sitemapPath = path.join(root, "sitemap.xml");
  let xml = fs.readFileSync(sitemapPath, "utf8");
  xml = xml.replace(/\s*<url><loc>https:\/\/atulitllc\.github\.io\/movie-info-site\/people\/[^<]+<\/loc><\/url>/g, "");
  xml = xml.replace(/\s*<url><loc>https:\/\/wheretowatchfree\.com\/people\/[^<]*<\/loc><\/url>/g, "");
  const urls = [siteBase + "/people/"].concat(
    entries
      .filter(function (entry) {
        return entry && entry.indexable && entry.slug && entry.slug !== "_profile" && /^[a-z0-9-]+$/.test(entry.slug);
      })
      .map(function (entry) {
        return entry.slug;
      })
      .sort()
      .map(function (slug) {
        return siteBase + "/people/" + slug + "/";
      })
  );
  const block = urls.map(function (loc) {
    return "  <url><loc>" + loc + "</loc></url>";
  }).join("\n") + "\n";
  xml = xml.replace("</urlset>", block + "</urlset>\n");
  fs.writeFileSync(sitemapPath, xml);
  return urls.length;
}

const reel = loadCatalog();
const { kept, total, curatedCount } = selectPeople(reel);
ensureProfileShell();
const sync = syncShells(kept, reel);
writePeopleIndex(kept);
const sitemapCount = updateSitemap(kept.map(function (r) {
  return {
    slug: r.person.slug,
    indexable: !!authoredBiography(reel, r.person.slug)
  };
}));

const minCredits = kept.reduce(function (m, r) {
  return Math.min(m, r.credits);
}, Infinity);
const curatedKept = kept.filter(function (r) {
  return r.curated;
}).length;

console.log(
  JSON.stringify(
    {
      catalog_people: total,
      shell_cap: SHELL_CAP,
      shells_kept: kept.length,
      curated_kept: curatedKept,
      curated_total: curatedCount,
      min_credits_among_kept: minCredits,
      created: sync.created,
      updated: sync.updated,
      removed_dirs: sync.removed,
      sitemap_people_urls: sitemapCount,
      profile: profileFile,
      index: indexFile
    },
    null,
    2
  )
);
