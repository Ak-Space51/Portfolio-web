"use client";

import { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import { JournalEntry, JournalStatus } from "@/lib/types";
import { HudButton } from "@/components/hud/HudButton";
import { cn } from "@/lib/utils";

const STATUSES: JournalStatus[] = ["IN PROGRESS", "JOB COMPLETE", "CLASSIFIED"];

interface JournalEditorProps {
  entry: JournalEntry;
  onChange: (patch: Partial<JournalEntry>) => void;
  onClose: () => void;
  onDelete: () => void;
  saveStatus: "idle" | "saving" | "saved";
}

export function JournalEditor({
  entry,
  onChange,
  onClose,
  onDelete,
  saveStatus,
}: JournalEditorProps) {
  const [deletePhase, setDeletePhase] = useState<"idle" | "confirm">("idle");
  const deleteTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Body is stored as string[] (paragraphs); we edit as a single string
  const [bodyText, setBodyText] = useState(entry.body.join("\n\n"));
  const [tagsText, setTagsText] = useState(entry.tags.join(", "));

  // Sync body/tags when entry slug changes (switching entries while editor is open)
  const prevSlug = useRef(entry.slug);
  if (prevSlug.current !== entry.slug) {
    prevSlug.current = entry.slug;
    setBodyText(entry.body.join("\n\n"));
    setTagsText(entry.tags.join(", "));
    setDeletePhase("idle");
  }

  // Keyboard shortcuts: Escape → close, Ctrl/Cmd+S → force-save signal via onClose trick
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function handleDelete() {
    if (deletePhase === "idle") {
      setDeletePhase("confirm");
      deleteTimer.current = setTimeout(() => setDeletePhase("idle"), 3000);
    } else {
      if (deleteTimer.current) clearTimeout(deleteTimer.current);
      onDelete();
    }
  }

  function commitBody(raw: string) {
    setBodyText(raw);
    const paras = raw
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);
    onChange({ body: paras });
  }

  function commitTags(raw: string) {
    setTagsText(raw);
    const tags = raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    onChange({ tags });
  }

  const wordCount = bodyText.trim()
    ? bodyText.trim().split(/\s+/).length
    : 0;

  const saveLabel =
    saveStatus === "saving"
      ? "SAVING..."
      : saveStatus === "saved"
        ? "AUTOSAVED ✓"
        : "";

  return (
    <div className="flex h-full flex-col gap-0 overflow-hidden">
      {/* autosave strip */}
      {saveLabel && (
        <div className="mb-2 flex justify-end">
          <span
            className={cn(
              "font-mono text-[0.6rem] tracking-widest transition-opacity duration-300",
              saveStatus === "saving" ? "text-muted animate-pulse" : "text-accent-active",
            )}
          >
            {saveLabel}
          </span>
        </div>
      )}

      {/* title */}
      <input
        type="text"
        value={entry.title}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder="ENTRY TITLE"
        className="w-full bg-transparent font-display text-xl font-bold uppercase tracking-wide text-text text-glow outline-none placeholder:text-muted/40 caret-[color:var(--accent-active)] border-b border-line/50 pb-2 mb-3"
      />

      {/* meta row */}
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <label className="flex items-center gap-1.5">
          <span className="hud-label text-muted">CAT</span>
          <input
            type="text"
            value={entry.category}
            onChange={(e) => onChange({ category: e.target.value.toUpperCase() })}
            className="w-24 bg-transparent font-mono text-[0.7rem] uppercase tracking-widest text-accent-active outline-none border-b border-line/50 caret-[color:var(--accent-active)] placeholder:text-muted/40"
            placeholder="DEVLOG"
          />
        </label>

        <label className="flex items-center gap-1.5">
          <span className="hud-label text-muted">STATUS</span>
          <select
            value={entry.status}
            onChange={(e) => onChange({ status: e.target.value as JournalStatus })}
            className="bg-bg font-mono text-[0.7rem] uppercase tracking-widest text-text outline-none border-b border-line/50 cursor-pointer"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* tags */}
      <label className="mb-3 flex items-start gap-1.5">
        <span className="hud-label text-muted mt-0.5 shrink-0">TAGS</span>
        <input
          type="text"
          value={tagsText}
          onChange={(e) => commitTags(e.target.value)}
          placeholder="tag1, tag2, tag3"
          className="flex-1 bg-transparent font-mono text-[0.7rem] tracking-widest text-text outline-none border-b border-line/50 caret-[color:var(--accent-active)] placeholder:text-muted/40"
        />
      </label>

      {/* excerpt */}
      <label className="mb-3 flex flex-col gap-1">
        <span className="hud-label text-muted">EXCERPT</span>
        <textarea
          value={entry.excerpt}
          onChange={(e) => onChange({ excerpt: e.target.value })}
          rows={2}
          placeholder="Short summary for the archive preview..."
          className="w-full resize-none bg-transparent font-mono text-[0.7rem] leading-relaxed text-muted outline-none border-b border-line/50 caret-[color:var(--accent-active)] placeholder:text-muted/40"
        />
      </label>

      {/* body — main notepad area */}
      <div className="hud-label text-muted mb-1">BODY</div>
      <textarea
        value={bodyText}
        onChange={(e) => commitBody(e.target.value)}
        placeholder={"## Start writing...\n\nUse ## for section headers. Double blank line = new paragraph."}
        className="min-h-0 flex-1 w-full resize-none bg-transparent font-mono text-sm leading-relaxed text-text outline-none caret-[color:var(--accent-active)] placeholder:text-muted/30 border border-line/30 rounded-none p-2"
      />

      {/* footer */}
      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-[0.6rem] tracking-widest text-muted">
          {wordCount} {wordCount === 1 ? "WORD" : "WORDS"}
        </span>
        <HudButton
          variant="outline"
          icon={<Trash2 className="h-3 w-3" />}
          onClick={handleDelete}
          className={cn(
            "text-[0.65rem] transition-colors",
            deletePhase === "confirm" && "border-accent-active text-accent-active",
          )}
        >
          {deletePhase === "confirm" ? "CONFIRM?" : "DELETE"}
        </HudButton>
      </div>
    </div>
  );
}
