import { impactMetrics, stats } from "@/content/profile";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

/** Slim impact strip. Final values are in the server HTML; counts up once in view. */
export function StatsSection() {
  return (
    <section aria-label="Impact" className="border-y border-border">
      <div className="container-grid">
        <ul className="grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {impactMetrics.map((m, i) => (
            <li
              key={m.label}
              className="sm:odd:border-r sm:border-border sm:max-lg:odd:[&>div]:pl-0 sm:max-lg:even:[&>div]:pr-0 sm:[&:nth-child(n+3)]:border-t lg:border-r lg:[&:nth-child(n+3)]:border-t-0 lg:last:border-r-0 lg:first:[&>div]:pl-0 lg:last:[&>div]:pr-0"
            >
              <Reveal delay={i * 0.05} className="py-8 sm:px-8">
                <p className="text-5xl font-medium tracking-tight md:text-6xl">
                  <CountUp value={m.value} suffix={m.suffix} />
                </p>
                <p className="mt-3 text-sm text-foreground">{m.label}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{m.source}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap gap-x-8 gap-y-2 border-t border-border py-4 font-mono text-xs text-muted-foreground">
          {stats.map((s) => (
            <li key={s.label} title={s.description}>
              <CountUp value={s.value} suffix={s.suffix} className="text-foreground" /> {s.label.toLowerCase()}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
