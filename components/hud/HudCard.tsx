"use client";

import { NotchedFrame } from "./NotchedFrame";
import { cn } from "@/lib/utils";

interface HudCardProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  interactive?: boolean;
}

/**
 * Generic selectable HUD card (used for mission log items, journal entries,
 * skill rows, etc.). Selected/hover states glow accent-active.
 */
export function HudCard({
  selected = false,
  interactive = true,
  className,
  children,
  ...rest
}: HudCardProps) {
  return (
    <NotchedFrame
      small
      corners={false}
      glow={selected ? "active" : "none"}
      className={cn(
        "transition-all duration-200",
        interactive && "cursor-pointer hover:-translate-y-[1px]",
        className,
      )}
      {...rest}
    >
      {/* left accent rail */}
      <span
        className={cn(
          "absolute left-0 top-0 z-[2] h-full w-[3px] transition-colors",
          selected ? "bg-accent-active" : "bg-accent/50",
        )}
      />
      <div className="relative p-3 pl-4">{children}</div>
    </NotchedFrame>
  );
}
