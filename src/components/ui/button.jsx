import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * shadcn/ui Button, retuned for the showroom design language:
 * pill radii, editorial letter-spacing, premium easing.
 */
const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-500 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:ease-premium",
  {
    variants: {
      variant: {
        default: 'bg-navy text-ivory hover:bg-navy-soft hover:shadow-lift',
        accent: 'bg-crimson text-white hover:bg-crimson-dark hover:shadow-lift',
        outline:
          'border border-navy/20 bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-ivory',
        outlineLight:
          'border border-white/30 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy',
        light: 'bg-ivory text-navy hover:bg-white hover:shadow-lift',
        glass: 'glass text-navy hover:bg-white hover:shadow-lift',
        soft: 'bg-sand-light text-navy hover:bg-sand',
        // A deepened, desaturated WhatsApp green: still recognisable,
        // but it no longer fights the crimson accent.
        whatsapp: 'bg-[#1B6E45] text-white hover:bg-[#125836] hover:shadow-lift',
        ghost: 'text-navy hover:bg-navy/[0.06]',
        link: 'h-auto rounded-none p-0 text-navy underline-offset-4 hover:text-crimson',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      size: {
        sm: 'h-10 px-5 text-[0.8125rem]',
        default: 'h-12 px-7 text-sm',
        lg: 'h-14 px-8 text-[0.9375rem]',
        xl: 'h-[3.75rem] px-10 text-base',
        icon: 'size-11',
        iconLg: 'size-14',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
