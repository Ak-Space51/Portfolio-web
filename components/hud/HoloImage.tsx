"use client";

import { cn } from "@/lib/utils";

/**
 * Procedural "holographic" image component. Renders a themed cyberpunk
 * gradient + grid + scanlines with a caption. If a `src` is provided,
 * the profile image is blended directly into the holographic matrix.
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
      {/* Base Profile Image Layer */}
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={caption}
          className="absolute inset-0 h-full w-full object-cover opacity-75 mix-blend-luminosity filter brightness-110 contrast-125"
        />
      )}

      {/* Cyberpunk Hologram Overlay Tint (Only active if image exists to lock in theme colors) */}
      {src && (
        <div className="absolute inset-0 bg-accent/10 mix-blend-color-dodge pointer-events-none" />
      )}

      {/* grid */}
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgb(var(--grid)/0.12)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--grid)/0.12)_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none" />
      
      {/* scanlines */}
      <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(0deg,rgb(0_0_0/0.5)_0,rgb(0_0_0/0.5)_1px,transparent_1px,transparent_3px)] pointer-events-none" />
      
      {/* glow blob */}
      <div className="absolute -right-6 top-1/3 h-24 w-24 rounded-full bg-accent-active/30 blur-2xl pointer-events-none" />
      
      {/* frame ticks */}
      <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-accent-active/70 pointer-events-none" />
      <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-accent-active/70 pointer-events-none" />
      <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-accent-active/70 pointer-events-none" />
      <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-accent-active/70 pointer-events-none" />
      
      {/* caption */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 statement-layer">
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