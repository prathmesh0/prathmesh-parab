import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/content/experience";
import { SectionLabel } from "@/components/motion/SectionLabel";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding border-t border-border">
      <div className="container-grid">
        <SectionLabel index="02">Experience</SectionLabel>
        <SplitLines text="My Experience" em="Experience" className="text-heading mt-4" />

        {experiences.map((exp) => (
          <article key={exp.id} className="grid-12 mt-12 gap-y-10">
            <Reveal className="col-span-12 lg:col-span-4">
              <h3 className="text-2xl font-medium tracking-tight">{exp.role}</h3>
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 inline-flex min-h-11 items-center gap-1 text-lg text-muted-foreground transition-colors hover:text-accent-ink"
              >
                {exp.company}
                <ArrowUpRight className="size-4 transition-transform duration-[240ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <p className="mt-1 flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
                <span>{exp.period}</span>
                {exp.current && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-foreground">
                    <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                    Current
                  </span>
                )}
              </p>
              <p className="mt-6 max-w-sm text-muted-foreground">{exp.description}</p>
              {exp.technologies.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
                  {exp.technologies.map((t) => (
                    <li key={t} className="rounded-full border border-border px-3 py-1">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>

            <ol className="col-span-12 border-t border-border lg:col-span-8">
              {exp.projects.map((p, i) => (
                <li key={p.name} className="list-none border-b border-border">
                  <Reveal delay={i * 0.05} className="grid gap-3 py-7 sm:grid-cols-[9rem_1fr] sm:gap-8">
                    <span className="font-mono text-sm text-muted-foreground sm:pt-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h4 className="text-xl font-medium tracking-tight text-foreground">{p.name}</h4>
                        {p.current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-foreground">
                            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                            Working on now
                          </span>
                        )}
                      </div>
                      <p className="mt-1 font-mono text-xs text-accent-ink">{p.kind}</p>
                      <p className="mt-3 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
                        {p.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2 font-mono text-xs">
                        {p.highlights.map((h) => (
                          <li key={h} className="rounded-full border border-border px-3 py-1">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}
