"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, CheckCircle2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/content/experience";
import { staggerContainer, fadeInUp } from "@/animations/variants";

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
            Work History
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black">
            My <span className="gradient-text">Experience</span>
          </motion.h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent -translate-x-1/2 hidden sm:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: i * 0.15 }}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
              >
                {/* Timeline dot */}
                <div className="hidden sm:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                  <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 ring-offset-2 ring-offset-background" />
                </div>

                {/* Left side — dates */}
                <div className="hidden md:flex flex-col items-end pt-6 pr-8">
                  <div className="text-right">
                    <span className="text-muted-foreground text-sm">{exp.period}</span>
                    {exp.current && (
                      <div className="mt-1">
                        <Badge variant="gradient" className="text-xs">
                          Current
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side — card */}
                <div className="md:pl-8 pt-0 md:pt-6">
                  <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 group">
                    {/* Mobile date */}
                    <div className="flex items-center justify-between mb-4 md:hidden">
                      <span className="text-muted-foreground text-sm">{exp.period}</span>
                      {exp.current && <Badge variant="gradient" className="text-xs">Current</Badge>}
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      {/* Company icon */}
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-medium flex items-center gap-1 hover:underline text-sm mt-0.5"
                        >
                          {exp.company}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{exp.description}</p>

                    {/* Achievements */}
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((ach, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                          {ach}
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
