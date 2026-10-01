# WhereToWatchFree Brand Pack

Legal where-to-watch branding for **wheretowatchfree.com**.

## Direction

**LOCKED: Clapperboard mark + condensed wordmark.**

The mark is a coral clapperboard (navy/paper slate, amber hinge) with a coral play badge. It replaces the retired aperture / lens mark.

## Wordmark

**Barlow Condensed SemiBold**, outlined in the SVG (no live font dependency). Spelling is exact: **WhereToWatchFree** (no spaces).

**Free** stays coral `#FF6B4A`. The rest of the wordmark is cinema navy on light backgrounds and warm paper on dark backgrounds.

The horizontal lockup is about **20% narrower** than the previous Geist lockup (viewBox width 447.4 versus 559.9).

## Palette

| Role | Hex | Notes |
|------|-----|-------|
| Cinema navy | `#0B1C2C` | Mark slate, wordmark on light, dark UI background |
| Warm paper | `#F4F0E6` | Light backgrounds; wordmark on dark |
| Coral | `#FF6B4A` | Clapper, play badge, and **Free** |
| Amber hinge | `#F5A524` | Clapper hinge only |

## Name usage

- Brand string: **WhereToWatchFree** (no spaces).
- Do not split the official lockup into “Where To Watch Free”.
- Prototype name ReelIndex stays in `window.ReelIndex` for scripts. It is not a customer-facing brand.

## Files

### Mark (icon only)
- `mark.svg` — master vector (transparent)
- `mark-128.png` / `mark-256.png` / `mark-512.png` / `mark-1024.png`

### Favicon / app
- `favicon.svg` — clapperboard simplified for tiny sizes
- `favicon-32.png` / `favicon-16.png`
- `apple-touch-180.png`

### Lockups
- `lockup-horizontal-light.svg` + `lockup-horizontal-light-1200.png` — light backgrounds
- `lockup-horizontal-dark.svg` + `lockup-horizontal-dark-1200.png` — dark backgrounds
- `lockup-stacked-light.svg` + `lockup-stacked-light-800.png`
- `lockup-stacked-dark.svg` + `lockup-stacked-dark-800.png`

### Wordmark only
- `wordmark-only-light.svg` / `wordmark-only-light-1200.png`
- `wordmark-only-dark.svg` / `wordmark-only-dark-1200.png`

## When to use which

| Context | Use |
|---------|-----|
| Website header (light) | `lockup-horizontal-light` |
| Website header (dark) | `lockup-horizontal-dark` |
| App icon / iOS | `apple-touch-180` |
| Browser tab | `favicon.svg` (PNG fallbacks for older browsers) |
| Social avatar | `mark-512` or `mark-1024` |
| Narrow / stacked layouts | `lockup-stacked-*` |
| Text-only footer / legal | `wordmark-only-*` |

Header markup keeps both horizontal lockups in the DOM. `[data-theme="dark"]` shows the dark lockup; `[data-theme="light"]` shows the light lockup. Paths are relative (`assets/brand/…`, `../assets/brand/…`, `../../assets/brand/…`) so the same files work on GitHub Pages project sites and on Cloudflare Pages at the domain root.

## Domains

Primary: wheretowatchfree.com  
Static prototype: the GitHub Pages project path and any Cloudflare Pages root.
