import { useMemo } from 'react';

import { cn } from '@/lib/utils';

/**
 * ------------------------------------------------------------------
 *  GRADUAL BLUR
 *
 *  A progressive blur edge. Instead of one blurred strip with a hard
 *  boundary, it stacks `divCount` layers, each blurred a little more
 *  and masked to a narrow band, so the blur ramps up smoothly toward
 *  the edge — the effect used at the bottom of scrolling views on iOS.
 *
 *  Works on both axes: `position="bottom"` fades a vertical scroll,
 *  `position="right"` fades a horizontal rail.
 *
 *  target="parent" pins it to the nearest positioned ancestor.
 *  target="page"   pins it to the viewport.
 * ------------------------------------------------------------------
 */

const CURVES = {
  linear: (t) => t,
  bezier: (t) => t * t * (3 - 2 * t),
  'ease-in': (t) => t * t,
  'ease-out': (t) => 1 - (1 - t) * (1 - t),
  'ease-in-out': (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2),
};

// Which way the blur intensifies for a given edge.
const GRADIENT_DIRECTION = {
  top: 'to top',
  bottom: 'to bottom',
  left: 'to left',
  right: 'to right',
};

export function GradualBlur({
  target = 'parent',
  position = 'bottom',
  height = '6rem',
  width,
  strength = 2,
  divCount = 5,
  curve = 'bezier',
  exponential = false,
  opacity = 1,
  zIndex = 20,
  className,
  style,
}) {
  const isVertical = position === 'top' || position === 'bottom';
  const easing = CURVES[curve] ?? CURVES.linear;
  const direction = GRADIENT_DIRECTION[position];

  const layers = useMemo(() => {
    const increment = 100 / divCount;

    return Array.from({ length: divCount }, (_, i) => {
      const progress = easing((i + 1) / divCount);

      // Exponential ramps hard at the very edge, which reads as glass;
      // linear stays even, which reads as a plain fade.
      const blur = exponential
        ? (2 ** (progress * 4) - 1) * 0.28 * strength
        : progress * strength * 3;

      // Each layer is masked to its own band, offset one step further.
      const p1 = increment * i;
      const p2 = increment * (i + 1);
      const p3 = increment * (i + 2);
      const p4 = increment * (i + 3);

      const mask = `linear-gradient(${direction}, rgba(0,0,0,0) ${p1}%, rgba(0,0,0,1) ${p2}%, rgba(0,0,0,1) ${p3}%, rgba(0,0,0,0) ${p4}%)`;

      return {
        key: i,
        backdropFilter: `blur(${blur.toFixed(2)}px)`,
        WebkitBackdropFilter: `blur(${blur.toFixed(2)}px)`,
        maskImage: mask,
        WebkitMaskImage: mask,
      };
    });
  }, [divCount, easing, exponential, strength, direction]);

  const placement = {
    top: { top: 0, left: 0, right: 0, height: height },
    bottom: { bottom: 0, left: 0, right: 0, height: height },
    left: { left: 0, top: 0, bottom: 0, width: width ?? height },
    right: { right: 0, top: 0, bottom: 0, width: width ?? height },
  }[position];

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none',
        target === 'page' ? 'fixed' : 'absolute',
        className
      )}
      style={{ ...placement, zIndex, opacity, ...style }}
    >
      {layers.map((layer) => (
        <div
          key={layer.key}
          className="absolute inset-0"
          style={{
            backdropFilter: layer.backdropFilter,
            WebkitBackdropFilter: layer.WebkitBackdropFilter,
            maskImage: layer.maskImage,
            WebkitMaskImage: layer.WebkitMaskImage,
          }}
        />
      ))}
    </div>
  );
}

export default GradualBlur;
