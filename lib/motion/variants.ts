import type { Variants } from "framer-motion";

/**
 * Centralized motion language. Durations sit in the 200–500ms band so panels
 * feel like they "lock" into place rather than drift. A single easing curve
 * (cubic-bezier) keeps the whole interface coherent.
 */
export const EASE_HUD: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const panelReveal: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: EASE_HUD },
  },
};

export const panelRevealLeft: Variants = {
  hidden: { opacity: 0, x: -22 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASE_HUD },
  },
};

export const panelRevealRight: Variants = {
  hidden: { opacity: 0, x: 22 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASE_HUD },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_HUD },
  },
};

export const lineDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: EASE_HUD },
  },
};

/** Reduced-motion safe variants: opacity only, near-instant. */
export const reducedReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
};
