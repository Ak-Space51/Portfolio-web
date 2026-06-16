"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { experience } from "@/content/experience";
import { HudSection } from "@/components/hud/HudSection";
import { NotchedFrame } from "@/components/hud/NotchedFrame";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <HudSection
      index="06"
      tone="amber"
      title="MISSION HISTORY"
      subtitle="Completed operations and field deployments."
    >
      <div className="relative">
        {/* spine */}
        <span className="absolute left-[14px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent via-line to-transparent sm:block" />

        <div className="space-y-5">
          {experience.map((op, i) => (
            <motion.div
              key={op.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="relative sm:pl-12"
            >
              {/* node */}
              <span
                className={cn(
                  "absolute left-0 top-3 hidden h-7 w-7 place-items-center sm:grid",
                )}
              >
                <span className="absolute inset-0 rotate-45 border border-accent/70" />
                <span
                  className={cn(
                    "h-2 w-2 rotate-45",
                    op.status === "ACTIVE"
                      ? "bg-accent-active shadow-glow-active"
                      : "bg-accent",
                  )}
                />
              </span>

              <NotchedFrame glow={op.status === "ACTIVE" ? "active" : "accent"}>
                <div className="p-4 sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-wide text-text">
                        {op.role}
                      </h3>
                      <p className="font-mono text-[0.7rem] uppercase tracking-widest text-accent-active">
                        {op.org} // {op.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[0.65rem] tracking-widest text-muted">
                        {op.period}
                      </p>
                      <span
                        className={cn(
                          "font-mono text-[0.6rem] uppercase tracking-widest",
                          op.status === "ACTIVE" ? "text-ok" : "text-muted",
                        )}
                      >
                        {op.status === "ACTIVE" ? "● ACTIVE" : "✓ COMPLETE"}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-muted">{op.summary}</p>

                  <ul className="mt-3 grid grid-cols-1 gap-1.5 md:grid-cols-2">
                    {op.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-xs text-muted"
                      >
                        <Check className="mt-0.5 h-3 w-3 shrink-0 text-accent-active" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {op.tech.map((t) => (
                      <span
                        key={t}
                        className="clip-chip border border-line/60 px-1.5 py-0.5 font-mono text-[0.6rem] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </NotchedFrame>
            </motion.div>
          ))}
        </div>
      </div>
    </HudSection>
  );
}
