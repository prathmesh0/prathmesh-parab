"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { Download, X } from "lucide-react";
import { COLOR_THEMES, type ColorTheme, type DarkMode } from "@/lib/theme-config";
import { profile } from "@/content/profile";
import { scrollToId } from "@/lib/scroll";
import { EASE_OUT, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface NavItemDef {
  label: string;
  href: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: NavItemDef[];
  active: string;
  mode: DarkMode;
  color: ColorTheme;
  setMode: (m: DarkMode) => void;
  setColor: (c: ColorTheme) => void;
}

/** Full-screen mobile menu sheet. Loaded on first open so Radix Dialog stays out of the initial bundle. */
export default function MobileMenu({ open, onOpenChange, items, active, mode, color, setMode, setColor }: Props) {
  return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
          <AnimatePresence>
            {open && (
              <Dialog.Portal forceMount>
                <Dialog.Content forceMount asChild aria-describedby={undefined}>
                  <motion.div
                    className="fixed inset-0 z-[70] flex flex-col bg-background px-6 pb-8 pt-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.24, ease: EASE_OUT }}
                  >
                    <div className="flex items-center justify-between">
                      <Dialog.Title className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        Menu
                      </Dialog.Title>
                      <Dialog.Close
                        aria-label="Close menu"
                        className="grid size-11 place-items-center rounded-full hover:bg-accent"
                      >
                        <X className="size-5" />
                      </Dialog.Close>
                    </div>

                    <ul className="mt-6 flex flex-1 flex-col justify-center gap-1">
                      {items.map((item, i) => (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.08 + i * STAGGER }}
                        >
                          <a
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              onOpenChange(false);
                              setTimeout(() => scrollToId(item.href), 300);
                            }}
                            className={cn(
                              "flex min-h-14 items-baseline gap-4 text-4xl font-medium tracking-tight",
                              active === item.href.slice(1) ? "text-accent-ink" : "text-foreground",
                            )}
                          >
                            <span className="font-mono text-xs text-muted-foreground">
                              {String(i).padStart(2, "0")}
                            </span>
                            {item.label}
                          </a>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="space-y-4 border-t border-border pt-5">
                      <div role="radiogroup" aria-label="Theme mode" className="grid grid-cols-3 gap-2">
                        {(["light", "dark", "system"] as const).map((m) => (
                          <button
                            key={m}
                            role="radio"
                            aria-checked={mode === m}
                            onClick={() => setMode(m)}
                            className={cn(
                              "h-11 rounded-full border text-sm capitalize",
                              mode === m ? "border-brand text-accent-ink" : "border-border text-muted-foreground",
                            )}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                      <div role="radiogroup" aria-label="Accent colour" className="flex gap-3">
                        {COLOR_THEMES.map((t) => (
                          <button
                            key={t.id}
                            role="radio"
                            aria-checked={color === t.id}
                            aria-label={t.label}
                            onClick={() => setColor(t.id)}
                            className={cn(
                              "size-11 rounded-full border-2 border-transparent p-1",
                              color === t.id && "border-foreground",
                            )}
                          >
                            <span className="block size-full rounded-full" style={{ background: t.swatch }} />
                          </button>
                        ))}
                      </div>
                      <a
                        href={profile.resume}
                        download
                        className="flex h-12 items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-background"
                      >
                        <Download className="size-4" />
                        Download Resume
                      </a>
                    </div>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>
  );
}
