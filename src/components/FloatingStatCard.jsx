import { cn } from '@/lib/utils';
import { GlassSurface } from '@/components/GlassSurface';

/**
 * The refractive panel that overlaps hero and section imagery.
 * Deliberately small: one number, one label, one optional caption.
 */
export function FloatingStatCard({ value, label, caption, className, dark = false, ...props }) {
  return (
    <GlassSurface
      dark={dark}
      borderRadius={28}
      blur={14}
      brightness={dark ? 30 : 62}
      distortionScale={-130}
      greenOffset={12}
      blueOffset={22}
      backgroundOpacity={dark ? 0.5 : 0.52}
      className={cn('px-6 py-5', className)}
      {...props}
    >
      <p className="font-display text-3xl font-semibold tracking-tightest md:text-4xl">{value}</p>
      <p
        className={cn(
          'mt-2 text-[0.625rem] uppercase tracking-label',
          dark ? 'text-ivory/70' : 'text-navy/60'
        )}
      >
        {label}
      </p>
      {caption ? (
        <p className={cn('mt-1 text-xs', dark ? 'text-ivory/50' : 'text-navy/45')}>{caption}</p>
      ) : null}
    </GlassSurface>
  );
}

export default FloatingStatCard;
