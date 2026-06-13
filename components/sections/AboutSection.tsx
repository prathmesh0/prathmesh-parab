'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Lightbulb, Layers, Cpu, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  staggerContainer,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
} from '@/animations/variants';

const PILLARS = [
  {
    icon: Lightbulb,
    title: 'Product Thinking',
    description:
      'Building solutions that align technology with real business needs.',
  },
  {
    icon: Layers,
    title: 'End-to-End Ownership',
    description:
      'From requirements and architecture to deployment and delivery.',
  },
  {
    icon: Cpu,
    title: 'Scalable Engineering',
    description:
      'Creating maintainable systems focused on performance and growth.',
  },
  {
    icon: BookOpen,
    title: 'Continuous Learning',
    description:
      'Exploring AI, system design, and modern technologies to stay ahead.',
  },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeInUp}
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-2"
          >
            About Me
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-black"
          >
            Who I <span className="gradient-text">Am</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Description */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-5"
          >
            <motion.div variants={fadeInLeft}>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m a{' '}
                <strong className="text-foreground">Software Engineer</strong>{' '}
                passionate about building impactful products that solve
                real-world problems and deliver meaningful user experiences.
                Over the past 2+ years, I&apos;ve worked on enterprise
                platforms, AI-powered solutions, transportation systems, and
                mobile applications, contributing from concept to production.
              </p>
            </motion.div>

            <motion.div variants={fadeInLeft}>
              <p className="text-muted-foreground leading-relaxed">
                Beyond coding, I enjoy understanding business needs,
                collaborating with cross-functional teams, and turning complex
                requirements into scalable, user-centric solutions. I&apos;ve
                had the opportunity to work closely with multiple clients and
                stakeholders, including US-based organizations, gaining valuable
                experience in translating business goals into successful product
                outcomes while navigating diverse requirements and expectations.
              </p>
            </motion.div>

            <motion.div variants={fadeInLeft}>
              <p className="text-muted-foreground leading-relaxed">
                Outside of work, I enjoy exploring emerging technologies,
                building personal products, and continuously challenging myself
                to learn and grow. I believe great software goes beyond clean
                code, it&apos;s about solving meaningful problems and creating
                value for users and businesses.
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Pillars + Philosophy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {PILLARS.map((pillar) => (
              <motion.div key={pillar.title} variants={fadeInRight}>
                <Card className="group h-full hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 cursor-default">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <pillar.icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <p className="font-semibold text-foreground text-sm">{pillar.title}</p>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Philosophy card */}
            <motion.div variants={fadeInRight} className="sm:col-span-2">
              <Card
                className="border-primary/20 hover:border-primary/40 transition-all duration-300"
                style={{
                  background:
                    'linear-gradient(135deg, color-mix(in srgb, var(--gradient-start) 12%, transparent), color-mix(in srgb, var(--gradient-end) 8%, transparent))',
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-rose-500" />
                    <span className="text-sm font-semibold">Philosophy</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    &ldquo;Elevate your outcome by nurturing your system.&rdquo;
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
