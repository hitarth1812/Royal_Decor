import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { SmartImage } from '@/components/SmartImage';
import { GradualBlur } from '@/components/GradualBlur';

/**
 * Product gallery.
 *
 * Desktop: a large stage with thumbnails beneath and a hover zoom.
 * Mobile: the same images become a native scroll-snap strip, so the
 * gesture is a real swipe rather than a JS approximation of one.
 */
export function ProductGallery({ images, alt }) {
  const [active, setActive] = useState(0);
  const railRef = useRef(null);

  // Keep the mobile strip in step when a thumbnail is chosen.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const child = rail.children[active];
    if (child) rail.scrollTo({ left: child.offsetLeft - rail.offsetLeft, behavior: 'smooth' });
  }, [active]);

  const go = (next) => setActive((next + images.length) % images.length);

  return (
    <div>
      {/* ---------- Mobile: swipeable strip ---------- */}
      <div className="relative md:hidden">
        <GradualBlur target="parent" position="right" width="3.5rem" strength={1.4} divCount={4} />
      <div
        ref={railRef}
        className="rail -mx-5 gap-3 px-5 md:hidden"
        onScroll={(e) => {
          const { scrollLeft, clientWidth } = e.currentTarget;
          setActive(Math.round(scrollLeft / (clientWidth * 0.88)));
        }}
      >
        {images.map((image, i) => (
          <div key={image + i} className="w-[88%]">
            <SmartImage
              src={image}
              alt={`${alt} — view ${i + 1}`}
              width={900}
              sizes="88vw"
              priority={i === 0}
              wrapperClassName="aspect-[4/5] rounded-panel"
            />
          </div>
        ))}
      </div>
      </div>

      {/* Mobile progress dots */}
      <div className="mt-4 flex justify-center gap-1.5 md:hidden">
        {images.map((image, i) => (
          <span
            key={image + i}
            aria-hidden="true"
            className={cn(
              'h-1 rounded-full transition-all duration-500 ease-premium',
              i === active ? 'w-6 bg-crimson' : 'w-1.5 bg-navy/20'
            )}
          />
        ))}
      </div>

      {/* ---------- Desktop: stage + thumbnails ---------- */}
      <div className="hidden md:block">
        <div className="group relative overflow-hidden rounded-panel bg-sand-light">
          <SmartImage
            key={images[active]}
            src={images[active]}
            alt={`${alt} — view ${active + 1}`}
            width={1400}
            sizes="(max-width: 1280px) 55vw, 46vw"
            priority
            wrapperClassName="aspect-[4/5] rounded-panel"
            className="animate-fade-in transition-transform [transition-duration:1400ms] ease-premium group-hover:scale-[1.07]"
          />

          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(active - 1)}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-navy opacity-0 shadow-soft backdrop-blur transition-all duration-500 ease-premium hover:bg-white focus-visible:opacity-100 group-hover:opacity-100"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(active + 1)}
                aria-label="Next image"
                className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-navy opacity-0 shadow-soft backdrop-blur transition-all duration-500 ease-premium hover:bg-white focus-visible:opacity-100 group-hover:opacity-100"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          ) : null}
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((image, i) => (
            <button
              key={image + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={cn(
                'overflow-hidden rounded-2xl transition-all duration-500 ease-premium',
                i === active
                  ? 'ring-2 ring-crimson ring-offset-2 ring-offset-background'
                  : 'opacity-60 hover:opacity-100'
              )}
            >
              <SmartImage
                src={image}
                alt=""
                width={320}
                sizes="120px"
                wrapperClassName="aspect-square rounded-2xl"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductGallery;
