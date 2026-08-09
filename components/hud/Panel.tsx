import { cn } from "@/lib/utils/cn";
import { Label } from "@/components/hud/Label";
import { CornerBrackets } from "@/components/hud/CornerBrackets";

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  /** Header label rendered in the panel chrome */
  label?: string;
  /** Right-aligned code/index, e.g. "SYS.03" */
  code?: string;
  cut?: "sm" | "md" | "lg";
  brackets?: boolean;
  active?: boolean;
  /** Tighter inner padding */
  dense?: boolean;
  id?: string;
}

/**
 * Core HUD frame: beveled corners via the `.hud-panel` double-layer technique
 * (see globals.css). Pure/presentational so it can render in Server Components.
 */
export function Panel({
  children,
  className,
  label,
  code,
  cut = "md",
  brackets = false,
  active = false,
  dense = false,
  id,
}: PanelProps) {
  return (
    <div
      id={id}
      data-active={active}
      className={cn(
        "hud-panel",
        cut === "sm" && "cut-sm",
        cut === "lg" && "cut-lg",
        className,
      )}
    >
      {brackets && <CornerBrackets accent={active} />}
      {(label || code) && (
        <div className="flex items-center justify-between gap-3 border-b border-edge/70 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-block h-1.5 w-1.5",
                active ? "bg-accent" : "bg-edge-bright",
              )}
            />
            {label && <Label>{label}</Label>}
          </div>
          {code && <span className="mono text-[10px] text-dim">{code}</span>}
        </div>
      )}
      <div className={cn(dense ? "p-3" : "p-4 sm:p-5")}>{children}</div>
    </div>
  );
}
