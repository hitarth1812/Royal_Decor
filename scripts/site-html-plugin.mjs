/**
 * Fills the {{TOKENS}} in index.html from src/config/siteConfig.js.
 *
 * index.html used to carry its own copy of the phone numbers, address,
 * opening hours and domain. That copy went stale the moment the config
 * changed — it still advertised a retired phone number, the old address
 * and a 21:00 closing time, and pointed every canonical at a placeholder
 * domain. Search engines read this block, so a wrong value there is
 * worse than a wrong value on a page.
 *
 * Now there is one source of truth. This runs in both `vite` (dev) and
 * `vite build`, so what you see locally is what ships.
 */
import { siteConfig as c } from '../src/config/siteConfig.js';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/** "Monday — Saturday" -> [Monday … Saturday];  "Sunday" -> ["Sunday"] */
function expandDays(label) {
  const [from, to] = label.split(/\s*[—–-]\s*/);
  const start = DAYS.indexOf(from);
  const end = to ? DAYS.indexOf(to) : start;
  if (start < 0 || end < start) {
    throw new Error(`site-html-plugin: cannot read opening-hours days "${label}"`);
  }
  return DAYS.slice(start, end + 1);
}

function buildJsonLd() {
  const base = c.SITE_URL.replace(/\/$/, '');

  const data = {
    '@context': 'https://schema.org',
    '@type': 'HomeGoodsStore',
    name: 'Royal Decor',
    description:
      'Home furnishing and decor showroom in Tadwadi, Surat — curtains, blinds, wallpapers, carpets, mattresses and flooring.',
    url: `${base}/`,
    image: `${base}${c.OG_IMAGE}`,
    telephone: [c.PHONE, c.PHONE_SECONDARY],
    email: c.EMAIL,
    foundingDate: String(c.ESTABLISHED_YEAR),
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${c.ADDRESS_LINE_1}, ${c.ADDRESS_LANDMARK}`,
      addressLocality: c.CITY,
      addressRegion: c.REGION,
      postalCode: c.POSTAL_CODE,
      addressCountry: 'IN',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(c.GOOGLE_RATING),
      reviewCount: String(c.GOOGLE_REVIEW_COUNT),
    },
    openingHoursSpecification: c.OPENING_HOURS.map(({ days, hours }) => {
      const [opens, closes] = hours.split(/\s*[—–-]\s*/);
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: expandDays(days),
        opens,
        closes,
      };
    }),
    sameAs: [c.INSTAGRAM_URL],
  };

  // `<` is escaped so no config value can ever close the script tag early.
  return JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
}

export function siteHtml() {
  const base = c.SITE_URL.replace(/\/$/, '');
  const tokens = {
    '{{PHONE}}': c.PHONE,
    '{{RATING}}': String(c.GOOGLE_RATING),
    '{{OG_IMAGE_URL}}': `${base}${c.OG_IMAGE}`,
    '{{JSON_LD}}': buildJsonLd(),
  };

  return {
    name: 'site-html-from-config',
    transformIndexHtml(html) {
      let out = html;
      for (const [token, value] of Object.entries(tokens)) out = out.split(token).join(value);

      const leftover = out.match(/\{\{[A-Z_]+\}\}/g);
      if (leftover) {
        throw new Error(`site-html-plugin: unfilled token(s) in index.html: ${[...new Set(leftover)].join(', ')}`);
      }
      return out;
    },
  };
}
