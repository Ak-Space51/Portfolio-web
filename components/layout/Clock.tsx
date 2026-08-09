"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Live UTC clock. Renders a stable placeholder during SSR/first paint to avoid
 * hydration mismatch, then ticks every second.
 */
export function Clock({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const time = now
    ? now.toISOString().slice(11, 19)
    : "--:--:--";

  return (
    <span className={cn("mono tabular-nums", className)}>
      {time}
      <span className="ml-1 text-dim">UTC</span>
    </span>
  );
}
