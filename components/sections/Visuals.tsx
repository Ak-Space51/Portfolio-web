"use client";

import { ImageIcon } from "lucide-react";
import { HudSection } from "@/components/hud/HudSection";
import { NotchedFrame } from "@/components/hud/NotchedFrame";

/**
 * VISUALS — the gallery / visual archive module.
 * Placeholder for now (content to be built out later).
 */
export function Visuals() {
  return (
    <HudSection
      index="04"
      tone="cyan"
      title="VISUALS"
      subtitle="Visual archive — captures, renders and stills."
    >
      <NotchedFrame glow="accent">
        <div className="flex min-h-[340px] flex-col items-center justify-center gap-4 p-10 text-center">
          <span className="clip-notch-sm grid h-16 w-16 place-items-center border border-accent-active/50 text-accent-active shadow-glow-active">
            <ImageIcon className="h-8 w-8" strokeWidth={1.3} />
          </span>
          <div>
            <p className="font-display text-xl font-bold uppercase tracking-hud text-text text-glow">
              FEED STANDBY
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">
              // VISUAL MODULE INITIALIZING — AWAITING UPLOAD
            </p>
          </div>
        </div>
      </NotchedFrame>
    </HudSection>
  );
}
