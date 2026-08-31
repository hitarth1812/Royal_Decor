import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Reveals an element once it enters the viewport.
 * Returns a ref to attach and a boolean for the visible state.
 * Disconnects immediately after firing so scrolling stays cheap.
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}

/**
 * Counts from 0 to `end` when the element scrolls into view.
 * Uses requestAnimationFrame with an ease-out curve.
 */
export function useCountUp(end, { duration = 1800, decimals = 0 } = {}) {
  const [ref, isVisible] = useReveal({ threshold: 0.4 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return undefined;

    if (prefersReducedMotion()) {
      setValue(end);
      return undefined;
    }

    let frame;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast start, long settle
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Number((end * eased).toFixed(decimals)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, end, duration, decimals]);

  return [ref, value];
}

/** True once the window has scrolled past `offset` pixels. */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return scrolled;
}
