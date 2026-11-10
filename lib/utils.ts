import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Shared filter-pill styling (Skills, Projects). */
export function pillClass(active: boolean) {
  return cn(
    "inline-flex h-9 items-center rounded-full border px-4 font-mono text-xs transition-[color,border-color,background-color,transform] duration-[140ms] active:scale-[0.97]",
    active
      ? "border-foreground bg-foreground text-background"
      : "border-border text-muted-foreground hover:border-brand hover:text-foreground",
  );
}
