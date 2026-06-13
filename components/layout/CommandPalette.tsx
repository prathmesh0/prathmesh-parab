"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  User,
  Briefcase,
  Code2,
  FolderOpen,
  BookOpen,
  Mail,
  Download,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { profile } from "@/content/profile";

const COMMANDS = [
  { group: "Navigate", id: "home", label: "Go Home", icon: Home, action: () => scrollTo("#home") },
  { group: "Navigate", id: "about", label: "About Me", icon: User, action: () => scrollTo("#about") },
  { group: "Navigate", id: "experience", label: "Experience", icon: Briefcase, action: () => scrollTo("#experience") },
  { group: "Navigate", id: "skills", label: "Skills", icon: Code2, action: () => scrollTo("#skills") },
  { group: "Navigate", id: "projects", label: "Projects", icon: FolderOpen, action: () => scrollTo("#projects") },
  { group: "Navigate", id: "blogs", label: "Blogs", icon: BookOpen, action: () => scrollTo("#blogs") },
  { group: "Navigate", id: "contact", label: "Contact", icon: Mail, action: () => scrollTo("#contact") },
];

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { setMode } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (fn: () => void) => {
    fn();
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-start justify-center pt-[20vh] px-4"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider">
              <div className="flex items-center border-b border-border px-4 py-3">
                <Search className="h-4 w-4 mr-3 text-muted-foreground shrink-0" />
                <Command.Input
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded ml-2">ESC</kbd>
              </div>

              <Command.List className="max-h-80 overflow-y-auto py-2">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigate">
                  {COMMANDS.filter((c) => c.group === "Navigate").map((cmd) => (
                    <Command.Item
                      key={cmd.id}
                      onSelect={() => runCommand(cmd.action)}
                      className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-accent rounded-lg mx-2 text-sm text-foreground data-[selected=true]:bg-accent"
                    >
                      <cmd.icon className="h-4 w-4 text-muted-foreground" />
                      {cmd.label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Theme">
                  <Command.Item
                    onSelect={() => runCommand(() => setMode("light"))}
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-accent rounded-lg mx-2 text-sm text-foreground data-[selected=true]:bg-accent"
                  >
                    <Sun className="h-4 w-4 text-muted-foreground" />
                    Light Mode
                  </Command.Item>
                  <Command.Item
                    onSelect={() => runCommand(() => setMode("dark"))}
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-accent rounded-lg mx-2 text-sm text-foreground data-[selected=true]:bg-accent"
                  >
                    <Moon className="h-4 w-4 text-muted-foreground" />
                    Dark Mode
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Actions">
                  <Command.Item
                    onSelect={() => runCommand(() => window.open(profile.resume))}
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-accent rounded-lg mx-2 text-sm text-foreground data-[selected=true]:bg-accent"
                  >
                    <Download className="h-4 w-4 text-muted-foreground" />
                    Download Resume
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-xs text-muted-foreground">
                <span><kbd className="bg-muted px-1 rounded">↑↓</kbd> navigate</span>
                <span><kbd className="bg-muted px-1 rounded">↵</kbd> select</span>
                <span><kbd className="bg-muted px-1 rounded">esc</kbd> close</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
