"use client";

import dynamic from "next/dynamic";
import { useIdleReady } from "@/hooks/useIdleReady";

const CommandPalette = dynamic(() => import("@/components/layout/CommandPalette").then((m) => m.CommandPalette), {
  ssr: false,
});

/** cmdk is only needed once the user can press the shortcut, so load it when the browser is idle. */
export function LazyCommandPalette() {
  const ready = useIdleReady(4000);
  return ready ? <CommandPalette /> : null;
}
