"use client";

import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { SECTIONS } from "@/lib/nav";
import { SectionId } from "@/lib/types";
import { cn } from "@/lib/utils";

type MenuAction = "enter" | SectionId;

interface MenuItem {
  label: string;
  action: MenuAction;
  primary?: boolean;
}

const ITEMS: MenuItem[] = [
  { label: "ENTER SYSTEM", action: "enter", primary: true },
  ...SECTIONS.map((s) => ({ label: s.label, action: s.id as MenuAction })),
];

/**
 * Landing main-menu. The notched cyan selection bracket appears ONLY while an
 * item is hovered or keyboard-focused (arrow keys / tab) — like a game menu.
 * Arrow Up/Down move the selection; Enter/Space activate.
 */
export function LandingMenu({
  onEnter,
  onNavigate,
}: {
  onEnter: () => void;
  onNavigate: (id: SectionId) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  const activate = (action: MenuAction) => {
    if (action === "enter") onEnter();
    else onNavigate(action);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Home" && e.key !== "End")
      return;
    e.preventDefault();
    const buttons = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>("button[data-menu-item]") ?? [],
    );
    if (buttons.length === 0) return;
    const current = buttons.findIndex((b) => b === document.activeElement);
    let next = current;
    if (e.key === "ArrowDown") next = current < 0 ? 0 : (current + 1) % buttons.length;
    else if (e.key === "ArrowUp")
      next = current < 0 ? buttons.length - 1 : (current - 1 + buttons.length) % buttons.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = buttons.length - 1;
    buttons[next]?.focus();
  };

  return (
    <div
      ref={listRef}
      role="menu"
      aria-label="Main menu"
      onKeyDown={onKeyDown}
      className="flex h-full flex-col justify-between gap-1"
    >
      {ITEMS.map((item, i) => (
        <button
          key={item.action}
          data-menu-item
          role="menuitem"
          type="button"
          onClick={() => activate(item.action)}
          className={cn(
            "group relative w-full px-4 py-2.5 text-left outline-none",
            item.primary && "mb-3",
          )}
        >
          {/* selection bracket — hover / keyboard-focus only */}
          <SelectionBracket />

          {/* label */}
          <span
            className={cn(
              "relative z-[1] flex items-center justify-between font-display font-bold uppercase text-glow transition-colors duration-150",
              item.primary
                ? "text-sm tracking-[0.16em]"
                : "text-[0.95rem] tracking-[0.14em]",
              "text-accent group-hover:text-accent-active group-focus-visible:text-accent-active",
            )}
          >
            {item.label}
            <ChevronRight
              className={cn(
                "h-4 w-4 -translate-x-1 opacity-0 transition-all duration-200",
                "group-hover:translate-x-0 group-hover:opacity-100",
                "group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
              )}
            />
          </span>
        </button>
      ))}
    </div>
  );
}

/**
 * Angular cyan selection frame (rectangle with a chamfered bottom-right
 * corner), hidden until the parent .group is hovered/keyboard-focused.
 * Drawn as an SVG outline so the diagonal edge keeps a crisp uniform stroke.
 */
function SelectionBracket() {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200",
        "group-hover:opacity-100 group-focus-visible:opacity-100",
      )}
    >
      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full drop-shadow-[0_0_8px_rgb(var(--accent-active)/0.7)]"
      >
        <path
          d="M1 1 H99 V24 L86 39 H1 Z"
          fill="rgb(var(--accent-active) / 0.08)"
          stroke="rgb(var(--accent-active))"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* top corner ticks */}
      <span className="absolute left-0 top-0 h-2.5 w-2.5 border-l-2 border-t-2 border-accent-active" />
      <span className="absolute right-0 top-0 h-2.5 w-2.5 border-r-2 border-t-2 border-accent-active" />
      <span className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2 border-accent-active" />
    </span>
  );
}
