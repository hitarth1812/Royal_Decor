import { Compass, Layers, LifeBuoy, Ruler } from 'lucide-react';

import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { values } from '@/data/content';

// Monochrome line icons only — no colour, no fill.
const iconMap = { Layers, Ruler, Compass, LifeBuoy };

export function WhyChooseUs() {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Why this showroom"
          title="Four reasons people make the drive."
          subtitle="We are not the largest floor in the city, and that is the point."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-panel border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => {
            const Icon = iconMap[value.icon];
            return (
              <Reveal key={value.number} delay={i * 90} className="h-full">
                <div className="group flex h-full flex-col bg-ivory p-8 transition-colors duration-500 ease-premium hover:bg-ivory-warm md:p-9">
                  <div className="flex items-start justify-between">
                    <Icon
                      className="size-6 text-navy transition-colors duration-500 group-hover:text-crimson"
                      strokeWidth={1.25}
                    />
                    <span className="font-display text-4xl font-light text-navy/12 transition-colors duration-500 group-hover:text-crimson/30">
                      {value.number}
                    </span>
                  </div>

                  <h3 className="mt-12 font-display text-xl font-medium tracking-editorial text-navy">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
