import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/siteConfig';
import {
  BRAND_COLORS,
  BRAND_CRIMSON_PATH,
  BRAND_EXCLUSIVE_PATH,
  BRAND_TRANSFORM,
  BRAND_WORDMARK_PATH,
} from '@/components/brandArtwork';

/**
 * ------------------------------------------------------------------
 *  BRAND LOCKUP — the supplied Royal Decor Exclusive artwork.
 *
 *  The real vector paths are rendered inline rather than loaded as an
 *  <img>, which buys three things a flat file cannot give:
 *    · no white background box on ivory or dark sections
 *    · a light variant for the footer and mobile menu
 *    · a compact crop for the navigation, where the EXCLUSIVE line
 *      would otherwise render too small to read
 *
 *  The viewBoxes below are the artwork's measured bounding boxes.
 * ------------------------------------------------------------------
 */

// Full lockup, including the EXCLUSIVE line.
const VIEWBOX_FULL = '84 356 1247 384';
// Cropped above EXCLUSIVE — monogram, wordmark, rule and chevrons.
const VIEWBOX_COMPACT = '84 356 1247 245';
// The R monogram on its own.
const VIEWBOX_MARK = '82 356 208 240';

export function Logo({
  className,
  light = false,
  size = 'default',
  variant = 'full',
  asLink = true,
}) {
  // Heights are fixed; width follows from the lockup's aspect ratio.
  const heights = {
    xs: 'h-6',
    sm: 'h-7',
    default: 'h-9',
    lg: 'h-12',
    xl: 'h-16',
  };

  // On dark sections the black artwork becomes ivory, and the deep navy
  // "EXCLUSIVE" lifts to a readable tint of the same hue.
  const wordmarkColor = light ? '#F7F3EA' : BRAND_COLORS.wordmark;
  const exclusiveColor = light ? '#8C9AD4' : BRAND_COLORS.exclusive;

  const viewBox =
    variant === 'mark' ? VIEWBOX_MARK : variant === 'compact' ? VIEWBOX_COMPACT : VIEWBOX_FULL;

  // A supplied artwork file overrides the inline paths.
  const imageSrc = light
    ? siteConfig.LOGO_IMAGE_LIGHT || siteConfig.LOGO_IMAGE
    : siteConfig.LOGO_IMAGE;

  const content = imageSrc ? (
    <img
      src={imageSrc}
      alt={`${siteConfig.SHOWROOM_NAME} logo`}
      className={cn('w-auto object-contain', heights[size], className)}
    />
  ) : (
    <svg
      viewBox={viewBox}
      className={cn('w-auto', heights[size], className)}
      role="img"
      aria-label={`${siteConfig.SHOWROOM_NAME}${variant === 'full' ? ' Exclusive' : ''}`}
    >
      <g transform={BRAND_TRANSFORM}>
        <path fill={BRAND_COLORS.crimson} d={BRAND_CRIMSON_PATH} />
        <path fill={wordmarkColor} d={BRAND_WORDMARK_PATH} />
        {variant === 'full' ? <path fill={exclusiveColor} d={BRAND_EXCLUSIVE_PATH} /> : null}
      </g>
    </svg>
  );

  if (!asLink) return content;

  return (
    <Link
      to="/"
      aria-label={`${siteConfig.SHOWROOM_NAME} — home`}
      className="shrink-0 transition-opacity duration-300 hover:opacity-70"
    >
      {content}
    </Link>
  );
}

export default Logo;
