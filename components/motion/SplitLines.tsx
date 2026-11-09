"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DUR, EASE_OUT, STAGGER } from "@/lib/motion";

interface SplitLinesProps {
  text: string;
  className?: string;
  delay?: number;
  /** Animate on mount (hero) instead of on scroll. */
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
  /** One emphasised word, set in Instrument Serif italic. */
  em?: string;
}

/**
 * Mask reveal: each word slides up from behind a clip (translateY 100% → 0).
 * SSR-safe (text is in the HTML), no layout shift, opacity-only under reduced motion.
 */
export function SplitLines({ text, className, delay = 0, immediate, as = "h2", em }: SplitLinesProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.h2;
  const words = text.split(" ");
  const trigger = immediate
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: STAGGER, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
          <motion.span
            className={w === em ? "serif-em inline-block" : "inline-block"}
            variants={{
              hidden: reduced ? { opacity: 0 } : { y: "100%" },
              visible: reduced ? { opacity: 1 } : { y: 0 },
            }}
            transition={{ duration: reduced ? DUR.ui : DUR.reveal, ease: EASE_OUT }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
