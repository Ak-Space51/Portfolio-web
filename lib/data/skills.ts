import type { SkillCategory } from "@/lib/types";

/**
 * Capabilities = skills, rendered as diagnostic meters. `level` (0–100)
 * drives the meter fill. Keep values honest.
 */
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    label: "LANGUAGES",
    code: "SYS.01",
    skills: [
      { name: "TypeScript", level: 95, note: "primary" },
      { name: "JavaScript", level: 93 },
      { name: "Rust", level: 74 },
      { name: "Go", level: 78 },
      { name: "Python", level: 80 },
      { name: "SQL", level: 84 },
    ],
  },
  {
    id: "frameworks",
    label: "FRAMEWORKS",
    code: "SYS.02",
    skills: [
      { name: "React", level: 96, note: "primary" },
      { name: "Next.js", level: 94 },
      { name: "Node.js", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 86 },
      { name: "GraphQL", level: 79 },
    ],
  },
  {
    id: "tools",
    label: "TOOLS",
    code: "SYS.03",
    skills: [
      { name: "Git", level: 93 },
      { name: "Figma", level: 85 },
      { name: "Vite / Webpack", level: 82 },
      { name: "Playwright", level: 80 },
      { name: "Storybook", level: 83 },
    ],
  },
  {
    id: "infrastructure",
    label: "INFRASTRUCTURE",
    code: "SYS.04",
    skills: [
      { name: "Docker", level: 86 },
      { name: "AWS", level: 81 },
      { name: "Vercel / Edge", level: 90 },
      { name: "PostgreSQL", level: 84 },
      { name: "CI/CD", level: 88 },
      { name: "Terraform", level: 72 },
    ],
  },
];
