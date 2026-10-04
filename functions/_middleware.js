import titles from "./search-index.mjs";
import { renderSearchPage } from "./search-render.mjs";
import { redirectTarget } from "./https-redirect.mjs";

export async function onRequest(context) {
  const target = redirectTarget(context.request.url, context.request.headers.get("CF-Visitor"));
  if (target) return Response.redirect(target, 301);

  const url = new URL(context.request.url);
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
      "x-robots-tag": "noindex, follow",
    },
  });
}
