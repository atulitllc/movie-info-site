/**
 * Put catalog credits into #person-known-for for people who stay in the sitemap
 * (authored biography). Thin shells stay empty, noindex, and out of the sitemap.
 *
 *   node scripts/bake-person-filmography.mjs
 */
import fs from "fs";
import path from "path";
import { createContext, runInContext } from "vm";
import { fileURLToPath } from "url";
import { filmographyMarkup, mergeCatalogLikeBrowser } from "./person-filmography.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadReel() {
  const ctx = {};
  ctx.window = ctx;
  ctx.globalThis = ctx;
  const sandbox = createContext(ctx);
  for (const file of ["js/data.js", "js/series-data.js", "js/people-data.js"]) {
    runInContext(fs.readFileSync(path.join(root, file), "utf8"), sandbox, { filename: file });
  }
  const catalog = JSON.parse(fs.readFileSync(path.join(root, "data", "catalog.json"), "utf8"));
  mergeCatalogLikeBrowser(ctx.ReelIndex, catalog);
  return ctx.ReelIndex;
}

function replaceFilmography(html, markup) {
  const open = '<div class="person-known-grid" id="person-known-for">';
  const start = html.indexOf(open);
  if (start < 0) throw new Error("missing #person-known-for");
  let i = start + open.length;
  let depth = 1;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf("<div", i);
    const nextClose = html.indexOf("</div>", i);
    if (nextClose < 0) throw new Error("unclosed #person-known-for");
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 4;
    } else {
      depth -= 1;
      if (depth === 0) {
        return html.slice(0, start + open.length) + markup + html.slice(nextClose);
      }
      i = nextClose + 6;
    }
  }
  throw new Error("unbalanced #person-known-for");
}

const reel = loadReel();
const bios = Object.keys(reel.PEOPLE || {})
  .filter(function (slug) {
    const person = reel.PEOPLE[slug];
    return person && String(person.biography || "").trim();
  })
  .sort();

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const listed = [...sitemap.matchAll(/<loc>https:\/\/wheretowatchfree\.com\/people\/([a-z0-9-]+)\/<\/loc>/g)]
  .map(function (match) {
    return match[1];
  })
  .sort();
if (listed.join("\n") !== bios.join("\n")) {
  throw new Error(
    "sitemap people do not match authored biographies\n sitemap: " +
      listed.join(", ") +
      "\n bios: " +
      bios.join(", ")
  );
}

let updated = 0;
for (const slug of bios) {
  const file = path.join(root, "people", slug, "index.html");
  const html = fs.readFileSync(file, "utf8");
  if (/name="robots" content="noindex/.test(html)) {
    throw new Error(slug + " is noindex; refusing to treat it as a sitemap person");
  }
  const person = reel.getPerson(slug);
  const markup = filmographyMarkup(person && person.credits);
  if (!markup.includes('class="card person-movie-card"')) {
    throw new Error(slug + " has no catalog credits to write");
  }
  const next = replaceFilmography(html, markup);
  if (next.includes("Atulit")) throw new Error("refusing to write Atulit branding");
  if (next !== html) {
    fs.writeFileSync(file, next);
    updated += 1;
  }
}

console.log(JSON.stringify({ indexable: bios.length, updated, slugs: bios }));
