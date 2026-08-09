import type { ExperienceEntry } from "@/lib/types";

/**
 * Experience = deployment history, rendered as a mission log timeline.
 * Ordered most-recent first.
 */
export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "exp-1",
    timestamp: "2024.03",
    period: "2024 — PRESENT",
    role: "SENIOR SOFTWARE ENGINEER",
    org: "ORBITAL SYSTEMS",
    status: "ACTIVE",
    log: [
      "Lead engineer on the real-time observability platform; owns frontend architecture and the streaming data layer.",
      "Mentors four engineers and drives the design-systems initiative across the product org.",
    ],
    tags: ["Next.js", "Rust", "Design Systems", "Real-time"],
  },
  {
    id: "exp-2",
    timestamp: "2022.01",
    period: "2022 — 2024",
    role: "SOFTWARE ENGINEER",
    org: "MERIDIAN LABS",
    status: "COMPLETE",
    log: [
      "Shipped the company design system and migrated three legacy products onto it.",
      "Cut CI times 10x by building an incremental monorepo pipeline.",
    ],
    tags: ["React", "TypeScript", "Tooling", "Performance"],
  },
  {
    id: "exp-3",
    timestamp: "2020.06",
    period: "2020 — 2022",
    role: "FRONTEND ENGINEER",
    org: "NORTHWIND DIGITAL",
    status: "COMPLETE",
    log: [
      "Built data-dense dashboards and interactive visualizations for enterprise clients.",
      "Introduced automated accessibility testing into the delivery pipeline.",
    ],
    tags: ["React", "D3", "Accessibility"],
  },
  {
    id: "exp-4",
    timestamp: "2019.07",
    period: "2019 — 2020",
    role: "JUNIOR ENGINEER",
    org: "HELIX STUDIO",
    status: "COMPLETE",
    log: [
      "Delivered production features across the stack for client web platforms.",
      "Established the team's component testing conventions.",
    ],
    tags: ["JavaScript", "Node.js", "CSS"],
  },
];
