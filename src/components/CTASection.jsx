import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { SmartImage } from '@/components/SmartImage';
import { images } from '@/config/images';
import { siteConfig } from '@/config/siteConfig';

export function CTASection() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="shell">
        <Reveal className="grain relative overflow-hidden rounded-panel bg-navy-deep">
          {/* Background photograph, heavily dimmed */}
          <SmartImage
            src={images.ctaBackground}
            alt=""
            aria-hidden="true"
            width={1920}
            sizes="100vw"
            wrapperClassName="absolute inset-0 h-full w-full"
            className="opacity-35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/40"
          />

          <div className="relative px-6 py-20 text-center sm:px-10 md:py-28 lg:px-16">
            <p className="text-label font-medium uppercase tracking-label text-crimson-light">
              Visit us
            </p>

            <h2 className="mx-auto mt-6 max-w-3xl text-section font-light text-ivory">
              Come see it for yourself.
            </h2>

            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-ivory/60">
              Visit our showroom and experience the collection in person —
              no appointment needed, though we are happy to reserve time with a designer.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="light" size="lg">
                <a href={siteConfig.GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
                  Get Directions
                  <ArrowUpRight className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </Button>
              <Button asChild variant="outlineLight" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>

            <p className="mt-10 text-xs text-ivory/40">
              {siteConfig.ADDRESS_LINE_1} · {siteConfig.OPENING_HOURS_SHORT}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CTASection;
