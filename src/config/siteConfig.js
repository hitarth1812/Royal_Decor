/**
 * ------------------------------------------------------------------
 *  SINGLE SOURCE OF TRUTH FOR ALL BUSINESS INFORMATION.
 *  Nothing here is hardcoded anywhere else in the application.
 *
 *  Details below come from the Royal Decor Google Business listing
 *  (Home Goods Store, Tadwadi, Surat) and the three contact numbers
 *  supplied by the owner.
 *
 *  Values still marked NEEDS CONFIRMATION are best guesses — please
 *  correct them before the site goes live.
 * ------------------------------------------------------------------
 */

export const siteConfig = {
  // --- Deployment --------------------------------------------------
  // NEEDS CONFIRMATION: set this to the real domain once registered.
  // Drives canonical URLs and the generated sitemap.
  SITE_URL: 'https://royaldecor.example.com',

  // --- Brand -------------------------------------------------------
  // Empty = use the supplied logo artwork drawn inline by Logo.jsx.
  // Point these at files in /public/images/brand/ to override.
  LOGO_IMAGE: '',
  LOGO_IMAGE_LIGHT: '',

  SHOWROOM_NAME: 'ROYAL DECOR',
  SHOWROOM_TAGLINE: 'Exclusive Home Furnishing & Decor, Surat',
  SHOWROOM_DESCRIPTION:
    'A home furnishing and decor showroom on Rander Road, Tadwadi — curtains, blinds, wallpapers, carpets, mattresses and flooring, chosen for people who care how a space feels, not just how it looks.',
  ESTABLISHED_YEAR: 2012,
  CITY: 'Surat',

  // --- Contact -----------------------------------------------------
  // Primary number: drives every one-tap Call button.
  PHONE: '+91 98254 51533',
  PHONE_RAW: '+919825451533',

  // Secondary number: listed alongside the primary in the footer,
  // contact page and showroom page. Also the WhatsApp number.
  PHONE_SECONDARY: '+91 93277 35959',
  PHONE_SECONDARY_RAW: '+919327735959',

  WHATSAPP: '919327735959', // international format, digits only

  EMAIL: 'hiral.j.khatiwala@gmail.com',

  // --- Location ----------------------------------------------------
  ADDRESS_LINE_1: 'Tadwadi Main Road, Rander Road',
  ADDRESS_LINE_2: 'Surat, Gujarat 395009',
  ADDRESS_LANDMARK: 'Opposite SMC West Zone Office & BRTS bus stand, opp. Vijay Sales, near Monginis Cake',
  ADDRESS_FULL:
    'Opp. SMC West Zone Office, BRTS bus stand, Tadwadi Main Road, Rander Road, opp. Vijay Sales, near Monginis Cake, Tadwadi, Surat, Gujarat 395009',

  GOOGLE_MAPS_URL:
    'https://www.google.com/maps/search/?api=1&query=Royal+Decor+Tadwadi+Main+Road+Rander+Road+Surat',
  GOOGLE_MAPS_EMBED_URL:
    'https://www.google.com/maps?q=Royal+Decor+Tadwadi+Main+Road+Rander+Road+Surat+395009&output=embed',

  // --- Reputation --------------------------------------------------
  GOOGLE_RATING: 4.4,
  GOOGLE_REVIEW_COUNT: 47,
  GOOGLE_REVIEWS_URL:
    'https://www.google.com/search?q=royal+decor+surat#lrd=0x0:0x0,1',

  // --- Hours -------------------------------------------------------
  // Sunday (09:00 — 12:30) and the Monday 09:00 opening are from the
  // Google listing.
  OPENING_HOURS: [
    { days: 'Monday — Saturday', hours: '09:00 — 20:30' },
    { days: 'Sunday', hours: '09:00 — 12:30' },
  ],
  OPENING_HOURS_SHORT: 'Mon — Sat, 9:00 to 20:30 · Sun till 12:30',

  // --- Social ------------------------------------------------------
  INSTAGRAM_URL: 'https://www.instagram.com/royaldecor.surat/',
  INSTAGRAM_HANDLE: '@royaldecor.surat',
  // NEEDS CONFIRMATION: no Facebook page was found.
  FACEBOOK_URL: 'https://facebook.com/',
  PINTEREST_URL: 'https://pinterest.com/',

  // --- Enquiry routing --------------------------------------------
  // 'whatsapp' (default) | 'mailto' | 'endpoint'
  ENQUIRY_METHOD: 'whatsapp',
  // Drop a Formspree / FormSubmit / Basin URL here and switch
  // ENQUIRY_METHOD to 'endpoint' to post the form instead.
  ENQUIRY_ENDPOINT: '',

  CURRENCY_SYMBOL: '₹',
  CURRENCY_LOCALE: 'en-IN',
};

/** Formats a number as showroom currency, or returns the request-price label. */
export function formatPrice(price) {
  if (price == null) return 'Request Price';
  return (
    siteConfig.CURRENCY_SYMBOL +
    new Intl.NumberFormat(siteConfig.CURRENCY_LOCALE).format(price)
  );
}

/** Builds a wa.me link with a pre-filled message. */
export function whatsappLink(message) {
  return `https://wa.me/${siteConfig.WHATSAPP}?text=${encodeURIComponent(message)}`;
}

/** Pre-filled WhatsApp enquiry for a specific product. */
export function productWhatsappLink(product) {
  return whatsappLink(
    `Hello ${siteConfig.SHOWROOM_NAME}, I am interested in the ${product.name} (Product Code: ${product.productCode}). Please share more details and availability.`
  );
}

/** Generic showroom-visit enquiry. */
export function generalWhatsappLink() {
  return whatsappLink(
    `Hello ${siteConfig.SHOWROOM_NAME}, I'd like to know more about your collection and plan a showroom visit.`
  );
}

export const telLink = `tel:${siteConfig.PHONE_RAW}`;
export const telLinkSecondary = `tel:${siteConfig.PHONE_SECONDARY_RAW}`;
export const mailLink = `mailto:${siteConfig.EMAIL}`;

/**
 * Every showroom number, in the order they should be listed.
 * The footer, contact page and showroom page all render this array —
 * add or remove an entry here and all three update.
 */
export const phoneNumbers = [
  { label: siteConfig.PHONE, href: telLink, role: 'Phone' },
  { label: siteConfig.PHONE_SECONDARY, href: telLinkSecondary, role: 'Phone (alternate)' },
];
