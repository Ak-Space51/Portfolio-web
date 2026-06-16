"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Glow = "accent" | "active" | "none";

export interface NotchedFrameProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** outline/glow color */
  glow?: Glow;
  /** smaller corner notches */
  small?: boolean;
  /** show L-shaped corner tick marks */
  corners?: boolean;
  /** render a subtle inner background */
  filled?: boolean;
  /** the fill layer's bg class — defaults to a lightly translucent panel */
  fillClassName?: string;
  /** extra classes for the inner content wrapper (e.g. "flex flex-col") */
  contentClassName?: string;
  children?: React.ReactNode;
}

/**
 * The visual backbone for the whole OS: an angular, notched panel with a
 * 1px accent outline (double-layer clip technique so the diagonal cuts keep
 * their outline) plus optional corner tick marks and glow.
 */
export const NotchedFrame = forwardRef<HTMLDivElement, NotchedFrameProps>(
  function NotchedFrame(
    {
      glow = "accent",
      small = false,
      corners = true,
      filled = true,
      fillClassName = "bg-bg/80",
      className,
      contentClassName,
      children,
      ...rest
    },
    ref,
  ) {
    const clip = small ? "clip-notch-sm" : "clip-notch";
    const outline =
      glow === "active"
        ? "bg-accent-active/35"
        : glow === "none"
          ? "bg-line"
          : "bg-accent/30";
    const shadow =
      glow === "active"
        ? "shadow-glow-active"
        : glow === "none"
          ? ""
          : "shadow-glow";

    return (
      <div
        ref={ref}
        className={cn("relative", shadow, className)}
        {...rest}
      >
        {/* outline layer */}
        <div className={cn("absolute inset-0", clip, outline)} />
        {/* fill layer */}
        <div
          className={cn(
            "absolute inset-[1px]",
            clip,
            filled ? fillClassName : "bg-transparent",
          )}
        />
        {corners && <CornerTicks />}
        {/* content */}
        <div className={cn("relative z-[1] h-full", contentClassName)}>
          {children}
        </div>
      </div>
    );
  },
);

function CornerTicks() {
  const base =
    "pointer-events-none absolute z-[2] h-3 w-3 border-accent-active";
  return (
    <>
      <span className={cn(base, "left-1 top-1 border-l border-t")} />
      <span className={cn(base, "right-1 top-1 border-r border-t")} />
      <span className={cn(base, "bottom-1 left-1 border-b border-l")} />
      <span className={cn(base, "bottom-1 right-1 border-b border-r")} />
    </>
  );
}
