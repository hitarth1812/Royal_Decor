import { cn } from '@/lib/utils';
import { useReveal } from '@/hooks/useReveal';

/**
 * Wraps children in a scroll-triggered fade-and-rise.
 * `delay` staggers items inside a grid without extra JS.
 */
export function Reveal({ children, className, delay = 0, as: Tag = 'div', ...props }) {
  const [ref, isVisible] = useReveal();

  return (
    <Tag
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={cn('reveal', isVisible && 'is-visible', className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
