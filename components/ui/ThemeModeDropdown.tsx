"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/ThemeProvider";
import { type DarkMode } from "@/lib/theme-config";
import { cn } from "@/lib/utils";

const MODE_OPTIONS: { id: DarkMode; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
  { id: "light",  icon: Sun,     label: "Light"  },
  { id: "dark",   icon: Moon,    label: "Dark"   },
  { id: "system", icon: Monitor, label: "System" },
];

export function ThemeModeDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { mode, setMode } = useTheme();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const CurrentIcon = MODE_OPTIONS.find((o) => o.id === mode)?.icon ?? Moon;

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle theme mode"
      >
        <CurrentIcon className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-12 w-44 bg-card border border-border rounded-2xl shadow-2xl p-3 z-50"
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Appearance
            </p>
            <div className="flex flex-col gap-1">
              {MODE_OPTIONS.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => { setMode(id); setOpen(false); }}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all w-full text-left",
                    mode === id
                      ? "bg-primary text-primary-foreground"
                      : "text-secondary-foreground hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
