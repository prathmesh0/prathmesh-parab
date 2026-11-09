"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function Word({ word, i, n, progress }: { word: string; i: number; n: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [i / n, (i + 1) / n], [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
      {" "}
    </motion.span>
  );
}

/** Words brighten as the block scrolls through the viewport (scrubbed opacity). */
export function ScrubWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLQuoteElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const words = text.split(" ");

  if (reduced) return <blockquote className={className}>{text}</blockquote>;

  return (
    <blockquote ref={ref} className={className} aria-label={text}>
      <span aria-hidden>
        {words.map((w, i) => (
          <Word key={i} word={w} i={i} n={words.length} progress={scrollYProgress} />
        ))}
      </span>
    </blockquote>
  );
}
