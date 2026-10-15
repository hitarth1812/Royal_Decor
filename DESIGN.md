# Royal Decor — Design System

The visual language of the Royal Decor showroom site. Read this before adding or
changing any UI, so new work looks like it was there from the start.

Source of truth for every value below: `tailwind.config.js`,
`src/styles/global.css`, and `src/components/ui/*`. If this file and the code
disagree, the code wins — then fix this file.

---

## 1. Character

A premium home-furnishing showroom in Surat. The site should feel **quiet,
confident and editorial** — closer to an interiors magazine than a shop.

- Generous whitespace, thin hairlines, restrained colour.
- Photography is the hero; the interface stays out of its way.
- One loud colour (crimson), used rarely.
- Motion supports the content; it is never the content.

**Avoid:** loud gradients, heavy shadows, glassmorphism everywhere, colourful
card UIs, neon, bouncing/looping animation, generic SaaS patterns.

---

## 2. Colour

Sampled from the logo. All defined in `tailwind.config.js`.

| Token | Value | Use |
|---|---|---|
| `ivory` | `#F7F3EA` | Page background |
| `ivory-warm` | `#FBF9F4` | Raised panels on the page (brand wall, hover fills) |
| `navy` | `#0A0A0A` | Body text, dark sections, primary buttons. *Named navy, is near-black* |
| `navy-deep` | `#050505` | Footer, CTA panel, image scrims |
| `navy-soft` | `#1A1A1D` | Primary-button hover, image placeholders |
| `crimson` | `#7A1030` | The accent: CTAs, eyebrow labels, active nav, stat suffixes |
| `crimson-dark` | `#5E0B24` | Accent hover |
| `crimson-light` | `#B04561` | Accent on dark backgrounds |
| `royal` | `#132257` | Supporting accent, used sparingly ("EXCLUSIVE" in the logo) |
| `sand` / `sand-light` | `#D8C7AD` / `#E8DDCB` | Soft fills, image placeholders, secondary surfaces |

**Rules**
- Crimson stays rare. If a screen has more than a few crimson elements, remove some.
- Text on ivory is `navy`; secondary text is `text-muted-foreground`
  (`hsl(220 10% 40%)`). Text on dark is `ivory` at reduced opacity (`ivory/65`,
  `ivory/45`).
- Hairlines are `border-navy/10`. Do not use heavier borders.
- Don't introduce new colours. Brand logos may keep their own official colours.
- WhatsApp buttons use a deliberately desaturated green (`#1B6E45`) so they
  don't fight the crimson.

shadcn semantic tokens (`--background`, `--primary`, `--accent`, `--border`…) are
mapped onto this palette in `global.css`; prefer the named brand colours in new
code.

---

## 3. Typography

| Role | Font |
|---|---|
| Display / headings (`font-display`) | **Manrope** |
| Body (`font-sans`) | **Inter** |

Loaded from Google Fonts with `display=swap`; both fall back to
`ui-sans-serif, system-ui`. Weights in practice: **light (300)** for headlines,
**medium (500)** for UI and labels, **semibold (600)** for emphasis. Don't use
bold for headlines — the lightness is the look.

Custom size tokens (each bundles size, line-height and tracking):

| Class | Size | Line-height | Tracking | Use |
|---|---|---|---|---|
| `text-display` | `clamp(3rem, 7vw, 7rem)` | **1.32** | −0.04em | Hero headline only |
| `text-section` | `clamp(2.25rem, 4.4vw, 4rem)` | 1.02 | −0.035em | Section / page headings |
| `text-stat` | `clamp(3rem, 6vw, 5.5rem)` | 0.9 | −0.04em | Big numbers |
| `text-label` | `0.6875rem` (11px) | 1 | 0.18em | Small-caps eyebrows, breadcrumbs |
| `label-xs` | 12px mobile → 10px at `sm`+ | — | — | Micro labels: spec keys, product codes, badges |

Letter-spacing utilities: `tracking-editorial` (−0.03em, headings),
`tracking-tightest` (−0.045em), `tracking-label` (0.18em, uppercase labels).

