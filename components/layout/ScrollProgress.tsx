"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent">
      <div
        className="h-full transition-all duration-75"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(to right, var(--gradient-start), var(--gradient-end))",
        }}
      />
    </div>
  );
}
