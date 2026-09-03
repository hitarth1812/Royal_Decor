import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import { Facebook, Instagram } from '@/components/BrandIcons';

import { Logo } from '@/components/Logo';
import { Separator } from '@/components/ui/separator';
import { generalWhatsappLink, mailLink, phoneNumbers, siteConfig } from '@/config/siteConfig';
import { categories } from '@/data/products';

const pageLinks = [
  { label: 'Home', to: '/' },
  { label: 'Collection', to: '/collection' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Showroom', to: '/showroom' },
  { label: 'Contact', to: '/contact' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-ivory">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* ---- Brand ---- */}
          <div>
            <Logo light size="lg" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/55">
              {siteConfig.SHOWROOM_DESCRIPTION}
            </p>

            <div className="mt-7 flex gap-2.5">
              {[
                { href: siteConfig.INSTAGRAM_URL, icon: Instagram, label: 'Instagram' },
                { href: siteConfig.FACEBOOK_URL, icon: Facebook, label: 'Facebook' },
                { href: generalWhatsappLink(), icon: MessageCircle, label: 'WhatsApp' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 text-ivory/80 transition-colors duration-500 hover:border-crimson hover:bg-crimson hover:text-white"
                >
                  <Icon className="size-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* ---- Pages ---- */}
          <nav aria-label="Footer">
            <h2 className="label-xs uppercase tracking-label text-ivory/40">Navigate</h2>
            <ul className="mt-6 space-y-3">
              {pageLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="link-underline text-sm text-ivory/70 transition-colors duration-300 hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Categories ---- */}
          <nav aria-label="Collections">
            <h2 className="label-xs uppercase tracking-label text-ivory/40">Collections</h2>
            <ul className="mt-6 space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/products?category=${encodeURIComponent(category.name)}`}
                    className="link-underline text-sm text-ivory/70 transition-colors duration-300 hover:text-ivory"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- Contact ---- */}
          <div>
            <h2 className="label-xs uppercase tracking-label text-ivory/40">Visit &amp; contact</h2>

            <ul className="mt-6 space-y-4 text-sm text-ivory/70">
              <li>
                <a
                  href={siteConfig.GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex gap-3 transition-colors duration-300 hover:text-ivory"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-crimson" strokeWidth={1.5} />
                  <span>
                    {siteConfig.ADDRESS_LINE_1}
                    <br />
                    {siteConfig.ADDRESS_LINE_2}
                    <br />
                    <span className="text-ivory/40">{siteConfig.ADDRESS_LANDMARK}</span>
                    <ArrowUpRight className="ml-1 inline size-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-crimson" strokeWidth={1.5} />
                <span className="flex flex-col gap-1">
                  {phoneNumbers.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="link-underline w-fit transition-colors duration-300 hover:text-ivory"
                    >
                      {phone.label}
                    </a>
                  ))}
                </span>
              </li>
              <li>
                <a href={mailLink} className="flex items-center gap-3 transition-colors duration-300 hover:text-ivory">
                  <Mail className="size-4 shrink-0 text-crimson" strokeWidth={1.5} />
                  {siteConfig.EMAIL}
                </a>
              </li>
            </ul>

            <h2 className="mt-8 label-xs uppercase tracking-label text-ivory/40">Opening hours</h2>
            <ul className="mt-4 space-y-2 text-sm text-ivory/55">
              {siteConfig.OPENING_HOURS.map((entry) => (
                <li key={entry.days} className="flex justify-between gap-4">
                  <span>{entry.days}</span>
                  <span className="text-ivory/75">{entry.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-12 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-ivory/40 sm:flex-row">
          <p>
            © {year} {siteConfig.SHOWROOM_NAME}. All rights reserved.
          </p>
          <p>
            Established {siteConfig.ESTABLISHED_YEAR} · {siteConfig.SHOWROOM_TAGLINE}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
