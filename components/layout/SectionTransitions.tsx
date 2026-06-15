"use client";

/**
 * SectionTransitions — premium scroll-linked transitions between portfolio sections.
 *
 * Design language: Motion-Driven + Storytelling-Driven (UI/UX Pro Max portfolio/personal type).
 * Inspired by Linear, Stripe, Vercel, Apple, Raycast.
 *
 * Transition map & rationale:
 *  Hero → About      : Soft depth fade + gradient morph. "Enter the story."
 *  About → Experience: Horizontal line grows → dissolves into timeline. "Enter the journey."
 *  Experience→Skills : Timeline fades out, skills burst in with horizontal flow. "Show capability."
 *  Skills → Projects : Radial glow expands → project grid emerges. "Anticipate the work."
 *  Projects → Blogs  : Spacing exhale, content calms to editorial pace. "Shift to knowledge."
 *  Blogs → Contact   : Gradient veil closes gently upward. "Prepare to connect."
 *
 * Rules applied from UI/UX Pro Max:
 *  - Transform/opacity only (GPU-accelerated, no layout reflow)
 *  - 300–600 ms durations (never >600 ms for entrance)
 *  - prefers-reduced-motion: all effects disabled
 *  - No horizontal scroll, no content blocking
 *  - ease-out for enters, ease-in for exits
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SectionTransitions() {
  const initialized = useRef(false);

  useEffect(() => {
    // Honour prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (initialized.current) return;
    initialized.current = true;

    // Small wait for sections to be painted
    const timer = setTimeout(() => {
      setup();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}

function setup() {
  // ─── Shared helper ───────────────────────────────────────────────────────
  const st = (
    trigger: string,
    start: string,
    end: string,
    vars: gsap.TweenVars,
    target: string | gsap.TweenTarget
  ) => {
    const el = document.querySelector(trigger);
    if (!el) return;
    gsap.fromTo(
      target,
      { ...vars },
      {
        ...Object.fromEntries(
          Object.entries(vars).map(([k]) => [k, k === "opacity" ? 1 : k === "scale" ? 1 : 0])
        ),
        ease: "power2.out",
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub: 0.6,
        },
      }
    );
  };

  // ══════════════════════════════════════════════════════════════════════
  // 1. HERO → ABOUT
  //    Concept: Hero content gently drifts up and dissolves as About
  //    enters from below. Background gradient bridge persists during
  //    the crossfade. Feels like turning a page.
  //    Rationale: Establishes narrative depth without abrupt cut.
  //    Mobile: scrub keeps it smooth at any scroll speed.
  // ══════════════════════════════════════════════════════════════════════

  // Inject a gradient bridge overlay anchored between the two sections
  const heroBridge = injectBridge("hero-about-bridge", "#home", {
    background:
      "linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%)",
    height: "120px",
    bottom: "-60px",
  });

  if (heroBridge) {
    gsap.fromTo(
      heroBridge,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "70% top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }

  // Hero inner content rises softly as user scrolls off
  gsap.to("#home > div:last-of-type", {
    y: -30,
    opacity: 0.4,
    ease: "power1.in",
    scrollTrigger: {
      trigger: "#home",
      start: "80% top",
      end: "bottom top",
      scrub: 0.8,
    },
  });

  // About section: enter with subtle upward reveal
  gsap.fromTo(
    "#about",
    { y: 24, opacity: 0.6 },
    {
      y: 0,
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#about",
        start: "top 85%",
        end: "top 40%",
        scrub: 0.5,
      },
    }
  );

  // ══════════════════════════════════════════════════════════════════════
  // 2. ABOUT → EXPERIENCE
  //    Concept: A 1px horizontal rule at the bottom of About grows
  //    from center outward, then a brief vertical line descends — a
  //    visual handoff to the timeline metaphor in Experience.
  //    Rationale: The "line becoming a timeline" connects personal
  //    story to professional journey visually.
  //    Skipped gradient bridge (same bg colour, seamless already).
  // ══════════════════════════════════════════════════════════════════════

  const dividerLine = injectDividerLine("about-exp-divider", "#about");
  if (dividerLine) {
    gsap.fromTo(
      dividerLine,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about",
          start: "bottom 80%",
          end: "bottom 50%",
          scrub: 0.4,
        },
      }
    );
  }

  // Experience section rises with a hint of x-axis bias for "timeline entry"
  gsap.fromTo(
    "#experience",
    { y: 20, opacity: 0.7 },
    {
      y: 0,
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#experience",
        start: "top 85%",
        end: "top 45%",
        scrub: 0.5,
      },
    }
  );

  // ══════════════════════════════════════════════════════════════════════
  // 3. EXPERIENCE → SKILLS
  //    Concept: Energetic. The timeline cards compress slightly toward
  //    centre (scale down to 0.97) as Skills approaches — conveying
  //    "conclusion", then Skills bursts in from a slight horizontal
  //    offset (+12px right) like sliding a new card onto the table.
  //    Rationale: Career history → capability display: directional
  //    motion signals "what I built up to."
  // ══════════════════════════════════════════════════════════════════════

  gsap.to("#experience .max-w-7xl", {
    scale: 0.97,
    opacity: 0.5,
    ease: "power1.in",
    scrollTrigger: {
      trigger: "#experience",
      start: "85% top",
      end: "bottom top",
      scrub: 0.6,
    },
  });

  gsap.fromTo(
    "#skills",
    { x: 14, opacity: 0.65 },
    {
      x: 0,
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#skills",
        start: "top 85%",
        end: "top 40%",
        scrub: 0.5,
      },
    }
  );

  // ══════════════════════════════════════════════════════════════════════
  // 4. SKILLS → PROJECTS  ← strongest transition
  //    Concept: A radial glow pulse emanates from the skills section
  //    centre (via a pseudo-overlay), expanding outward and fading.
  //    Simultaneously Projects emerge with a scale-from-98% + opacity
  //    entrance — depth reveal, like pulling back a curtain.
  //    Rationale: "Here are my skills → now see them applied."
  //    The glow bridges both the conceptual and visual gap.
  // ══════════════════════════════════════════════════════════════════════

  const glowBridge = injectGlowBridge("skills-projects-glow", "#skills");
  if (glowBridge) {
    gsap.fromTo(
      glowBridge,
      { opacity: 0, scale: 0.6 },
      {
        opacity: 0.35,
        scale: 1.4,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#skills",
          start: "75% top",
          end: "bottom top",
          scrub: 0.7,
        },
      }
    );
  }

  gsap.fromTo(
    "#projects",
    { scale: 0.985, opacity: 0.55 },
    {
      scale: 1,
      opacity: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#projects",
        start: "top 85%",
        end: "top 35%",
        scrub: 0.6,
      },
    }
  );

  // ══════════════════════════════════════════════════════════════════════
  // 5. PROJECTS → BLOGS
  //    Concept: Soft editorial transition. Projects cards breathe out
  //    (opacity fades to 0.5, y: -10) while Blogs inhale with extra
  //    vertical spacing — calmer pace, wider leading. Feels like
  //    switching from portfolio mode to reading mode.
  //    Rationale: Avoids a jarring cut between a dense grid and the
  //    more spacious blog layout. Quiet reset.
  //    Note: minimal animation here is intentional — not every
  //    transition needs drama.
  // ══════════════════════════════════════════════════════════════════════

  gsap.to("#projects .grid", {
    y: -10,
    opacity: 0.5,
    ease: "power1.in",
    scrollTrigger: {
      trigger: "#projects",
      start: "90% top",
      end: "bottom top",
      scrub: 0.5,
    },
  });

  gsap.fromTo(
    "#blogs",
    { y: 18, opacity: 0.7 },
    {
      y: 0,
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#blogs",
        start: "top 85%",
        end: "top 45%",
        scrub: 0.5,
      },
    }
  );

  // ══════════════════════════════════════════════════════════════════════
  // 6. BLOGS → CONTACT
  //    Concept: A layered gradient veil descends from top-of-Contact
  //    section, softening the background shift (blogs=bg, contact=
  //    bg-muted/30). Contact content rises gently with a very slight
  //    scale (0.99 → 1) — intimate, closing feel.
  //    Rationale: Final CTA should feel like a natural conclusion,
  //    not an abrupt section break. Slowing motion signals "we've
  //    arrived."
  // ══════════════════════════════════════════════════════════════════════

  const contactVeil = injectContactVeil("blogs-contact-veil", "#contact");
  if (contactVeil) {
    gsap.fromTo(
      contactVeil,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 90%",
          end: "top 55%",
          scrub: 0.4,
        },
      }
    );
  }

  gsap.fromTo(
    "#contact",
    { scale: 0.993, opacity: 0.6 },
    {
      scale: 1,
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 85%",
        end: "top 45%",
        scrub: 0.45,
      },
    }
  );

  // Refresh all triggers after setup
  ScrollTrigger.refresh();
}

// ─── DOM injection helpers ────────────────────────────────────────────────────

/** Gradient bridge overlay at the bottom of a section */
function injectBridge(
  id: string,
  sectionSelector: string,
  styles: Partial<CSSStyleDeclaration>
): HTMLElement | null {
  const section = document.querySelector(sectionSelector) as HTMLElement | null;
  if (!section) return null;
  if (document.getElementById(id)) return document.getElementById(id);

  const div = document.createElement("div");
  div.id = id;
  Object.assign(div.style, {
    position: "absolute",
    left: "0",
    right: "0",
    pointerEvents: "none",
    zIndex: "2",
    ...styles,
  } as Partial<CSSStyleDeclaration>);

  section.style.position = "relative";
  section.appendChild(div);
  return div;
}

