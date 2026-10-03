"""Shared meta-description clipping. Keep in sync with scripts/seo-text.mjs."""
from __future__ import annotations

import re

_ELLIPSIS = "…"
_TRAIL = " \t.,;:\"'"


def clip_meta(text: str, limit: int = 155) -> str:
    """Return text unchanged when it fits, otherwise cut on a word boundary.

    The ellipsis counts toward ``limit`` so a truncated description does not
    run past the length the old ``overview[:155]`` slice used.
    """
    text = re.sub(r"\s+", " ", (text or "")).strip()
    if len(text) <= limit:
        return text
    room = max(limit - 1, 1)
    cut = text[:room]
    space = cut.rfind(" ")
    base = cut[:space] if space > 0 else cut
    base = base.rstrip(_TRAIL)
    if not base:
        base = cut.rstrip()
    return base + _ELLIPSIS
