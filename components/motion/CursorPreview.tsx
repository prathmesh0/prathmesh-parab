"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Thumbnail that follows the cursor while `visible`. Desktop (fine pointer) only. */
export function CursorPreview({ src, visible }: { src: string | null; visible: boolean }) {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    if (!fine || reduced) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX + 24);
      y.set(e.clientY - 80);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [fine, reduced, x, y]);

  if (!fine || reduced || !src) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 h-[150px] w-60 overflow-hidden rounded-md border border-border bg-surface"
      style={{ x: sx, y: sy }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.94 }}
      transition={{ duration: 0.18 }}
    >
      <Image src={src} alt="" fill sizes="240px" className="object-cover object-top" />
    </motion.div>
  );
}
