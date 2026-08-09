import { Module } from "@/components/modules/Module";
import { Panel } from "@/components/hud/Panel";
import { Reveal } from "@/components/hud/Reveal";
import { DiagnosticBar } from "@/components/hud/DiagnosticBar";
import { fadeUp } from "@/lib/motion/variants";
import { SKILL_CATEGORIES } from "@/lib/data/skills";

export function CapabilitiesModule() {
  return (
    <Module
      id="capabilities"
      code="04"
      title="Capabilities"
      meta="// diagnostic readout · proficiency calibrated across four subsystems"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {SKILL_CATEGORIES.map((cat, i) => (
          <Reveal key={cat.id} variants={fadeUp} delay={i * 0.05}>
            <Panel label={cat.label} code={cat.code} brackets>
              <div className="space-y-4">
                {cat.skills.map((skill, j) => (
                  <DiagnosticBar
                    key={skill.name}
                    label={skill.name}
                    level={skill.level}
                    note={skill.note}
                    delay={j * 0.05}
                  />
                ))}
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>
    </Module>
  );
}
