"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Pencil, Plus } from "lucide-react";
import { isEditable } from "@/lib/utils";
import { useJournalStore } from "@/hooks/useJournalStore";
import { HudSection } from "@/components/hud/HudSection";
import { HudSidebar } from "@/components/hud/HudSidebar";
import { HudButton } from "@/components/hud/HudButton";
import { NotchedFrame } from "@/components/hud/NotchedFrame";
import { JournalCard } from "@/components/journal/JournalCard";
import { JournalPreview } from "@/components/journal/JournalPreview";
import { JournalEditor } from "@/components/journal/JournalEditor";

export function Journal() {
  const router = useRouter();
  const { entries, saveStatus, create, update, remove, forceSync } = useJournalStore();
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [editMode, setEditMode] = useState(false);

  // Initialise selection once entries load from localStorage
  useEffect(() => {
    if (entries.length > 0 && !selectedSlug) {
      setSelectedSlug(entries[0].slug);
    }
  }, [entries, selectedSlug]);

  const selected = entries.find((e) => e.slug === selectedSlug) ?? entries[0];

  const openEntry = (slug: string) => router.push(`/journal/${slug}`);

  const selectedRef = useRef(selectedSlug);
  selectedRef.current = selectedSlug;
  const editModeRef = useRef(editMode);
  editModeRef.current = editMode;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (editModeRef.current) return; // let editor handle keys
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
      if (isEditable(document.activeElement)) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const es = entries;
        const i = es.findIndex((x) => x.slug === selectedRef.current);
        const n = es.length;
        if (n === 0) return;
        const delta = e.key === "ArrowDown" ? 1 : -1;
        const next = es[(i + delta + n) % n];
        setSelectedSlug(next.slug);
        requestAnimationFrame(() =>
          document
            .querySelector(`[data-slug="${next.slug}"]`)
            ?.scrollIntoView({ block: "nearest" }),
        );
      } else if (e.key === "Enter") {
        const tag = document.activeElement?.tagName;
        if (tag === "BUTTON" || tag === "A") return;
        e.preventDefault();
        openEntry(selectedRef.current);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);

  function handleNewEntry() {
    const e = create();
    setSelectedSlug(e.slug);
    setEditMode(true);
  }

  function handleDelete() {
    remove(selected.slug);
    setEditMode(false);
    // Select the next available entry
    const remaining = entries.filter((e) => e.slug !== selected.slug);
    setSelectedSlug(remaining[0]?.slug ?? "");
  }

  function handleCloseEditor() {
    forceSync();
    setEditMode(false);
  }

  const saveLabel =
    saveStatus === "saving"
      ? "SAVING..."
      : saveStatus === "saved"
        ? "AUTOSAVED ✓"
        : editMode
          ? "EDITING"
          : "READ-ONLY";

  if (!selected) return null;

  return (
    <HudSection
      index="05"
      tone="red"
      title="ARCHIVE // JOURNAL"
      subtitle="Mission logs, devlogs and research from the field."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-1 lg:h-[560px]">
        {/* archive list */}
        <div className="lg:col-span-6 xl:col-span-5 h-full">
          <HudSidebar
            title="COMPLETED"
            status={`${entries.length} LOGS`}
            className="h-full"
            footer={
              <HudButton
                variant="outline"
                icon={<Plus className="h-3 w-3" />}
                onClick={handleNewEntry}
                className="w-full justify-center"
              >
                NEW ENTRY
              </HudButton>
            }
          >
            {entries.map((e) => (
              <JournalCard
                key={e.slug}
                entry={e}
                selected={e.slug === selectedSlug}
                onSelect={() => {
                  setSelectedSlug(e.slug);
                  if (editMode) setEditMode(false);
                }}
              />
            ))}
          </HudSidebar>
        </div>

        {/* preview / editor */}
        <div className="lg:col-span-6 xl:col-span-7 h-full">
          <NotchedFrame glow="accent" fillClassName="bg-panel/95" className="h-full">
            <div className="flex items-center justify-between border-b border-line/70 px-4 py-2.5">
              <span className="hud-label text-text">
                {editMode ? "ENTRY EDITOR" : "ENTRY PREVIEW"}
              </span>
              <div className="flex items-center gap-3">
                <span
                  className={
                    saveStatus === "saving"
                      ? "hud-label text-muted animate-pulse"
                      : saveStatus === "saved" && editMode
                        ? "hud-label text-accent-active"
                        : "hud-label text-muted"
                  }
                >
                  {saveLabel}
                </span>
                {!editMode && (
                  <HudButton
                    variant="ghost"
                    icon={<Pencil className="h-3 w-3" />}
                    onClick={() => setEditMode(true)}
                    className="py-1 px-2"
                  >
                    EDIT
                  </HudButton>
                )}
              </div>
            </div>
            <div className="flex flex-col p-4 sm:p-5" style={{ height: "calc(100% - 45px)" }}>
              {editMode ? (
                <JournalEditor
                  key={selected.slug}
                  entry={selected}
                  onChange={(patch) => update(selected.slug, patch)}
                  onClose={handleCloseEditor}
                  onDelete={handleDelete}
                  saveStatus={saveStatus}
                />
              ) : (
                <AnimatePresence mode="wait">
                  <JournalPreview
                    key={selected.slug}
                    entry={selected}
                    onRead={openEntry}
                    onEdit={() => setEditMode(true)}
                  />
                </AnimatePresence>
              )}
            </div>
          </NotchedFrame>
        </div>
      </div>
    </HudSection>
  );
}
