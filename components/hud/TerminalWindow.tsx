"use client";

import { NotchedFrame } from "./NotchedFrame";
import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  title?: string;
  /** path-like subtitle shown in the title bar */
  path?: string;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}

/** A HUD "terminal" chrome: title bar with status dots + monospace body. */
export function TerminalWindow({
  title = "TRANSMISSION",
  path = "~/comms/uplink",
  className,
  bodyClassName,
  children,
}: TerminalWindowProps) {
  return (
    <NotchedFrame glow="accent" className={cn("w-full", className)}>
      <div className="flex items-center justify-between border-b border-line/70 bg-surface/70 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-2.5 w-2.5 rounded-full bg-warn/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-ok/80" />
          <span className="ml-2 font-mono text-[0.65rem] uppercase tracking-widest text-text">
            {title}
          </span>
        </div>
        <span className="hidden font-mono text-[0.6rem] text-muted sm:block">
          {path}
        </span>
      </div>
      <div className={cn("p-4 sm:p-5", bodyClassName)}>{children}</div>
    </NotchedFrame>
  );
}
