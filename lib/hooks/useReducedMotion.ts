"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { reducedReveal } from "@/lib/motion/variants";

/** Re-export under a stable local path. */
export function useReducedMotion(): boolean {
  return !!useFramerReducedMotion();
}

/**
 * Returns the supplied variants, or a flat opacity-only fallback when the user
 * prefers reduced motion. One call site, used by every animated module.
 */
export function useRevealVariants(variants: Variants): Variants {
  const reduced = useReducedMotion();
  return reduced ? reducedReveal : variants;
}
