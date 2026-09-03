import { SectionHeading } from '@/components/SectionHeading';
import { BrandWall } from '@/components/BrandWall';
import { brands } from '@/data/brands';

/**
 * The brand wall: a trust section rather than a product story. Every
 * logo settles into its place once, on scroll — no ongoing loop, no
 * marquee — so the wall reads as a fixed installation the rest of the
 * time, the way a showroom hangs its brand plaques.
 */
export function BrandsSection() {
  return (
    <section aria-labelledby="brands-heading" className="section">
      <div className="shell">
        <SectionHeading
          headingId="brands-heading"
          eyebrow="Brands we sell"
          title="Names that shape beautiful spaces."
          subtitle="We bring together trusted names across furnishings, wallpapers, paints, bedding and home décor — carefully selected for quality, design and lasting appeal."
        />

        <div className="mt-14">
          <BrandWall brands={brands} />
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5">
          {brands.map((brand, i) => (
            <li key={brand.id} className="flex items-center gap-3">
              <span className="font-display text-xs font-medium uppercase tracking-label text-navy/55 sm:text-sm">
                {brand.name}
              </span>
              {i < brands.length - 1 ? (
                <span className="size-1 rounded-full bg-crimson/40" aria-hidden="true" />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default BrandsSection;
