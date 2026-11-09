"use client";

import type { ComponentProps } from "react";
import { scrollToId } from "@/lib/scroll";

/** Real anchor (works without JS) that scrolls via Lenis when available. */
export function ScrollLink({ href, onClick, ...props }: ComponentProps<"a"> & { href: string }) {
  return (
    <a
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || !href.startsWith("#")) return;
        e.preventDefault();
        scrollToId(href);
        history.replaceState(null, "", href);
      }}
    />
  );
}