/** Centred 1px divider line at bottom of section */
function injectDividerLine(id: string, sectionSelector: string): HTMLElement | null {
  const section = document.querySelector(sectionSelector) as HTMLElement | null;
  if (!section) return null;
  if (document.getElementById(id)) return document.getElementById(id);

  const div = document.createElement("div");
  div.id = id;
  Object.assign(div.style, {
    position: "absolute",
    bottom: "0",
    left: "10%",
    right: "10%",
    height: "1px",
    background: "linear-gradient(to right, transparent, hsl(var(--primary) / 0.35), transparent)",
    transformOrigin: "center",
    transform: "scaleX(0)",
    opacity: "0",
    pointerEvents: "none",
    zIndex: "2",
  } as Partial<CSSStyleDeclaration>);

  section.style.position = "relative";
  section.appendChild(div);
  return div;
}

/** Radial glow overlay bridging skills → projects */
function injectGlowBridge(id: string, sectionSelector: string): HTMLElement | null {
  const section = document.querySelector(sectionSelector) as HTMLElement | null;
  if (!section) return null;
  if (document.getElementById(id)) return document.getElementById(id);

  const div = document.createElement("div");
  div.id = id;
  Object.assign(div.style, {
    position: "absolute",
    bottom: "-80px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "600px",
    height: "300px",
    borderRadius: "50%",
    background:
      "radial-gradient(ellipse at center, hsl(var(--primary) / 0.5) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: "2",
    opacity: "0",
  } as Partial<CSSStyleDeclaration>);

  section.style.position = "relative";
  section.appendChild(div);
  return div;
}

/** Top veil on Contact section to soften entry */
function injectContactVeil(id: string, sectionSelector: string): HTMLElement | null {
  const section = document.querySelector(sectionSelector) as HTMLElement | null;
  if (!section) return null;
  if (document.getElementById(id)) return document.getElementById(id);

  const div = document.createElement("div");
  div.id = id;
  Object.assign(div.style, {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    height: "100px",
    background:
      "linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)",
    pointerEvents: "none",
    zIndex: "2",
    opacity: "0",
  } as Partial<CSSStyleDeclaration>);

  section.style.position = "relative";
  section.appendChild(div);
  return div;
}
