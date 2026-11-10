"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Download, Menu } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTheme } from "@/components/providers/ThemeProvider";
import { profile } from "@/content/profile";
import { LazyThemeControls } from "@/components/ui/LazyThemeControls";
import { Logo } from "@/components/shared/Logo";
import { ScrollLink } from "@/components/shared/ScrollLink";
import { EASE_OUT, SPRING_UI } from "@/lib/motion";
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
const MobileMenu = dynamic(() => import("@/components/layout/MobileMenu"), { ssr: false });

const SECTION_IDS = NAV_ITEMS.map((i) => i.href.slice(1));

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
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
                    isActive ? "text-accent-ink" : "text-muted-foreground hover:text-foreground",
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
          <LazyThemeControls />
        </div>

        <a
          href={profile.resume}
          download
          className="ml-1 hidden h-9 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85 lg:inline-flex"
        >
          <Download className="size-3.5" />
          Resume
        </a>

        {/* Mobile / tablet: button here, sheet loads on first open */}
        <button
          type="button"
          aria-label="Open menu"
          aria-haspopup="dialog"
          onClick={() => {
            setMenuLoaded(true);
            setOpen(true);
          }}
          className="grid size-9 place-items-center rounded-full text-foreground hover:bg-accent lg:hidden"
        >
          <Menu className="size-5" />
        </button>
      </nav>

      {menuLoaded && (
        <MobileMenu
          open={open}
          onOpenChange={setOpen}
          items={NAV_ITEMS}
          active={active}
          mode={mode}
          color={color}
          setMode={setMode}
          setColor={setColor}
        />
      )}
    </motion.header>
  );
}
