import { useEffect, useMemo, useRef } from 'react';

import { BrandTile } from '@/components/BrandTile';
import { cn } from '@/lib/utils';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isDesktopViewport = () =>
  typeof window !== 'undefined' && window.matchMedia('(min-width: 640px)').matches;

// One factor per visual row (four paired rows, four single-centred
// rows) — alternating sign so neighbouring rows drift apart rather
// than together. Kept tiny on purpose: this reads as depth, not motion.
const ROW_PARALLAX = [4, -6, 7, -4, 6, -5, 5, -4];

/**
 * The editorial brand wall: a large ivory panel holding every logo in
 * a deliberately asymmetric composition — paired plaques alternating
 * with a single centred one, the way a showroom hangs material samples
 * rather than a grid of identical cards. Each tile settles in once on
 * scroll (`BrandTile`); the only thing this component adds on top is a
 * hairline-subtle parallax drift, driven by one shared scroll listener
 * rather than a per-tile loop.
 */
// Precomputes which visual row each brand falls into (pairs alternate
// with a single centred tile) so every tile can carry its row's
// parallax factor without any DOM-based grouping.
function withRowFactors(brands) {
  let row = 0;
  let seatsLeftInRow = brands[0]?.single ? 1 : 2;

  return brands.map((brand) => {
    if (seatsLeftInRow <= 0) {
      row += 1;
      seatsLeftInRow = brand.single ? 1 : 2;
    }
    seatsLeftInRow -= 1;
    return { brand, factor: ROW_PARALLAX[row % ROW_PARALLAX.length] };
  });
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
      <div className="mx-auto flex max-w-3xl flex-wrap gap-4 sm:gap-7">
        {seated.map(({ brand, factor }, index) => (
          <div
            key={brand.id}
            ref={(node) => {
              tilesRef.current[index] = { node, factor };
            }}
            className={cn(
              'flex basis-[calc(50%-0.5rem)] justify-center',
              brand.single
                ? 'sm:basis-full sm:justify-center'
                : 'sm:basis-[calc(50%-1.75rem)] sm:justify-center'
            )}
          >
            <BrandTile brand={brand} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandWall;
