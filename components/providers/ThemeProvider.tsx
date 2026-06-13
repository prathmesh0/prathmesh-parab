"use client";

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
  setMode: (m: DarkMode) => void;
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
  root.style.setProperty("--gradient-end", vars.gradient[1]);

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
    let savedMode = (localStorage.getItem("theme-mode") as DarkMode) ?? "dark";
    let savedColor = (localStorage.getItem("theme-color") as ColorTheme) ?? "indigo";
    setModeState(savedMode);
    setColorState(savedColor);
    const resolved = savedMode === "system" ? getSystemMode() : savedMode;
    setResolvedMode(resolved);
    applyTheme(savedMode, savedColor);
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
    (m: DarkMode) => {
      setModeState(m);
      const resolved = m === "system" ? getSystemMode() : m;
      setResolvedMode(resolved);
      applyTheme(m, color);
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
