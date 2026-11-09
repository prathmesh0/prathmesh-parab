"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTheme } from "@/components/providers/ThemeProvider";
import { COLOR_THEMES } from "@/lib/theme-config";
import { profile } from "@/content/profile";
import { ThemeModeDropdown } from "@/components/ui/ThemeModeDropdown";
import { ColorThemeDropdown } from "@/components/ui/ColorThemeDropdown";
import { Logo } from "@/components/shared/Logo";
import { ScrollLink } from "@/components/shared/ScrollLink";
import { scrollToId } from "@/lib/scroll";
import { EASE_OUT, SPRING_UI, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact", href: "#contact" },
];
const SECTION_IDS = NAV_ITEMS.map((i) => i.href.slice(1));

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const active = useActiveSection(SECTION_IDS);
  const { mode, color, setMode, setColor } = useTheme();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (y < 80) setHidden(false);
    else if (y > prev + 4) setHidden(true);
    else if (y < prev - 4) setHidden(false);
  });

  return (
    <motion.header
      className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: hidden && !open ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      onFocusCapture={() => setHidden(false)}
    >
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-background/80 py-1.5 pl-3 pr-1.5 backdrop-blur-md"
      >
        <ScrollLink href="#home" aria-label="Home" className="mr-1 grid place-items-center rounded-full">
          <Logo size={28} />
        </ScrollLink>

        <ul className="hidden items-center lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <ScrollLink
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative block rounded-full px-3 py-1.5 text-sm transition-colors duration-[140ms]",
                    isActive ? "text-brand" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={SPRING_UI}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </ScrollLink>
              </li>
            );
          })}
        </ul>

        <div className="ml-1 hidden items-center gap-0.5 border-l border-border pl-2 lg:flex">
          <ThemeModeDropdown />
          <ColorThemeDropdown />
        </div>

        <a
          href={profile.resume}
          download
          className="ml-1 hidden h-9 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85 lg:inline-flex"
        >
          <Download className="size-3.5" />
          Resume
        </a>

        {/* Mobile / tablet: full-screen sheet */}
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger
            aria-label="Open menu"
            className="grid size-9 place-items-center rounded-full text-foreground hover:bg-accent lg:hidden"
          >
            <Menu className="size-5" />
          </Dialog.Trigger>
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
                      {NAV_ITEMS.map((item, i) => (
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
                              setOpen(false);
                              setTimeout(() => scrollToId(item.href), 300);
                            }}
                            className={cn(
                              "flex min-h-14 items-baseline gap-4 text-4xl font-medium tracking-tight",
                              active === item.href.slice(1) ? "text-brand" : "text-foreground",
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
                              mode === m ? "border-brand text-brand" : "border-border text-muted-foreground",
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
      </nav>
    </motion.header>
  );
}
