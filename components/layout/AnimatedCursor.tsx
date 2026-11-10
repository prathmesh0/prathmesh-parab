"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Small accent dot that trails the pointer (fine pointers only, off for reduced motion). */
export function AnimatedCursor() {
  const reduced = useReducedMotion();
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-50);
  const y = useMotionValue(-50);
  const sx = useSpring(x, { stiffness: 700, damping: 40 });
  const sy = useSpring(y, { stiffness: 700, damping: 40 });

  useEffect(() => {
    if (!enabled || reduced) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [role='button'], input, textarea, [data-cursor-hover]"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [enabled, reduced, x, y]);

  if (!enabled || reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] -ml-1 -mt-1 size-2 rounded-full bg-brand"
      style={{ x: sx, y: sy }}
      animate={{ scale: hover ? 3 : 1, opacity: hover ? 0.5 : 1 }}
      transition={{ duration: 0.14 }}
    />
  );
}
