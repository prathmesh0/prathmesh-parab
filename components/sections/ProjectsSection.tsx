"use client";

import { useState } from "react";
import { projects } from "@/content/projects";
import { caseStudies } from "@/content/case-studies";
import { SectionLabel } from "@/components/motion/SectionLabel";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { FlagshipBlock } from "@/components/sections/FlagshipBlock";
import { ProjectArchive } from "@/components/sections/ProjectArchive";
import { pillClass } from "@/lib/utils";

const FILTERS = ["All", "Web", "Mobile", "AI", "Backend"];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const matches = (category: string) => activeFilter === "All" || category.includes(activeFilter);
  const filtered = projects.filter((p) => matches(p.category));
  const flagships = filtered.filter((p) => p.flagship && caseStudies[p.id]);

  return (
    <section id="projects" className="section-padding border-t border-border">
      <div className="container-grid">
        <SectionLabel index="04">Projects</SectionLabel>
        <SplitLines text="Featured Projects" em="Projects" className="text-heading mt-4" />

        <Reveal className="mt-12">
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
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
        </Reveal>
      </div>

      {flagships.length > 0 && (
        <div className="mt-16">
          {flagships.map((p, i) => (
            <FlagshipBlock
              key={`${activeFilter}-${p.id}`}
              project={p}
              study={caseStudies[p.id]}
              index={i}
              total={flagships.length}
            />
          ))}
        </div>
      )}

      <div className="container-grid mt-24">
        <div className="mb-6 flex items-baseline justify-between">
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Archive</h3>
          <p aria-live="polite" className="font-mono text-xs text-muted-foreground">
            {String(filtered.length).padStart(2, "0")} projects
          </p>
        </div>
        <ProjectArchive projects={filtered} />
        {filtered.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
}
