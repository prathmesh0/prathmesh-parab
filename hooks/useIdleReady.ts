"use client";

import { useEffect, useState } from "react";

/** Becomes true once the browser is idle (timer fallback for Safari). Used to defer non-critical JS. */
export function useIdleReady(timeout = 3000): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setReady(true), { timeout });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(() => setReady(true), Math.min(timeout, 2000));
    return () => clearTimeout(t);
  }, [timeout]);
  return ready;
}
