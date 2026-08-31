import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/PageHeader';
import { EnquiryForm } from '@/components/EnquiryForm';
import { SmartImage } from '@/components/SmartImage';
import { Reveal } from '@/components/Reveal';
import { images } from '@/config/images';
import { generalWhatsappLink, mailLink, phoneNumbers, siteConfig } from '@/config/siteConfig';

export default function Contact() {
  const channels = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Usually the fastest reply',
      href: generalWhatsappLink(),
      external: true,
      highlight: true,
    },
    ...phoneNumbers.map((phone) => ({
      icon: Phone,
      label: phone.role,
      value: phone.label,
      href: phone.href,
    })),
    { icon: Mail, label: 'Email', value: siteConfig.EMAIL, href: mailLink },
    {
      icon: MapPin,
      label: 'Showroom',
      value: `${siteConfig.ADDRESS_LINE_1}, ${siteConfig.ADDRESS_LINE_2} — ${siteConfig.ADDRESS_LANDMARK}`,
      href: siteConfig.GOOGLE_MAPS_URL,
      external: true,
    },
    { icon: Clock, label: 'Hours', value: siteConfig.OPENING_HOURS_SHORT },
  ];

  return (
    <>
      <Seo
        title="Contact"
        description={`Send an enquiry to ${siteConfig.SHOWROOM_NAME}, message us on WhatsApp, or call ${siteConfig.PHONE}. We reply within a few hours during opening times.`}
      />

      <PageHeader
        eyebrow="Get in touch"
        title="Tell us what you are looking for."
        subtitle="Send an enquiry and we will reply with availability, finishes and pricing — or simply message us on WhatsApp."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="pb-24 md:pb-32">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
            {/* ---- Form ---- */}
            <Reveal>
              <div className="rounded-panel border border-navy/10 bg-ivory-warm p-6 sm:p-10">
                <h2 className="font-display text-2xl font-light tracking-editorial text-navy">
                  Send an enquiry
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Fields marked * are required. Your enquiry opens in WhatsApp so it
                  reaches the showroom immediately.
                </p>

                <div className="mt-9">
                  <EnquiryForm />
                </div>
              </div>
            </Reveal>

            {/* ---- Channels ---- */}
            <div className="space-y-6">
              <Reveal delay={80}>
                <ul className="overflow-hidden rounded-panel border border-navy/10">
                  {channels.map((channel) => {
                    const Icon = channel.icon;
                    const inner = (
                      <div className="flex items-start gap-4 p-6">
                        <Icon
                          className={
                            channel.highlight
                              ? 'mt-0.5 size-5 shrink-0 text-crimson'
                              : 'mt-0.5 size-5 shrink-0 text-navy/50'
                          }
                          strokeWidth={1.5}
                        />
                        <div>
                          <p className="text-[0.625rem] uppercase tracking-label text-muted-foreground">
                            {channel.label}
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-navy">
                            {channel.value}
                          </p>
                        </div>
                      </div>
                    );

                    return (
                      <li key={channel.value} className="border-b border-navy/10 last:border-b-0">
                        {channel.href ? (
                          <a
                            href={channel.href}
                            target={channel.external ? '_blank' : undefined}
                            rel={channel.external ? 'noreferrer' : undefined}
                            className="block bg-white transition-colors duration-500 hover:bg-sand-light"
                          >
                            {inner}
                          </a>
                        ) : (
                          <div className="bg-white">{inner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>

              <Reveal delay={160}>
                <SmartImage
                  src={images.contactVisual}
                  alt="A quiet corner of the showroom with an armchair and floor lamp"
                  width={800}
                  sizes="(max-width: 1024px) 92vw, 22rem"
                  wrapperClassName="aspect-[4/5] rounded-panel"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
