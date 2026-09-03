import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 label-xs font-medium uppercase tracking-label transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-navy text-ivory',
        accent: 'border-transparent bg-crimson text-white',
        outline: 'border-navy/20 bg-transparent text-navy',
        outlineLight: 'border-white/30 bg-transparent text-white',
        soft: 'border-transparent bg-sand-light text-navy',
        glass: 'glass text-navy',
        muted: 'border-transparent bg-navy/[0.06] text-muted-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
