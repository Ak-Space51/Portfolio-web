"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { JournalEntry } from "@/lib/types";
import { NotchedFrame } from "@/components/hud/NotchedFrame";
import { HudButton } from "@/components/hud/HudButton";
import { JournalArticle } from "./JournalArticle";

const STORAGE_KEY = "pos-journal";

export function JournalArticleClient({
  slug,
  initialEntry,
}: {
  slug: string;
  initialEntry: JournalEntry | null;
}) {
  const [entry, setEntry] = useState<JournalEntry | null>(initialEntry);
  // If we already have a server-known entry, we're resolved immediately.
  const [resolved, setResolved] = useState(initialEntry !== null);

  useEffect(() => {
    // localStorage is the source of truth — overlay/resolve from it on mount.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const entries: JournalEntry[] = JSON.parse(raw);
        const saved = entries.find((e) => e.slug === slug);
        if (saved) {
          setEntry(saved);
          setResolved(true);
          return;
        }
      }
    } catch {}
    setResolved(true);
  }, [slug]);

  if (entry) return <JournalArticle entry={entry} />;
  if (!resolved) return <ArticleStatus title="DECRYPTING ENTRY" sub="// loading from local archive" />;
  return (
    <ArticleStatus
      title="SIGNAL LOST"
      sub="// entry not found in archive"
      showBack
    />
  );
}

function ArticleStatus({
  title,
  sub,
  showBack = false,
}: {
  title: string;
  sub: string;
  showBack?: boolean;
}) {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
      <NotchedFrame glow="accent" className="w-full max-w-md">
        <div className="flex flex-col items-center gap-4 p-8 text-center">
          <h1 className="font-display text-2xl font-bold uppercase tracking-widest text-accent text-glow">
            {title}
          </h1>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {sub}
          </p>
          {showBack && (
            <Link href="/?section=JOURNAL" className="mt-2">
              <HudButton
                variant="outline"
                icon={<ArrowLeft className="h-3.5 w-3.5" />}
              >
                BACK TO ARCHIVE
              </HudButton>
            </Link>
          )}
        </div>
      </NotchedFrame>
    </div>
  );
}
