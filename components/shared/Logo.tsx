"use client";

/**
 * Logo component — fully theme-aware SVG, GSAP-ready.
 *
 * All colors are driven by CSS custom properties so the logo
 * automatically responds to light/dark mode and any accent-color theme
 * without a single JS-side colour string.
 *
 * GSAP targets:
 *   #logo-hexagon   — outer container shape
 *   #logo-bg-fill   — background gradient fill
 *   #logo-border    — border / stroke ring
 *   #logo-monogram  — the "P" letterform
 *   #logo-accent    — accent spine element
 *   #logo-glow      — radial glow layer
 */

import { useId } from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  className?: string;
  /** "full" = bg + border + glyph (default) | "mono" = single-colour | "transparent" = no bg */
  variant?: "full" | "mono" | "transparent";
}

export function Logo({ size = 48, className, variant = "full" }: LogoProps) {
  const uid = useId();
  const id = `logo-${uid.replace(/:/g, "")}`;

  // viewBox is 100×100 — all measurements are in that coordinate space.
  // The hexagon sits in a 90×90 box centred at (50,50), with r=46 and 12px corner radius.

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Prathmesh Parab logo"
      className={cn("shrink-0", className)}
      style={
        {
          // These are the only variables the logo reads.
          // They are already set on <html> by ThemeProvider + the FOUC script.
          "--logo-primary": "var(--gradient-start)",
          "--logo-secondary": "var(--gradient-end)",
        } as React.CSSProperties
      }
    >
      <defs>
        {/* ── Gradient fills ─────────────────────────────────── */}
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          {variant === "mono" ? (
            <>
              <stop offset="0%"   stopColor="var(--logo-primary)"   stopOpacity="1" />
              <stop offset="100%" stopColor="var(--logo-secondary)"  stopOpacity="1" />
            </>
          ) : (
            <>
              {/* Dark-mode bg: near-black tinted with primary */}
              <stop offset="0%"   stopColor="var(--logo-primary)"   stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--logo-secondary)"  stopOpacity="0.08" />
            </>
          )}
        </linearGradient>

        <linearGradient id={`${id}-glyph`} x1="28" y1="28" x2="72" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="var(--logo-primary)"  />
          <stop offset="100%" stopColor="var(--logo-secondary)" />
        </linearGradient>

        <linearGradient id={`${id}-border`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="var(--logo-primary)"  stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--logo-secondary)" stopOpacity="0.4" />
        </linearGradient>

        {/* Radial glow behind the P */}
        <radialGradient id={`${id}-glow`} cx="50%" cy="48%" r="40%">
          <stop offset="0%"   stopColor="var(--logo-primary)"  stopOpacity="0.30" />
          <stop offset="100%" stopColor="var(--logo-primary)"  stopOpacity="0"    />
        </radialGradient>

        {/* Clip to hexagon so nothing bleeds outside */}
        <clipPath id={`${id}-clip`}>
          {/*
            Flat-top hexagon with rounded corners, inscribed in a 90×90 box
            centred at (50,50).  Corner radius = 9.

            Points of a flat-top hex with outer-radius 45 centred at 50,50:
              Top-right:    (89.0, 27.5)
              Right:        (89.0, 72.5)
              Bottom-right: (50.0, 95.0)
              Bottom-left:  (11.0, 72.5)
              Left:         (11.0, 27.5)
              Top-left:     (50.0,  5.0)

            We build a path that rounds each of those corners with r=9.
          */}
          <path d="
            M 50 5
            L 80.5 23
            Q 89 27.5 89 37.5
            L 89 62.5
            Q 89 72.5 80.5 77
            L 50 95
            L 19.5 77
            Q 11 72.5 11 62.5
            L 11 37.5
            Q 11 27.5 19.5 23
            Z
          " />
        </clipPath>
      </defs>

      {/* ── Background fill (clipped to hex) ───────────────── */}
      {variant !== "transparent" && (
        <g clipPath={`url(#${id}-clip)`}>
          {/* Base bg: very dark in dark mode, very light in light mode */}
          <rect
            width="100"
            height="100"
            fill={variant === "mono" ? `url(#${id}-bg)` : "hsl(var(--card))"}
            id="logo-bg-fill"
          />
          {/* Tinted gradient overlay */}
          {variant === "full" && (
            <rect width="100" height="100" fill={`url(#${id}-bg)`} />
          )}
        </g>
      )}

      {/* ── Glow layer ─────────────────────────────────────── */}
      {variant === "full" && (
        <g clipPath={`url(#${id}-clip)`} id="logo-glow">
          <ellipse cx="50" cy="48" rx="38" ry="38" fill={`url(#${id}-glow)`} />
        </g>
      )}

      {/* ── Hexagon border ─────────────────────────────────── */}
      {variant !== "mono" && (
        <g id="logo-border">
          <path
            id="logo-hexagon"
            d="
              M 50 5
              L 80.5 23
              Q 89 27.5 89 37.5
              L 89 62.5
              Q 89 72.5 80.5 77
              L 50 95
              L 19.5 77
              Q 11 72.5 11 62.5
              L 11 37.5
              Q 11 27.5 19.5 23
              Z
            "
            stroke={`url(#${id}-border)`}
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      )}

      {/*
        ── "P" Monogram ──────────────────────────────────────
        Constructed from pure geometry — NOT a font glyph.

        Structure:
        • Vertical stem:   a tall rounded-left rectangle (the spine of the P)
        • Bowl:            a D-shaped arc closing to the right
        • Accent notch:    a cut-out / secondary element on the stem base

        All positioned on a 100×100 canvas.

        Stem:   x=28, y=24 → x=39, y=76  (width 11, height 52)
        Bowl outer arc: centre (39, 42), radius 17, 270°→90° clockwise
        Bowl inner arc: centre (39, 42), radius  9, 90°→270° clockwise
        Crossbar cutout at y=51..58 on the stem right edge
      */}
      <g id="logo-monogram" clipPath={`url(#${id}-clip)`}>
        {/*
          Full "P" shape as one compound path.
          Fill = gradient.

          Breaking it down (moves are in SVG absolute coords):

          Outer contour of the P (clockwise):
            - Start at top-left of stem (28, 24)
            - Across top of stem to bowl start (39, 24)
            - Bowl outer: arc from (39,24) curving right to (39,60)
                          large-arc=0, sweep=1, radius=18
            - Down and back to inner-right of stem at crossbar (39,60) → (39,76)
            - Across bottom (39,76) → (28,76)
            - Up left edge (28,76) → (28,24) close

          Inner counter (the bowl hole, counter-clockwise):
            - Move to inner-right of bowl top (39,33)
            - Arc counter-clockwise to (39,51)
            - Back to (39,33)

          We achieve the P shape with evenodd fill rule so the counter
          punches a hole.
        */}
        <path
          fillRule="evenodd"
          fill={`url(#${id}-glyph)`}
          d="
            M 28 24
            L 40 24
            C 57 24 64 33 64 42
            C 64 51 57 60 40 60
            L 39 60
            L 39 76
            L 28 76
            Z

            M 39 33
            L 40 33
            C 52 33 54 37.5 54 42
            C 54 46.5 52 51 40 51
            L 39 51
            Z
          "
        />
      </g>

      {/*
        ── Accent element ────────────────────────────────────
        A thin diagonal slash / underline under the bowl —
        gives the logo a distinctive secondary mark and breaks
        the symmetry in a premium way. Sits below the P bowl.
      */}
      <g id="logo-accent" clipPath={`url(#${id}-clip)`}>
        {/* Horizontal accent bar — bottom of bowl, full-width of stem */}
        <rect
          x="28"
          y="72"
          width="36"
          height="3.5"
          rx="1.75"
          fill={`url(#${id}-glyph)`}
          opacity="0.55"
        />
        {/* Diagonal slash accent top-right of bowl */}
        <line
          x1="60"
          y1="28"
          x2="67"
          y2="21"
          stroke={`url(#${id}-glyph)`}
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.45"
        />
      </g>
    </svg>
  );
}

/**
 * Favicon-sized variant: simplified, no border, no accent details.
 * Use at 16×16 or 32×32 only.
 */
export function LogoFavicon({ size = 32 }: { size?: number }) {
  return <Logo size={size} variant="full" />;
}

/**
 * Monochrome variant: single gradient fill, no border ring.
 * Ideal for dark backgrounds, watermarks, and print.
 */
export function LogoMono({ size = 48, className }: { size?: number; className?: string }) {
  return <Logo size={size} variant="mono" className={className} />;
}

/**
 * Transparent background: just the P on transparent — ideal for
 * overlaying on images or coloured banners.
 */
export function LogoTransparent({ size = 48, className }: { size?: number; className?: string }) {
  return <Logo size={size} variant="transparent" className={className} />;
}
