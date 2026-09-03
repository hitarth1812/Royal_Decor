/**
 * ------------------------------------------------------------------
 *  CENTRAL IMAGE REGISTRY
 *
 *  Every image on the site resolves through here, so the whole site can
 *  be re-shot without touching a single component.
 *
 *  These are Royal Decor's own photographs, taken from the showroom's
 *  business listing gallery and re-encoded as WebP. Each one ships in
 *  two widths — `name.webp` (1600px) and `name-800.webp` — and
 *  `imgSrcSet()` offers both so phones never download the large file.
 *
 *  To replace a photo: drop the new file in /public/images/… (ideally
 *  with an -800 variant beside it) and change the path below.
 * ------------------------------------------------------------------
 */

const REMOTE_BASE = 'https://images.unsplash.com/';

/**
 * Resolves an image source at a given width.
 * Local paths are returned as-is; a bare id is treated as a remote
 * photo and served as WebP at the requested width.
 */
export function img(src, width = 1200, quality = 72) {
  if (!src) return '';
  if (src.startsWith('/') || src.startsWith('data:') || src.startsWith('http')) return src;
  return `${REMOTE_BASE}${src}?auto=format&fit=crop&fm=webp&w=${width}&q=${quality}`;
}

/**
 * Builds a responsive srcset.
 * Local images use the `-800` companion file; remote ids use the
 * CDN's width parameter.
 */
export function imgSrcSet(src, widths = [480, 768, 1024, 1440, 1920]) {
  if (!src || src.startsWith('data:')) return undefined;

  if (src.startsWith('/')) {
    // Local files ship a -800 companion beside the full-res original,
    // whatever the extension — most are .webp, the wallpaper cover is .jpg.
    const match = src.match(/\.(webp|jpe?g|png)$/);
    if (!match) return undefined;
    const small = src.slice(0, -match[0].length) + '-800' + match[0];
    return `${small} 800w, ${src} 1600w`;
  }

  if (src.startsWith('http')) return undefined;
  return widths.map((w) => `${img(src, w)} ${w}w`).join(', ');
}

/* --- Named image slots ------------------------------------------- */
export const images = {
  // Hero and headline visuals.
  // heroMain is the showroom's own blue curved sofa, cropped to lift
  // the burnt-in phone-number bar off the bottom edge.
  heroMain: '/images/rooms/hero-cover.webp',
  heroDetail: '/images/showroom/curtain-display.webp',
  heroAccent: '/images/rooms/living-curtains.webp',

  // Showroom, about and calls to action.
  // showroomInterior is the current shopfront signage (9:16, portrait)
  // — showroomWide is the consultation desk and curtain display wall
  // (16:9, landscape). Both containers are sized to each photo's own
  // aspect ratio so neither is cropped.
  showroomInterior: '/images/showroom/storefront-live.webp',
  showroomWide: '/images/showroom/consultation-desk.webp',
  aboutStudio: '/images/showroom/fabric-rail.webp',
  aboutCraft: '/images/showroom/fabric-hanging.webp',
  ctaBackground: '/images/rooms/living-wide.webp',
  contactVisual: '/images/showroom/shelves.webp',

  // Category tiles.
  categoryCurtains: '/images/products/curtains-pleated.webp',
  categoryBlinds: '/images/showroom/blinds-display.webp',
  // The wallpaper cover ships as JPEG rather than WebP — it is reused
  // as the Open Graph preview image, where JPEG has the widest support.
  categoryWallpaper: '/images/products/wallpaper-cover.jpg',
  categoryFlooring: '/images/products/flooring-rug-cover.webp',
  categoryBedding: '/images/products/mattress-quilted.webp',
  categorySofas: '/images/rooms/sofa-cream-pair.webp',

  // Social grid — a mix of installed work and showroom stock.
  social: [
    '/images/products/blinds-printed-kids.webp',
    '/images/products/wallpaper-forest.webp',
    '/images/products/flooring-swatches.webp',
    '/images/rooms/living-carpet.webp',
    '/images/products/wallpaper-cover.jpg',
    '/images/products/turf-pattern.webp',
  ],
};
