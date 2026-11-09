"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** 1px accent progress line at the top of the viewport. Driven by motion values (no React re-renders). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-brand"
      style={{ scaleX }}
    />
  );
}
