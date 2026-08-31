/**
 * Generates public/sitemap.xml from the live route list and product
 * catalogue, so a new product is never missing from the sitemap.
 * Runs automatically before every `npm run build`.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import { siteConfig } from '../src/config/siteConfig.js';
import { products } from '../src/data/products.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const base = siteConfig.SITE_URL.replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { path: '/', priority: '1.0', freq: 'weekly' },
  { path: '/collection', priority: '0.9', freq: 'weekly' },
  { path: '/products', priority: '0.9', freq: 'weekly' },
  { path: '/showroom', priority: '0.8', freq: 'monthly' },
  { path: '/about', priority: '0.6', freq: 'monthly' },
  { path: '/contact', priority: '0.7', freq: 'monthly' },
];

const urls = [
  ...staticRoutes,
  ...products.map((p) => ({ path: `/product/${p.slug}`, priority: '0.8', freq: 'monthly' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${base}${u.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(root, 'public/sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml — ${urls.length} URLs`);
