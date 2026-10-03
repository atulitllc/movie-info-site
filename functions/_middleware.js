import titles from "./search-index.mjs";
import { renderSearchPage } from "./search-render.mjs";

const APEX = "wheretowatchfree.com";

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname.toLowerCase() === "www." + APEX) {
    url.hostname = APEX;
    url.protocol = "https:";
    return Response.redirect(url.toString(), 301);
  }

  const path = url.pathname;
  const trimmed = (url.searchParams.get("q") || "").trim();
  const isSearch = path === "/search" || path === "/search/";
  const isHomeQuery = (path === "/" || path === "/index.html") && trimmed;
  if (!isSearch && !isHomeQuery) return context.next();

  const html = renderSearchPage({ query: trimmed, titles });
  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
