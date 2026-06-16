"use client";

import { NotchedFrame } from "./NotchedFrame";
import { cn } from "@/lib/utils";

interface HudSidebarProps {
  title: string;
  status?: string;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/**
 * Left-hand list container used by the mission log and journal archive.
 * Header label + scrollable body + optional footer (e.g. LOAD MORE).
 */
export function HudSidebar({
  title,
  status,
  footer,
  className,
  children,
}: HudSidebarProps) {
  return (
    <NotchedFrame
      className={cn("h-full", className)}
      contentClassName="flex h-full flex-col"
    >
      <header className="flex items-center justify-between border-b border-line/70 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-1 bg-accent" />
          <span className="hud-label text-text">{title}</span>
        </div>
        {status && (
          <span className="hud-label text-accent-active">{status}</span>
        )}
      </header>
      <div className="hud-scroll min-h-0 flex-1 space-y-2 overflow-y-auto p-2.5">
        {children}
      </div>
      {footer && (
        <footer className="border-t border-line/70 p-2.5">{footer}</footer>
      )}
    </NotchedFrame>
  );
}
