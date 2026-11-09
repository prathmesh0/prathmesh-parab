"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "@/lib/scroll";

/** Circular back-to-top button with a scroll-progress ring. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 400));

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full border border-border bg-background/90 text-foreground backdrop-blur-md transition-colors hover:text-accent-ink"
        >
          <svg viewBox="0 0 48 48" aria-hidden className="absolute inset-0 size-full -rotate-90">
            <motion.circle
              cx="24"
              cy="24"
              r="22.5"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp className="size-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
