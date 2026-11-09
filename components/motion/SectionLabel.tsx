import { cn } from "@/lib/utils";

/** Mono spec-sheet label: "01 — About". */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground", className)}>
      <span className="text-brand">{index}</span> — {children}
    </p>
  );
}
