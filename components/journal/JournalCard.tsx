"use client";

import { JournalEntry } from "@/lib/types";
import { EntryPanel } from "@/components/hud/EntryPanel";
import { formatDate, cn } from "@/lib/utils";

export function JournalCard({
  entry,
  selected,
  onSelect,
}: {
  entry: JournalEntry;
  selected: boolean;
  onSelect: () => void;
}) {
  const done = entry.status === "JOB COMPLETE";

  return (
    <EntryPanel
      selected={selected}
      data-slug={entry.slug}
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
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/assets/icon.svg"
          alt=""
          aria-hidden
          className="journal-card-icon h-full w-auto"
        />
      }
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate font-mono text-[0.55rem] tracking-widest text-muted">
          {entry.code}
        </span>
        <span className="shrink-0 font-mono text-[0.55rem] text-muted">
          {formatDate(entry.date)}
        </span>
      </div>
      <h4
        className={cn(
          "mt-0.5 truncate font-display text-xs font-bold uppercase leading-tight tracking-wide transition-colors",
          selected ? "text-accent-active" : "text-text",
        )}
      >
        {entry.title}
      </h4>
      <div className="mt-1 flex items-center gap-2">
        <span className="clip-chip border border-line/60 px-1.5 py-0.5 font-mono text-[0.5rem] uppercase tracking-widest text-muted">
          {entry.category}
        </span>
        <span
          className={cn(
            "font-mono text-[0.5rem] uppercase tracking-widest",
            done ? "text-ok" : "text-accent-active",
          )}
        >
          {entry.status}
        </span>
      </div>
    </EntryPanel>
  );
}
