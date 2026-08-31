import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/PageHeader';
import { SmartImage } from '@/components/SmartImage';
import { FloatingStatCard } from '@/components/FloatingStatCard';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { StatsSection } from '@/components/StatsSection';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { TestimonialCarousel } from '@/components/Testimonials';
import { CTASection } from '@/components/CTASection';
import { images } from '@/config/images';
import { siteConfig } from '@/config/siteConfig';
import { storyMilestones } from '@/data/content';

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description={`${siteConfig.SHOWROOM_NAME} has been curating furniture, lighting and decor since ${siteConfig.ESTABLISHED_YEAR} — buying narrow and deep, and working directly with the workshops that make the pieces.`}
      />

      <PageHeader
        eyebrow={`Established ${siteConfig.ESTABLISHED_YEAR}`}
        title="A showroom with an opinion."
        subtitle="We buy narrow and deep. That is the whole philosophy — and the reason people cross Surat to see a floor smaller than the one down the road."
        breadcrumbs={[{ label: 'About' }]}
      />

      {/* ---- Story ---- */}
      <section className="pb-20 md:pb-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className="relative">
              <SmartImage
                src={images.aboutStudio}
                alt="The design desk at the showroom, with fabric samples and floor plans"
                width={1200}
                sizes="(max-width: 1024px) 92vw, 45vw"
                wrapperClassName="aspect-[4/5] rounded-panel"
              />
              <FloatingStatCard
                className="absolute -bottom-6 right-4 sm:-right-6"
                value={`${new Date().getFullYear() - siteConfig.ESTABLISHED_YEAR} yrs`}
                label="On Rander Road"
                caption={`Since ${siteConfig.ESTABLISHED_YEAR}`}
              />
            </Reveal>

            <div className="lg:pt-8">
              <Reveal>
                <p className="eyebrow flex items-center gap-2.5">
                  <span className="h-px w-8 bg-crimson" aria-hidden="true" />
                  Our story
                </p>

                <h2 className="mt-5 text-section font-light text-navy">
                  It started with one room and no catalogue.
                </h2>

                <div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground">
                  <p>
                    We opened on Tadwadi Main Road in {siteConfig.ESTABLISHED_YEAR} with a
                    single room of curtain fabric and a delivery van we drove ourselves.
                    There was no catalogue, because there was nothing to put in one — we
                    sold what we had chosen, and we could explain why we had chosen it.
                  </p>
                  <p>
                    Nearly two decades later the floor is considerably larger and the
                    principle has not moved. We still buy in person, still refuse ranges
                    that do not earn their place, and still expect to be asked why
                    something costs what it costs.
                  </p>
                  <p>
                    Much of what we sell is made to measure — curtains, blinds, carpets and
                    flooring cut and fitted for the room they are going into. That is why we
                    would rather you brought us a measurement than a photograph.
                  </p>
                </div>
              </Reveal>

              {/* ---- Timeline ---- */}
              <div className="mt-12 border-t border-navy/10">
                {storyMilestones.map((milestone, i) => (
                  <Reveal key={milestone.year} delay={i * 80}>
                    <div className="flex gap-6 border-b border-navy/10 py-6">
                      <span className="w-14 shrink-0 font-display text-sm font-semibold text-crimson">
                        {milestone.year}
                      </span>
                      <div>
                        <h3 className="font-display text-base font-medium tracking-editorial text-navy">
                          {milestone.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {milestone.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* ---- Craft ---- */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="How we buy"
            title="Materials chosen to age, not to survive."
            subtitle="Solid timber over veneered board where it matters. Full-grain leather that marks. Undyed wool sorted by shade rather than dipped. These choices cost more and last longer."
          />

          <Reveal className="mt-14 overflow-hidden rounded-panel">
            <SmartImage
              src={images.aboutCraft}
              alt="A hand-finished timber joint being checked in the workshop"
              width={1920}
              sizes="100vw"
              wrapperClassName="aspect-[16/9] md:aspect-[21/9] rounded-panel"
            />
          </Reveal>
        </div>
      </section>

      <WhyChooseUs />
      <TestimonialCarousel />
      <CTASection />
    </>
  );
}
