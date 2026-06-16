"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SECTIONS } from "@/lib/nav";
import { SectionId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { HudEmblem } from "./HudEmblem";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface HudNavProps {
  active: SectionId;
  onNavigate: (id: SectionId) => void;
  onHome?: () => void;
}

type Section = (typeof SECTIONS)[number];

/**
 * Split the section ring around the active item so the active one sits dead
 * center and the rest wrap circularly to the left/right — a game-style menu
 * carousel. Left/right go in equal-width grid columns (min-w-0 forces the 1fr
 * columns equal regardless of label widths) so the centre never drifts.
 */
function ringAround(activeId: SectionId): {
  left: Section[];
  center: Section;
  right: Section[];
} {
  const n = SECTIONS.length;
  const i = Math.max(
    0,
    SECTIONS.findIndex((s) => s.id === activeId),
  );
  const leftCount = Math.floor((n - 1) / 2);
  const rightCount = n - 1 - leftCount;
  const left: Section[] = [];
  for (let k = leftCount; k >= 1; k--) left.push(SECTIONS[(i - k + n) % n]);
  const right: Section[] = [];
  for (let k = 1; k <= rightCount; k++) right.push(SECTIONS[(i + k) % n]);
  return { left, center: SECTIONS[i], right };
}

/** Shortest signed direction around the ring (for the slide animation). */
function ringDirection(from: SectionId, to: SectionId): number {
  const n = SECTIONS.length;
  const a = SECTIONS.findIndex((s) => s.id === from);
  const b = SECTIONS.findIndex((s) => s.id === to);
  let d = b - a;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return Math.sign(d);
}

/** Top HUD navigation — a centered circular carousel inside a game-like bar. */
export function HudNav({ active, onNavigate, onHome }: HudNavProps) {
  return (
    <nav className="sticky top-0 z-30 border-b border-line/40 bg-bg/80 backdrop-blur-sm">
      <div className="relative mx-auto flex max-w-7xl items-center gap-3 px-3 py-2.5 sm:px-6">
        {/* home emblem (far left) — fixed-width flank to keep the bar centered */}
        <div className="flex w-[92px] shrink-0 justify-start">
          <HudEmblem onClick={onHome} />
        </div>

        {/* desktop: centered circular nav inside the game bar */}
        <div className="hidden flex-1 justify-center md:flex">
          <GameNavBar active={active} onNavigate={onNavigate} />
        </div>

        {/* mobile: just the active label (full list scrolls below) */}
        <div className="flex flex-1 items-center justify-center md:hidden">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-active text-glow-active">
            {active}
          </span>
        </div>

        {/* theme switcher (far right) — matching flank width */}
        <div className="flex w-[92px] shrink-0 justify-end">
          <ThemeSwitcher />
        </div>
      </div>

      {/* mobile horizontal scroller */}
      <div className="hud-scroll flex gap-1 overflow-x-auto border-t border-line/40 px-3 py-2 md:hidden">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onNavigate(s.id)}
            aria-current={active === s.id ? "page" : undefined}
            className={cn(
              "shrink-0 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-glow transition-colors",
              active === s.id ? "text-accent-active" : "text-muted",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function GameNavBar({
  active,
  onNavigate,
}: {
  active: SectionId;
  onNavigate: (id: SectionId) => void;
}) {
  const { left, center, right } = ringAround(active);

  // direction of the last rotation, for the slide-in animation
  const prev = useRef<SectionId>(active);
  const dir = ringDirection(prev.current, active) || 1;
  useEffect(() => {
    prev.current = active;
  }, [active]);

  return (
    <div className="relative w-full max-w-3xl">
      {/* frame: accent outline + translucent fill (double-layer notch) */}
      <div className="clip-notch-sm absolute inset-0 bg-accent/40 shadow-glow" />
      <div className="clip-notch-sm absolute inset-[1px] bg-surface/70 backdrop-blur-sm" />
      {/* corner ticks */}
      <span className="pointer-events-none absolute left-1 top-1 h-2.5 w-2.5 border-l border-t border-accent-active/80" />
      <span className="pointer-events-none absolute right-1 top-1 h-2.5 w-2.5 border-r border-t border-accent-active/80" />
      <span className="pointer-events-none absolute bottom-1 left-1 h-2.5 w-2.5 border-b border-l border-accent-active/80" />
      <span className="pointer-events-none absolute bottom-1 right-1 h-2.5 w-2.5 border-b border-r border-accent-active/80" />

      {/* content (clipped so the slide stays inside the frame) */}
      <div className="relative overflow-hidden">
        <motion.div
          key={center.id}
          initial={{ x: dir * 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.26, ease: "easeOut" }}
          className="grid grid-cols-[1fr_auto_1fr] items-center gap-1 px-3 py-1.5"
        >
          {/* left ring */}
          <div className="flex min-w-0 items-center justify-end gap-0.5">
            {left.map((s) => (
              <NavChip key={s.id} section={s} onNavigate={onNavigate} />
            ))}
          </div>

          {/* centered active item */}
          <div className="flex items-center justify-center gap-2 px-1">
            <Diamond />
            <NavChip section={center} active onNavigate={onNavigate} />
            <Diamond />
          </div>

          {/* right ring */}
          <div className="flex min-w-0 items-center justify-start gap-0.5">
            {right.map((s) => (
              <NavChip key={s.id} section={s} onNavigate={onNavigate} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Diamond() {
  return (
    <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-accent-active shadow-glow-active" />
  );
}

function NavChip({
  section,
  active = false,
  onNavigate,
}: {
  section: Section;
  active?: boolean;
  onNavigate: (id: SectionId) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(section.id)}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative shrink-0 whitespace-nowrap font-mono uppercase outline-none transition-colors",
        "focus-visible:ring-1 focus-visible:ring-accent-active",
        active
          ? "px-3 py-1 text-sm font-bold tracking-[0.22em] text-accent-active text-glow-active"
          : "px-2.5 py-1 text-[0.68rem] tracking-[0.16em] text-muted text-glow hover:text-text",
      )}
    >
      {active && (
        <span className="clip-btn absolute inset-0 border border-accent-active/70 bg-accent-active/10" />
      )}
      <span className="relative z-[1]">{section.label}</span>
    </button>
  );
}
