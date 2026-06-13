export type ColorTheme = "indigo" | "blue" | "emerald" | "rose" | "orange" | "purple";
export type DarkMode = "dark" | "light" | "system";

export interface ThemeConfig {
  color: ColorTheme;
  mode: DarkMode;
}

export const COLOR_THEMES: {
  id: ColorTheme;
  label: string;
  primary: string;
  secondary: string;
  swatch: string;
}[] = [
  { id: "indigo", label: "Indigo", primary: "#6366f1", secondary: "#8b5cf6", swatch: "#6366f1" },
  { id: "blue",   label: "Blue",   primary: "#3b82f6", secondary: "#60a5fa", swatch: "#3b82f6" },
  { id: "emerald",label: "Emerald",primary: "#10b981", secondary: "#34d399", swatch: "#10b981" },
  { id: "rose",   label: "Rose",   primary: "#f43f5e", secondary: "#fb7185", swatch: "#f43f5e" },
  { id: "orange", label: "Orange", primary: "#f97316", secondary: "#fb923c", swatch: "#f97316" },
  { id: "purple", label: "Purple", primary: "#a855f7", secondary: "#c084fc", swatch: "#a855f7" },
];

// HSL values per color theme used in CSS variables
export const COLOR_VARS: Record<ColorTheme, { primary: string; ring: string; gradient: [string, string] }> = {
  indigo:  { primary: "239 84% 67%",  ring: "239 84% 67%",  gradient: ["#6366f1", "#8b5cf6"] },
  blue:    { primary: "217 91% 60%",  ring: "217 91% 60%",  gradient: ["#3b82f6", "#60a5fa"] },
  emerald: { primary: "160 84% 39%",  ring: "160 84% 39%",  gradient: ["#10b981", "#34d399"] },
  rose:    { primary: "350 89% 60%",  ring: "350 89% 60%",  gradient: ["#f43f5e", "#fb7185"] },
  orange:  { primary: "24 95% 53%",   ring: "24 95% 53%",   gradient: ["#f97316", "#fb923c"] },
  purple:  { primary: "271 91% 65%",  ring: "271 91% 65%",  gradient: ["#a855f7", "#c084fc"] },
};
