"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Project } from "@/types";
import type { CaseStudy } from "@/content/case-studies";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { loadGsap } from "@/lib/gsap";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectLinks } from "@/components/sections/ProjectLinks";
import { cn } from "@/lib/utils";

const STEPS = ["Problem", "Approach", "Result", "Stack"] as const;

function StepBody({ step, study, project }: { step: (typeof STEPS)[number]; study: CaseStudy; project: Project }) {
  if (step === "Stack") {
    return (
      <ul className="flex flex-wrap gap-2 font-mono text-xs">
        {project.technologies.map((t) => (
          <li key={t} className="rounded-full border border-border px-3 py-1.5">
            {t}
          </li>
        ))}
      </ul>
    );
  }
  const text = step === "Problem" ? study.problem : step === "Approach" ? study.approach : study.result;
  return <p className="max-w-[52ch] text-xl leading-snug">{text}</p>;
}

interface Props {
  project: Project;
  study: CaseStudy;
  index: number;
  total: number;
}

/**
 * Flagship case study. Desktop: pinned while Problem → Approach → Result → Stack scroll past
 * (GSAP ScrollTrigger, lazy-loaded). Mobile / short screens / reduced motion: simple stacked reveal.
 */
export function FlagshipBlock({ project, study, index, total }: Props) {
  const canPin = useMediaQuery("(min-width: 1024px) and (min-height: 700px)");
  const reduced = useReducedMotion();
  const pinned = canPin && !reduced;
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!pinned || !el) return;
    let cancelled = false;
    let revert = () => {};

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;
      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", el);
        const ticks = gsap.utils.toArray<HTMLElement>("[data-tick]", el);
        const fill = el.querySelector("[data-fill]");
        gsap.set(panels.slice(1), { opacity: 0, y: 16 });

        const tl = gsap.timeline({ defaults: { ease: "none" } });
        tl.to(fill, { scaleX: 1, duration: panels.length - 0.8 }, 0);
        for (let i = 1; i < panels.length; i++) {
          tl.to(panels[i - 1], { opacity: 0, y: -16, duration: 0.2 }, i - 0.2);
          tl.to(panels[i], { opacity: 1, y: 0, duration: 0.2 }, i);
          tl.to(ticks[i], { opacity: 1, duration: 0.1 }, i);
          tl.to(ticks[i - 1], { opacity: 0.4, duration: 0.1 }, i);
        }

        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: `+=${panels.length * 60}%`,
          pin: true,
          scrub: 0.5,
          animation: tl,
          anticipatePin: 1,
        });
      }, el);
      revert = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      revert();
    };
  }, [pinned]);

  return (
    <article
      ref={root}
      aria-label={`${project.title} case study`}
      className={cn("border-t border-border", pinned ? "flex h-svh items-center" : "py-16")}
    >
      <div className="container-grid w-full">
        <div className="grid-12 items-center gap-y-10">
          <Reveal className="col-span-12 lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <span className="text-brand">{String(index + 1).padStart(2, "0")}</span>/{String(total).padStart(2, "0")} —
              Flagship · {project.category}
            </p>
            <h3 className="text-heading mt-4">{project.title}</h3>
            <p className="mt-5 max-w-md text-muted-foreground">{project.description}</p>
            <ProjectLinks project={project} className="mt-4" />
          </Reveal>

          <div className="col-span-12 lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-border bg-surface">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(min-width: 1024px) 700px, 100vw"
                className="object-cover"
              />
            </div>

            {pinned ? (
              <div className="mt-6">
                <ol className="flex justify-between font-mono text-xs uppercase tracking-[0.14em]">
                  {STEPS.map((s, i) => (
                    <li key={s} data-tick className={i === 0 ? "" : "opacity-40"}>
                      <span className="text-brand">{String(i + 1).padStart(2, "0")}</span> {s}
                    </li>
                  ))}
                </ol>
                <div className="relative mt-3 h-px bg-border">
                  <div
                    data-fill
                    className="absolute inset-0 bg-brand"
                    style={{ transform: "scaleX(0)", transformOrigin: "left" }}
                  />
                </div>
                <div className="mt-6 grid min-h-[8.5rem]">
                  {STEPS.map((s) => (
                    <div key={s} data-panel className="col-start-1 row-start-1">
                      <StepBody step={s} study={study} project={project} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <dl className="mt-8 space-y-6">
                {STEPS.map((s, i) => (
                  <Reveal key={s}>
                    <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      <span className="text-brand">{String(i + 1).padStart(2, "0")}</span> {s}
                    </dt>
                    <dd className="mt-2">
                      <StepBody step={s} study={study} project={project} />
                    </dd>
                  </Reveal>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
