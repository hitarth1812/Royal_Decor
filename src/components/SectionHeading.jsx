import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';

/**
 * The shared editorial section header: eyebrow, oversized title,
 * optional subtitle, and an optional right-aligned action link.
 * Every section uses this so the vertical rhythm never drifts.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
  actionTo,
  light = false,
  align = 'between',
  className,
  headingId,
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        align === 'between' && 'md:flex-row md:items-end md:justify-between',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow ? (
          <p
            className={cn(
              'flex items-center gap-2.5 text-label font-medium uppercase tracking-label',
              align === 'center' && 'justify-center',
              light ? 'text-crimson-light' : 'text-crimson'
            )}
          >
            <span
              className={cn('h-px w-8', light ? 'bg-crimson-light' : 'bg-crimson')}
              aria-hidden="true"
            />
            {eyebrow}
          </p>
        ) : null}

        <h2
          id={headingId}
          className={cn(
            'mt-5 text-section font-light',
            light ? 'text-ivory' : 'text-navy'
          )}
        >
          {title}
        </h2>

        {subtitle ? (
          <p
            className={cn(
              'mt-5 max-w-xl text-base leading-relaxed',
              align === 'center' && 'mx-auto',
              light ? 'text-ivory/65' : 'text-muted-foreground'
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </Reveal>

      {action && actionTo ? (
        <Reveal delay={120} className="shrink-0">
          <Button asChild variant={light ? 'outlineLight' : 'outline'}>
            <Link to={actionTo}>
              {action}
              <ArrowUpRight className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Link>
          </Button>
        </Reveal>
      ) : null}
    </div>
  );
}

export default SectionHeading;