**Hard-won rules**
- `text-display` line-height is 1.32 on purpose. The Hero headline reveals each
  line inside an `overflow: hidden` mask (`.line-mask`); anything tighter clips
  descenders (the tail of *g*, *p*, *y*). Do not tighten it, and keep
  `.line-mask` out of anywhere that doesn't need it.
- Uppercase labels are written in normal case in JSX and uppercased by CSS.
- Below `sm` (640px), `text-label`, `.eyebrow` and `.eyebrow-muted` lift to
  12px, and `label-xs` is 12px. Don't go under 12px on phones.

---

## 4. Layout & spacing

- **Container:** `.shell` — `max-w-[1440px]`, centred, side padding
  `px-5 sm:px-8 lg:px-12`.
- **Section rhythm:** `.section` — `py-20 md:py-28 lg:py-36`.
- **Section header:** always `SectionHeading` (eyebrow → oversized title →
  optional subtitle → optional right-aligned action). Never hand-roll one, or the
  vertical rhythm drifts.
- **Eyebrow:** crimson, uppercase, `tracking-label`, preceded by a 32px crimson
  hairline.
- **Grids:** hairline-divided grids use the gap-px trick —
  `grid gap-px overflow-hidden rounded-panel border border-navy/10 bg-navy/10`
  with `bg-ivory` cells (see `WhyChooseUs`, `ShowroomSection`).
- **Breakpoints:** Tailwind defaults. The layout is mobile-first; `lg` (1024px)
  is where the full editorial composition begins.

Radii: `rounded-card` 28px (cards, image tiles), `rounded-panel` 36px (large
panels), buttons and nav are fully pill (`rounded-full`). Small tiles use
`rounded-2xl`.

Shadows are quiet: `shadow-soft`, `shadow-lift` (hover), `shadow-nav`,
`shadow-glass`. Never stack custom heavy shadows.

---

## 5. Motion

- **Easing:** `ease-premium` = `cubic-bezier(0.22, 1, 0.36, 1)` everywhere.
  `ease-smooth` for simple colour fades.
- **Scroll reveal:** wrap in `<Reveal delay={n}>` (`.reveal`: fade + 28px rise,
  0.9s). Stagger siblings by 60–90ms.
- **Hero entrance:** `animate-fade-up` with explicit `animationDelay`s, plus the
  `.line-mask` headline.
- **Brand tiles:** `.brand-tile` reveal animates opacity, rise, scale and blur
  once, then stays still.
- **Hover:** small and physical — lift 1–4px, scale ≤ 1.03, border/background
  shifts. No rotation, bounce, glow or looping motion.
- **Marquee:** the only continuous motion, and it is a slow, low-contrast
  typographic band.
- **Reduced motion:** `prefers-reduced-motion: reduce` kills animation globally
  in `global.css` and forces `.reveal` / `.brand-tile` visible. Any new
  animation must degrade the same way.
- **Touch:** don't gate content behind hover. If an interaction needs hover,
  detect it with `(hover: hover) and (pointer: fine)` and let touch navigate
  directly.
- **No animation library.** GSAP and similar were deliberately not adopted;
  CSS transitions, `IntersectionObserver` and one rAF-batched listener are the
  toolkit.

---

## 6. Components

### Buttons — `ui/button.jsx`
Pill-shaped, `font-medium`, 500ms premium easing, icon nudges on hover.

Variants: `default` (navy), `accent` (crimson), `outline`, `outlineLight`
(on dark), `light`, `glass`, `soft`, `whatsapp`, `ghost`, `link`.
Sizes: `sm` 40px, `default` 48px, `lg` 56px, `xl` 60px, `icon` 44px, `iconLg` 56px.
Use `asChild` to render a router `Link` or `<a>` with button styling.

### Badges — `ui/badge.jsx`
Pill, uppercase, `label-xs`. Variants: `default`, `accent` (the "New" badge),
`outline`, `soft`, `glass` ("Made to order"), `muted`.

### Cards
- **ProductCard** — 4:5 image (`rounded-card`), category/collection micro-label,
  title in `font-display`, price or "Request Price" in crimson, product code.
  Hover: image scales 1.06, WhatsApp quick-action fades in.
- **CategoryCard** — one big tappable tile, dark gradient scrim, number + count
  chip top, title + description + circular arrow bottom.
- **FloatingStatCard** — one number, one label, optional caption; sits over a
  photo edge.

