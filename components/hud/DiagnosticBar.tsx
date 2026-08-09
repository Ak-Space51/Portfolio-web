"use client";

import { motion } from "framer-motion";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { EASE_HUD } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

/**
 * Segmented diagnostic meter that fills to `level`% when scrolled into view.
 * Reads as a system gauge rather than a generic progress bar.
 */
export function DiagnosticBar({
  label,
  level,
  note,
  delay = 0,
}: {
  label: string;
  level: number;
  note?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView("-40px");
  const reduced = useReducedMotion();
  const clamped = Math.max(0, Math.min(100, level));

  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className="group">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="font-body text-sm font-medium text-text">{label}</span>
        <span className="mono text-[10px] text-dim">
          {note && <span className="mr-2 text-accent/80">{note}</span>}
          <span className="tabular-nums">{clamped}%</span>
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden bg-bg/80 ring-1 ring-edge">
        {/* ticks */}
        <div
          aria-hidden
          className="absolute inset-0 z-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, transparent 0, transparent 9px, rgba(8,9,13,0.9) 9px, rgba(8,9,13,0.9) 10px)",
          }}
        />
        <motion.div
          className="h-full bg-gradient-to-r from-accent/70 to-accent"
          style={{ boxShadow: "var(--shadow-accent)" }}
          initial={{ width: reduced ? `${clamped}%` : 0 }}
          animate={inView ? { width: `${clamped}%` } : {}}
          transition={{ duration: 0.9, ease: EASE_HUD, delay }}
          role="meter"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
        />
      </div>
    </div>
  );
}
