import type { ModuleId } from "@/lib/types";
import { ModuleHeading } from "@/components/hud/ModuleHeading";
import { cn } from "@/lib/utils/cn";

/**
 * Standard module section wrapper. Sets the scroll target id, accessible label,
 * and scroll-margin offset for the sticky top bar.
 */
export function Module({
  id,
  code,
  title,
  meta,
  children,
  className,
  showHeading = true,
}: {
  id: ModuleId;
  code: string;
  title: string;
  meta?: string;
  children: React.ReactNode;
  className?: string;
  showHeading?: boolean;
}) {
  return (
    <section
      id={`module-${id}`}
      aria-label={title}
      className={cn("scroll-mt-20 py-8 first:pt-2 lg:py-12", className)}
    >
      {showHeading && <ModuleHeading code={code} title={title} meta={meta} />}
      {children}
    </section>
  );
}
