"use client";

import { flushSync } from "react-dom";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  type ColorTheme,
  type DarkMode,
  COLOR_VARS,
} from "@/lib/theme-config";

interface ThemeContextValue {
  mode: DarkMode;
  color: ColorTheme;
  resolvedMode: "dark" | "light";
  /** `origin` (viewport px) is where the circular reveal expands from. */
  setMode: (m: DarkMode, origin?: { x: number; y: number }) => void;
  setColor: (c: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "dark",
  color: "indigo",
  resolvedMode: "dark",
  setMode: () => {},
  setColor: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystemMode(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(mode: DarkMode, color: ColorTheme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const resolved = mode === "system" ? getSystemMode() : mode;

  // Dark / light class
  root.classList.remove("dark", "light");
  root.classList.add(resolved);

  // Color CSS variables
  const vars = COLOR_VARS[color];
  root.style.setProperty("--primary", vars.primary);
  root.style.setProperty("--ring", vars.ring);
  root.style.setProperty("--gradient-start", vars.gradient[0]);
  root.style.setProperty("--gradient-end", vars.gradient[0]);

  // Persist
  try {
    localStorage.setItem("theme-mode", mode);
    localStorage.setItem("theme-color", color);
  } catch {}
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<DarkMode>("dark");
  const [color, setColorState] = useState<ColorTheme>("indigo");
  const [resolvedMode, setResolvedMode] = useState<"dark" | "light">("dark");

  // Initialise from localStorage on mount
  useEffect(() => {
    const savedMode = (localStorage.getItem("theme-mode") as DarkMode) ?? "dark";
    const savedColor = (localStorage.getItem("theme-color") as ColorTheme) ?? "indigo";
    /* eslint-disable react-hooks/set-state-in-effect -- hydration-safe init from localStorage */
    setModeState(savedMode);
    setColorState(savedColor);
    const resolved = savedMode === "system" ? getSystemMode() : savedMode;
    setResolvedMode(resolved);
    applyTheme(savedMode, savedColor);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Respond to system preference changes
  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const resolved = getSystemMode();
      setResolvedMode(resolved);
      applyTheme("system", color);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode, color]);

  const setMode = useCallback(
    (m: DarkMode, origin?: { x: number; y: number }) => {
      const commit = () => {
        setModeState(m);
        setResolvedMode(m === "system" ? getSystemMode() : m);
        applyTheme(m, color);
      };
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || typeof document.startViewTransition !== "function") {
        commit();
        return;
      }
      // Circular reveal from the toggle (View Transitions API); instant fallback elsewhere.
      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? window.innerHeight / 2;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const transition = document.startViewTransition(() => {
        flushSync(commit);
      });
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 700, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
          );
        })
        .catch(() => {});
    },
    [color]
  );

  const setColor = useCallback(
    (c: ColorTheme) => {
      setColorState(c);
      applyTheme(mode, c);
    },
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, color, resolvedMode, setMode, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
}
