/** One-hop http→https and www→apex redirects. No extra hop when the edge already upgraded the scheme. */

export const APEX = "wheretowatchfree.com";

function visitorScheme(visitorHeader, url) {
  if (visitorHeader) {
    try {
      const parsed = JSON.parse(visitorHeader);
      if (parsed && parsed.scheme) return String(parsed.scheme).toLowerCase();
    } catch (err) {
      /* fall through to the request URL */
    }
  }
  return url.protocol.replace(":", "").toLowerCase();
}

/**
 * Absolute URL to 301 to, or "" when the request should be served as-is.
 * www (http or https) goes straight to the https apex. http apex goes to https apex.
 * Other hosts, including Pages preview hostnames, are left alone.
 */
export function redirectTarget(requestUrl, visitorHeader) {
  const url = new URL(requestUrl);
  const host = url.hostname.toLowerCase();
  if (host === "www." + APEX) {
    url.hostname = APEX;
    url.protocol = "https:";
    return url.toString();
  }
  const scheme = visitorScheme(visitorHeader, url);
  if (host === APEX && scheme === "http") {
    url.protocol = "https:";
    return url.toString();
  }
  return "";
}
