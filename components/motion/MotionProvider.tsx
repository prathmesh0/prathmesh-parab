"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { registerLenis } from "@/lib/scroll";
import { getScrollTrigger } from "@/lib/gsap";

function LenisBridge() {
  // Keeps ScrollTrigger (lazy-loaded) in sync with Lenis' single RAF loop.
  const lenis = useLenis(() => getScrollTrigger()?.update());
  useEffect(() => {
    registerLenis(lenis ?? null);
    return () => registerLenis(null);
  }, [lenis]);
  return null;
}

/** Root motion provider: reduced-motion aware config + Lenis smooth scroll (desktop wheel only). */
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {reduced ? (
        children
      ) : (
        <ReactLenis root options={{ autoRaf: true, syncTouch: false, lerp: 0.1, anchors: false }}>
          <LenisBridge />
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}
