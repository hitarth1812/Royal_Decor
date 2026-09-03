import { useEffect, useMemo, useRef } from 'react';

import { BrandTile } from '@/components/BrandTile';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isDesktopViewport = () =>
  typeof window !== 'undefined' && window.matchMedia('(min-width: 640px)').matches;

// One factor per row — alternating sign so neighbouring rows drift
// apart rather than together. Kept tiny on purpose: this reads as
// depth, not motion.
const ROW_PARALLAX = [4, -6, 7, -4, 6, -5, 5, -4];

/**
 * The editorial brand wall: a large ivory panel holding every logo,
 * one to a row, the way a showroom hangs a single material sample at
 * a time rather than crowding a shelf. Each tile settles in once on
 * scroll (`BrandTile`); the only thing this component adds on top is a
 * hairline-subtle parallax drift, driven by one shared scroll listener
 * rather than a per-tile loop.
 */
function withRowFactors(brands) {
  return brands.map((brand, i) => ({ brand, factor: ROW_PARALLAX[i % ROW_PARALLAX.length] }));
}

export function BrandWall({ brands }) {
  const tilesRef = useRef([]);
  const seated = useMemo(() => withRowFactors(brands), [brands]);

  useEffect(() => {
    if (prefersReducedMotion() || !isDesktopViewport()) return undefined;

    let frame = null;

    const update = () => {
      frame = null;
      const vh = window.innerHeight || 1;

      tilesRef.current.forEach((entry) => {
        if (!entry?.node) return;
        const rect = entry.node.getBoundingClientRect();
        // -1 (tile above viewport centre) .. 1 (tile below)
        const progress = Math.max(
          -1,
          Math.min(1, (rect.top + rect.height / 2 - vh / 2) / (vh / 2))
        );
        entry.node.style.transform = `translate3d(0, ${(-progress * entry.factor).toFixed(2)}px, 0)`;
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [seated]);

  return (
    <div className="relative overflow-hidden rounded-panel border border-navy/10 bg-ivory-warm px-5 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
      <div className="mx-auto flex max-w-sm flex-col items-center gap-4 sm:max-w-md sm:gap-5">
        {seated.map(({ brand, factor }, index) => (
          <div
            key={brand.id}
            ref={(node) => {
              tilesRef.current[index] = { node, factor };
            }}
            className="w-full"
          >
            <BrandTile brand={brand} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandWall;
