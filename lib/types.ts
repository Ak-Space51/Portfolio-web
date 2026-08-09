/**
 * Shared domain types for the tactical HUD portfolio.
 * All site content is typed against these and lives in `lib/data/*`.
 */

export type ModuleId =
  | "dashboard"
  | "profile"
  | "operations"
  | "capabilities"
  | "experience"
  | "transmit";

export interface NavItem {
  id: ModuleId;
  /** HUD label shown in navigation, e.g. "OPERATIONS" */
  label: string;
  /** Module index code, e.g. "03" */
  code: string;
  /** Short description used in tooltips / terminal output */
  describe: string;
}

export interface ProfileData {
  callsign: string;
  name: string;
  role: string;
  status: "ONLINE" | "STANDBY" | "OFFLINE";
  location: string;
  clearance: string;
  serial: string;
  /** Hero summary line */
  tagline: string;
  /** Longer dossier paragraphs */
  dossier: string[];
  /** Key/value spec rows shown in the profile module */
  attributes: { label: string; value: string }[];
  specializations: string[];
  links: { label: string; href: string }[];
}

export type ProjectStatus = "ACTIVE" | "DEPLOYED" | "CLASSIFIED" | "ARCHIVED";

export interface Project {
  id: string;
  /** Mission identifier, e.g. "OP-2207" */
  missionId: string;
  name: string;
  status: ProjectStatus;
  /** One-line objective */
  summary: string;
  /** Expanded dossier briefing (paragraphs) */
  briefing: string[];
  stack: string[];
  /** Outcome metrics shown in the dossier */
  metrics: { label: string; value: string }[];
  links: {
    deploy?: string;
    source?: string;
  };
  year: string;
}

export interface Skill {
  name: string;
  /** Proficiency 0–100 used to fill diagnostic meters */
  level: number;
  /** Optional short note shown on the meter */
  note?: string;
}

export interface SkillCategory {
  id: string;
  label: "LANGUAGES" | "FRAMEWORKS" | "TOOLS" | "INFRASTRUCTURE";
  code: string;
  skills: Skill[];
}

export interface ExperienceEntry {
  id: string;
  /** Operational timestamp, e.g. "2024.03" */
  timestamp: string;
  period: string;
  role: string;
  org: string;
  status: "ACTIVE" | "COMPLETE";
  /** Log lines describing the deployment */
  log: string[];
  tags: string[];
}

export interface SystemMetric {
  label: string;
  value: number;
  unit?: string;
  /** Suffix for display, e.g. "%" or "ms" */
  display?: string;
}
