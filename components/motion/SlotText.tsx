"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DUR, EASE_OUT } from "@/lib/motion";

interface SlotTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

/** Vertical slot-roll word rotation. Fixed line height so nothing shifts. Fades under reduced motion. */
export function SlotText({ words, interval = 2800, className }: SlotTextProps) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const enter = reduced ? { opacity: 0 } : { y: "100%", opacity: 0 };
  const exit = reduced ? { opacity: 0 } : { y: "-100%", opacity: 0 };

  return (
    <span className={className}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className="relative block h-[1.3em] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={words[index]}
            className="block whitespace-nowrap"
            initial={enter}
            animate={{ y: 0, opacity: 1 }}
            exit={exit}
            transition={{ duration: reduced ? DUR.ui : 0.6, ease: EASE_OUT }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
