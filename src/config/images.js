/**
 * ------------------------------------------------------------------
 *  CENTRAL IMAGE REGISTRY
 *
 *  Every image on the site resolves through here, so the whole site can
 *  be re-shot without touching a single component.
 *
 *  These are Royal Decor's own photographs, taken from the showroom's
 *  business listing gallery and re-encoded as WebP. Each one ships at
 *  full size plus `-800` and `-1200` companions, and `imgSrcSet()`
 *  offers whichever of those actually exist so a phone never downloads
 *  the large file.
 *
 *  To replace a photo: drop the new file in /public/images/… (ideally
 *  with -800 and -1200 variants beside it) and change the path below.
 *  Widths come from `imageManifest.json`, regenerated on every build —
 *  so a new photo with no companions still works, it just serves one
 *  size until the smaller variants are added.
 * ------------------------------------------------------------------
 */

import manifest from '@/config/imageManifest.json';

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
 *
 * Local images advertise each companion at its true measured width, so
 * the browser can pick the smallest file that still covers the slot.
 * A variant is only listed if it exists on disk — and never if it is
 * as wide as the original, which would just be a bigger download for
 * the same pixels. Remote ids use the CDN's width parameter.
 */
export function imgSrcSet(src, widths = [480, 768, 1024, 1440, 1920]) {
  if (!src || src.startsWith('data:')) return undefined;

  if (src.startsWith('/')) {
    const match = src.match(/\.(webp|jpe?g|png)$/);
    if (!match) return undefined;

    const fullWidth = manifest[src];
    if (!fullWidth) return undefined;

    const stem = src.slice(0, -match[0].length);
    const candidates = [];

    for (const step of [800, 1200]) {
      const variant = `${stem}-${step}${match[0]}`;
      const variantWidth = manifest[variant];
      if (variantWidth && variantWidth < fullWidth) {
        candidates.push(`${variant} ${variantWidth}w`);
      }
    }

    candidates.push(`${src} ${fullWidth}w`);
    return candidates.length > 1 ? candidates.join(', ') : undefined;
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
  // showroomInterior is the current shopfront signage (tall portrait —
  // the wrapper's aspect ratio in ShowroomSection.jsx must match this
  // file's own dimensions exactly, or object-cover crops it) —
  // showroomWide is the consultation desk and curtain display wall
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
  categoryWallpaper: '/images/products/wallpaper-cover.webp',
  categoryFlooring: '/images/products/flooring-rug-cover.webp',
  categoryBedding: '/images/products/mattress-quilted.webp',
  categorySofas: '/images/rooms/sofa-cream-pair.webp',

  // Social grid — a mix of installed work and showroom stock.
  social: [
    '/images/products/blinds-printed-kids.webp',
    '/images/products/wallpaper-forest.webp',
    '/images/products/flooring-swatches.webp',
    '/images/rooms/living-carpet.webp',
    '/images/products/wallpaper-cover.webp',
    '/images/products/turf-pattern.webp',
  ],
};
