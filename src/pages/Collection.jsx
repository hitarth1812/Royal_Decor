import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/PageHeader';
import { CategoryCard } from '@/components/CategoryCard';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { CTASection } from '@/components/CTASection';
import { categories, collections, products } from '@/data/products';

export default function Collection() {
  return (
    <>
      <Seo
        title="Collection"
        description="Six rooms and twelve collections — browse the showroom by category, or explore a single collection from end to end."
      />

      <PageHeader
        eyebrow="The collection"
        title="Six rooms, one point of view."
        subtitle="Every category is bought as a complete idea rather than a shelf of options, which is why the pieces work together when they reach your home."
        breadcrumbs={[{ label: 'Collection' }]}
      />

      {/* ---- Categories ---- */}
      <section className="pb-20 md:pb-28">
        <div className="shell">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {categories.map((category, i) => (
              <Reveal key={category.id} delay={i * 80} className="h-full">
                <CategoryCard category={category} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Collections, one row each ---- */}
      <section className="section bg-ivory-warm">
        <div className="shell">
          <SectionHeading
            eyebrow="By collection"
            title="Explore a single line."
            subtitle="Each collection shares a material language and a set of proportions, so pieces from the same line always sit well together."
          />

          <div className="mt-16 space-y-20">
            {collections.map((collection) => {
              const items = products.filter((p) => p.collection === collection).slice(0, 3);
              if (items.length === 0) return null;

              return (
                <div key={collection}>
                  <div className="flex flex-wrap items-end justify-between gap-4 border-b border-navy/10 pb-6">
                    <div>
                      <h3 className="font-display text-2xl font-light tracking-editorial text-navy md:text-3xl">
                        {collection}
                      </h3>
                      <p className="mt-2 text-xs uppercase tracking-label text-muted-foreground">
                        {products.filter((p) => p.collection === collection).length} pieces
                      </p>
                    </div>

                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/products?q=${encodeURIComponent(collection)}`}>
                        View collection
                        <ArrowUpRight className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-6">
                    {items.map((product, i) => (
                      <Reveal key={product.id} delay={i * 80} className="h-full">
                        <ProductCard product={product} className="h-full" />
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
