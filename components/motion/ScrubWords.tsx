"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function Word({ word, i, n, progress }: { word: string; i: number; n: number; progress: MotionValue<number> }) {
  const p = useTransform(progress, [i / n, (i + 1) / n], [0, 100]);
  return (
    <motion.span
      className="inline-block"
      // Colour moves from --muted (>= 4.5:1) to --fg, so words never drop below readable contrast.
      style={{ "--p": p, color: "color-mix(in srgb, var(--fg) calc(var(--p) * 1%), var(--muted))" } as unknown as CSSProperties}
    >
      {word}
      {"\u00A0"}
    </motion.span>
  );
}

/** Words brighten as the block scrolls through the viewport (scrubbed). */
export function ScrubWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLQuoteElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const words = text.split(" ");

  if (reduced) return <blockquote className={className}>{text}</blockquote>;

  return (
    <blockquote ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} word={w} i={i} n={words.length} progress={scrollYProgress} />
      ))}
    </blockquote>
  );
}
