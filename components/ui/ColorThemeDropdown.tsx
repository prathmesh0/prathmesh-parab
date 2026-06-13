"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/ThemeProvider";
import { COLOR_THEMES } from "@/lib/theme-config";
import { cn } from "@/lib/utils";

export function ColorThemeDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { color, setColor } = useTheme();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeSwatch = COLOR_THEMES.find((t) => t.id === color)?.swatch;

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change accent color"
        className="relative"
      >
        <Palette className="h-4 w-4" />
        <span
          className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
          style={{ background: activeSwatch }}
        />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-12 w-52 bg-card border border-border rounded-2xl shadow-2xl p-3 z-50"
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Accent Color
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {COLOR_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => { setColor(theme.id); setOpen(false); }}
                  className={cn(
                    "flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium transition-all border",
                    color === theme.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-transparent bg-secondary hover:bg-primary/10 text-secondary-foreground hover:text-primary"
                  )}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 ring-2 ring-offset-1 ring-offset-card"
                    style={{
                      background: theme.swatch,
                      ["--tw-ring-color" as string]: color === theme.id ? theme.swatch : "transparent",
                    }}
                  />
                  {theme.label}
                  {color === theme.id && <Check className="h-3 w-3 ml-auto" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
