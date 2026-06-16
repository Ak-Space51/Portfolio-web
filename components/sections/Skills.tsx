"use client";

import { HudSection } from "@/components/hud/HudSection";
import { HudPanel } from "@/components/hud/HudPanel";
import { SkillMatrix } from "@/components/skills/SkillMatrix";

export function Skills() {
  return (
    <HudSection
      index="02"
      tone="cyan"
      title="CAPABILITY MATRIX"
      subtitle="Proficiency vectors across the technical stack."
    >
      <HudPanel title="SKILL MATRIX" status="SCANNING" glow="active">
        <SkillMatrix />
      </HudPanel>
    </HudSection>
  );
}
