"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { panelReveal } from "@/lib/motion/variants";
import { useRevealVariants } from "@/lib/hooks/useReducedMotion";

/**
 * Standard in-view reveal wrapper. Animates once when scrolled into view and
 * collapses to a simple fade under prefers-reduced-motion. Used by every module
 * so the motion language stays consistent.
 */
export function Reveal({
  children,
  variants = panelReveal,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const resolved = useRevealVariants(variants);
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={resolved}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
