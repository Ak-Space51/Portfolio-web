"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HudSectionProps {
  id?: string;
  index?: string; // "02"
  title: string; // "OPERATIVE PROFILE"
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
  /** dark-mode text tone for the whole section (see globals.css [data-tone]) */
  tone?: "red" | "cyan" | "amber";
  children: React.ReactNode;
}

/** Standard wrapper for a dashboard section: indexed HUD header + body. */
export function HudSection({
  id,
  index,
  title,
  subtitle,
  actions,
  className,
  tone,
  children,
}: HudSectionProps) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn("relative w-full", className)}
    >
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-line/60 pb-3"
      >
        <div className="flex items-end gap-3">
          {index && (
            <span className="font-mono text-xs text-accent-active">
              {index} /
            </span>
          )}
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-hud text-text text-glow sm:text-3xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 max-w-2xl text-sm text-muted">{subtitle}</p>
            )}
          </div>
        </div>
        {actions}
      </motion.header>
      {children}
    </section>
  );
}
