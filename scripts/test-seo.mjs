import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { clipMeta } from "./seo-text.mjs";
import { filmographyMarkup } from "./person-filmography.mjs";
import { renderSearchPage, searchTitles } from "../functions/search-render.mjs";
import { redirectTarget } from "../functions/https-redirect.mjs";

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
assert.match(html, /name="robots" content="noindex, follow"/);
assert.equal(redirectTarget("http://wheretowatchfree.com/", ""), "https://wheretowatchfree.com/");
assert.equal(
  redirectTarget("http://wheretowatchfree.com/movies/oppenheimer/", ""),
  "https://wheretowatchfree.com/movies/oppenheimer/"
);
assert.equal(redirectTarget("https://wheretowatchfree.com/", ""), "");
assert.equal(redirectTarget("https://wheretowatchfree.com/", '{"scheme":"http"}'), "https://wheretowatchfree.com/");
assert.equal(redirectTarget("http://www.wheretowatchfree.com/series/", ""), "https://wheretowatchfree.com/series/");
assert.equal(redirectTarget("https://www.wheretowatchfree.com/", ""), "https://wheretowatchfree.com/");
assert.equal(redirectTarget("http://movie-info-site.pages.dev/", ""), "");

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
assert.ok(!sitemap.includes("<loc>https://wheretowatchfree.com/search/</loc>"));
assert.ok(sitemap.includes("/page/2/"));
assert.ok(sitemap.includes("<loc>https://wheretowatchfree.com/series/page/2/</loc>"));

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

function metaDesc(html) {
  const match = html.match(/<meta name="description" content="([^"]*)"/);
  assert.ok(match);
  return match[1]
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function overviewText(html) {
  const match = html.match(/<p id="overview">([\s\S]*?)<\/p>/);
  assert.ok(match);
  return match[1]
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function jsonLd(html) {
  const match = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
  assert.ok(match);
  return JSON.parse(match[1]);
}

const oppenheimer = fs.readFileSync(path.join(root, "movies", "oppenheimer", "index.html"), "utf8");
const opOverview = overviewText(oppenheimer);
assert.equal(metaDesc(oppenheimer), clipMeta(opOverview));
assert.doesNotMatch(metaDesc(oppenheimer), /Tubi/);
assert.match(oppenheimer, /class="card related-card" href="\.\.\/\.\.\/(?:movies|series)\/[^"]+\/"/);
const opLd = jsonLd(oppenheimer);
assert.equal(opLd["@type"], "Movie");
assert.equal(opLd.description, opOverview);
assert.equal(opLd.aggregateRating, undefined);

const breaking = fs.readFileSync(path.join(root, "series", "breaking-bad", "index.html"), "utf8");
const bbOverview = overviewText(breaking);
assert.equal(metaDesc(breaking), clipMeta(bbOverview));
assert.doesNotMatch(metaDesc(breaking), /Tubi/);
assert.match(breaking, /class="card related-card" href="\.\.\/\.\.\/series\/[^"]+\/"/);
const bbLd = jsonLd(breaking);
assert.equal(bbLd["@type"], "TVSeries");
assert.equal(bbLd.description, bbOverview);
assert.equal(bbLd.aggregateRating, undefined);

const thrones = fs.readFileSync(path.join(root, "series", "game-of-thrones", "index.html"), "utf8");
assert.equal(metaDesc(thrones), clipMeta(overviewText(thrones)));
assert.doesNotMatch(metaDesc(thrones), /Tubi/);

const knock = fs.readFileSync(path.join(root, "movies", "knock-at-the-cabin", "index.html"), "utf8");
const knockOverview = overviewText(knock);
assert.match(knockOverview, /WhereToWatchFree directory/);
assert.equal(metaDesc(knock), clipMeta(knockOverview));
assert.equal(jsonLd(knock).description, knockOverview);

const monster = fs.readFileSync(path.join(root, "series", "monster-2022", "index.html"), "utf8");
assert.match(overviewText(monster), /WhereToWatchFree directory/);
assert.equal(metaDesc(monster), clipMeta(overviewText(monster)));

const searchFile = fs.readFileSync(path.join(root, "search", "index.html"), "utf8");
assert.match(searchFile, /name="robots" content="noindex, follow"/);

const seriesIndex = fs.readFileSync(path.join(root, "series", "index.html"), "utf8");
assert.match(seriesIndex, /id="series-grid"[\s\S]*href="[^"]+\/"/);
assert.match(seriesIndex, /id="load-more" href="page\/2\/"/);
const seriesLinks = seriesIndex.match(/<a class="card" href="[^"]+\/"/g) || [];
assert.ok(seriesLinks.length >= 48);
const seriesPage2 = fs.readFileSync(path.join(root, "series", "page", "2", "index.html"), "utf8");
assert.match(seriesPage2, /href="\.\.\/\.\.\/[^"]+\/"/);
assert.match(seriesPage2, /rel="canonical" href="https:\/\/wheretowatchfree\.com\/series\/page\/2\/"/);

const peopleIndex = fs.readFileSync(path.join(root, "people", "index.html"), "utf8");
assert.doesNotMatch(peopleIndex, /noindex/);
assert.doesNotMatch(peopleIndex, /href="\.\/vin-diesel\/"/);
assert.match(peopleIndex, /href="\.\/tom-holland\/"/);
const peopleLinks = peopleIndex.match(/href="\.\/[a-z0-9-]+\/"/g) || [];
assert.equal(peopleLinks.length, 11);

let missingRelated = 0;
let titled = 0;
for (const kind of ["movies", "series"]) {
  const base = path.join(root, kind);
  for (const name of fs.readdirSync(base)) {
    const file = path.join(base, name, "index.html");
    if (!fs.existsSync(file)) continue;
    const page = fs.readFileSync(file, "utf8");
    if (!page.includes('id="overview"')) continue;
    titled += 1;
    if (!page.includes('class="card related-card" href="')) missingRelated += 1;
    const story = overviewText(page);
    if (!story) continue;
    const data = jsonLd(page);
    assert.equal(data.description, story, kind + "/" + name);
    assert.ok(data["@type"] === "Movie" || data["@type"] === "TVSeries", kind + "/" + name);
    assert.equal(data.aggregateRating, undefined, kind + "/" + name);
    assert.equal(data["@type"] === "Product" || data["@type"] === "Offer", false);
  }
}
assert.equal(missingRelated, 0);
assert.ok(titled > 2200);

console.log("seo checks ok");
