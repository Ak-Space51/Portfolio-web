"use client";

import { cn } from "@/lib/utils";

/**
 * Small notched "record" thumbnail used in list rows (mission log, journal
 * archive) — a holographic mini-screen with a glyph, echoing Desktop-2.
 */
export function RecordIcon({
  children,
  selected = false,
  className,
}: {
  children: React.ReactNode;
  selected?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "clip-notch-sm relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden border transition-colors",
        selected
          ? "border-accent-active/70 text-accent-active"
          : "border-line/70 text-accent",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgb(var(--accent) / 0.22), rgb(var(--bg)) 70%)",
      }}
    >
      {/* mini scanlines */}
      <span className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(0deg,rgb(0_0_0/0.5)_0,rgb(0_0_0/0.5)_1px,transparent_1px,transparent_3px)]" />
      {/* glyph */}
      <span className="relative z-[1]">{children}</span>
      {/* status dot */}
      <span
        className={cn(
          "absolute bottom-1 right-1 z-[1] h-1 w-1 rounded-full",
          selected ? "bg-accent-active" : "bg-accent/70",
        )}
      />
    </span>
  );
}
