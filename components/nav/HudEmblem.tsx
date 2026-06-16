"use client";

import { cn } from "@/lib/utils";

/** Central HUD emblem used in the dashboard top navigation. */
export function HudEmblem({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="System home"
      className={cn(
        "group relative grid h-10 w-10 place-items-center",
        className,
      )}
    >
      <span className="absolute inset-0 rotate-45 border border-accent/70 transition-colors group-hover:border-accent-active" />
      <span className="absolute inset-[5px] rotate-45 border border-line" />
      <span className="h-1.5 w-1.5 bg-accent-active shadow-glow-active" />
    </button>
  );
}
