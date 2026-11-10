"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/types";
import { ProjectLinks } from "@/components/sections/ProjectLinks";
import { EASE_OUT, SPRING_UI } from "@/lib/motion";

/** Archive as a card gallery: preview on top, details below. Cards lift on hover. */
export function ProjectArchive({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {projects.map((p, i) => (
          <motion.li
            key={p.id}
            layout
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.32, ease: EASE_OUT, delay: (i % 3) * 0.06 } }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.24, ease: EASE_OUT, layout: SPRING_UI }}
            className="group list-none"
          >
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,transform] duration-[240ms] hover:-translate-y-1 hover:border-brand">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-secondary">
                <Image
                  src={p.image}
                  alt={`${p.title} preview`}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  priority={i < 3}
                />
                <span className="absolute left-3 top-3 rounded-full border border-border bg-background/85 px-2.5 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur">
                  {p.category}
                </span>
                {p.featured && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/85 px-2.5 py-1 font-mono text-[11px] text-foreground backdrop-blur">
                    <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                    Featured
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h4 className="text-xl font-medium tracking-tight">{p.title}</h4>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {p.technologies.slice(0, 4).map((t) => (
                    <li key={t} className="rounded-md bg-secondary px-2 py-1">
                      {t}
                    </li>
                  ))}
                  {p.technologies.length > 4 && (
                    <li className="px-1 py-1 text-muted-foreground">+{p.technologies.length - 4}</li>
                  )}
                </ul>
                <ProjectLinks project={p} className="mt-auto pt-3" />
              </div>
            </article>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
