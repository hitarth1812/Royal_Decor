import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { SmartImage } from '@/components/SmartImage';
import { FloatingStatCard } from '@/components/FloatingStatCard';
import { images } from '@/config/images';
import { generalWhatsappLink, siteConfig, telLink } from '@/config/siteConfig';

export function ShowroomSection() {
  const details = [
    {
      icon: MapPin,
      label: 'Location',
      value: `${siteConfig.ADDRESS_LINE_1}, ${siteConfig.ADDRESS_LINE_2}`,
      caption: siteConfig.ADDRESS_LANDMARK,
      href: siteConfig.GOOGLE_MAPS_URL,
      external: true,
    },
    { icon: Clock, label: 'Opening hours', value: siteConfig.OPENING_HOURS_SHORT },
    { icon: Phone, label: 'Phone', value: siteConfig.PHONE, href: telLink },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Message the showroom',
      href: generalWhatsappLink(),
      external: true,
    },
  ];

  return (
    <section id="showroom" className="section">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ---- Visual ---- */}
          <Reveal className="relative order-2 lg:order-1">
            <SmartImage
              src={images.showroomInterior}
              alt="The Royal Decor Exclusive shopfront on Rander Road"
              width={1200}
              sizes="(max-width: 1024px) 92vw, 45vw"
              wrapperClassName="aspect-[900/1683] rounded-panel"
              className="transition-transform [transition-duration:1400ms] ease-premium hover:scale-[1.03]"
            />

            <FloatingStatCard
              className="absolute -bottom-6 -right-3 sm:right-auto sm:-left-8"
              value={`${siteConfig.GOOGLE_RATING}/5`}
              label="Google rating"
              caption={`From ${siteConfig.GOOGLE_REVIEW_COUNT} reviews`}
            />
          </Reveal>

          {/* ---- Copy ---- */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="eyebrow flex items-center gap-2.5">
                <span className="h-px w-8 bg-crimson" aria-hidden="true" />
                About the showroom
              </p>

              <h2 className="mt-5 text-section font-light text-navy">
                Some designs need to be experienced.
              </h2>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                A photograph cannot tell you how a curtain falls once it is hung, how a
                rug feels underfoot, or how a wallpaper's texture catches afternoon light.
                Our floor is arranged as finished rooms so you can judge scale and colour
                honestly — and touch every fabric before you decide.
              </p>
            </Reveal>

            {/* Detail list */}
            <dl className="mt-10 grid gap-px overflow-hidden rounded-card border border-navy/10 bg-navy/10 sm:grid-cols-2">
              {details.map((detail, i) => {
                const Icon = detail.icon;
                const body = (
                  <>
                    <dt className="flex items-center gap-2 text-[0.625rem] uppercase tracking-label text-muted-foreground">
                      <Icon className="size-3.5" strokeWidth={1.5} />
                      {detail.label}
                    </dt>
                    <dd className="mt-2.5 text-sm leading-relaxed text-navy">{detail.value}</dd>
                    {detail.caption ? (
                      <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {detail.caption}
                      </dd>
                    ) : null}
                  </>
                );

                return (
                  <Reveal key={detail.label} delay={i * 70}>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        target={detail.external ? '_blank' : undefined}
                        rel={detail.external ? 'noreferrer' : undefined}
                        className="block h-full bg-ivory p-6 transition-colors duration-500 hover:bg-sand-light"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="h-full bg-ivory p-6">{body}</div>
                    )}
                  </Reveal>
                );
              })}
            </dl>

            <Reveal delay={160} className="mt-9 flex flex-col gap-3 sm:flex-row">
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
        </div>
      </div>
    </section>
  );
}

export default ShowroomSection;
