"use client";

import {
  Monitor,
  TerminalSquare,
  Layers,
  BarChart3,
  Smartphone,
  Boxes,
} from "lucide-react";
import { Mission } from "@/lib/types";
import { EntryPanel } from "@/components/hud/EntryPanel";
import { cn } from "@/lib/utils";

const STATUS_COLOR: Record<string, string> = {
  DEPLOYED: "text-ok",
  DEPLOYING: "text-accent-active",
  ACTIVE: "text-accent-active",
  COMPLETE: "text-muted",
  ARCHIVED: "text-muted",
};

function typeIcon(type: string) {
  const t = type.toUpperCase();
  if (t.includes("DEVELOPER")) return TerminalSquare;
  if (t.includes("SAAS") || t.includes("PLATFORM")) return Layers;
  if (t.includes("ANALYTICS") || t.includes("ENGINE")) return BarChart3;
  if (t.includes("MOBILE")) return Smartphone;
  if (t.includes("WEB")) return Monitor;
  return Boxes;
}

export function MissionCard({
  mission,
  selected,
  onSelect,
}: {
  mission: Mission;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = typeIcon(mission.type);
  return (
    <EntryPanel
      selected={selected}
      variant="flip"
      data-mission={mission.id}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-pressed={selected}
      icon={
        <span
          className={cn(
            "clip-notch-sm grid h-full w-12 place-items-center border-2 border-accent/70 transition-colors",
            selected && "bg-accent/35",
          )}
        >
          <Icon
            className={cn(
              "h-5 w-5",
              selected ? "text-accent-active mission-sel" : "text-text",
            )}
            strokeWidth={1.5}
          />
        </span>
      }
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-mono text-[0.6rem] tracking-widest text-muted">
          {mission.id}
        </p>
        <span className="font-mono text-[0.55rem] text-muted">
          {mission.year}
        </span>
      </div>
      <h4
        className={cn(
          "truncate font-display text-sm font-bold tracking-wide transition-colors",
          selected ? "text-accent-active mission-sel" : "text-text",
        )}
      >
        {mission.codename}
      </h4>
      <p className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-widest">
        <span className="text-muted">STATUS: </span>
        <span className={STATUS_COLOR[mission.status] ?? "text-muted"}>
          {mission.status}
        </span>
      </p>
    </EntryPanel>
  );
}
