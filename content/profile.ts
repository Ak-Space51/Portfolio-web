import { Attribute, MissionStat, Profile, TechStatus } from "@/lib/types";

export const profile: Profile = {
  callsign: "AK SPACE",
  name: "AK SPACE",
  role: "B.tech CSE",
  location: "EARTH // REMOTE-READY",
  availability: "AVAILABLE",
  summary:
    "3rd year CSE student at IIT DELHI. Full-stack engineer specializing in interactive systems, real-time interfaces and applied AI. I build fast, resilient products and the tooling around them — from low-level performance work to polished",
  avatar: "/assets/profile.png", // empty -> procedural holo-portrait; drop a /assets path to override
  socials: [
    { label: "GITHUB", href: "https://github.com/Ak-Space51" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/aakarsh-antriksh-125b13354/" },
    { label: "INSTAGRAM", href: "https://www.instagram.com/aak_space/" },
    { label: "MAIL", href: "mailto:aak.antriksh@gmail.com" },
  ],
};

export const attributes: Attribute[] = [
  { label: "PROBLEM SOLVING", value: 92 },
  { label: "SYSTEM DESIGN", value: 88 },
  { label: "DEVELOPMENT", value: 92 },
  { label: "CREATIVITY", value: 95 },
  { label: "COMMUNICATION", value: 80 },
];

export const missionStats: MissionStat[] = [
  { label: "MISSIONS DEPLOYED", value: 10},
  { label: "YEARS ACTIVE/IN TRAINING", value: 2, suffix: "+" },
  { label: "TECHNOLOGIES", value: 30, suffix: "+" },
  { label: "COMMENDATIONS", value: 6 },
];

export const techStatus: TechStatus[] = [
  { label: "SYSTEMS", value: 98, state: "ONLINE" },
  { label: "NETWORK", value: 90, state: "STABLE" },
  { label: "DATABASE", value: 85, state: "SYNCED" },
  { label: "AI MODULES", value: 76, state: "ACTIVE" },
];
