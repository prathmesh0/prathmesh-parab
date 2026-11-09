"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Brain,
  Code2,
  Database,
  Monitor,
  Search,
  SearchX,
  Server,
  Smartphone,
  Wrench,
} from "lucide-react";
import {
  siC,
  siCplusplus,
  siCss,
  siDart,
  siExpress,
  siFirebase,
  siFlutter,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMongodb,
  siMui,
  siNextdotjs,
  siNodedotjs,
  siPostman,
  siReact,
  siShadcnui,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { skillCategories } from "@/content/skills";
import { SectionLabel } from "@/components/motion/SectionLabel";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { EASE_OUT, SPRING_UI } from "@/lib/motion";
import { pillClass } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Server,
  Database,
  Smartphone,
  Code2,
  Brain,
  Wrench,
};

const BRAND: Record<string, SimpleIcon> = {
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  Dart: siDart,
  "C++": siCplusplus,
  C: siC,
  "React.js": siReact,
  "Next.js": siNextdotjs,
  HTML: siHtml5,
  CSS: siCss,
  "Tailwind CSS": siTailwindcss,
  "Shadcn UI": siShadcnui,
  MUI: siMui,
  Flutter: siFlutter,
  "Node.js": siNodedotjs,
  "Express.js": siExpress,
  MongoDB: siMongodb,
  Firebase: siFirebase,
  Git: siGit,
  GitHub: siGithub,
  Postman: siPostman,
};

function SkillIcon({ name, Fallback }: { name: string; Fallback: React.ComponentType<{ className?: string }> }) {
  const icon = BRAND[name];
  if (!icon) return <Fallback className="size-3.5 shrink-0" />;
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-3.5 shrink-0 fill-current">
      <path d={icon.path} />
    </svg>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-[2px] bg-transparent text-accent-ink underline decoration-brand underline-offset-4">
        {text.slice(i, i + query.length)}
      </mark>
      {text.slice(i + query.length)}
    </>
  );
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const query = search.trim();

  const groups = useMemo(() => {
    const q = query.toLowerCase();
    return skillCategories
      .filter((c) => activeCategory === "all" || c.id === activeCategory)
      .map((c) => ({ ...c, skills: q ? c.skills.filter((s) => s.name.toLowerCase().includes(q)) : c.skills }))
      .filter((c) => c.skills.length > 0);
  }, [activeCategory, query]);

  return (
    <section id="skills" className="section-padding border-t border-border">
      <div className="container-grid">
        <SectionLabel index="03">Skills</SectionLabel>
        <SplitLines text="My Skills" em="Skills" className="text-heading mt-4" />

        <Reveal className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter skills by category" className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={activeCategory === "all"} onClick={() => setActiveCategory("all")} className={pillClass(activeCategory === "all")}>
              All
            </button>
            {skillCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={activeCategory === c.id}
                onClick={() => setActiveCategory(c.id)}
                className={pillClass(activeCategory === c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>

          <label className="relative block w-full md:w-64">
            <span className="sr-only">Search skills</span>
            <Search aria-hidden className="absolute left-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skills"
              className="h-11 w-full border-b border-border bg-transparent pl-7 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand"
            />
          </label>
        </Reveal>

        <div className="mt-10 border-t border-border" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {groups.map((cat) => {
              const CatIcon = CATEGORY_ICONS[cat.icon] ?? Code2;
              return (
                <motion.div
                  key={cat.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.24, ease: EASE_OUT, layout: SPRING_UI }}
                  className="grid gap-4 border-b border-border py-7 md:grid-cols-12 md:gap-6"
                >
                  <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground md:col-span-3">
                    <CatIcon className="size-4" />
                    {cat.name}
                    <span className="text-foreground">{String(cat.skills.length).padStart(2, "0")}</span>
                  </h3>
                  <ul className="flex flex-wrap gap-2 md:col-span-9">
                    <AnimatePresence mode="popLayout" initial={false}>
                      {cat.skills.map((s) => (
                        <motion.li
                          key={s.name}
                          layout
                          initial={{ opacity: 0, scale: 0.94 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.94 }}
                          transition={{ duration: 0.24, ease: EASE_OUT, layout: SPRING_UI }}
                          className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm transition-colors duration-[140ms] hover:border-brand"
                        >
                          <SkillIcon name={s.name} Fallback={CatIcon} />
                          <span>
                            <Highlight text={s.name} query={query} />
                          </span>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {groups.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
              <SearchX className="size-6" />
              <p>No skills match &ldquo;{query}&rdquo;.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
