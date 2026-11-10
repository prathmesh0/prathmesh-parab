"use client";

/** Lazy GSAP loader — only pinned timelines / split text pay for it. */
type GsapBundle = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  SplitText: typeof import("gsap/SplitText").SplitText;
};

let loading: Promise<GsapBundle> | null = null;
let loaded: GsapBundle | null = null;

export function getScrollTrigger() {
  return loaded?.ScrollTrigger ?? null;
}

export function loadGsap(): Promise<GsapBundle> {
  loading ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("gsap/SplitText"),
  ]).then(([g, st, sp]) => {
    g.gsap.registerPlugin(st.ScrollTrigger, sp.SplitText);
    loaded = { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger, SplitText: sp.SplitText };
    return loaded;
  });
  return loading;
}
