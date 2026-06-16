"use client";

import { cn } from "@/lib/utils";

/**
 * Procedural "holographic" placeholder image. Renders a themed cyberpunk
 * gradient + grid + scanlines with a caption — so the UI looks intentional
 * without shipping real screenshots.
 *
 * To use a real image instead, pass `src` (a /public path). The caption text
 * doubles as the deterministic seed for the gradient angle.
 */
function seedNum(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function HoloImage({
  caption,
  src,
  className,
  label = "VISUAL FEED",
}: {
  caption: string;
  src?: string;
  className?: string;
  label?: string;
}) {
  const n = seedNum(caption);
  const angle = n % 360;

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={caption}
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={caption}
      className={cn(
        "relative h-full w-full overflow-hidden bg-surface",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, rgb(var(--accent) / 0.45), rgb(var(--bg)) 55%, rgb(var(--accent-active) / 0.35))`,
      }}
    >
      {/* grid */}
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgb(var(--grid)/0.12)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--grid)/0.12)_1px,transparent_1px)] [background-size:18px_18px]" />
      {/* scanlines */}
      <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(0deg,rgb(0_0_0/0.5)_0,rgb(0_0_0/0.5)_1px,transparent_1px,transparent_3px)]" />
      {/* glow blob */}
      <div className="absolute -right-6 top-1/3 h-24 w-24 rounded-full bg-accent-active/30 blur-2xl" />
      {/* frame ticks */}
      <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-accent-active/70" />
      <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-accent-active/70" />
      <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-accent-active/70" />
      <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-accent-active/70" />
      {/* caption */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-2.5">
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-white/90">
          {caption}
        </span>
        <span className="hud-label !text-[0.55rem] text-accent-active">
          {label}
        </span>
      </div>
    </div>
  );
}
