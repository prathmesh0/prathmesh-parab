"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import type { DarkMode } from "@/lib/theme-config";

const MODE_OPTIONS: { id: DarkMode; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
  { id: "light", icon: Sun, label: "Light" },
  { id: "dark", icon: Moon, label: "Dark" },
  { id: "system", icon: Monitor, label: "System" },
];

export const menuTriggerClass =
  "grid size-9 place-items-center rounded-full text-muted-foreground transition-colors duration-[140ms] hover:bg-accent hover:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground";
export const menuContentClass =
  "menu-content z-[80] min-w-44 rounded-2xl border border-border bg-popover p-1.5 shadow-[0_12px_32px_-12px_rgb(0_0_0/0.35)]";
export const menuItemClass =
  "flex cursor-pointer select-none items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-foreground outline-none data-[highlighted]:bg-accent";

export function ThemeModeDropdown() {
  const { mode, setMode } = useTheme();
  const Current = MODE_OPTIONS.find((o) => o.id === mode)?.icon ?? Moon;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={menuTriggerClass} aria-label="Theme mode">
        <Current className="size-4" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" sideOffset={12} className={menuContentClass}>
          <DropdownMenu.Label className="px-3 pb-1 pt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Appearance
          </DropdownMenu.Label>
          <DropdownMenu.RadioGroup value={mode} onValueChange={(v) => setMode(v as DarkMode)}>
            {MODE_OPTIONS.map(({ id, icon: Icon, label }) => (
              <DropdownMenu.RadioItem key={id} value={id} className={menuItemClass}>
                <Icon className="size-4 text-muted-foreground" />
                {label}
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
