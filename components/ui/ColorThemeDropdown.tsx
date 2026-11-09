"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Palette, Check } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { COLOR_THEMES, type ColorTheme } from "@/lib/theme-config";
import { menuContentClass, menuItemClass, menuTriggerClass } from "@/components/ui/ThemeModeDropdown";

export function ColorThemeDropdown() {
  const { color, setColor } = useTheme();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={`${menuTriggerClass} relative`} aria-label="Accent colour">
        <Palette className="size-4" />
        <span aria-hidden className="absolute bottom-1.5 right-1.5 size-1.5 rounded-full bg-brand" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" sideOffset={12} className={menuContentClass}>
          <DropdownMenu.Label className="px-3 pb-1 pt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Accent
          </DropdownMenu.Label>
          <DropdownMenu.RadioGroup value={color} onValueChange={(v) => setColor(v as ColorTheme)}>
            {COLOR_THEMES.map((t) => (
              <DropdownMenu.RadioItem key={t.id} value={t.id} className={menuItemClass}>
                <span aria-hidden className="size-3.5 rounded-full" style={{ background: t.swatch }} />
                {t.label}
                <DropdownMenu.ItemIndicator className="ml-auto">
                  <Check className="size-3.5 text-brand" />
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
