"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Module } from "@/components/modules/Module";
import { Panel } from "@/components/hud/Panel";
import { Label } from "@/components/hud/Label";
import { Reveal } from "@/components/hud/Reveal";
import { HudButton } from "@/components/hud/HudButton";
import { CornerBrackets } from "@/components/hud/CornerBrackets";
import { fadeUp } from "@/lib/motion/variants";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";
import { PROJECTS } from "@/lib/data/projects";
import type { Project, ProjectStatus } from "@/lib/types";

const STATUS_STYLE: Record<ProjectStatus, string> = {
  ACTIVE: "text-accent ring-accent/50",
  DEPLOYED: "text-emerald-400 ring-emerald-400/40",
  CLASSIFIED: "text-amber-400 ring-amber-400/40",
  ARCHIVED: "text-dim ring-edge",
};

export function OperationsModule() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Module
      id="operations"
      code="03"
      title="Operations"
      meta={`// ${PROJECTS.length} recorded deployments · select a dossier to expand`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} variants={fadeUp} delay={i * 0.04}>
            <MissionCard project={p} onOpen={() => setSelected(p)} />
          </Reveal>
        ))}
      </div>

      <MissionDossier
        project={selected}
        onClose={() => setSelected(null)}
      />
    </Module>
  );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={cn(
        "mono inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] uppercase tracking-widest ring-1",
        STATUS_STYLE[status],
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {status}
    </span>
  );
}

function MissionCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <div className="hud-panel group h-full transition-[transform] duration-200 hover:-translate-y-0.5">
      <CornerBrackets className="opacity-0 transition-opacity duration-200 group-hover:opacity-100" accent />
      <div className="flex h-full flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="mono text-[10px] text-accent">
              {project.missionId}
            </span>
            <h3 className="head mt-1 text-base text-text">{project.name}</h3>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <p className="mt-3 font-body text-sm leading-relaxed text-dim">
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((s) => (
            <span
              key={s}
              className="mono bg-bg/60 px-2 py-0.5 text-[10px] text-text/80 ring-1 ring-edge"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <span className="mono text-[10px] text-edge-bright">
            {project.year}
          </span>
          <div className="flex items-center gap-2">
            {project.links.source && (
              <a
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-[10px] text-dim transition-colors hover:text-accent"
                aria-label={`${project.name} source code`}
              >
                SRC
              </a>
            )}
            {project.links.deploy && (
              <a
                href={project.links.deploy}
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-[10px] text-dim transition-colors hover:text-accent"
                aria-label={`${project.name} live deployment`}
              >
                LIVE
              </a>
            )}
            <button
              type="button"
              onClick={onOpen}
              className="head text-[10px] font-bold tracking-[0.15em] text-accent transition-colors hover:text-accent-2"
            >
              OPEN DOSSIER →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MissionDossier({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const open = !!project;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} mission dossier`}
        >
          <div
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            className="relative w-full max-w-2xl"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Panel className="cut-lg" brackets active>
              <div className="max-h-[80dvh] overflow-y-auto pr-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="mono text-xs text-accent">
                        {project.missionId}
                      </span>
                      <StatusBadge status={project.status} />
                    </div>
                    <h3 className="head mt-2 text-2xl text-text">
                      {project.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    autoFocus
                    aria-label="Close dossier"
                    className="head shrink-0 px-2 py-1 text-sm text-dim ring-1 ring-edge transition-colors hover:text-accent hover:ring-accent"
                  >
                    ✕
                  </button>
                </div>

                <div className="my-5 h-px w-full bg-gradient-to-r from-accent/40 to-transparent" />

                <Label>BRIEFING</Label>
                <div className="mt-2 space-y-3">
                  {project.briefing.map((b, i) => (
                    <p
                      key={i}
                      className="font-body text-[15px] leading-relaxed text-text/90"
                    >
                      {b}
                    </p>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-px bg-edge/60">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="bg-panel p-3 text-center">
                      <div className="head text-lg text-accent">{m.value}</div>
                      <Label className="mt-1 text-[8px]">{m.label}</Label>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Label>TECH STACK</Label>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="mono bg-bg/60 px-2 py-1 text-[11px] text-text/80 ring-1 ring-edge"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.links.deploy && (
                    <HudButton href={project.links.deploy} target="_blank" rel="noopener noreferrer">
                      LAUNCH DEPLOYMENT
                    </HudButton>
                  )}
                  {project.links.source && (
                    <HudButton
                      variant="ghost"
                      href={project.links.source}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      VIEW SOURCE
                    </HudButton>
                  )}
                  {!project.links.deploy && !project.links.source && (
                    <span className="mono text-xs text-dim">
                      // links classified — access restricted
                    </span>
                  )}
                </div>
              </div>
            </Panel>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
