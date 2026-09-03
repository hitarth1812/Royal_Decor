import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { testimonials } from '@/data/content';

const AUTOPLAY_MS = 7000;

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  const go = useCallback((next) => {
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduced) return undefined;
    timer.current = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer.current);
  }, [index, paused, go]);

  const active = testimonials[index];

  return (
    <section
      className="section bg-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="shell">
        <div className="mx-auto max-w-4xl text-center">
          <p className="flex items-center justify-center gap-2.5 text-label font-medium uppercase tracking-label text-crimson-light">
            <span className="h-px w-8 bg-crimson-light" aria-hidden="true" />
            In their words
          </p>

          {/* Rating */}
          <div
            className="mt-9 flex justify-center gap-1"
            aria-label={`Rated ${active.rating} out of 5`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'size-4',
                  i < active.rating ? 'fill-crimson text-crimson' : 'text-ivory/25'
                )}
              />
            ))}
          </div>

          {/* Quote — keyed so each change re-runs the fade */}
          <blockquote
            key={active.id}
            className="mt-8 animate-fade-up font-display text-2xl font-light leading-[1.35] tracking-editorial text-ivory md:text-[2.1rem]"
          >
            &ldquo;{active.quote}&rdquo;
          </blockquote>

          <figcaption className="mt-8 animate-fade-in">
            <p className="font-display text-sm font-semibold uppercase tracking-label text-ivory">
              {active.name}
            </p>
            <p className="mt-1.5 text-xs text-ivory/45">{active.location}</p>
          </figcaption>

          {/* Controls */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <Button
              variant="outlineLight"
              size="icon"
              aria-label="Previous testimonial"
              onClick={() => go(index - 1)}
            >
              <ArrowLeft />
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => go(i)}
                  className={cn(
                    'h-1 rounded-full transition-all duration-500 ease-premium',
                    // The bar itself stays 4px tall; the pseudo-element
                    // grows the touch target to ~44px without nudging
                    // the layout or changing how the dot looks.
                    'relative before:absolute before:-inset-x-2 before:-inset-y-5 before:content-[""]',
                    i === index ? 'w-8 bg-crimson' : 'w-3 bg-ivory/25 hover:bg-ivory/50'
                  )}
                />
              ))}
            </div>

            <Button
              variant="outlineLight"
              size="icon"
              aria-label="Next testimonial"
              onClick={() => go(index + 1)}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialCarousel;
