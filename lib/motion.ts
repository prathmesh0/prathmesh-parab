/** Motion tokens — keep in sync with the CSS variables in globals.css. */
export const DUR = { micro: 0.14, ui: 0.24, reveal: 0.8, route: 0.7 } as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const SPRING_UI = { type: "spring", stiffness: 400, damping: 30 } as const;
export const SPRING_MAGNETIC = { type: "spring", stiffness: 150, damping: 15, mass: 0.1 } as const;
export const STAGGER = 0.05;
export const REVEAL_DISTANCE = 16;
