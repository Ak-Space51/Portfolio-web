import type { ModuleId } from "@/lib/types";
import { PROFILE } from "@/lib/data/profile";
import { PROJECTS } from "@/lib/data/projects";
import { SKILL_CATEGORIES } from "@/lib/data/skills";
import { EXPERIENCE } from "@/lib/data/experience";
import { NAV_ITEMS } from "@/lib/data/nav";

export type LineKind = "input" | "output" | "system" | "error" | "accent";

export interface TerminalLine {
  kind: LineKind;
  text: string;
}

export interface CommandResult {
  lines: TerminalLine[];
  /** If set, the terminal scrolls the page to this module. */
  nav?: ModuleId;
  /** If true, clears the buffer instead of appending. */
  clear?: boolean;
}

interface Command {
  describe: string;
  run: () => CommandResult;
}

const out = (text: string): TerminalLine => ({ kind: "output", text });
const accent = (text: string): TerminalLine => ({ kind: "accent", text });
const sys = (text: string): TerminalLine => ({ kind: "system", text });

export const COMMANDS: Record<string, Command> = {
  help: {
    describe: "list all available commands",
    run: () => ({
      lines: [
        accent("AVAILABLE COMMANDS"),
        ...Object.entries(COMMANDS).map(([name, cmd]) =>
          out(`  ${name.padEnd(12)} ${cmd.describe}`),
        ),
        sys("tip: navigation commands jump to that module."),
      ],
    }),
  },

  profile: {
    describe: "open operator dossier",
    run: () => ({
      nav: "profile",
      lines: [
        accent(`${PROFILE.name} · ${PROFILE.role}`),
        out(`callsign   ${PROFILE.callsign}`),
        out(`clearance  ${PROFILE.clearance}`),
        out(`location   ${PROFILE.location}`),
        out(PROFILE.tagline),
        sys("› routing to PROFILE module..."),
      ],
    }),
  },

  whoami: {
    describe: "print operator identity",
    run: () => ({
      lines: [
        accent(PROFILE.callsign),
        out(`${PROFILE.name} — ${PROFILE.role}`),
        out(`serial ${PROFILE.serial} · ${PROFILE.clearance}`),
      ],
    }),
  },

  projects: {
    describe: "list deployed operations",
    run: () => ({
      nav: "operations",
      lines: [
        accent("OPERATIONS LOG"),
        ...PROJECTS.map((p) =>
          out(`  ${p.missionId}  ${p.status.padEnd(10)} ${p.name}`),
        ),
        sys("› routing to OPERATIONS module..."),
      ],
    }),
  },

  skills: {
    describe: "run capability diagnostics",
    run: () => ({
      nav: "capabilities",
      lines: [
        accent("CAPABILITY DIAGNOSTICS"),
        ...SKILL_CATEGORIES.map((c) =>
          out(
            `  ${c.label.padEnd(14)} ${c.skills
              .slice(0, 3)
              .map((s) => s.name)
              .join(", ")} …`,
          ),
        ),
        sys("› routing to CAPABILITIES module..."),
      ],
    }),
  },

  experience: {
    describe: "show deployment history",
    run: () => ({
      nav: "experience",
      lines: [
        accent("DEPLOYMENT HISTORY"),
        ...EXPERIENCE.map((e) =>
          out(`  ${e.timestamp}  ${e.role} · ${e.org}`),
        ),
        sys("› routing to EXPERIENCE module..."),
      ],
    }),
  },

  contact: {
    describe: "open secure transmission",
    run: () => ({
      nav: "transmit",
      lines: [
        accent("SECURE CHANNEL"),
        out("opening encrypted transmission interface..."),
        sys("› routing to TRANSMIT module..."),
      ],
    }),
  },

  modules: {
    describe: "list system modules",
    run: () => ({
      lines: [
        accent("SYSTEM MODULES"),
        ...NAV_ITEMS.map((n) => out(`  ${n.code}  ${n.label}`)),
      ],
    }),
  },

  sudo: {
    describe: "elevate privileges",
    run: () => ({
      lines: [
        { kind: "error", text: "permission denied: clearance LEVEL 07 insufficient." },
        sys("this incident will be reported."),
      ],
    }),
  },

  clear: {
    describe: "clear the console",
    run: () => ({ lines: [], clear: true }),
  },
};

const ALIASES: Record<string, string> = {
  "?": "help",
  ls: "modules",
  about: "profile",
  ops: "projects",
  cap: "skills",
};

export function runCommand(raw: string): CommandResult {
  const input = raw.trim().toLowerCase();
  if (!input) return { lines: [] };

  const name = ALIASES[input] ?? input;
  const cmd = COMMANDS[name];

  if (!cmd) {
    return {
      lines: [
        { kind: "error", text: `command not found: ${raw.trim()}` },
        sys("type 'help' for available commands."),
      ],
    };
  }
  return cmd.run();
}
