"use client";

import { useRef } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import type { DarkMode } from "@/lib/theme-config";
import { menuContentClass, menuItemClass, menuTriggerClass } from "@/components/ui/menuStyles";

const MODE_OPTIONS: { id: DarkMode; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
  { id: "light", icon: Sun, label: "Light" },
  { id: "dark", icon: Moon, label: "Dark" },
  { id: "system", icon: Monitor, label: "System" },
];

export function ThemeModeDropdown({ defaultOpen }: { defaultOpen?: boolean }) {
  const { mode, setMode } = useTheme();
  const trigger = useRef<HTMLButtonElement>(null);
  const Current = MODE_OPTIONS.find((o) => o.id === mode)?.icon ?? Moon;

  return (
    <DropdownMenu.Root defaultOpen={defaultOpen}>
      <DropdownMenu.Trigger ref={trigger} className={menuTriggerClass} aria-label="Theme mode">
        <Current className="size-4" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" sideOffset={12} className={menuContentClass}>
          <DropdownMenu.Label className="px-3 pb-1 pt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Appearance
          </DropdownMenu.Label>
          <DropdownMenu.RadioGroup value={mode} onValueChange={(v) => {
              const r = trigger.current?.getBoundingClientRect();
              setMode(v as DarkMode, r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : undefined);
            }}>
            {MODE_OPTIONS.map(({ id, icon: Icon, label }) => (
              <DropdownMenu.RadioItem key={id} value={id} className={menuItemClass}>
                <Icon className="size-4 text-muted-foreground" />
                {label}
                <DropdownMenu.ItemIndicator className="ml-auto">
                  <Check className="size-3.5 text-accent-ink" />
                </DropdownMenu.ItemIndicator>
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
