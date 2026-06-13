"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    tl.to(
      {},
      {
        duration: 1.8,
        onUpdate() {
          setProgress(Math.round(this.progress() * 100));
        },
      }
    );

    tl.from(
      ".loading-logo",
      { opacity: 0, scale: 0.5, duration: 0.6, ease: "back.out(1.7)" },
      0
    );
    tl.from(
      ".loading-name",
      { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" },
      0.4
    );
    tl.from(
      ".loading-title",
      { opacity: 0, y: 10, duration: 0.4, ease: "power2.out" },
      0.6
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
    >
      {/* Animated logo */}
      <div className="loading-logo mb-6 relative">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40">
          <span className="text-3xl font-black text-white">PP</span>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 blur-xl opacity-40 -z-10 animate-pulse" />
      </div>

      <h1 className="loading-name text-3xl font-bold text-foreground mb-1">
        Prathmesh Parab
      </h1>
      <p className="loading-title text-muted-foreground text-sm mb-10">
        Software Engineer &amp; Frontend Developer
      </p>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-border rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="mt-2 text-xs text-muted-foreground">{progress}%</span>
    </div>
  );
}
