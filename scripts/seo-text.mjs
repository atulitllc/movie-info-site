/** Shared meta-description clipping. Keep in sync with scripts/seo_text.py. */

const ELLIPSIS = "…";
const TRAIL = /[ \t.,;:"']+$/;

export function clipMeta(text, limit = 155) {
  const normalized = String(text || "").replace(/\s+/g, " ").trim();
  if (normalized.length <= limit) return normalized;
  const room = Math.max(limit - 1, 1);
  const cut = normalized.slice(0, room);
  const space = cut.lastIndexOf(" ");
  let base = space > 0 ? cut.slice(0, space) : cut;
  base = base.replace(TRAIL, "");
  if (!base) base = cut.replace(/\s+$/, "");
  return base + ELLIPSIS;
}
