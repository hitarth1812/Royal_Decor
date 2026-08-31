# Royal Decor — Premium Showroom Website

A frontend-only showroom website built with **React + Vite + Tailwind CSS + shadcn/ui**.
No database, no backend, no authentication — it deploys anywhere static.

Every enquiry route (WhatsApp, phone, directions, contact form) is driven from a single
config file, and the whole product catalogue lives in one data file.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # generates sitemap.xml, then builds to dist/
npm run preview  # preview the production build
```

---

## The three files you will actually edit

### 1. `src/config/siteConfig.js` — all business information

Phone numbers, email, address, Google Maps links, opening hours, social URLs,
brand name and the site URL. **Nothing is hardcoded anywhere else in the application.**

Populated with the real Royal Decor details (Home Goods Store, Tadwadi, Surat):

```js
SHOWROOM_NAME: 'ROYAL DECOR',
PHONE_RAW:           '+919824235959',   // primary — every Call button + WhatsApp
PHONE_SECONDARY_RAW: '+919825451533',   // listed alongside it
PHONE_TERTIARY_RAW:  '+919327735959',   // the Google Business listing number
WHATSAPP: '919824235959',               // wa.me — digits only, no +
ADDRESS_LINE_1: 'Bejanwala Complex, Rander Road, Tadwadi',
ADDRESS_LINE_2: 'Surat, Gujarat 395009',
ADDRESS_LANDMARK: 'Opposite Vijay Sales & SMC, near Monginis Cake, by the BRTS bus stand',
ESTABLISHED_YEAR: 2007,
GOOGLE_RATING: 4.4,  GOOGLE_REVIEW_COUNT: 47,
INSTAGRAM_URL: 'https://www.instagram.com/royaldecor.surat/',
```

The primary number drives every one-tap Call button and all WhatsApp enquiries.
All three appear together in the footer, the contact page and the showroom page,
rendered from the `phoneNumbers` array at the bottom of the file — add, reorder
or remove an entry there and all three pages follow.

### ⚠ Values still to confirm

Search `NEEDS CONFIRMATION` in `siteConfig.js`. As of the last update:

| Value | Status |
| ----- | ------ |
| `SITE_URL` | placeholder domain — set before deploying (drives canonical URLs + sitemap) |
| `EMAIL` | no public address was listed; currently a guess |
| Weekday closing time | Google publishes only "opens 9 am"; `21:00` is an assumption |
| `FACEBOOK_URL` | no page found — remove the icon or add the real link |
| `stats` middle two figures | "500+ products" / "12+ ranges" in `src/data/content.js` are placeholders |
| `testimonials` | placeholder quotes, **not real customers** — replace with real Google reviews |
| Product prices | every product is `price: null` ("Request Price"). Add real numbers and the price filter + price sorting switch themselves back on automatically |

### Logo

The real logo artwork lives as vector paths in
`src/components/brandArtwork.js` and is rendered inline by
`src/components/Logo.jsx`. Inline rather than an `<img>`, because that buys
three things a flat file cannot:

- no white background box on the ivory or dark sections
- a **light variant** — the black artwork becomes ivory for the footer and
  mobile menu, and EXCLUSIVE lifts to a readable tint of its navy
- a **compact crop** for the navigation, where the EXCLUSIVE line would
  otherwise render too small to read

```jsx
<Logo />                      // full lockup, incl. EXCLUSIVE (footer)
<Logo variant="compact" />    // monogram + wordmark + rule (navigation)
<Logo variant="mark" />       // the R monogram alone
<Logo light />                // for dark backgrounds
```

The same artwork is also written out as standalone files for use outside the
site — email signatures, print, social profiles:

```
public/images/brand/royal-decor-logo.svg        transparent, full colour
public/images/brand/royal-decor-logo-light.svg  for dark backgrounds
public/images/brand/royal-decor-mark.svg        monogram only
public/favicon.svg                              monogram on the logo black
```

**If the logo is ever redrawn**, either replace all three path strings in
`brandArtwork.js` together, or skip the paths entirely and point
`siteConfig.js` at a file — that overrides the inline artwork everywhere:

```js
LOGO_IMAGE: '/images/brand/new-logo.svg',
LOGO_IMAGE_LIGHT: '/images/brand/new-logo-light.svg',
```

### 2. `src/data/products.js` — the catalogue

18 sample products. Add, remove or edit entries; the category counts, collection
listings, filter options, price range, sitemap and related-product suggestions are
all **derived** from this array, so nothing else needs updating.

```js
{
  id: 19,
  slug: 'my-new-piece',        // becomes /product/my-new-piece
  name: 'My New Piece',
  category: 'Seating',         // must match a name in `categories` below
  collection: 'Linea',
  price: 28500,                // or `null` to show "Request Price"
  productCode: 'LC-001',
  shortDescription: '...',     // one line, shown on cards
  description: '...',          // full paragraph, shown on the detail page
  images: ['photo-id-or-/images/my-photo.webp', '...', '...'],
  material: '...',
  dimensions: '78 × 82 × 76 cm (W × D × H)',
  colors: ['Oat', 'Charcoal'],
  availability: 'In Stock',    // 'In Stock' | 'Made to Order' | 'Enquire'
  featured: true,              // shows in "Featured pieces" on the home page
  newArrival: true,            // shows in "Just arrived" + adds the NEW badge
  year: 2026,                  // used by the "Newest" sort
}
```

### 3. `src/config/images.js` — the image registry

Every image on the site resolves through here. The photographs are **Royal
Decor's own**, taken from the showroom's business-listing gallery and
re-encoded as WebP.

Each photo ships in two widths so phones never download the large file:

```
/images/products/curtains-pleated.webp       1600px
/images/products/curtains-pleated-800.webp    800px
```

`imgSrcSet()` offers both automatically. To swap a photo, drop the new file
into `/public/images/…` (ideally with an `-800` companion) and change the path:

```js
heroMain: '/images/rooms/hero-cover.webp',   // the site's cover photo
```

`heroMain` is the **cover photo** — the large image in the hero, and the
`og:image` used when the site is shared on WhatsApp, Facebook or Google.
It is currently the blue sofa shot, cropped to lift the burnt-in phone-number
bar off the bottom edge (`rooms/sofa-blue.webp` is the uncropped original).

`SmartImage` handles lazy loading, the responsive `srcset`, the fade-in and the
placeholder for every image on the site. Remote URLs still work — a bare photo
id is treated as a remote CDN image — so you can mix in stock photography while
waiting for a professional shoot.

---

## Enquiry routing

Set in `siteConfig.ENQUIRY_METHOD`:

| Value        | Behaviour                                                    |
| ------------ | ------------------------------------------------------------ |
| `'whatsapp'` | **(default)** opens `wa.me` with the enquiry pre-filled       |
| `'mailto'`   | opens the visitor's mail client                               |
| `'endpoint'` | POSTs the form to `siteConfig.ENQUIRY_ENDPOINT`               |

To connect Formspree / FormSubmit / Basin later, paste the URL into
`ENQUIRY_ENDPOINT` and switch `ENQUIRY_METHOD` to `'endpoint'`. No component changes.

Product enquiries pre-fill the product name and code automatically:

> Hello ROYAL DECOR, I am interested in the Linea Lounge Chair (Product Code: LC-001).
> Please share more details and availability.

---

## Deployment

Builds to a static `dist/` folder. The SPA needs all routes rewritten to
`index.html` — config for that is already included:

| Host             | Setup                                                        |
| ---------------- | ------------------------------------------------------------ |
| **Vercel**       | zero config — `vercel.json` is included                       |
| **Netlify**      | zero config — `public/_redirects` is included                 |
| **Cloudflare**   | build `npm run build`, output `dist`                          |
| **GitHub Pages** | needs a hash router or a 404.html fallback (see note below)   |

> GitHub Pages does not support rewrites. Either copy `dist/index.html` to
> `dist/404.html` after building, or swap `BrowserRouter` for `HashRouter`
> in `src/main.jsx`.

Set `SITE_URL` in `siteConfig.js` before deploying — it drives canonical URLs
and the generated `sitemap.xml`.

---

## Project structure

```
src/
├── components/
│   ├── ui/                  shadcn/ui primitives (button, dialog, select, …)
│   ├── Navbar.jsx           floating pill nav + full-screen mobile sheet
│   ├── Hero.jsx             hero with floating glass cards
│   ├── ProductCard.jsx      catalogue card + inline WhatsApp action
│   ├── ProductGrid.jsx      responsive grid + empty state
│   ├── ProductFilter.jsx    desktop rail + mobile bottom sheet + sort
│   ├── ProductGallery.jsx   desktop stage/thumbs, mobile swipe strip
│   ├── EnquiryForm.jsx      validated form, routed via siteConfig
│   ├── Logo.jsx             brand lockup — full / compact / mark, light or dark
│   ├── brandArtwork.js      the logo's vector paths and exact colours
│   ├── GlassSurface.jsx     refractive glass panel, with fallback
│   ├── GradualBlur.jsx      progressive blur for both scroll axes
│   ├── SmartImage.jsx       the only <img> — lazy, responsive, fading
│   ├── Reveal.jsx           IntersectionObserver scroll reveal
│   ├── Seo.jsx              per-route title/meta/OG/JSON-LD
│   └── …                    sections: Stats, Showroom, Testimonials, CTA, Footer
├── pages/                   Home, Collection, Products, ProductDetails,
│                            About, Showroom, Contact, NotFound
├── data/
│   ├── products.js          catalogue + derived categories/collections
│   └── content.js           stats, testimonials, values, story copy
├── config/
│   ├── siteConfig.js        ← all business information
│   └── images.js            ← image registry
├── hooks/                   useReveal, useCountUp, useProductFilters
└── styles/global.css        design tokens, reveal/marquee, reduced motion
```

---

## Design system

Defined once in `tailwind.config.js` and `src/styles/global.css`.

Sampled directly from the logo.

Sampled from the logo file itself — the first three are its exact fill values.

| Token       | Value     | Taken from            | Used for                                     |
| ----------- | --------- | --------------------- | -------------------------------------------- |
| `crimson`   | `#7A1030` | the R, rule, chevrons | primary accent — CTAs, labels, active nav     |
| `navy`      | `#0A0A0A` | the wordmark          | body text, dark sections, primary buttons     |
| `royal`     | `#132257` | "EXCLUSIVE"           | supporting accent, used sparingly             |
| `navy-deep` | `#050505` | —                     | footer, CTA panel                             |
| `ivory`     | `#F7F3EA` | —                     | page background                               |
| `sand`      | `#D8C7AD` | —                     | cards, placeholders, soft fills               |

