import { useEffect } from 'react';

import { siteConfig } from '@/config/siteConfig';

function setMeta(attr, key, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

/** Open Graph requires absolute URLs; local image paths get the site origin. */
function absoluteUrl(path) {
  if (!path) return undefined;
  if (path.startsWith('http')) return path;
  const base = (siteConfig.SITE_URL || window.location.origin).replace(/\/$/, '');
  return base + (path.startsWith('/') ? path : `/${path}`);
}

/**
 * Per-route document head: title, description, canonical, Open Graph,
 * and optional JSON-LD structured data (used by product pages).
 * Keeps SEO declarative without pulling in a helmet dependency.
 */
export function Seo({ title, description, image, structuredData }) {
  const fullTitle = title
    ? `${title} — ${siteConfig.SHOWROOM_NAME}`
    : `${siteConfig.SHOWROOM_NAME} — ${siteConfig.SHOWROOM_TAGLINE}`;

  useEffect(() => {
    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', window.location.href);
    setMeta('property', 'og:image', absoluteUrl(image) ?? absoluteUrl('/images/rooms/hero-cover.webp'));
    setLink('canonical', window.location.href);
  }, [fullTitle, description, image]);

  useEffect(() => {
    if (!structuredData) return undefined;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.route = 'true';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    return () => script.remove();
  }, [structuredData]);

  return null;
}

export default Seo;
