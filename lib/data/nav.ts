import type { NavItem } from "@/lib/types";

/**
 * Navigation modules. Labels are intentionally system-flavored rather than
 * conventional ("Home / About / Projects"). Order drives the on-page flow.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "DASHBOARD",
    code: "01",
    describe: "Personnel overview and live system status.",
  },
  {
    id: "profile",
    label: "PROFILE",
    code: "02",
    describe: "Operator dossier and background data.",
  },
  {
    id: "operations",
    label: "OPERATIONS",
    code: "03",
    describe: "Deployed missions — selected engineering projects.",
  },
  {
    id: "capabilities",
    label: "CAPABILITIES",
    code: "04",
    describe: "Diagnostic readout of technical proficiencies.",
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    code: "05",
    describe: "Deployment history and mission log.",
  },
  {
    id: "transmit",
    label: "TRANSMIT",
    code: "06",
    describe: "Open a secure transmission channel.",
  },
];
