import { ArrowUpRight, Check, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/PageHeader';
import { SmartImage } from '@/components/SmartImage';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { TestimonialCarousel } from '@/components/Testimonials';
import { CTASection } from '@/components/CTASection';
import { images } from '@/config/images';
import { generalWhatsappLink, phoneNumbers, siteConfig } from '@/config/siteConfig';
import { showroomHighlights } from '@/data/content';

export default function Showroom() {
  return (
    <>
      <Seo
        title="Visit the Showroom"
        description={`Visit ${siteConfig.SHOWROOM_NAME} at ${siteConfig.ADDRESS_LINE_1}, ${siteConfig.ADDRESS_LINE_2}. Open ${siteConfig.OPENING_HOURS_SHORT}. Get directions, call, or message us on WhatsApp.`}
      />

      <PageHeader
        eyebrow="Visit us"
        title="Experience it in person."
        subtitle="Fourteen thousand square feet arranged as finished rooms — layered lighting, real rugs underfoot, and everything open to sit in."
        breadcrumbs={[{ label: 'Showroom' }]}
      />

      {/* ---- Wide showroom image ---- */}
      <section className="pb-20 md:pb-24">
        <div className="shell">
          <Reveal className="overflow-hidden rounded-panel">
            <SmartImage
              src={images.showroomWide}
              alt="The consultation desk and curtain display wall inside the showroom"
              width={1920}
              priority
              sizes="100vw"
              wrapperClassName="aspect-[16/9] rounded-panel"
            />
          </Reveal>
        </div>
      </section>

      {/* ---- Details + map ---- */}
      <section className="pb-20 md:pb-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Info */}
            <div>
              <Reveal>
                <h2 className="text-section font-light text-navy">
                  Everything you need before you come.
                </h2>
              </Reveal>

              <div className="mt-10 space-y-8">
                <Reveal>
                  <div className="flex gap-5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sand-light text-navy">
                      <MapPin className="size-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="label-xs uppercase tracking-label text-muted-foreground">
                        Address
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-navy">
                        {siteConfig.ADDRESS_LINE_1}
                        <br />
                        {siteConfig.ADDRESS_LINE_2}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {siteConfig.ADDRESS_LANDMARK}
                      </p>
                      <a
                        href={siteConfig.GOOGLE_MAPS_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-label text-crimson"
                      >
                        Get directions
                        <ArrowUpRight className="size-3" />
                      </a>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={70}>
                  <div className="flex gap-5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sand-light text-navy">
                      <Clock className="size-5" strokeWidth={1.5} />
                    </span>
                    <div className="flex-1">
                      <h3 className="label-xs uppercase tracking-label text-muted-foreground">
                        Opening hours
                      </h3>
                      <ul className="mt-3 max-w-sm space-y-2.5">
                        {siteConfig.OPENING_HOURS.map((entry) => (
                          <li
                            key={entry.days}
                            className="flex justify-between gap-4 border-b border-navy/8 pb-2.5 text-sm"
                          >
                            <span className="text-muted-foreground">{entry.days}</span>
                            <span className="text-navy">{entry.hours}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={140}>
                  <div className="flex gap-5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sand-light text-navy">
                      <Phone className="size-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="label-xs uppercase tracking-label text-muted-foreground">
                        Talk to us
                      </h3>
                      <div className="mt-3 flex flex-col gap-2 text-sm">
                        {phoneNumbers.map((phone) => (
                          <a key={phone.href} href={phone.href} className="link-underline w-fit text-navy">
                            {phone.label}
                          </a>
                        ))}
                        <a
                          href={generalWhatsappLink()}
                          target="_blank"
                          rel="noreferrer"
                          className="link-underline w-fit text-navy"
                        >
                          Message us on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={200} className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href={siteConfig.GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
                    Get Directions
                    <ArrowUpRight className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </Button>
                <Button asChild variant="whatsapp" size="lg">
                  <a href={generalWhatsappLink()} target="_blank" rel="noreferrer">
                    <MessageCircle />
                    Book a Visit
                  </a>
                </Button>
              </Reveal>
            </div>

            {/* Map */}
            <Reveal delay={100}>
              <div className="overflow-hidden rounded-panel border border-navy/10">
                <iframe
                  title={`Map to ${siteConfig.SHOWROOM_NAME}`}
                  src={siteConfig.GOOGLE_MAPS_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[26rem] w-full lg:h-full lg:min-h-[32rem]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- What to expect ---- */}
      <section className="section bg-navy">
        <div className="shell">
          <SectionHeading
            light
            eyebrow="What to expect"
            title="Come with a floor plan, leave with a room."
            subtitle="Walk in whenever you like. If you want a designer's undivided attention, message ahead and we will reserve an hour."
          />

          <ul className="mt-14 grid gap-px overflow-hidden rounded-panel bg-white/10 sm:grid-cols-2">
            {showroomHighlights.map((highlight, i) => (
              <Reveal key={highlight} delay={i * 80} as="li" className="h-full">
                <div className="flex h-full items-start gap-4 bg-navy p-8">
                  <Check className="mt-0.5 size-5 shrink-0 text-crimson" strokeWidth={1.5} />
                  <p className="text-base leading-relaxed text-ivory/80">{highlight}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <TestimonialCarousel />
      <CTASection />
    </>
  );
}
