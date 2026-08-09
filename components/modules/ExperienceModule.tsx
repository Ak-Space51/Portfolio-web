import { Module } from "@/components/modules/Module";
import { Panel } from "@/components/hud/Panel";
import { Label } from "@/components/hud/Label";
import { Reveal } from "@/components/hud/Reveal";
import { StatusDot } from "@/components/hud/StatusDot";
import { panelRevealRight } from "@/lib/motion/variants";
import { EXPERIENCE } from "@/lib/data/experience";

export function ExperienceModule() {
  return (
    <Module
      id="experience"
      code="05"
      title="Deployment History"
      meta="// chronological mission log · most recent operation first"
    >
      <ol className="relative ml-1 space-y-4 border-l border-edge pl-6 sm:ml-3 sm:pl-8">
        {EXPERIENCE.map((entry, i) => (
          <Reveal key={entry.id} as="li" variants={panelRevealRight} delay={i * 0.05}>
            {/* node marker */}
            <span
              aria-hidden
              className="absolute -left-[7px] mt-3 flex h-3 w-3 items-center justify-center"
            >
              <span
                className={`h-2.5 w-2.5 ${
                  entry.status === "ACTIVE"
                    ? "bg-accent shadow-[var(--shadow-accent)]"
                    : "bg-edge-bright"
                }`}
                style={{ clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}
              />
            </span>

            <Panel dense>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="mono text-[10px] text-accent">
                      {entry.timestamp}
                    </span>
                    {entry.status === "ACTIVE" && (
                      <span className="flex items-center gap-1">
                        <StatusDot tone="online" />
                        <span className="label text-[8px] text-accent">LIVE</span>
                      </span>
                    )}
                  </div>
                  <h3 className="head mt-1.5 text-base text-text">
                    {entry.role}
                  </h3>
                  <p className="mono text-xs text-dim">{entry.org}</p>
                </div>
                <span className="mono shrink-0 text-[10px] text-edge-bright">
                  {entry.period}
                </span>
              </div>

              <ul className="mt-3 space-y-1.5">
                {entry.log.map((line, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 font-body text-sm leading-relaxed text-text/85"
                  >
                    <span className="mono mt-0.5 text-[10px] text-accent/70">
                      ›
                    </span>
                    {line}
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {entry.tags.map((t) => (
                  <span
                    key={t}
                    className="mono bg-bg/50 px-2 py-0.5 text-[10px] text-dim ring-1 ring-edge"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Panel>
          </Reveal>
        ))}
        <li className="absolute -left-[5px] bottom-0">
          <Label className="ml-4 text-[8px]">EOF</Label>
        </li>
      </ol>
    </Module>
  );
}
