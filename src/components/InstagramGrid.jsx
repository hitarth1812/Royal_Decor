import { ArrowUpRight } from 'lucide-react';

import { Instagram } from '@/components/BrandIcons';

import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { SmartImage } from '@/components/SmartImage';
import { SectionHeading } from '@/components/SectionHeading';
import { images } from '@/config/images';
import { siteConfig } from '@/config/siteConfig';

export function InstagramGrid() {
  return (
    <section className="section bg-ivory-warm">
      <div className="shell">
        <SectionHeading
          eyebrow={siteConfig.INSTAGRAM_HANDLE}
          title="Follow the showroom"
          subtitle="New arrivals, styling notes and finished rooms — posted from the floor as they happen."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {images.social.map((image, i) => (
            <Reveal key={image + i} delay={i * 60}>
              <a
                href={siteConfig.INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                aria-label={`View this post on Instagram (${i + 1} of ${images.social.length})`}
                className="group relative block overflow-hidden rounded-card"
              >
                <SmartImage
                  src={image}
                  alt="Interior styling from the showroom floor"
                  width={600}
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 16vw"
                  wrapperClassName="aspect-square rounded-card"
                  className="transition-transform [transition-duration:1100ms] ease-premium group-hover:scale-110"
                />

                <span className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all duration-500 ease-premium group-hover:bg-navy/45 group-hover:opacity-100">
                  <Instagram className="size-6 text-ivory" strokeWidth={1.5} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <a href={siteConfig.INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <Instagram />
              Follow Us
              <ArrowUpRight className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

export default InstagramGrid;
