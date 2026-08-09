"use client";

import { Clock } from "@/components/layout/Clock";
import { StatusDot } from "@/components/hud/StatusDot";
import { useNav } from "@/components/layout/NavContext";
import { NAV_ITEMS } from "@/lib/data/nav";
import { PROFILE } from "@/lib/data/profile";

/** Full-width command bar pinned to the top of the interface. */
export function TopBar() {
  const { active } = useNav();
  const activeItem = NAV_ITEMS.find((n) => n.id === active);

  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-bg/85 backdrop-blur-md">
      <div className="flex h-12 items-center justify-between gap-4 px-3 sm:px-5">
        {/* Identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center bg-accent text-bg">
            <span className="head text-[11px] font-black">T</span>
          </div>
          <div className="leading-none">
            <span className="head text-xs tracking-[0.2em] text-text">
              TACTICAL<span className="text-accent">/</span>OS
            </span>
            <span className="mono ml-2 hidden text-[10px] text-dim sm:inline">
              v2.4.1
            </span>
          </div>
        </div>

        {/* Breadcrumb — current module */}
        <div className="mono hidden items-center gap-2 text-[11px] text-dim md:flex">
          <span className="text-edge-bright">//</span>
          <span className="text-accent">{activeItem?.code ?? "01"}</span>
          <span className="text-text">{activeItem?.label ?? "DASHBOARD"}</span>
        </div>

        {/* Status cluster */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden items-center gap-1.5 sm:flex">
            <StatusDot tone="online" />
            <span className="label text-[9px]">{PROFILE.status}</span>
          </div>
          <Clock className="text-[11px]" />
        </div>
      </div>
      {/* scanning accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </header>
  );
}
