import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeading } from '@/components/SectionHeading';
import { GradualBlur } from '@/components/GradualBlur';
import { newArrivals } from '@/data/products';

/**
 * Horizontally scrolling arrivals rail.
 * Embla (via shadcn's Carousel) handles drag on touch and
 * keyboard arrows on desktop; the custom controls sit in the heading
 * rather than floating over the artwork.
 */
export function NewArrivals() {
  const [api, setApi] = useState(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback((embla) => {
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) return undefined;
    sync(api);
    api.on('select', sync).on('reInit', sync);
    return () => {
      api.off('select', sync);
      api.off('reInit', sync);
    };
  }, [api, sync]);

  return (
    <section className="section overflow-hidden">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="2026 Edition"
            title="Just arrived."
            subtitle="The newest pieces on the floor, most of them still in their first shipment."
            className="flex-1"
          />

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous products"
              disabled={!canPrev}
              onClick={() => api?.scrollPrev()}
              className={cn(!canPrev && 'opacity-30')}
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next products"
              disabled={!canNext}
              onClick={() => api?.scrollNext()}
              className={cn(!canNext && 'opacity-30')}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>

      {/* Rail is deliberately full-bleed so cards run off the right edge */}
      <div className="relative mt-14 pl-5 sm:pl-8 lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))]">
        {/* Horizontal counterpart: the rail dissolves as it leaves the viewport */}
        <GradualBlur
          target="parent"
          position="right"
          width="7rem"
          strength={1.8}
          divCount={5}
          curve="bezier"
          exponential
        />

        <Carousel
          setApi={setApi}
          opts={{ align: 'start', containScroll: 'trimSnaps' }}
          className="w-full"
        >
          <CarouselContent className="-ml-5 pr-5">
            {newArrivals.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-[78%] pl-5 sm:basis-[46%] lg:basis-[30%] xl:basis-[25%]"
              >
                <ProductCard product={product} className="h-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export default NewArrivals;
