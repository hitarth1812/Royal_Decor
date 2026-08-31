import { GradualBlur } from '@/components/GradualBlur';
import { collections } from '@/data/products';

/**
 * A slow, low-contrast band of collection names between the hero and
 * the catalogue. Purely typographic — it separates two heavy sections
 * without adding another image.
 */
export function Marquee() {
  const items = [...collections, 'Made to Order', 'Custom Finishes', 'Design Consultation'];
  const strip = [...items, ...items];

  return (
    <section aria-hidden="true" className="border-y border-navy/8 py-6 md:py-8">
      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10 md:gap-14 md:pr-14">
          {strip.map((item, i) => (
            <span key={item + i} className="flex shrink-0 items-center gap-10 md:gap-14">
              <span className="font-display text-sm font-light uppercase tracking-label text-navy/45 md:text-base">
                {item}
              </span>
              <span className="size-1 rounded-full bg-crimson/50" />
            </span>
          ))}
        </div>

        <GradualBlur target="parent" position="left" width="5rem" strength={1.2} divCount={4} />
        <GradualBlur target="parent" position="right" width="5rem" strength={1.2} divCount={4} />
      </div>
    </section>
  );
}

export default Marquee;
