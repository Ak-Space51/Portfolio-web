import { cn } from "@/lib/utils/cn";

type Tone = "online" | "warn" | "idle";

const TONE: Record<Tone, string> = {
  online: "bg-accent",
  warn: "bg-amber-400",
  idle: "bg-dim",
};

/** Pulsing status indicator with concentric ring. */
export function StatusDot({
  tone = "online",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("relative inline-flex h-2 w-2 items-center justify-center", className)}
    >
      <span className={cn("absolute inline-flex h-2 w-2 animate-pulse-dot rounded-full", TONE[tone])} />
      <span className={cn("inline-flex h-1 w-1 rounded-full", TONE[tone])} />
    </span>
  );
}
