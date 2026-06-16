"use client";

import { motion } from "framer-motion";
import { NotchedFrame, NotchedFrameProps } from "./NotchedFrame";
import { cn } from "@/lib/utils";

interface HudPanelProps extends Omit<NotchedFrameProps, "title"> {
  title?: string;
  /** small right-aligned status text in the header */
  status?: string;
  /** stagger delay for reveal */
  delay?: number;
  /** layout classes (grid spans etc.) applied to the outer element */
  className?: string;
  /** classes for the inner frame */
  frameClassName?: string;
  bodyClassName?: string;
  reveal?: boolean;
}

/**
 * Titled, segmented HUD panel. Header has a label + accent tick, optional
 * status badge, and a divider. Built on NotchedFrame.
 */
export function HudPanel({
  title,
  status,
  delay = 0,
  className,
  frameClassName,
  bodyClassName,
  reveal = true,
  children,
  ...frame
}: HudPanelProps) {
  const inner = (
    <NotchedFrame className={cn("h-full w-full", frameClassName)} {...frame}>
      <div className="flex h-full flex-col p-3 sm:p-4">
        {title && (
          <>
            <header className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-1 bg-accent" />
                <h3 className="hud-label !text-[0.6rem] text-text">{title}</h3>
              </div>
              {status && (
                <span className="hud-label !tracking-widest text-accent-active">
                  {status}
                </span>
              )}
            </header>
            <div className="hud-divider mb-3" />
          </>
        )}
        <div className={cn("min-h-0 flex-1", bodyClassName)}>{children}</div>
      </div>
    </NotchedFrame>
  );

  if (!reveal) {
    return <div className={className}>{inner}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {inner}
    </motion.div>
  );
}
