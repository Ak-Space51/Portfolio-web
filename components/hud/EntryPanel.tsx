"use client";

import { cn } from "@/lib/utils";

/**
 * The full entry-panel outline from public/assets/PANEL.svg: the top-left
 * notch + the divider bar + the main panel (stepped top-left, clipped
 * bottom-right). Uses currentColor so it follows the row's text colour.
 * Stretched to the panel; content is padded past the divider so nothing
 * overlaps.
 */
function MainPanelFrame({
  selected,
  flip,
}: {
  selected: boolean;
  flip: boolean;
}) {
  const fillOpacity = flip ? (selected ? 0.4 : 0.04) : selected ? 0.1 : 0.04;
  return (
    <svg
      viewBox="0 0 2047 326"
      preserveAspectRatio="none"
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        selected &&
          (flip
            ? "drop-shadow-[0_0_10px_rgb(var(--accent)/0.6)]"
            : "drop-shadow-[0_0_9px_rgb(var(--accent-active)/0.55)]"),
      )}
    >
      {/* main panel (filled) */}
      <path
        d="M163 323V1.5H410L434 23.5H2045V287.5L2008 323H163Z"
        fill="currentColor"
        fillOpacity={fillOpacity}
        stroke="currentColor"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
      {/* divider bar */}
      <path
        d="M98 194.5V1.5H158V323H98V279.5L108.5 273V210.5L98 194.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
      {/* top-left notch */}
      <path
        d="M84 88V1.5H1.5V54L33 88H84Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

interface EntryPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  icon: React.ReactNode;
  /** "flip" = red frame always, red fill when selected (text stays its own colour) */
  variant?: "default" | "flip";
}

export function EntryPanel({
  selected = false,
  icon,
  variant = "default",
  className,
  children,
  ...rest
}: EntryPanelProps) {
  const flip = variant === "flip";
  return (
    <div
      className={cn(
        "group flex h-[70px] cursor-pointer items-stretch gap-2 outline-none transition-[transform,color] duration-200 hover:-translate-y-px",
        flip
          ? "text-accent"
          : selected
            ? "text-accent-active"
            : "text-accent/75 hover:text-accent-active focus-visible:text-accent-active",
        className,
      )}
      {...rest}
    >
      {/* icon — sits beside the main panel (no overlap) */}
      <div className="relative flex shrink-0 items-center">{icon}</div>

      {/* main panel */}
      <div className="relative min-w-0 flex-1">
        <MainPanelFrame selected={selected} flip={flip} />
        <div className="relative flex h-full flex-col justify-center pl-[11%] pr-3">
          {children}
        </div>
      </div>
    </div>
  );
}
