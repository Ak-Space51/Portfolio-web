import type { ProfileData, SystemMetric } from "@/lib/types";

/**
 * Operator profile. Replace these placeholder values with real data —
 * this is the single source for the hero + profile modules and the
 * `profile` / `whoami` terminal commands.
 */
export const PROFILE: ProfileData = {
  callsign: "OPERATOR",
  name: "AK SPACE",
  role: "--------",
  status: "ONLINE",
  location: "ORBIT",
  clearance: "LEVEL 07",
  serial: "ENG-04471-X",
  tagline:
    "Full-stack engineer specializing in high-performance, design-led web systems.",
  dossier: [
    "Software engineer operating at the intersection of systems engineering and interface design. Six years of field experience building production web platforms, real-time tooling, and developer infrastructure that holds up under load.",
    "Primary directive: translate complex technical requirements into precise, fast, accessible interfaces. Comfortable across the stack — from database schema and API design to motion systems and pixel-level UI.",
    "Operates best on ambiguous problems where engineering rigor and design sensibility both matter. Maintains a bias toward shipping, measuring, and refining.",
  ],
  attributes: [
    { label: "DESIGNATION", value: "SR. SOFTWARE ENGINEER" },
    { label: "FIELD", value: "FRONTEND / FULL-STACK" },
    { label: "ACTIVE SINCE", value: "2019" },
    { label: "DEPLOYMENTS", value: "40+" },
    { label: "TIMEZONE", value: "UTC+05:30" },
    { label: "AVAILABILITY", value: "OPEN TO OPS" },
  ],
  specializations: [
    "Design systems & component architecture",
    "Real-time & data-dense interfaces",
    "Performance & Core Web Vitals",
    "Motion design & micro-interactions",
    "Accessibility (WCAG 2.2)",
    "Developer tooling & DX",
  ],
  links: [
    { label: "GITHUB", href: "https://github.com" },
    { label: "LINKEDIN", href: "https://linkedin.com" },
    { label: "EMAIL", href: "mailto:operator@example.com" },
    { label: "RESUME", href: "#" },
  ],
};

/** Live-feeling diagnostics shown in the hero + right panel. */
export const SYSTEM_METRICS: SystemMetric[] = [
  { label: "UPTIME", value: 99.98, display: "%" },
  { label: "DEPLOYMENTS", value: 42, display: "" },
  { label: "LATENCY", value: 24, display: "ms" },
  { label: "COMMITS / YR", value: 1840, display: "" },
];
