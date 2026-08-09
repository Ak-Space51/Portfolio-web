/**
 * Subtle horizontal scan sweep that travels down a container. CSS-animated;
 * automatically near-instant under prefers-reduced-motion (see globals.css).
 * Place inside a `relative overflow-hidden` parent. Presentational.
 */
export function ScanLine({ duration = 7 }: { duration?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 scan-sweep"
      style={{
        animation: `scanline-move ${duration}s linear infinite`,
        willChange: "transform",
      }}
    />
  );
}
