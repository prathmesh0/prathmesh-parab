"use client";

import { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Star } from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/content/projects";
import { staggerContainer, fadeInUp } from "@/animations/variants";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Web", "Mobile", "AI", "Backend"];

// Card-level stagger: each card's children cascade in
const cardContainerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardImageVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const cardItemVariants: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.p variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
            Portfolio
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black">
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A selection of projects that showcase my skills across web, mobile, and AI domains.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-center gap-2 mb-10 flex-wrap"
        >
          {FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all",
                activeFilter === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filtered.map((project) => (
            <motion.article
              key={project.id}
              variants={cardContainerVariants}
              whileHover={{ y: -4 }}
              className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-shadow transition-[border-color] duration-300 relative"
            >
              {/* Background glow (mirrors FeatureHighlightCard) */}
              <div className="absolute left-1/2 top-0 -z-0 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl pointer-events-none" />

              {/* Cover image */}
              <motion.div
                variants={cardImageVariants}
                className="relative h-36 overflow-hidden shrink-0"
                style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--gradient-start) 25%, transparent), color-mix(in srgb, var(--gradient-end) 15%, transparent))" }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />

                {project.featured && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="gradient" className="flex items-center gap-1 text-[10px] px-1.5 py-0.5">
                      <Star className="h-2.5 w-2.5" />
                      Featured
                    </Badge>
                  </div>
                )}

                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">
                    {project.category}
                  </Badge>
                </div>
              </motion.div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-4">
                <motion.h3
                  variants={cardItemVariants}
                  className="text-sm font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors leading-snug"
                >
                  {project.title}
                </motion.h3>

                <motion.p
                  variants={cardItemVariants}
                  className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2"
                >
                  {project.description}
                </motion.p>

                {/* Tech badges */}
                <motion.div variants={cardItemVariants} className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-[10px] px-1.5 py-0">
                      {tech}
                    </Badge>
                  ))}
                </motion.div>

                {/* Links */}
                <motion.div variants={cardItemVariants} className="flex gap-2 mt-auto">
                  {project.liveUrl ? (
                    <Button variant="gradient" size="sm" asChild className="flex-1 h-8 text-xs">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                        Live Demo
                      </a>
                    </Button>
                  ) : (
                    <div className="flex-1" />
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild className="flex-1 h-8 text-xs">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="h-3 w-3" />
                        View Code
                      </a>
                    </Button>
                  )}
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
