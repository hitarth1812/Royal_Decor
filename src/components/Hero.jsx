import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SmartImage } from '@/components/SmartImage';
import { FloatingStatCard } from '@/components/FloatingStatCard';
import { GlassSurface } from '@/components/GlassSurface';
import { images } from '@/config/images';
import { siteConfig } from '@/config/siteConfig';
import { categories } from '@/data/products';

// Split explicitly so each line fills its own reveal mask and never
// re-wraps mid-animation. The final line carries the accent colour.
const headlineLines = ['Spaces', 'designed', 'to be', 'remembered.'];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-28 sm:pb-20 md:pt-36 lg:pb-0 lg:pt-44">
      {/* Warm ambient wash behind the composition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 hidden size-[42rem] rounded-full bg-sand/35 blur-3xl lg:block"
      />

      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          {/* ---------------- Copy ---------------- */}
          <div className="max-w-2xl">
            <p
              className="eyebrow flex animate-fade-up items-center gap-2.5"
              style={{ animationDelay: '120ms' }}
            >
              <span className="h-px w-8 bg-crimson" aria-hidden="true" />
              Curated for modern living
            </p>

            <h1 className="mt-6 font-display text-display font-light text-navy">
              {headlineLines.map((line, i) => (
                <span key={line} className="line-mask">
                  <span
                    style={{ '--line-delay': `${240 + i * 110}ms` }}
                    className={
                      i === headlineLines.length - 1 ? 'font-normal text-crimson' : undefined
                    }
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="mt-7 max-w-lg animate-fade-up text-base leading-relaxed text-muted-foreground md:text-lg"
              style={{ animationDelay: '620ms' }}
            >
              Discover a carefully curated collection designed to bring character,
              comfort and timeless design into every space.
            </p>

            <div
              className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: '760ms' }}
            >
              <Button asChild size="lg">
                <Link to="/products">
                  Explore Collection
                  <ArrowUpRight className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/showroom">
                  Visit Showroom
                  <ArrowUpRight className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </Button>
            </div>

            {/* Small proof row */}
            <div
              className="mt-12 flex animate-fade-up items-center gap-6 border-t border-navy/10 pt-7"
              style={{ animationDelay: '900ms' }}
            >
              <div>
                <p className="font-display text-2xl font-medium text-navy">
                  {new Date().getFullYear() - siteConfig.ESTABLISHED_YEAR}+
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Years on Rander Road</p>
              </div>
              <div className="h-9 w-px bg-navy/10" aria-hidden="true" />
              <div>
                <p className="font-display text-2xl font-medium text-navy">
                  {siteConfig.GOOGLE_RATING}/5
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {siteConfig.GOOGLE_REVIEW_COUNT} Google reviews
                </p>
              </div>
              <div className="hidden h-9 w-px bg-navy/10 sm:block" aria-hidden="true" />
              <div className="hidden sm:block">
                <p className="font-display text-2xl font-medium text-navy">Made</p>
                <p className="mt-1 text-xs text-muted-foreground">to measure &amp; fitted</p>
              </div>
            </div>
          </div>

          {/* ---------------- Visual composition ---------------- */}
          <div className="relative">
            <div className="relative animate-fade-in overflow-hidden rounded-panel">
              <SmartImage
                src={images.heroMain}
                alt="A curved blue leather sofa with green cushions, against fluted glass and timber panelling"
                priority
                width={1440}
                sizes="(max-width: 1024px) 100vw, 55vw"
                wrapperClassName="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[3/2] rounded-panel"
                className="animate-hero-zoom"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-panel bg-gradient-to-t from-navy/35 via-transparent to-transparent"
              />
            </div>

            {/* Floating stat card — bottom left */}
            <FloatingStatCard
              className="mt-5 w-fit animate-fade-up sm:absolute sm:-bottom-9 sm:-left-6 sm:mt-0 lg:-bottom-10 lg:-left-12"
              style={{ animationDelay: '1s' }}
              value={categories.length}
              label="Ranges in store"
              caption="Curtains through to flooring"
            />

            {/* Floating collection card — top right */}
            <div
              className="absolute -top-4 right-3 hidden animate-fade-up rounded-card p-px sm:block lg:-right-8"
              style={{ animationDelay: '1.15s' }}
            >
              <GlassSurface
                borderRadius={28}
                blur={14}
                brightness={62}
                distortionScale={-130}
                className="flex items-center gap-3 px-5 py-4"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-crimson/12 text-crimson">
                  <MapPin className="size-4" />
                </span>
                <span>
                  <span className="block label-xs uppercase tracking-label text-crimson">
                    Visit the showroom
                  </span>
                  <span className="mt-0.5 block font-display text-sm font-semibold text-navy">
                    Rander Road, {siteConfig.CITY}
                  </span>
                </span>
              </GlassSurface>
            </div>

            {/* Small circular detail visual */}
            <div
              className="absolute -left-10 top-8 hidden animate-fade-up lg:block"
              style={{ animationDelay: '1.3s' }}
            >
              <SmartImage
                src={images.heroDetail}
                alt="Detail of a hand-finished oak frame"
                width={320}
                sizes="112px"
                wrapperClassName="size-28 rounded-full ring-8 ring-ivory shadow-lift"
              />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="mt-16 hidden animate-fade-up items-center gap-3 pb-4 lg:flex"
          style={{ animationDelay: '1.4s' }}
        >
          <span className="flex size-10 items-center justify-center rounded-full border border-navy/15">
            <ArrowDown className="size-4 text-navy/60" />
          </span>
          <span className="text-label uppercase tracking-label text-muted-foreground">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
