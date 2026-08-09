"use client";

import { scrollToModule } from "@/lib/utils/navigate";
import { useNav } from "@/components/layout/NavContext";
import { cn } from "@/lib/utils/cn";
import type { NavItem } from "@/lib/types";

/** Single navigation module entry. Active state is driven by the scrollspy. */
export function NavButton({ item }: { item: NavItem }) {
  const { active } = useNav();
  const isActive = active === item.id;

  return (
    <button
      type="button"
      onClick={() => scrollToModule(item.id)}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "clip-tag group relative flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors duration-200",
        isActive
          ? "bg-panel-2 text-text"
          : "text-dim hover:bg-panel/60 hover:text-text",
      )}
    >
      {/* active bar */}
      <span
        className={cn(
          "absolute left-0 top-0 h-full w-0.5 transition-all duration-200",
          isActive ? "bg-accent" : "bg-transparent group-hover:bg-edge-bright",
        )}
      />
      <span
        className={cn(
          "mono text-[10px]",
          isActive ? "text-accent" : "text-edge-bright",
        )}
      >
        {item.code}
      </span>
      <span className="head text-[11px] font-semibold tracking-[0.16em]">
        {item.label}
      </span>
      {isActive && (
        <span className="mono ml-auto text-[9px] text-accent">●</span>
      )}
    </button>
  );
}
