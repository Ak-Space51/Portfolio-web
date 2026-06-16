"use client";

import { cn } from "@/lib/utils";

/** Deterministic pseudo-hex so SSR and client markup match. */
function hexLine(seed: number): string {
  let x = (seed * 2654435761) >>> 0;
  const hex = x.toString(16).toUpperCase().padStart(8, "0").slice(0, 6);
  const states = ["OK", "RUN", "SYNC", "IDLE", "0xFF", "ACK"];
  return `${hex}::${states[seed % states.length]}`;
}

/**
 * Thin vertical column of scrolling hex/status IDs down a screen edge.
 * Purely decorative; non-interactive; pauses under reduced motion via CSS.
 */
export function EdgeTicker({
  side = "left",
  count = 40,
  className,
}: {
  side?: "left" | "right";
  count?: number;
  className?: string;
}) {
  const lines = Array.from({ length: count }, (_, i) => hexLine(i + 1));
  // Duplicate for seamless loop.
  const stream = [...lines, ...lines];

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-0 hidden h-full w-7 overflow-hidden opacity-[0.22] lg:block",
        side === "left" ? "left-0" : "right-0",
        className,
      )}
    >
      <div
        className="flex flex-col gap-2 will-change-transform"
        style={{ animation: "ticker-scroll 38s linear infinite" }}
      >
        {stream.map((l, i) => (
          <span
            key={i}
            className="select-none whitespace-nowrap font-mono text-[8px] tracking-widest text-accent/70"
            style={{ writingMode: "vertical-rl" }}
          >
            {l}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes ticker-scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div > div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
