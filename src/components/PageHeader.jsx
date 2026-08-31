import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * The masthead every inner page opens with.
 * Sits below the fixed navbar, so the top padding accounts for it.
 */
export function PageHeader({ eyebrow, title, subtitle, breadcrumbs = [], children, className }) {
  return (
    <header className={cn('pb-14 pt-32 md:pb-16 md:pt-40 lg:pt-44', className)}>
      <div className="shell">
        {breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.6875rem] uppercase tracking-label text-muted-foreground">
              <li>
                <Link to="/" className="transition-colors duration-300 hover:text-crimson">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb) => (
                <Fragment key={crumb.label}>
                  <ChevronRight className="size-3 text-navy/25" aria-hidden="true" />
                  <li>
                    {crumb.to ? (
                      <Link to={crumb.to} className="transition-colors duration-300 hover:text-crimson">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-navy">{crumb.label}</span>
                    )}
                  </li>
                </Fragment>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? (
          <p className="eyebrow flex animate-fade-up items-center gap-2.5">
            <span className="h-px w-8 bg-crimson" aria-hidden="true" />
            {eyebrow}
          </p>
        ) : null}

        <h1
          className="mt-5 max-w-3xl animate-fade-up font-display text-section font-light text-navy"
          style={{ animationDelay: '80ms' }}
        >
          {title}
        </h1>

        {subtitle ? (
          <p
            className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-muted-foreground"
            style={{ animationDelay: '160ms' }}
          >
            {subtitle}
          </p>
        ) : null}

        {children}
      </div>
    </header>
  );
}

export default PageHeader;
