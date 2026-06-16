"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

export interface HudButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  active?: boolean;
  icon?: React.ReactNode;
}

/**
 * Trapezoidal / notched HUD button. Rests in accent, shifts to accent-active
 * on hover/focus/active to match the reference's red->cyan selection.
 */
export const HudButton = forwardRef<HTMLButtonElement, HudButtonProps>(
  function HudButton(
    { variant = "solid", active = false, icon, className, children, ...rest },
    ref,
  ) {
    const variants: Record<Variant, string> = {
      solid: cn(
        "bg-accent/15 text-text border border-accent/60",
        "hover:bg-accent-active/20 hover:border-accent-active hover:text-accent-active",
        active && "bg-accent-active/20 border-accent-active text-accent-active",
      ),
      outline: cn(
        "bg-transparent text-muted border border-line",
        "hover:border-accent-active hover:text-accent-active",
        active && "border-accent-active text-accent-active",
      ),
      ghost: cn(
        "bg-transparent text-muted border border-transparent",
        "hover:text-accent-active",
        active && "text-accent-active",
      ),
    };

    return (
      <button
        ref={ref}
        className={cn(
          "clip-btn group relative inline-flex items-center justify-center gap-2 px-4 py-2",
          "font-mono text-[0.7rem] uppercase tracking-[0.2em] transition-colors duration-200",
          "outline-none focus-visible:ring-2 focus-visible:ring-accent-active focus-visible:ring-offset-0",
          variants[variant],
          className,
        )}
        {...rest}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  },
);
