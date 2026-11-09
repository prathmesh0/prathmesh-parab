"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Moon, Palette } from "lucide-react";
import { useIdleReady } from "@/hooks/useIdleReady";
import { menuTriggerClass } from "@/components/ui/menuStyles";

const ThemeControls = dynamic(() => import("@/components/ui/ThemeControls").then((m) => m.ThemeControls), {
  ssr: false,
});

/**
 * Theme + accent menus (Radix) load when the browser is idle, or immediately on first click.
 * Until then identical-looking buttons hold the space, so nothing shifts.
 */
export function LazyThemeControls() {
  const idle = useIdleReady();
  const [clicked, setClicked] = useState<"mode" | "color" | null>(null);

  if (idle || clicked) return <ThemeControls open={clicked ?? undefined} />;
  return (
    <>
      <button type="button" className={menuTriggerClass} aria-label="Theme mode" onClick={() => setClicked("mode")}>
        <Moon className="size-4" />
      </button>
      <button type="button" className={`${menuTriggerClass} relative`} aria-label="Accent colour" onClick={() => setClicked("color")}>
        <Palette className="size-4" />
        <span aria-hidden className="absolute bottom-1.5 right-1.5 size-1.5 rounded-full bg-brand" />
      </button>
    </>
  );
}
