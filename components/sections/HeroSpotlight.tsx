"use client";

import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Desktop-only soft cursor spotlight on the hero background. */
export function HeroSpotlight({ targetId }: { targetId: string }) {
  const desktop = useMediaQuery("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
  const reduced = useReducedMotion();
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 120, damping: 30 });
  const sy = useSpring(y, { stiffness: 120, damping: 30 });
  const background = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, color-mix(in srgb, var(--fg) 7%, transparent), transparent 70%)`;

  useEffect(() => {
    if (!desktop || reduced) return;
    const el = document.getElementById(targetId);
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    el.addEventListener("pointermove", move, { passive: true });
    return () => el.removeEventListener("pointermove", move);
  }, [desktop, reduced, targetId, x, y]);

  if (!desktop || reduced) return null;
  return <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background }} />;
}
