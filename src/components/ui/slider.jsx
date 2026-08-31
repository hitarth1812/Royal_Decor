import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

/**
 * shadcn/ui Slider, extended to render one thumb per value so it can
 * drive a two-handle price range (the stock component hardcodes a
 * single thumb). Thumb labels come from `thumbLabels` for screen readers.
 */
const Slider = React.forwardRef(
  ({ className, value, defaultValue, thumbLabels = ['Minimum', 'Maximum'], ...props }, ref) => {
    const values = value ?? defaultValue ?? [props.min ?? 0];

    return (
      <SliderPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        className={cn('relative flex w-full touch-none select-none items-center', className)}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-navy/15">
          <SliderPrimitive.Range className="absolute h-full bg-crimson" />
        </SliderPrimitive.Track>

        {values.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            aria-label={thumbLabels[i] ?? `Value ${i + 1}`}
            className="block size-4 rounded-full border border-navy/40 bg-white shadow-soft transition-colors duration-300 hover:border-crimson focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
    );
  }
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
