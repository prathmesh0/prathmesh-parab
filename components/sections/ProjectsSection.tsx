"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { projects } from "@/content/projects";
import { caseStudies } from "@/content/case-studies";
import { SectionLabel } from "@/components/motion/SectionLabel";
import { SplitLines } from "@/components/motion/SplitLines";
import { FlagshipBlock } from "@/components/sections/FlagshipBlock";
import { ProjectArchive } from "@/components/sections/ProjectArchive";
import { pillClass } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

const FILTERS = ["All", "Web", "Mobile", "AI", "Backend"];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const flagships = projects.filter((p) => p.flagship && caseStudies[p.id]);
  const flagshipIds = new Set(flagships.map((p) => p.id));
  // The remaining projects, shown on request and narrowed by the category filters.
  const others = projects.filter((p) => !flagshipIds.has(p.id));
  const filtered = others.filter((p) => activeFilter === "All" || p.category.includes(activeFilter));

  const collapse = () => {
    setShowAll(false);
    setActiveFilter("All");
    document.getElementById("projects")?.scrollIntoView({ block: "start" });
  };

  return (
    <section id="projects" className="section-padding border-t border-border">
      <div className="container-grid">
        <SectionLabel index="04">Projects</SectionLabel>
        <SplitLines text="Featured Projects" em="Projects" className="text-heading mt-4" />
      </div>

      <div className="mt-10">
        {flagships.map((p, i) => (
          <FlagshipBlock key={p.id} project={p} study={caseStudies[p.id]} index={i} total={flagships.length} />
        ))}
      </div>

      <div className="container-grid border-t border-border pt-12">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {showAll ? `More projects · ${String(filtered.length).padStart(2, "0")}` : `${others.length} more projects`}
          </p>
          <button
            type="button"
            aria-expanded={showAll}
            aria-controls="more-projects"
            onClick={() => (showAll ? collapse() : setShowAll(true))}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 font-mono text-sm transition-colors duration-[140ms] hover:border-brand"
          >
            {showAll ? "Show fewer" : "Explore all projects"}
            {showAll ? <ArrowUp className="size-4" aria-hidden /> : <ArrowDown className="size-4" aria-hidden />}
          </button>
        </div>

        <div id="more-projects">
          <AnimatePresence initial={false}>
            {showAll && (
              <motion.div
                key="more"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="mt-8"
              >
                <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
                  {FILTERS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      aria-pressed={activeFilter === f}
                      onClick={() => setActiveFilter(f)}
                      className={pillClass(activeFilter === f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <ProjectArchive projects={filtered} />
                {filtered.length === 0 && (
                  <p aria-live="polite" className="py-16 text-center text-muted-foreground">
                    No projects in this category yet.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
