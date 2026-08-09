import { cn } from "@/lib/utils/cn";

/** Small tactical caps label (Orbitron, wide tracking). */
export function Label({
  children,
  className,
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <span className={cn("label", accent && "text-accent", className)}>
      {children}
    </span>
  );
}
