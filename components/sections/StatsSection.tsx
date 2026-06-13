"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { stats } from "@/content/profile";
import { staggerContainer, fadeInUp } from "@/animations/variants";

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const animated = useRef(false);

  useEffect(() => {
    if (!inView || animated.current) return;
    animated.current = true;

    stats.forEach((stat, i) => {
      const el = document.getElementById(`stat-value-${i}`);
      if (!el) return;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.value,
        duration: 2,
        delay: i * 0.15,
        ease: "power2.out",
        onUpdate() {
          el.textContent = Math.round(obj.val).toLocaleString();
        },
      });
    });
  }, [inView]);

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="text-center group"
            >
              <div className="text-4xl sm:text-5xl font-black gradient-text mb-1">
                <span id={`stat-value-${i}`}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <div className="text-sm font-semibold text-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
