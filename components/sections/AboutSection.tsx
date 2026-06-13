"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, MapPin, Calendar, Code2, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/content/profile";
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from "@/animations/variants";

const QUICK_FACTS = [
  { icon: MapPin, label: "Location", value: profile.location },
  { icon: Calendar, label: "Experience", value: "2+ Years" },
  { icon: Code2, label: "Specialty", value: "Frontend & Mobile" },
  { icon: Zap, label: "Status", value: "Available" },
];

const STRENGTHS = [
  "Problem Solver",
  "Fast Learner",
  "Team Player",
  "UI/UX Enthusiast",
  "Performance Optimizer",
  "Clean Code Advocate",
];

const INTERESTS = ["🚀 Web Performance", "🤖 AI/ML", "📱 Mobile Dev", "🎨 UI Design", "💡 Open Source", "📖 DSA"];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
            About Me
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black">
            Who I <span className="gradient-text">Am</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={fadeInLeft}>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Currently working as <strong className="text-foreground">Associate Frontend Developer</strong> at{" "}
                <strong className="text-primary">Lauren Information Technology</strong>, specializing in Next.js, React,
                TypeScript, Flutter, and modern web technologies.
              </p>
            </motion.div>

            <motion.div variants={fadeInLeft}>
              <p className="text-muted-foreground leading-relaxed">
                I am passionate about building high-performance, pixel-perfect user interfaces that deliver exceptional
                experiences. From financial automation platforms to AI-powered applications, I love solving complex problems
                with elegant solutions.
              </p>
            </motion.div>

            <motion.div variants={fadeInLeft}>
              <p className="text-muted-foreground leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me solving DSA problems, exploring new technologies, or
                contributing to open-source projects. I believe in continuous learning and staying ahead of the curve.
              </p>
            </motion.div>

            {/* Strengths */}
            <motion.div variants={fadeInLeft}>
              <h3 className="font-semibold text-foreground mb-3">Strengths</h3>
              <div className="flex flex-wrap gap-2">
                {STRENGTHS.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs px-3 py-1">
                    {s}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div variants={fadeInLeft}>
              <h3 className="font-semibold text-foreground mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => (
                  <span
                    key={interest}
                    className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInLeft}>
              <Button variant="gradient" size="lg" asChild>
                <a href={profile.resume} download>
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right – Quick Facts */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {QUICK_FACTS.map((fact, i) => (
              <motion.div key={i} variants={fadeInRight}>
                <Card className="group hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 cursor-default">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <fact.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{fact.label}</span>
                    </div>
                    <p className="font-semibold text-foreground">{fact.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Big card */}
            <motion.div variants={fadeInRight} className="sm:col-span-2">
              <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-rose-500" />
                    <span className="text-sm font-semibold">Philosophy</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    &ldquo;Code is not just instructions for machines — it&apos;s a craft. I strive to write code that is
                    elegant, maintainable, and impactful.&rdquo;
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
