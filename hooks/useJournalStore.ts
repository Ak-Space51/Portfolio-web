"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { journalEntries as defaults } from "@/content/journal";
import { JournalEntry } from "@/lib/types";

type SaveStatus = "idle" | "saving" | "saved";

const STORAGE_KEY = "pos-journal";
const SAVING_FLASH = 400;
const SAVED_LINGER = 2500;

function load(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as JournalEntry[];
  } catch {}
  return defaults;
}

function persist(entries: JournalEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {}
}

export function useJournalStore() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  // ref so forceSync always sees latest entries without re-binding
  const entriesRef = useRef<JournalEntry[]>([]);
  entriesRef.current = entries;

  const savingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setEntries(load());
    // Clear pending status timers on unmount (data is already persisted).
    return () => {
      if (savingTimer.current) clearTimeout(savingTimer.current);
      if (savedTimer.current) clearTimeout(savedTimer.current);
    };
  }, []);

  // Persist happens immediately on every mutation (see save()); this only drives
  // the visual SAVING -> AUTOSAVED -> idle indicator so nothing is ever lost on
  // unmount / section switch / reload.
  const flashSaved = useCallback(() => {
    setSaveStatus("saving");
    if (savingTimer.current) clearTimeout(savingTimer.current);
    if (savedTimer.current) clearTimeout(savedTimer.current);
    savingTimer.current = setTimeout(() => {
      setSaveStatus("saved");
      savedTimer.current = setTimeout(() => setSaveStatus("idle"), SAVED_LINGER);
    }, SAVING_FLASH);
  }, []);

  // Persist the given entries synchronously, then run the visual indicator.
  const save = useCallback(
    (next: JournalEntry[]) => {
      persist(next);
      flashSaved();
    },
    [flashSaved],
  );

  const forceSync = useCallback(() => {
    persist(entriesRef.current);
    if (savingTimer.current) clearTimeout(savingTimer.current);
    if (savedTimer.current) clearTimeout(savedTimer.current);
    setSaveStatus("saved");
    savedTimer.current = setTimeout(() => setSaveStatus("idle"), SAVED_LINGER);
  }, []);

  const create = useCallback((): JournalEntry => {
    const now = new Date().toISOString();
    const slug = `entry-${Date.now()}`;
    const entry: JournalEntry = {
      slug,
      title: "",
      code: "SID: NEW-ENTRY",
      category: "DEVLOG",
      date: now,
      status: "IN PROGRESS",
      excerpt: "",
      cover: "New entry",
      tags: [],
      body: [],
    };
    const next = [entry, ...entriesRef.current];
    setEntries(next);
    save(next);
    return entry;
  }, [save]);

  const update = useCallback(
    (slug: string, patch: Partial<JournalEntry>) => {
      const next = entriesRef.current.map((e) =>
        e.slug === slug ? { ...e, ...patch } : e,
      );
      setEntries(next);
      save(next);
    },
    [save],
  );

  const remove = useCallback((slug: string) => {
    const next = entriesRef.current.filter((e) => e.slug !== slug);
    setEntries(next);
    persist(next);
  }, []);

  return { entries, saveStatus, create, update, remove, forceSync };
}
