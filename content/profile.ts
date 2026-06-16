import { Attribute, MissionStat, Profile, TechStatus } from "@/lib/types";

export const profile: Profile = {
  callsign: "AK SPACE",
  name: "AAKARSH",
  role: "SOFTWARE ENGINEER",
  location: "EARTH // REMOTE-READY",
  availability: "AVAILABLE",
  summary:
    "Full-stack engineer specializing in interactive systems, real-time interfaces and applied AI. I build fast, resilient products and the tooling around them — from low-level performance work to polished, game-grade front ends.",
  avatar: "", // empty -> procedural holo-portrait; drop a /assets path to override
  socials: [
    { label: "GITHUB", href: "https://github.com" },
    { label: "LINKEDIN", href: "https://linkedin.com" },
    { label: "X", href: "https://x.com" },
    { label: "MAIL", href: "mailto:operative@akspace.dev" },
  ],
};

export const attributes: Attribute[] = [
  { label: "PROBLEM SOLVING", value: 94 },
  { label: "SYSTEM DESIGN", value: 88 },
  { label: "DEVELOPMENT", value: 92 },
  { label: "CREATIVITY", value: 86 },
  { label: "COMMUNICATION", value: 81 },
];

export const missionStats: MissionStat[] = [
  { label: "MISSIONS DEPLOYED", value: 27 },
  { label: "YEARS ACTIVE", value: 5, suffix: "+" },
  { label: "TECHNOLOGIES", value: 40, suffix: "+" },
  { label: "COMMENDATIONS", value: 12 },
];

export const techStatus: TechStatus[] = [
  { label: "SYSTEMS", value: 98, state: "ONLINE" },
  { label: "NETWORK", value: 91, state: "STABLE" },
  { label: "DATABASE", value: 87, state: "SYNCED" },
  { label: "AI MODULES", value: 76, state: "ACTIVE" },
];
