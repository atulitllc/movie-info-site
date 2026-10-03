import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { clipMeta } from "./seo-text.mjs";
import { filmographyMarkup } from "./person-filmography.mjs";
import { renderSearchPage, searchTitles } from "../functions/search-render.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

assert.equal(clipMeta("short text", 155), "short text");
assert.equal(clipMeta("hello world", 8), "hello…");
const long = ("alpha beta ".repeat(30)).trim();
const clipped = clipMeta(long, 155);
assert.ok(clipped.endsWith("…"));
assert.ok(clipped.length <= 155);
const stem = clipped.slice(0, -1);
assert.ok(long.startsWith(stem));
assert.equal(long.charAt(stem.length), " ");

const titles = JSON.parse(fs.readFileSync(path.join(root, "data", "search-index.json"), "utf8"));
const found = searchTitles(titles, "inception");
assert.ok(found.total >= 1);
assert.ok(found.hits.some(function (item) { return item.s === "inception"; }));
const html = renderSearchPage({ query: "inception", titles });
assert.match(html, /href="\/movies\/inception\/"/);
assert.match(html, /Inception/);
assert.doesNotMatch(html, /Atulit/i);
assert.match(html, /rel="canonical" href="https:\/\/wheretowatchfree\.com\/search\/\?q=inception"/);

const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert.match(home, /lockup-horizontal-light\.svg" alt="WhereToWatchFree"/);
assert.match(home, /action="\/search\/"/);
assert.match(home, /search\/\?q=\{search_term_string\}/);
assert.match(home, /id="load-more" href="page\/2\/"/);
assert.match(home, /id="trending-rail">[\s\S]*href="[^"]*movies\/|href="[^"]*series\//);
assert.match(home, /id="movie-grid"[\s\S]*class="card"/);
assert.doesNotMatch(home, /<button[^>]*id="load-more"/);

const fail = fs.readFileSync(path.join(root, "movies", "12th-fail", "index.html"), "utf8");
assert.match(fail, /id="overview">[^<]*Manoj/);
assert.match(fail, /id="poster"[^>]*alt="12th Fail poster"/);
const desc = fail.match(/<meta name="description" content="([^"]*)"/)[1];
assert.ok(desc.endsWith("…") || desc.endsWith("..."));
assert.ok(!desc.endsWith(" de"));
const overview = fail.match(/id="overview">([^<]*)</)[1];
assert.ok(overview.length > desc.length);

const vin = fs.readFileSync(path.join(root, "people", "vin-diesel", "index.html"), "utf8");
assert.match(vin, /name="robots" content="noindex, follow"/);
assert.match(vin, /id="person-known-for"><\/div>/);
const holland = fs.readFileSync(path.join(root, "people", "tom-holland", "index.html"), "utf8");
assert.doesNotMatch(holland, /noindex/);
assert.match(holland, /id="person-bio">[^<]+<\/p>/);
assert.match(holland, /id="person-known-for"><a class="card person-movie-card"/);
assert.match(holland, /href="\.\.\/\.\.\/movies\/the-odyssey\/"/);
assert.match(holland, /href="\.\.\/\.\.\/series\/the-crowded-room\/"/);
assert.match(holland, /Series/);

const escaped = filmographyMarkup([
  { slug: "a-title", title: 'A <Title> & "Quote"', year: "2020", kind: "movie", role: "Lead", poster: "" }
]);
assert.match(escaped, /A &lt;Title&gt; &amp; &quot;Quote&quot;/);
assert.match(escaped, /person-movie-placeholder/);
assert.equal(filmographyMarkup([]), '<p class="muted">No titles linked yet.</p>');

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
assert.ok(!sitemap.includes("/people/vin-diesel/"));
assert.ok(sitemap.includes("/people/tom-holland/"));
const featured = [...sitemap.matchAll(/<loc>https:\/\/wheretowatchfree\.com\/people\/([a-z0-9-]+)\/<\/loc>/g)].map(function (match) {
  return match[1];
});
assert.equal(featured.length, 11);
for (const slug of featured) {
  const page = fs.readFileSync(path.join(root, "people", slug, "index.html"), "utf8");
  assert.doesNotMatch(page, /noindex/, slug);
  assert.match(page, /id="person-known-for"><a class="card person-movie-card"/, slug);
  assert.doesNotMatch(page, /Atulit/i, slug);
}
assert.ok(sitemap.includes("/search/"));
assert.ok(sitemap.includes("/page/2/"));

const redirects = fs.readFileSync(path.join(root, "_redirects"), "utf8");
assert.ok(!/^\s*\/people\//m.test(redirects));
assert.ok(!/\s200\s*$/m.test(redirects));

const missing = fs.readFileSync(path.join(root, "404.html"), "utf8");
assert.match(missing, /<h1>Page not found<\/h1>/);
assert.match(missing, /noindex/);
assert.doesNotMatch(missing, /Browse movies &amp; series\. Find where to watch/);

const page2 = fs.readFileSync(path.join(root, "page", "2", "index.html"), "utf8");
assert.match(page2, /href="\.\.\/\.\.\/movies\/[^"]+\/"/);
assert.match(page2, /id="load-more" href="\.\.\/3\/"/);

const whats = fs.readFileSync(path.join(root, "whats-on", "index.html"), "utf8");
assert.match(whats, /id="rail-trending"><a class="card/);
assert.match(whats, /id="rail-free"><a class="card/);
assert.match(whats, /id="rail-new"><a class="card/);
assert.match(whats, /id="rail-top"><a class="card/);
const trending = fs.readFileSync(path.join(root, "trending", "index.html"), "utf8");
assert.match(trending, /id="trending-grid"[^>]*>\s*<a class="card/);

console.log("seo checks ok");
