import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Seo } from '@/components/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you were looking for does not exist. Browse the full furniture, lighting and decor collection, or visit the showroom in person." />

      <div className="shell flex min-h-[80vh] flex-col items-center justify-center py-32 text-center">
        <p className="font-display text-[clamp(5rem,18vw,12rem)] font-light leading-none tracking-tightest text-navy/10">
          404
        </p>

        <h1 className="-mt-6 text-section font-light text-navy">This page has moved on.</h1>

        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
          The link may be out of date. The collection, however, is exactly where you left it.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/products">
              Browse the collection
              <ArrowUpRight className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/">Back home</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
