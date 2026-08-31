import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { featuredProducts } from '@/data/products';

/**
 * Editorial feature grid.
 *
 * The first piece runs full-bleed across two columns with a wide crop;
 * the rest fall into a standard portrait rhythm. That single asymmetry
 * is what stops the section reading like a shop listing.
 */
export function FeaturedCollection() {
  const [lead, ...rest] = featuredProducts;

  return (
    <section className="section bg-ivory-warm">
      <div className="shell">
        <SectionHeading
          eyebrow="Featured pieces"
          title="Selected this season"
          subtitle="Six pieces our team keeps returning to — chosen for proportion, material and the way they behave in a real room."
          action="See everything"
          actionTo="/products"
        />

        <div className="mt-14 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-6">
          {lead ? (
            <Reveal className="sm:col-span-2">
              <ProductCard product={lead} size="wide" priority />
            </Reveal>
          ) : null}

          {rest.map((product, i) => (
            <Reveal key={product.id} delay={(i + 1) * 80} className="h-full">
              <ProductCard product={product} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollection;
