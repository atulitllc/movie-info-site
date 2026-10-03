"""Word-boundary meta descriptions. Mirrors scripts/test-seo.mjs."""
from __future__ import annotations

import unittest

from seo_text import clip_meta


class ClipMetaTest(unittest.TestCase):
    def test_short_text_unchanged(self):
        self.assertEqual(clip_meta("short text"), "short text")

    def test_cuts_on_a_word(self):
        self.assertEqual(clip_meta("hello world", 8), "hello…")

    def test_long_text_stays_inside_limit_and_on_a_space(self):
        long = ("alpha beta " * 30).strip()
        clipped = clip_meta(long, 155)
        self.assertTrue(clipped.endswith("…"))
        self.assertLessEqual(len(clipped), 155)
        stem = clipped[:-1]
        self.assertTrue(long.startswith(stem))
        self.assertEqual(long[len(stem)], " ")


if __name__ == "__main__":
    unittest.main()
