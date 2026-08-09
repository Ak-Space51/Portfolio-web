"use client";

import { motion } from "framer-motion";
import { lineDraw } from "@/lib/motion/variants";
import { useRevealVariants } from "@/lib/hooks/useReducedMotion";

// Static sample series → a smooth-ish polyline. Decorative telemetry.
const POINTS = [18, 22, 14, 26, 20, 30, 24, 34, 28, 38, 30, 42, 36, 44];
const W = 220;
const H = 56;

function buildPath() {
  const max = Math.max(...POINTS);
  const step = W / (POINTS.length - 1);
  return POINTS.map((p, i) => {
    const x = i * step;
    const y = H - (p / max) * (H - 6) - 3;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

/** Animated signal sparkline used in the right diagnostics rail. */
export function SignalGraph() {
  const d = buildPath();
  const variants = useRevealVariants(lineDraw);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-14 w-full text-accent"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="sig-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* baseline grid */}
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1="0"
          x2={W}
          y1={H * f}
          y2={H * f}
          stroke="var(--color-edge)"
          strokeWidth="0.5"
        />
      ))}
      <path d={`${d} L${W},${H} L0,${H} Z`} fill="url(#sig-fill)" opacity="0.8" />
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
    </svg>
  );
}
