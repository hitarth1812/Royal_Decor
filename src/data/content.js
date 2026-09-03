import { siteConfig } from '@/config/siteConfig';

/**
 * ------------------------------------------------------------------
 *  EDITORIAL CONTENT — stats, testimonials, values, story.
 *  Kept out of the components so copy can be edited without code.
 * ------------------------------------------------------------------
 */

// `years` is derived so it never goes stale. The rating and review
// count are the real Google Business figures; the two middle numbers
// are PLACEHOLDERS — replace them with the showroom's real counts.
export const stats = [
  {
    value: new Date().getFullYear() - siteConfig.ESTABLISHED_YEAR,
    suffix: '+',
    label: 'Years on Rander Road',
  },
  { value: 500, suffix: '+', label: 'Products in store' },
  { value: 12, suffix: '+', label: 'Furnishing ranges' },
  {
    value: siteConfig.GOOGLE_RATING,
    suffix: '/5',
    label: `Google rating · ${siteConfig.GOOGLE_REVIEW_COUNT} reviews`,
    decimals: 1,
  },
];

export const values = [
  {
    number: '01',
    icon: 'Layers',
    title: 'Curated collections',
    description:
      'We buy narrow and deep. Every collection is selected in person, and anything that does not earn its place is not on the floor.',
  },
  {
    number: '02',
    icon: 'Ruler',
    title: 'Materials that age well',
    description:
      'Solid timber, full-grain leather, honed stone and undyed wool — chosen because they improve with use rather than wear out of it.',
  },
  {
    number: '03',
    icon: 'Compass',
    title: 'Guidance, not selling',
    description:
      'Bring a floor plan and our team will work through proportion, light and layout with you before anything is ordered.',
  },
  {
    number: '04',
    icon: 'LifeBuoy',
    title: 'Care after delivery',
    description:
      'White-glove installation, a two-year service promise, and reupholstery or refinishing long after the sale.',
  },
];

// PLACEHOLDER REVIEWS — these are not real customers. Replace them
// with quotes from the showroom's 47 Google reviews before going live.
export const testimonials = [
  {
    id: 1,
    quote:
      'We walked in expecting to browse and left having planned an entire living room. The team measured, sketched and talked us out of two things we did not need.',
    name: 'Ananya Mehta',
    location: 'Adajan, Surat',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'Beautiful collection, genuinely excellent service, and a showroom that feels different from anywhere else in the city. Worth the drive.',
    name: 'Rohan Desai',
    location: 'Vesu, Surat',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'The dining table arrived exactly as specified, three weeks earlier than promised, and the installation team left the house cleaner than they found it.',
    name: 'Priya Nair',
    location: 'Piplod, Surat',
    rating: 5,
  },
  {
    id: 4,
    quote:
      'I specify furniture for a living and this is the only floor in the region I send clients to unaccompanied. The quality is consistent.',
    name: 'Kabir Shah',
    location: 'Interior Designer, Surat',
    rating: 5,
  },
];

export const storyMilestones = [
  { year: '2012', title: 'The first shop', text: 'Opened on Tadwadi Main Road with a single room of curtain fabric and one delivery van.' },
  { year: '2014', title: 'Beyond fabric', text: 'Added wallpapers, wooden flooring and carpets, and began fitting as well as supplying.' },
  { year: '2019', title: 'The design desk', text: 'Added in-house interior consultation so clients could plan whole rooms, not buy single items.' },
  { year: '2026', title: 'The showroom today', text: 'A full home-furnishing floor on Rander Road, arranged as rooms rather than aisles.' },
];

export const showroomHighlights = [
  'Ranges arranged as complete rooms, not product aisles',
  'A materials library of fabrics, wallpapers, carpets and flooring samples',
  'Design consultations by appointment, with floor plans welcome',
  'Made-to-measure curtains, blinds, carpets and flooring, fitted by our team',
];
