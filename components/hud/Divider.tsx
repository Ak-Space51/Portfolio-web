import { cn } from "@/lib/utils/cn";

/**
 * Horizontal data divider with end ticks and an optional inline label.
 * Presentational.
 */
export function Divider({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("flex items-center gap-3 text-edge-bright", className)}
    >
      <span className="h-2 w-px bg-edge-bright" />
      <span className="h-px flex-1 bg-gradient-to-r from-edge-bright/80 to-transparent" />
      {label && (
        <span className="mono text-[10px] uppercase tracking-[0.2em] text-dim">
          {label}
        </span>
      )}
      <span className="h-px flex-1 bg-gradient-to-l from-edge-bright/80 to-transparent" />
      <span className="h-2 w-px bg-edge-bright" />
    </div>
  );
}