### Brand wall — `BrandWall` / `BrandTile`
A large `ivory-warm` panel; every logo sits alone on its own row. Tiles reveal
once on scroll, nudge a few px toward the cursor (fine pointers only), and lift on
hover. Logo size is normalised per brand (`size: compact | medium | wide` in
`src/data/brands.js`) for *optical* balance, not equal pixel width.

### Logo — `Logo.jsx`
Rendered inline from vector paths (`brandArtwork.js`), not an `<img>`.
`variant="full" | "compact" | "mark"`, `light` for dark backgrounds. Standalone
files live in `public/images/brand/`.

### Glass — `GlassSurface`, `GradualBlur`
Used sparingly: the scrolled navbar pill, the Hero's floating cards, stat cards,
and soft blur-fades at the edges of horizontal rails and the page foot.
`backdrop-filter: url()` is Chromium-only; other browsers get a frosted fallback.
Both are decorative and `pointer-events: none`.

### Other shared pieces
`SectionHeading`, `PageHeader` (page title + breadcrumbs), `Reveal`,
`SmartImage`, `Marquee`, `Seo`, `ProductFilter*`, `ProductGallery`,
`EnquiryForm` (routes to WhatsApp / mailto / endpoint via `siteConfig`).

---

## 7. Imagery

All photography is Royal Decor's own. It is real, uneven, phone-shot showroom
work, so presentation matters more than usual.

- **Every `<img>` goes through `SmartImage`** — lazy loading, responsive
  `srcset`, fade-in, and a sand placeholder so there's no white flash.
- **File set:** each photo ships as `name.webp` plus `name-800.webp` and
  `name-1200.webp`. Widths are read from `src/config/imageManifest.json`
  (regenerated on every build) so `srcset` reports true sizes. A photo with no
  companions still works, it just serves one size.
- **Format:** WebP. Re-encode over-heavy files rather than shipping them.
- **Aspect ratio:** the image box must match the photo's own ratio, or
  `object-cover` crops it. Product cards are fixed at 4:5, so pre-crop
  landscape photos to 4:5 rather than changing the card. The showroom storefront
  box is `aspect-[900/1683]` to match its file exactly.
- **Crops, not distortion:** never stretch. Crop out letterbox bars, phone UI and
  burnt-in timestamps where possible.
- **No duplicates:** one photo should not be the *primary* image of two products
  or two category tiles.
- **Replace in place:** drop the new file at the same path, regenerate the
  variants, and the registry (`src/config/images.js`) keeps working.

---

## 8. Single sources of truth

Never hard-code these elsewhere:

| What | Where |
|---|---|
| Phone, WhatsApp, email, address, hours, domain, rating, social | `src/config/siteConfig.js` |
| Products and categories (counts, filters, sitemap derive from these) | `src/data/products.js` |
| Brands shown on the wall | `src/data/brands.js` |
| Stats, testimonials, story copy | `src/data/content.js` |
| Image slots | `src/config/images.js` |

`index.html` (meta description, share image, JSON-LD) and `robots.txt` /
`sitemap.xml` are **generated from `siteConfig`** at build. Don't edit their
contents by hand.

---

## 9. Accessibility & performance baselines

- Skip-to-content link, visible `:focus-visible` rings (crimson), one `<h1>` per
  page, labelled icon buttons, semantic landmarks, `aria-labelledby` on sections.
- Touch targets ≥ 44px where possible. Small visual elements (e.g. carousel
  dots) grow their hit area with a pseudo-element rather than changing the look.
- No horizontal overflow at 320 / 375 / 390 / 430 / 768 / 1024 / 1440px.
- Route-level code splitting; Home is the only eager route.
- Decorative effects must be skippable: reduced motion, coarse pointer, and
  non-Chromium all have a fallback.

---

## 10. Before you ship a UI change

1. Uses existing tokens — no new colours, radii, fonts or easings.
2. Section built from `.section` + `.shell` + `SectionHeading`.
3. Images through `SmartImage`, box matches the photo's ratio.
4. Checked at 390px and 1440px: no overflow, nothing under 12px on mobile.
5. Reduced-motion and touch behaviour considered.
6. `npm run build` passes (it also regenerates the sitemap, robots and image
   manifest).
