"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface CountUpOptions {
  duration?: number;
  decimals?: number;
  /** Only start counting when this becomes true (e.g. in-view). */
  active?: boolean;
}

/**
 * Animated count-up using requestAnimationFrame. Eases out so the final value
 * settles smoothly. Respects reduced motion (snaps to the target).
 */
export function useCountUp(
  target: number,
  { duration = 1200, decimals = 0, active = true }: CountUpOptions = {},
) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const frame = useRef<number>(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    if (reduced) {
      setValue(target);
      return;
    }

    let startTime: number | null = null;
    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) {
        frame.current = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [active, target, duration, reduced]);

  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
