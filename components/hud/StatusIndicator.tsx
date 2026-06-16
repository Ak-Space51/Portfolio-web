"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  label: string;
  value: number; // 0-100
  state: string; // ONLINE, STABLE...
}

/** Futuristic operational metric: label, animated bar, percentage + state. */
export function StatusIndicator({ label, value, state }: StatusIndicatorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const reduce = useReducedMotion();

  const degraded = state === "DEGRADED";

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="hud-label text-text">{label}</span>
        <span
          className={cn(
            "flex items-center gap-1.5 font-mono text-[0.6rem] tracking-widest",
            degraded ? "text-warn" : "text-accent-active",
          )}
        >
          <span
            className={cn(
              "inline-block h-1.5 w-1.5 rounded-full",
              degraded ? "bg-warn" : "bg-accent-active",
              !reduce && "animate-pulse",
            )}
          />
          {state}
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden bg-surface clip-chip">
        <div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(90deg,transparent_0,transparent_5px,rgb(var(--line))_5px,rgb(var(--line))_6px)]" />
        <motion.div
          className={cn(
            "h-full",
            degraded ? "bg-warn/70" : "bg-gradient-to-r from-accent to-accent-active",
          )}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: reduce ? 0 : 1.1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
