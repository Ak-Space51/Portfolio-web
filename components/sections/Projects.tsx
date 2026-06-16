"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { isEditable } from "@/lib/utils";
import { missions } from "@/content/projects";
import { HudSection } from "@/components/hud/HudSection";
import { HudSidebar } from "@/components/hud/HudSidebar";
import { NotchedFrame } from "@/components/hud/NotchedFrame";
import { MissionCard } from "@/components/mission/MissionCard";
import { MissionDossier } from "@/components/mission/MissionDossier";

export function Projects() {
  const [selectedId, setSelectedId] = useState(missions[0].id);
  const selected = missions.find((m) => m.id === selectedId) ?? missions[0];

  // Latest selection, read by the key handler (no stale closure).
  const selectedRef = useRef(selectedId);
  selectedRef.current = selectedId;

  // Up/Down move the selection through the mission log (dossier updates live).
  // Only mounted while PROJECTS is active, so the listener is naturally scoped.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
      if (isEditable(document.activeElement)) return;
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      const i = missions.findIndex((m) => m.id === selectedRef.current);
      const n = missions.length;
      const delta = e.key === "ArrowDown" ? 1 : -1;
      const next = missions[(i + delta + n) % n];
      setSelectedId(next.id);
      requestAnimationFrame(() =>
        document
          .querySelector(`[data-mission="${next.id}"]`)
          ?.scrollIntoView({ block: "nearest" }),
      );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <HudSection
      index="03"
      tone="cyan"
      title="MISSIONS"
      subtitle="Selected operations. Choose a mission to open its dossier."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Mission log */}
        <div className="lg:col-span-5 xl:col-span-4">
          <HudSidebar
            title="MISSION LOG"
            status={`${missions.length} FILES`}
            className="h-full max-h-[560px]"
          >
            {missions.map((m) => (
              <MissionCard
                key={m.id}
                mission={m}
                selected={m.id === selectedId}
                onSelect={() => setSelectedId(m.id)}
              />
            ))}
          </HudSidebar>
        </div>

        {/* Mission dossier */}
        <div className="lg:col-span-7 xl:col-span-8">
          <NotchedFrame glow="accent" fillClassName="bg-panel/95" className="h-full">
            <div className="flex items-center justify-between border-b border-line/70 px-4 py-2.5">
              <span className="hud-label text-text">MISSION DOSSIER</span>
              <span className="hud-label text-accent-active">CLASSIFIED</span>
            </div>
            <div className="p-4 sm:p-5">
              <AnimatePresence mode="wait">
                <MissionDossier key={selected.id} mission={selected} />
              </AnimatePresence>
            </div>
          </NotchedFrame>
        </div>
      </div>
    </HudSection>
  );
}
