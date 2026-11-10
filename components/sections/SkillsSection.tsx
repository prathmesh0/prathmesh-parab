"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Brain,
  Code2,
  Database,
  Monitor,
  Pause,
  Play,
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

type Icon = React.ComponentType<{ className?: string }>;

const CATEGORY_ICONS: Record<string, Icon> = {
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

function SkillIcon({
  name,
  Fallback,
  size = "size-3.5",
}: {
  name: string;
  Fallback: Icon;
  size?: string;
}) {
  const icon = BRAND[name];
  if (!icon) return <Fallback className={`${size} shrink-0`} />;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`${size} shrink-0 fill-current`}
    >
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

const FADE_MASK =
  "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)";

function MarqueeRow({
  items,
  speed,
}: {
  items: { name: string; category: string; Cat: Icon }[];
  speed: number;
}) {
  return (
    <div
      className="marquee overflow-hidden py-1.5"
      style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
    >
      <div
        className="marquee-track"
        style={{ ["--marquee-speed" as string]: `${speed}s` }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 gap-3 pr-3"
          >
            {items.map((s) => (
              <li
                key={s.name}
                className="inline-flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 transition-colors duration-[140ms] hover:border-brand"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-secondary text-foreground">
                  <SkillIcon name={s.name} Fallback={s.Cat} size="size-4" />
                </span>
                <span className="leading-tight">
                  <span className="block whitespace-nowrap text-base font-medium">
                    {s.name}
                  </span>
                  <span className="block whitespace-nowrap font-mono text-[11px] text-muted-foreground">
                    {s.category}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [exploreChoice, setExplore] = useState(false);
  const reduced = useReducedMotion();
  // Reduced-motion users always get the static, explorable view (no marquee).
  const explore = exploreChoice || !!reduced;
  const query = search.trim();

  const flat = useMemo(
    () =>
      skillCategories.flatMap((c) =>
        c.skills.map((s) => ({
          name: s.name,
          category: c.name,
          Cat: CATEGORY_ICONS[c.icon] ?? Code2,
        })),
      ),
    [],
  );
  const rowA = useMemo(() => flat.filter((_, i) => i % 2 === 0), [flat]);
  const rowB = useMemo(() => flat.filter((_, i) => i % 2 === 1), [flat]);

  const groups = useMemo(() => {
    const q = query.toLowerCase();
    return skillCategories
      .filter((c) => activeCategory === "all" || c.id === activeCategory)
      .map((c) => ({
        ...c,
        skills: q
          ? c.skills.filter((s) => s.name.toLowerCase().includes(q))
          : c.skills,
      }))
      .filter((c) => c.skills.length > 0);
  }, [activeCategory, query]);

  const pickCategory = (id: string) => {
    setActiveCategory(id);
    setExplore(true);
  };
  const resume = () => {
    setActiveCategory("all");
    setSearch("");
    setExplore(false);
  };

  return (
    <section id="skills" className="section-padding border-t border-border">
      <div className="container-grid">
        <SectionLabel index="03">Skills</SectionLabel>
        <SplitLines
          text="My Skills"
          em="Skills"
          className="text-heading mt-4"
        />

        <Reveal className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter skills by category"
            className="flex flex-wrap gap-2"
          >
            <button
              type="button"
              aria-pressed={explore && activeCategory === "all"}
              onClick={() => pickCategory("all")}
              className={pillClass(explore && activeCategory === "all")}
            >
              All
            </button>
            {skillCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={explore && activeCategory === c.id}
                onClick={() => pickCategory(c.id)}
                className={pillClass(explore && activeCategory === c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <label className="relative block w-full md:w-56">
              <span className="sr-only">Search skills</span>
              <Search
                aria-hidden
                className="absolute left-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value) setExplore(true);
                }}
                placeholder="Search skills"
                className="h-11 w-full border-b border-border bg-transparent pl-7 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand"
              />
            </label>
            {!reduced && (
              <button
                type="button"
                onClick={() => (explore ? resume() : setExplore(true))}
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-border px-4 font-mono text-xs transition-[border-color,transform] duration-[140ms] hover:border-brand active:scale-[0.97]"
              >
                {explore ? (
                  <Play className="size-3.5" aria-hidden />
                ) : (
                  <Pause className="size-3.5" aria-hidden />
                )}
                {explore ? "Resume marquee" : "Pause & explore"}
              </button>
            )}
          </div>
        </Reveal>

        <div className="mt-10" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {!explore ? (
              <motion.div
                key="marquee"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: EASE_OUT }}
                className="flex flex-col gap-3"
              >
                <MarqueeRow items={rowA} speed={50} />
                <MarqueeRow items={rowB} speed={65} />
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  Hover to pause, or use &ldquo;Pause &amp; explore&rdquo; to
                  filter and search.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="explore"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: EASE_OUT }}
              >
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {groups.map((cat, ci) => {
                      const CatIcon = CATEGORY_ICONS[cat.icon] ?? Code2;
                      return (
                        <motion.li
                          key={cat.id}
                          layout
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1, transition: { duration: 0.32, ease: EASE_OUT, delay: (ci % 3) * 0.06 } }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{
                            duration: 0.24,
                            ease: EASE_OUT,
                            layout: SPRING_UI,
                          }}
                          className="list-none rounded-2xl border border-border bg-surface p-6"
                        >
                          <div className="flex items-center justify-between">
                            <span className="grid size-10 place-items-center rounded-xl bg-secondary">
                              <CatIcon className="size-5" />
                            </span>
                            <span className="font-mono text-xs text-muted-foreground">
                              {String(cat.skills.length).padStart(2, "0")}
                            </span>
                          </div>
                          <h3 className="mt-5 text-lg font-medium tracking-tight">
                            {cat.name}
                          </h3>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {cat.skills.map((s) => (
                              <li
                                key={s.name}
                                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-sm transition-[color,transform] duration-[140ms] hover:-translate-y-0.5 hover:text-accent-ink"
                              >
                                <SkillIcon name={s.name} Fallback={CatIcon} />
                                <span>
                                  <Highlight text={s.name} query={query} />
                                </span>
                              </li>
                            ))}
                          </ul>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>

                {groups.length === 0 && (
                  <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
                    <SearchX className="size-6" />
                    <p>No skills match &ldquo;{query}&rdquo;.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
