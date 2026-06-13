"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Server,
  Database,
  Smartphone,
  Code2,
  Brain,
  Wrench,
  Search,
  SearchX,
} from "lucide-react";
import { skillCategories } from "@/content/skills";
import { staggerContainer, fadeInUp, scaleIn } from "@/animations/variants";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Server,
  Database,
  Smartphone,
  Code2,
  Brain,
  Wrench,
};

function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 animate-pulse">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-muted" />
        <div className="h-3.5 w-28 bg-muted rounded-full" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="flex justify-between mb-1.5">
              <div className="h-2.5 w-20 bg-muted rounded-full" />
              <div className="h-2.5 w-7 bg-muted rounded-full" />
            </div>
            <div className="h-1.5 bg-muted rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  const filtered =
    activeCategory === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeCategory);

  const searchFiltered = search
    ? filtered
        .map((cat) => ({
          ...cat,
          skills: cat.skills.filter((s) =>
            s.name.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter((c) => c.skills.length > 0)
    : filtered;

  const handleFilter = (id: string) => {
    setIsFiltering(true);
    setActiveCategory(id);
    setTimeout(() => setIsFiltering(false), 350);
  };

  const handleSearch = (value: string) => {
    setIsFiltering(true);
    setSearch(value);
    setTimeout(() => setIsFiltering(false), 350);
  };

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.p variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
            Technical Skills
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black">
            My <span className="gradient-text">Skills</span>
          </motion.h2>
        </motion.div>

        {/* Filters + Search */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search skills..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleFilter("all")}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10"
              )}
            >
              All
            </button>
            {skillCategories.map((cat) => {
              const Icon = ICONS[cat.icon] ?? Code2;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleFilter(cat.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Skill cards grid */}
        <AnimatePresence mode="wait">
          {isFiltering ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </motion.div>
          ) : searchFiltered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center py-20 gap-4 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <SearchX className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">No skills found</p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  {search
                    ? `No results for "${search}". Try a different keyword.`
                    : "No skills match the selected category."}
                </p>
              </div>
              <button
                onClick={() => { setSearch(""); setActiveCategory("all"); }}
                className="text-xs font-medium text-primary hover:underline underline-offset-4 transition-all"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {searchFiltered.map((category) => {
                const Icon = ICONS[category.icon] ?? Code2;
                return (
                  <motion.div
                    key={category.id}
                    variants={scaleIn}
                    className="bg-card border border-border rounded-2xl p-4 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground text-sm">{category.name}</h3>
                    </div>

                    <div className="space-y-2.5">
                      {category.skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">{skill.name}</span>
                            <span className="text-xs font-medium text-primary">{skill.level}%</span>
                          </div>
                          <div className="h-1 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{
                                background: "linear-gradient(to right, var(--gradient-start), var(--gradient-end))",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
