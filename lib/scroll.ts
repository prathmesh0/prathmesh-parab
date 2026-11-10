import type Lenis from "lenis";

let instance: Lenis | null = null;

export function registerLenis(l: Lenis | null) {
  instance = l;
}

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Scroll to a section id ("projects" or "#projects"). Uses Lenis when active. */
export function scrollToId(id: string) {
  const el = document.getElementById(id.replace(/^#/, ""));
  if (!el) return;
  if (instance && !prefersReduced()) {
    instance.scrollTo(el, { duration: 1.1 });
  } else {
    el.scrollIntoView({ behavior: "auto" });
  }
}

export function scrollToTop() {
  if (instance && !prefersReduced()) instance.scrollTo(0, { duration: 1.1 });
  else window.scrollTo({ top: 0, behavior: "auto" });
}
