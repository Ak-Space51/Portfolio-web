"use client";

import { scrollToModule } from "@/lib/utils/navigate";
import { useNav } from "@/components/layout/NavContext";
import { NAV_ITEMS } from "@/lib/data/nav";
import { cn } from "@/lib/utils/cn";

/** Bottom module switcher for tablet/mobile — a portable cyberdeck control bar. */
export function MobileNav() {
  const { active } = useNav();

  return (
    <nav
      aria-label="Primary modules"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-edge bg-bg/90 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="no-scrollbar flex items-stretch overflow-x-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id} className="flex-1">
              <button
                type="button"
                onClick={() => scrollToModule(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex min-w-[64px] flex-col items-center gap-1 px-2 py-2.5 transition-colors",
                  isActive ? "text-accent" : "text-dim",
                )}
              >
                <span className="mono text-[9px]">{item.code}</span>
                <span className="head text-[8px] font-semibold tracking-[0.12em]">
                  {item.label}
                </span>
                <span
                  className={cn(
                    "h-0.5 w-5 transition-colors",
                    isActive ? "bg-accent" : "bg-transparent",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