Crimson is the only loud colour and stays rare — buttons, eyebrow labels, the
active nav item, stat suffixes. Royal blue is quieter still.

Radii: cards `28px`, panels `36px`, buttons and nav fully pill.
Type: Manrope for display, Inter for body. Motion: `cubic-bezier(0.22, 1, 0.36, 1)`.

The shadcn `Button`, `Badge` and `Slider` components have been retuned to this
language — pill radii, brand variants (`accent`, `whatsapp`, `outlineLight`,
`glass`), and a two-thumb price slider.

### Glass and blur effects

Two effect components, both used where they earn their place rather than
everywhere:

**`GlassSurface`** — refractive "liquid glass". A generated displacement map
drives an SVG filter applied as a `backdrop-filter`, and sampling R/G/B at
different scales gives real chromatic fringing at the edges.

```jsx
<GlassSurface borderRadius={28} blur={14} distortionScale={-130} greenOffset={12} blueOffset={22}>
  <h2>Glass Surface Content</h2>
</GlassSurface>
```

Used on: the navigation pill (only once scrolled — `enabled={scrolled}`), the
hero's floating stat and collection cards, and the showroom/about stat cards.
`backdrop-filter: url()` is Chromium-only; every other browser is detected at
runtime and gets a frosted-blur fallback that still looks right.

**`GradualBlur`** — progressive blur edge, stacking `divCount` masked layers so
the blur ramps up smoothly instead of banding.

```jsx
<GradualBlur target="parent" position="right" width="7rem" strength={1.8} divCount={5} curve="bezier" exponential />
```

Used on **both axes**: `target="page" position="bottom"` fades the viewport
foot during vertical scrolling (in `App.jsx`), and `position="left|right"` fades
the horizontal rails — the "Just arrived" carousel, the collection marquee, and
the mobile product-gallery strip.

Both are `pointer-events: none` and purely decorative, so they never intercept
clicks or affect the accessibility tree.

### Adding more shadcn components

```bash
npx shadcn@latest add tooltip
```

`components.json` is already configured (JSX, `@/` alias, `new-york` style).

---

## Accessibility & performance

- Skip-to-content link, visible focus rings, labelled icon buttons, semantic
  landmarks and a single `<h1>` per page.
- `prefers-reduced-motion` disables every animation and reveal.
- Route-level code splitting; the home page is the only route in the main bundle.
- Images are WebP, lazy-loaded, and served with a responsive `srcset`.
- Verified in-browser: no console errors, no horizontal overflow at
  375 / 430 / 768 / 1024 / 1440 px.
