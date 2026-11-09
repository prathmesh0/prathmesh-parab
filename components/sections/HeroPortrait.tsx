"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_OUT } from "@/lib/motion";

/** 4:5 portrait revealed with a clip-path inset. Space is reserved by aspect-ratio (no CLS). */
export function HeroPortrait({ src, alt }: { src: string; alt: string }) {
  const reduced = useReducedMotion();
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border bg-surface">
      <motion.div
        className="grain absolute inset-0"
        initial={reduced ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
        animate={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: reduced ? 0.24 : 0.9, ease: EASE_OUT, delay: 0.1 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 90vw"
          className="object-cover object-[50%_20%]"
        />
      </motion.div>
    </div>
  );
}
