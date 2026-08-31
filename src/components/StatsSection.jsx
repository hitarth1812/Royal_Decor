import { useCountUp } from '@/hooks/useReveal';
import { stats } from '@/data/content';

function Stat({ value, suffix, label, decimals = 0, index }) {
  const [ref, current] = useCountUp(value, { decimals, duration: 1600 + index * 160 });

  return (
    <div
      ref={ref}
      className="group relative border-t border-white/12 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0 md:first:border-l-0 md:first:pl-0"
    >
      <p className="font-display text-stat font-light text-ivory">
        {decimals ? current.toFixed(decimals) : Math.round(current)}
        <span className="text-crimson">{suffix}</span>
      </p>
      <p className="mt-4 text-[0.6875rem] uppercase tracking-label text-ivory/55">{label}</p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="grain relative overflow-hidden bg-navy py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 size-[34rem] -translate-y-1/2 rounded-full bg-crimson/10 blur-3xl"
      />

      <div className="shell relative">
        <div className="grid gap-10 md:grid-cols-4 md:gap-6">
          {stats.map((stat, i) => (
            <Stat key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
