import { useReveal } from '@/hooks/useReveal';
import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/lib/utils';

const LOGO_WIDTH = {
  compact: 'max-w-[92px]',
  medium: 'max-w-[128px]',
  wide: 'max-w-[168px]',
};

/**
 * One plaque on the brand wall. Settles in once via a scroll reveal,
 * then sits still — the only ongoing motion is the magnetic nudge
 * toward the cursor and the hover lift, both of which release the
 * moment the pointer leaves.
 */
export function BrandTile({ brand, index }) {
  const [revealRef, isVisible] = useReveal({ threshold: 0.2 });
  const magneticRef = useMagnetic({ strength: 6, scale: 1.02 });

  const setRefs = (node) => {
    revealRef.current = node;
    magneticRef.current = node;
  };

  return (
    <div
      ref={setRefs}
      style={{ '--reveal-delay': `${index * 60}ms` }}
      className={cn(
        'brand-tile group flex h-24 w-full items-center justify-center rounded-2xl border border-navy/10 bg-ivory px-7 sm:h-28',
        'transition-[transform,box-shadow,background-color,border-color] duration-500 ease-premium',
        'hover:-translate-y-1 hover:border-navy/25 hover:bg-ivory-warm hover:shadow-soft',
        'focus-visible:-translate-y-1 focus-visible:border-navy/25 focus-visible:shadow-soft',
        isVisible && 'is-visible'
      )}
    >
      {brand.logo ? (
        <img
          src={brand.logo}
          alt={brand.alt}
          loading="lazy"
          className={cn(
            'h-full max-h-14 w-full object-contain sm:max-h-16',
            LOGO_WIDTH[brand.size] ?? LOGO_WIDTH.medium,
            brand.placeholder && 'opacity-70'
          )}
        />
      ) : (
        <span className="text-center font-display text-sm font-medium uppercase tracking-label text-navy/55">
          {brand.name}
        </span>
      )}
    </div>
  );
}

export default BrandTile;
