/**
 * ------------------------------------------------------------------
 *  BRANDS WE SELL — single source of truth for the brand wall.
 *
 *  Real logo files live in `public/images/brand/`, sourced from each
 *  brand's own marketing material. Three names could not be matched to
 *  a confidently-official asset (see `placeholder: true` below) and
 *  fall back to a plain typographic wordmark instead — replace their
 *  `logo` path once a vetted file is available and drop the flag.
 *
 *  NOTE ON NAME MATCHES — flag before shipping:
 *  - `nestra`: the sourced file reads "NESTERRA", not "NESTRA". Confirm
 *    this is the same company before relying on it.
 *  - `excel-wallpaper`: the sourced file is branded "EXCEL Home Decor",
 *    not "Excel Wallpaper" specifically. Likely the same parent brand,
 *    but not confirmed.
 *  - `sleep-guardian` / `wall-empire`: sourced as flat JPEGs with a
 *    white background rather than transparent PNG/SVG — fine on the
 *    ivory sections, but replace with transparent art if it ever shows
 *    on a dark background.
 * ------------------------------------------------------------------
 */

// A restrained typographic stand-in for a brand whose official logo
// hasn't been sourced yet — never a substitute for the real thing.
function placeholderLogo(name) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="120">
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="Manrope, ui-sans-serif, sans-serif" font-size="30"
      font-weight="600" letter-spacing="3" fill="#0A0A0A">${name}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// `size` is the optical width tier used to normalise very different
// logo proportions against each other (a wide wordmark and a compact
// monogram should read as the same visual "weight" on the wall, not
// the same pixel width). `single` marks the brands that sit alone,
// centred, on their own line in the desktop editorial composition —
// see BrandWall's row pattern.
export const brands = [
  { id: 'ddecor', name: "D'DECOR", logo: '/images/brand/ddecor.svg', alt: "D'DECOR logo", placeholder: false, size: 'wide', single: false },
  { id: 'sarom', name: 'SAROM', logo: '/images/brand/sarom.svg', alt: 'Sarom logo', placeholder: false, size: 'medium', single: false },
  { id: 'nestra', name: 'NESTRA', logo: '/images/brand/nestra.png', alt: 'Nestra logo', placeholder: false, size: 'medium', single: true },
  { id: 'asian-paints', name: 'ASIAN PAINTS', logo: '/images/brand/asian-paints.svg', alt: 'Asian Paints logo', placeholder: false, size: 'wide', single: false },
  { id: 'portico', name: 'PORTICO', logo: '/images/brand/portico.svg', alt: 'Portico logo', placeholder: false, size: 'wide', single: false },
  { id: 'welspun', name: 'WELSPUN', logo: '/images/brand/welspun.png', alt: 'Welspun logo', placeholder: false, size: 'wide', single: true },
  { id: 'excel-wallpaper', name: 'EXCEL WALLPAPER', logo: '/images/brand/excel-wallpaper.png', alt: 'Excel Wallpaper logo', placeholder: false, size: 'compact', single: false },
  { id: 'd3', name: 'D3', logo: placeholderLogo('D3'), alt: 'D3 logo', placeholder: true, size: 'compact', single: false },
  { id: 'nu-homes', name: 'NU HOMES', logo: placeholderLogo('NU HOMES'), alt: 'Nu Homes logo', placeholder: true, size: 'compact', single: true },
  { id: 'sleep-guardian', name: 'SLEEP GUARDIAN', logo: '/images/brand/sleep-guardian.jpg', alt: 'Sleep Guardian logo', placeholder: false, size: 'medium', single: false },
  { id: 'signature', name: 'SIGNATURE', logo: placeholderLogo('SIGNATURE'), alt: 'Signature logo', placeholder: true, size: 'compact', single: false },
  { id: 'wall-empire', name: 'WALL EMPIRE', logo: '/images/brand/wall-empire.jpg', alt: 'Wall Empire logo', placeholder: false, size: 'medium', single: true },
];

export default brands;
