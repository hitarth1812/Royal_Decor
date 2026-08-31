import { SearchX } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';

export function ProductGrid({ products, onReset, columns = 3, className }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-panel border border-dashed border-navy/15 px-6 py-20 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-sand-light text-navy">
          <SearchX className="size-6" strokeWidth={1.25} />
        </span>
        <h3 className="mt-6 font-display text-xl font-medium tracking-editorial text-navy">
          Nothing matches those filters
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Try a broader price range or a different category — or message the showroom
          and we will tell you what is on the floor this week.
        </p>
        {onReset ? (
          <Button variant="outline" className="mt-7" onClick={onReset}>
            Clear all filters
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid gap-x-5 gap-y-12 sm:grid-cols-2 md:gap-x-6',
        columns === 3 && 'lg:grid-cols-3',
        columns === 4 && 'lg:grid-cols-3 xl:grid-cols-4',
        className
      )}
    >
      {products.map((product, i) => (
        <Reveal key={product.id} delay={Math.min(i, 5) * 70} className="h-full">
          <ProductCard product={product} className="h-full" priority={i < 3} />
        </Reveal>
      ))}
    </div>
  );
}

export default ProductGrid;
