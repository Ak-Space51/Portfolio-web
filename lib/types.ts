// ============================================================
// Shared domain types for the Portfolio OS content layer.
// Swap the placeholder data in /content with real data; these
// types keep everything consistent.
// ============================================================

export type SectionId =
  | "PROFILE"
  | "SKILLS"
  | "PROJECTS"
  | "VISUALS"
  | "JOURNAL"
  | "EXPERIENCE"
  | "CONTACT";

export interface Profile {
  callsign: string; // "AK SPACE"
  name: string;
  role: string;
  location: string;
  availability: "AVAILABLE" | "ENGAGED" | "STANDBY";
  summary: string;
  avatar: string; // public path
  socials: { label: string; href: string }[];
}

export interface Attribute {
  label: string; // Problem Solving, System Design, ...
  value: number; // 0-100
}

export interface MissionStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface TechStatus {
  label: "SYSTEMS" | "NETWORK" | "DATABASE" | "AI MODULES" | string;
  value: number; // 0-100
  state: "ONLINE" | "STABLE" | "SYNCED" | "ACTIVE" | "DEGRADED";
}

export interface SkillCategory {
  id: string;
  label: string; // Languages, Frontend, ...
  proficiency: number; // 0-100 -> drives the radar
  technologies: string[];
  learning?: string[];
}

export type MissionStatus =
  | "DEPLOYED"
  | "DEPLOYING"
  | "COMPLETE"
  | "ACTIVE"
  | "ARCHIVED";

export interface Mission {
  id: string; // "MISSION_01"
  codename: string; // "PORTFOLIO OS"
  type: string; // "WEB APPLICATION"
  status: MissionStatus;
  description: string;
  techStack: string[];
  features: string[];
  screenshots: string[]; // public paths
  liveDemo?: string;
  sourceCode?: string;
  year: string;
}

export type JournalStatus = "JOB COMPLETE" | "IN PROGRESS" | "CLASSIFIED";

export interface JournalEntry {
  slug: string;
  title: string;
  code: string; // "SID: OCCUPATIONAL HAZARD"
  category: string; // DEVLOG, RESEARCH, ...
  date: string; // ISO
  status: JournalStatus;
  excerpt: string;
  cover: string; // public path
  tags: string[];
  body: string[]; // paragraphs (markdown-lite handled by renderer)
}

export interface ExperienceEntry {
  id: string;
  org: string;
  role: string;
  period: string;
  status: "COMPLETE" | "ACTIVE";
  location: string;
  summary: string;
  highlights: string[];
  tech: string[];
}
