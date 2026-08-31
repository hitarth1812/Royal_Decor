import { useState } from 'react';

import { cn } from '@/lib/utils';
import { img, imgSrcSet } from '@/config/images';

/**
 * The only <img> in the application.
 *
 * - resolves sources through the image registry
 * - emits a responsive srcset so mobile never downloads a 1920px file
 * - lazy-loads and decodes off the main thread by default
 * - fades in on load, and holds a sand-toned placeholder until then,
 *   so a slow connection never shows a white flash or a layout jump
 */
export function SmartImage({
  src,
  alt,
  className,
  wrapperClassName,
  width = 1200,
  sizes = '100vw',
  priority = false,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className={cn(
        'relative block overflow-hidden bg-sand-light',
        !loaded && 'animate-pulse',
        wrapperClassName
      )}
    >
      <img
        src={img(src, width)}
        srcSet={imgSrcSet(src)}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-700 ease-premium',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...props}
      />
    </span>
  );
}

export default SmartImage;
