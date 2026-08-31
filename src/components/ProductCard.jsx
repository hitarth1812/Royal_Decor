import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { SmartImage } from '@/components/SmartImage';
import { formatPrice, productWhatsappLink } from '@/config/siteConfig';

/**
 * The catalogue's workhorse card.
 *
 * `size` drives the image aspect ratio only — every other token stays
 * identical, which is what lets the editorial grid mix tall and wide
 * cards without the page looking like two different designs.
 */
export function ProductCard({ product, size = 'default', className, priority = false }) {
  const aspect = {
    default: 'aspect-[4/5]',
    tall: 'aspect-[4/6]',
    wide: 'aspect-[16/11]',
    square: 'aspect-square',
  }[size];

  return (
    <article className={cn('group relative flex h-full flex-col', className)}>
      <Link
        to={`/product/${product.slug}`}
        className="flex h-full flex-col rounded-card outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <div className="relative overflow-hidden rounded-card bg-sand-light">
          <SmartImage
            src={product.images[0]}
            alt={`${product.name} — ${product.shortDescription}`}
            width={900}
            priority={priority}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
            wrapperClassName={cn(aspect, 'rounded-card')}
            className="transition-transform [transition-duration:1100ms] ease-premium group-hover:scale-[1.06]"
          />

          {/* Darkening wash on hover keeps the labels legible */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-card bg-navy/0 transition-colors duration-700 ease-premium group-hover:bg-navy/12"
          />

          {/* Status labels */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {product.newArrival ? <Badge variant="accent">New</Badge> : null}
            {product.availability === 'Made to Order' ? (
              <Badge variant="glass">Made to order</Badge>
            ) : null}
          </div>

          {/* Quick WhatsApp enquiry — never blocks the card link */}
          <button
            type="button"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(productWhatsappLink(product), '_blank', 'noopener');
            }}
            className="absolute right-4 top-4 flex size-10 translate-y-1 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 shadow-soft backdrop-blur transition-all duration-500 ease-premium hover:bg-crimson hover:text-white focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <MessageCircle className="size-4" />
          </button>
        </div>

        {/* ---- Card meta ---- */}
        <div className="flex flex-1 flex-col px-1 pt-5">
          <p className="text-[0.625rem] uppercase tracking-label text-muted-foreground">
            {product.category} / {product.collection} Collection
          </p>

          <h3 className="mt-2.5 font-display text-lg font-medium tracking-editorial text-navy transition-colors duration-300 group-hover:text-crimson md:text-xl">
            {product.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>

          <div className="mt-auto flex items-end justify-between gap-4 pt-5">
            <div>
              <p
                className={cn(
                  'font-display text-base font-semibold text-navy',
                  product.price == null && 'text-crimson'
                )}
              >
                {formatPrice(product.price)}
              </p>
              <p className="mt-1 text-[0.625rem] uppercase tracking-label text-navy/35">
                {product.productCode}
              </p>
            </div>

            <span className="flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-label text-navy transition-colors duration-300 group-hover:text-crimson">
              View
              <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;
