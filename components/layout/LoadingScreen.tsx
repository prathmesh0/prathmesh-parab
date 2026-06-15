'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Logo } from '@/components/shared/Logo';

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
          ease: 'power2.inOut',
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
      },
    );

    tl.from(
      '.loading-logo',
      { opacity: 0, scale: 0.5, duration: 0.6, ease: 'back.out(1.7)' },
      0,
    );
    tl.from(
      '.loading-name',
      { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' },
      0.4,
    );
    tl.from(
      '.loading-title',
      { opacity: 0, y: 10, duration: 0.4, ease: 'power2.out' },
      0.6,
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
      <div className="loading-logo mb-6 relative flex items-center justify-center">
        {/* Pulse ring 1 — fastest */}
        <span
          className="absolute inline-flex rounded-full opacity-20 animate-ping"
          style={{
            width: 110,
            height: 110,
            background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
            animationDuration: '1.2s',
          }}
        />
        {/* Pulse ring 2 — slower, delayed */}
        <span
          className="absolute inline-flex rounded-full opacity-10 animate-ping"
          style={{
            width: 140,
            height: 140,
            background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
            animationDuration: '1.8s',
            animationDelay: '0.4s',
          }}
        />
        {/* Static glow beneath */}
        <div
          className="absolute rounded-full blur-2xl opacity-35"
          style={{
            width: 100,
            height: 100,
            background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
          }}
        />
        <Logo size={80} variant="full" className="relative z-10" />
      </div>

      <h1 className="loading-name text-3xl font-bold text-foreground mb-1">
        Prathmesh Parab
      </h1>
      <p className="loading-title text-muted-foreground text-sm mb-10">
        Software Engineer
      </p>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-border rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full rounded-full transition-all duration-75"
          style={{
            width: `${progress}%`,
            background:
              'linear-gradient(90deg, var(--gradient-start), var(--gradient-end))',
          }}
        />
      </div>
      <span className="mt-2 text-xs text-muted-foreground">{progress}%</span>
    </div>
  );
}
