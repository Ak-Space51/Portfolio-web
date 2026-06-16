import { SectionId } from "./types";

export const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "PROFILE", label: "PROFILE" },
  { id: "SKILLS", label: "SKILLS" },
  { id: "PROJECTS", label: "PROJECTS" },
  { id: "VISUALS", label: "VISUALS" },
  { id: "JOURNAL", label: "JOURNAL" },
  { id: "EXPERIENCE", label: "EXPERIENCE" },
  { id: "CONTACT", label: "CONTACT" },
];

/** Step `delta` positions through SECTIONS from `active`, wrapping around. */
export function stepSection(active: SectionId, delta: number): SectionId {
  const i = SECTIONS.findIndex((s) => s.id === active);
  const n = SECTIONS.length;
  return SECTIONS[(i + delta + n) % n].id;
}
