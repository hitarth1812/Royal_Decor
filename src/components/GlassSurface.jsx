import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

/**
 * ------------------------------------------------------------------
 *  GLASS SURFACE
 *
 *  Refractive "liquid glass" panel. A generated displacement map is fed
 *  to an SVG filter, and that filter is applied as a backdrop-filter, so
 *  whatever sits behind the panel is bent through it. Sampling the red,
 *  green and blue channels at slightly different scales produces the
 *  chromatic fringing real glass has at its edges.
 *
 *  `backdrop-filter: url(#filter)` is Chromium-only. Everywhere else
 *  (Safari, Firefox) the component falls back to a frosted blur that
 *  looks correct — just without the refraction. Detection is at runtime,
 *  so no browser gets a broken panel.
 *
 *  Because backdrop-filter is expensive, use this for panels that
 *  genuinely overlay imagery — the navigation, floating cards, controls
 *  sitting on photography — not for ordinary content cards.
 * ------------------------------------------------------------------
 */
export function GlassSurface({
  as: Tag = 'div',
  children,
  width,
  height,
  borderRadius = 24,
  borderWidth = 0.07,
  brightness = 60,
  opacity = 0.9,
  blur = 12,
  saturation = 1.6,
  displace = 1,
  distortionScale = -140,
  redOffset = 0,
  greenOffset = 12,
  blueOffset = 22,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  backgroundOpacity = 0.55,
  dark = false,
  enabled = true,
  className,
  style,
  ...props
}) {
  const id = useId().replace(/[:]/g, '');
  const filterId = `glass-${id}`;
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [supported, setSupported] = useState(false);

  // Chromium is the only engine that accepts an SVG filter reference
  // inside backdrop-filter. Everything else takes the frosted fallback.
  useEffect(() => {
    if (typeof CSS === 'undefined' || !CSS.supports) return;
    setSupported(
      CSS.supports('backdrop-filter', 'url(#a)') ||
        CSS.supports('-webkit-backdrop-filter', 'url(#a)')
    );
  }, []);

  // The displacement map has to match the panel's real pixel size.
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect;
      setSize({ w: Math.round(w), h: Math.round(h) });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { w, h } = size;
  const ready = enabled && supported && w > 0 && h > 0;

  // Two crossed gradients (red on X, blue on Y) become the vector field
  // the displacement map reads; the inset grey rect flattens the centre
  // so only the edges refract.
  const mapUri = ready
    ? `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
<defs>
<linearGradient id="x" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#000"/><stop offset="100%" stop-color="red"/></linearGradient>
<linearGradient id="y" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#000"/><stop offset="100%" stop-color="blue"/></linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="black"/>
<rect width="${w}" height="${h}" rx="${borderRadius}" fill="url(#x)"/>
<rect width="${w}" height="${h}" rx="${borderRadius}" fill="url(#y)" style="mix-blend-mode:${mixBlendMode}"/>
<rect x="${w * borderWidth}" y="${h * borderWidth}" width="${w * (1 - borderWidth * 2)}" height="${h * (1 - borderWidth * 2)}" rx="${borderRadius}" fill="#7f7f7f" style="filter:blur(${Math.max(displace, 0.1)}px)"/>
</svg>`
      )}`
    : null;

  const backdrop = ready
    ? `url(#${filterId}) blur(${blur / 3}px) saturate(${saturation}) brightness(${brightness + 45}%)`
    : `blur(${blur}px) saturate(${saturation})`;

  return (
    <Tag
      ref={ref}
      className={cn(
        'relative isolate overflow-hidden',
        // The tint and hairline that read as glass in both modes.
        enabled &&
          (dark
            ? 'border border-white/15 text-ivory shadow-glass'
            : 'border border-white/55 text-navy shadow-glass'),
        className
      )}
      style={
        enabled
          ? {
              width,
              height,
              borderRadius,
              backgroundColor: dark
                ? `rgba(10, 10, 10, ${backgroundOpacity})`
                : `rgba(255, 255, 255, ${Math.min(backgroundOpacity + (ready ? 0 : 0.18), 1)})`,
              backdropFilter: backdrop,
              WebkitBackdropFilter: backdrop,
              opacity,
              ...style,
            }
          : { width, height, borderRadius, ...style }
      }
      {...props}
    >
      {ready ? (
        <svg aria-hidden="true" className="pointer-events-none absolute size-0">
          <defs>
            <filter
              id={filterId}
              colorInterpolationFilters="sRGB"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
            >
              <feImage href={mapUri} result="map" preserveAspectRatio="none" />

              {/* Each channel is displaced by a slightly different amount,
                  which is what creates the coloured fringe at the edges. */}
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={distortionScale + redOffset}
                xChannelSelector={xChannel}
                yChannelSelector={yChannel}
                result="dispRed"
              />
              <feColorMatrix
                in="dispRed"
                type="matrix"
                values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="red"
              />

              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={distortionScale + greenOffset}
                xChannelSelector={xChannel}
                yChannelSelector={yChannel}
                result="dispGreen"
              />
              <feColorMatrix
                in="dispGreen"
                type="matrix"
                values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="green"
              />

              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={distortionScale + blueOffset}
                xChannelSelector={xChannel}
                yChannelSelector={yChannel}
                result="dispBlue"
              />
              <feColorMatrix
                in="dispBlue"
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                result="blue"
              />

              <feBlend in="red" in2="green" mode="screen" result="rg" />
              <feBlend in="rg" in2="blue" mode="screen" result="rgb" />
              <feGaussianBlur in="rgb" stdDeviation={Math.max(displace, 0.1)} />
            </filter>
          </defs>
        </svg>
      ) : null}

      {children}
    </Tag>
  );
}

export default GlassSurface;
