import { Module } from "@/components/modules/Module";
import { Panel } from "@/components/hud/Panel";
import { Label } from "@/components/hud/Label";
import { Reveal } from "@/components/hud/Reveal";
import { panelRevealLeft, panelRevealRight } from "@/lib/motion/variants";
import { PROFILE } from "@/lib/data/profile";

export function ProfileModule() {
  return (
    <Module
      id="profile"
      code="02"
      title="Operator Dossier"
      meta="// classified personnel record · background & specialization"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* Background dossier */}
        <Reveal variants={panelRevealLeft}>
          <Panel label="BACKGROUND" code="DOSSIER" brackets>
            <div className="space-y-4">
              {PROFILE.dossier.map((para, i) => (
                <p
                  key={i}
                  className="font-body text-[15px] leading-relaxed text-text/90"
                >
                  <span className="mono mr-2 text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {para}
                </p>
              ))}
            </div>
          </Panel>
        </Reveal>

        {/* Attributes + specializations */}
        <Reveal variants={panelRevealRight} className="flex flex-col gap-4">
          <Panel label="ATTRIBUTES" code="DATA" dense>
            <dl className="divide-y divide-edge/60">
              {PROFILE.attributes.map((attr) => (
                <div
                  key={attr.label}
                  className="flex items-center justify-between py-2"
                >
                  <Label>{attr.label}</Label>
                  <dd className="mono text-[11px] text-text">{attr.value}</dd>
                </div>
              ))}
            </dl>
          </Panel>

          <Panel label="SPECIALIZATION" code="SPEC" dense>
            <ul className="space-y-2">
              {PROFILE.specializations.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 font-body text-sm text-text/90"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 bg-accent" />
                  {s}
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
      </div>
    </Module>
  );
}
