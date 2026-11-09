"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { loadGsap } from "@/lib/gsap";

/**
 * Paragraph that reveals line by line (GSAP SplitText, lazy-loaded).
 * Text is in the server HTML; plain text is kept for reduced motion.
 */
export function RevealLines({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let cancelled = false;
    let revert = () => {};

    loadGsap().then(({ gsap, SplitText }) => {
      if (cancelled) return;
      const ctx = gsap.context(() => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          aria: "none",
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.06,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }),
        });
      }, el);
      revert = () => ctx.revert();
    });

    return () => {
      cancelled = true;
      revert();
    };
  }, [reduced]);

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}
