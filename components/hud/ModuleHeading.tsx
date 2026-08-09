import { cn } from "@/lib/utils/cn";

/**
 * Standard module header: index code + title + meta line. The title is a
 * focusable heading (tabIndex -1) so navigation can move focus here for
 * keyboard / screen-reader users.
 */
export function ModuleHeading({
  code,
  title,
  meta,
  className,
}: {
  code: string;
  title: string;
  meta?: string;
  className?: string;
}) {
  return (
    <header className={cn("mb-6", className)}>
      <div className="flex items-center gap-3">
        <span className="mono text-xs text-accent">{code}</span>
        <span className="h-px w-8 bg-accent/60" />
        <span className="label">MODULE</span>
      </div>
      <h2
        data-module-heading
        tabIndex={-1}
        className="mt-2 text-2xl text-text outline-none sm:text-3xl"
      >
        {title}
      </h2>
      {meta && (
        <p className="mono mt-1.5 text-xs text-dim">{meta}</p>
      )}
    </header>
  );
}
