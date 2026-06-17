"use client";

import { motion } from "framer-motion";
import { Check, ExternalLink, Github } from "lucide-react";
import { Mission } from "@/lib/types";
import { HoloImage } from "@/components/hud/HoloImage";
import { HudButton } from "@/components/hud/HudButton";
import { cn } from "@/lib/utils";

export function MissionDossier({ mission }: { mission: Mission }) {
  return (
    <motion.article
      key={mission.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex h-full flex-col"
    >
      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line/60 pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-2xl font-bold tracking-wide text-text text-glow sm:text-3xl">
              {mission.codename}
            </h3>
            <span className="clip-chip border border-accent-active/60 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-accent-active">
              {mission.type}
            </span>
          </div>
          <p className="mt-1 font-mono text-[0.6rem] tracking-widest text-muted">
            {mission.id} // {mission.year}
          </p>
        </div>
        <div className="text-right">
          <span className="hud-label">STATUS</span>
          <p className="font-mono text-xs uppercase tracking-widest text-accent-active">
            {mission.status}
          </p>
        </div>
      </div>

      {/* body */}
      <div className="grid flex-1 grid-cols-1 gap-5 py-4 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <span className="hud-label mb-1.5 block">// DESCRIPTION</span>
            <p className="text-sm leading-relaxed text-muted">
              {mission.description}
            </p>
          </div>

          <div>
            <span className="hud-label mb-1.5 block">// TECH STACK</span>
            <div className="flex flex-wrap gap-1.5">
              {mission.techStack.map((t) => (
                <span
                  key={t}
                  className="clip-chip border border-line/70 bg-surface/50 px-2 py-1 font-mono text-[0.65rem] text-text"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="hud-label mb-1.5 block">// FEATURES</span>
            <ul className="space-y-1.5">
              {mission.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <Check className="h-3.5 w-3.5 shrink-0 text-accent-active" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* visuals */}
        <div className="space-y-3">
        <div className="clip-notch-sm relative aspect-video w-full overflow-hidden border border-line/60">
          <HoloImage 
            src={mission.screenshots[0]} 
            caption={`${mission.codename} // MAIN_VIEW`} 
          />
        </div>
          {mission.screenshots.length > 1 && (
            <div className="grid grid-cols-2 gap-3">
              {mission.screenshots.slice(1, 3).map((s) => (
                <div
                  key={s}
                  className="clip-notch-sm relative aspect-video overflow-hidden border border-line/60"
                >
                  <HoloImage caption={s} label="FEED" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* actions */}
      <div className="flex flex-wrap gap-3 border-t border-line/60 pt-4">
        <HudButton
          variant="solid"
          icon={<ExternalLink className="h-3.5 w-3.5" />}
          onClick={() =>
            mission.liveDemo && window.open(mission.liveDemo, "_blank")
          }
          className={cn(!mission.liveDemo && "pointer-events-none opacity-40")}
        >
          LIVE DEMO
        </HudButton>
        <HudButton
          variant="outline"
          icon={<Github className="h-3.5 w-3.5" />}
          onClick={() =>
            mission.sourceCode && window.open(mission.sourceCode, "_blank")
          }
          className={cn(!mission.sourceCode && "pointer-events-none opacity-40")}
        >
          VIEW CODE
        </HudButton>
      </div>
    </motion.article>
  );
}
