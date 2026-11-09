import type { CSSProperties } from "react";

/** Server-rendered, CSS-only word mask reveal for above-the-fold headings (no JS needed, so LCP is never delayed). */
export function SplitWords({
  text,
  as: Tag = "h1",
  className,
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
          <span className="word-up" style={{ "--d": `${delay + i * 0.05}s` } as CSSProperties}>
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
