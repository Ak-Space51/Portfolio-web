"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ModuleId } from "@/lib/types";
import { NAV_ITEMS } from "@/lib/data/nav";

interface NavState {
  active: ModuleId;
}

const NavCtx = createContext<NavState>({ active: "dashboard" });

export function useNav() {
  return useContext(NavCtx);
}

/**
 * Provides the currently active module, derived from scroll position via a
 * single IntersectionObserver (scrollspy). Drives active states in the nav rail,
 * mobile switcher and top bar.
 */
export function NavProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<ModuleId>("dashboard");

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) =>
      document.getElementById(`module-${n.id}`),
    ).filter((el): el is HTMLElement => !!el);

    if (!sections.length) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.intersectionRatio);
        }
        // Pick the most-visible section.
        let topId = sections[0].id;
        let topRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = id;
          }
        }
        const id = topId.replace("module-", "") as ModuleId;
        setActive(id);
      },
      { threshold: [0.15, 0.4, 0.7], rootMargin: "-20% 0px -45% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const value = useMemo(() => ({ active }), [active]);
  return <NavCtx.Provider value={value}>{children}</NavCtx.Provider>;
}
