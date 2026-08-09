"use client";

import { useInView } from "@/lib/hooks/useInView";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { cn } from "@/lib/utils/cn";

/**
 * Number that counts up once it scrolls into view. Used for statistics across
 * the hero and diagnostics panels.
 */
export function Counter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const { ref, inView } = useInView("-20px");
  const display = useCountUp(value, { decimals, active: inView });

  return (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      className={cn("mono tabular-nums", className)}
    >
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
