"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_OUT } from "@/lib/motion";

interface CountUpProps {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

/** Final value is in the server HTML; counts up once when scrolled into view. */
export function CountUp({ value, suffix = "", className, duration = 1.6 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || reduced || !el) return;
    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString("en-US");
      },
      onComplete: () => {
        el.textContent = value.toLocaleString("en-US");
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  return (
    <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      <span ref={ref}>{value.toLocaleString("en-US")}</span>
      {suffix}
    </span>
  );
}
