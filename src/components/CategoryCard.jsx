import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SmartImage } from '@/components/SmartImage';
import { images } from '@/config/images';
import { countByCategory } from '@/data/products';

/**
 * Large editorial category tile. The whole card is one link;
 * everything inside moves on hover as a single composed gesture.
 */
export function CategoryCard({ category, className, size = 'default' }) {
  const aspect = size === 'tall' ? 'aspect-[4/5] lg:aspect-[4/5.4]' : 'aspect-[4/5] lg:aspect-[5/5]';

  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className={cn(
        'group relative block overflow-hidden rounded-panel outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-4 focus-visible:ring-offset-background',
        className
      )}
    >
      <SmartImage
        src={images[category.image]}
        alt={`${category.name} — ${category.description}`}
        width={1000}
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 32vw"
        wrapperClassName={cn(aspect, 'rounded-panel')}
        className="transition-transform [transition-duration:1200ms] ease-premium group-hover:scale-[1.07]"
      />

      {/* Base scrim, deepened on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/25 to-transparent transition-opacity duration-700 ease-premium group-hover:from-navy-deep/92"
      />

      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7">
        <div className="flex items-start justify-between">
          <span className="font-display text-xs font-medium tracking-label text-ivory/70">
            {category.number}
          </span>
          <span className="rounded-full border border-white/25 px-3 py-1 text-[0.6rem] uppercase tracking-label text-ivory/80">
            {countByCategory(category.name)} ranges
          </span>
        </div>

        <div>
          <h3 className="font-display text-2xl font-light uppercase tracking-editorial text-ivory md:text-3xl">
            {category.name}
          </h3>

          {/* Description slides up out of the way on hover */}
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ivory/70 transition-transform duration-700 ease-premium group-hover:-translate-y-0.5">
            {category.description}
          </p>

          <span className="mt-5 inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-label text-ivory">
            <span className="flex size-9 items-center justify-center rounded-full border border-white/30 transition-colors duration-500 ease-premium group-hover:border-crimson group-hover:bg-crimson">
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            Explore
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
