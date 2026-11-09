"use client";

import { ThemeModeDropdown } from "@/components/ui/ThemeModeDropdown";
import { ColorThemeDropdown } from "@/components/ui/ColorThemeDropdown";

export function ThemeControls({ open }: { open?: "mode" | "color" }) {
  return (
    <>
      <ThemeModeDropdown defaultOpen={open === "mode"} />
      <ColorThemeDropdown defaultOpen={open === "color"} />
    </>
  );
}
