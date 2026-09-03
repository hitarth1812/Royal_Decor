import { useEffect, useRef } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

/**
 * A restrained magnetic-hover effect: the element eases a few pixels
 * toward the cursor, then springs back on pointer leave. Skipped
 * entirely on touch/coarse-pointer devices and reduced motion — there
 * is no cursor to react to on those, so nothing is lost by opting out.
 */
export function useMagnetic({ strength = 6, scale = 1.02 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !hasFinePointer() || prefersReducedMotion()) return undefined;

    let frame = null;

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.transition = 'transform 150ms ease-out';
        node.style.transform = `translate3d(${(px * strength * 2).toFixed(2)}px, ${(py * strength * 2).toFixed(2)}px, 0) scale(${scale})`;
      });
    };

    const handleLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      node.style.transition = 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)';
      node.style.transform = 'translate3d(0, 0, 0) scale(1)';
    };

    node.addEventListener('pointermove', handleMove);
    node.addEventListener('pointerleave', handleLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      node.removeEventListener('pointermove', handleMove);
      node.removeEventListener('pointerleave', handleLeave);
    };
  }, [strength, scale]);

  return ref;
}

export default useMagnetic;
