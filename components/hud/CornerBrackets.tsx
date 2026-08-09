import { cn } from "@/lib/utils/cn";

/**
 * Decorative L-shaped corner brackets layered over a panel. Pure CSS borders,
 * absolutely positioned. Purely presentational (aria-hidden).
 */
export function CornerBrackets({
  className,
  size = 10,
  accent,
}: {
  className?: string;
  size?: number;
  accent?: boolean;
}) {
  const color = accent ? "border-accent" : "border-edge-bright";
  const s = `${size}px`;
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <span
        className={cn("absolute left-0 top-0 border-l border-t", color)}
        style={{ width: s, height: s }}
      />
      <span
        className={cn("absolute right-0 top-0 border-r border-t", color)}
        style={{ width: s, height: s }}
      />
      <span
        className={cn("absolute bottom-0 left-0 border-b border-l", color)}
        style={{ width: s, height: s }}
      />
      <span
        className={cn("absolute bottom-0 right-0 border-b border-r", color)}
        style={{ width: s, height: s }}
      />
    </div>
  );
}
