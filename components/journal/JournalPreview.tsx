"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Pencil, Tag } from "lucide-react";
import { JournalEntry } from "@/lib/types";
import { HoloImage } from "@/components/hud/HoloImage";
import { HudButton } from "@/components/hud/HudButton";
import { formatDate, readingTime } from "@/lib/utils";

export function JournalPreview({
  entry,
  onRead,
  onEdit,
}: {
  entry: JournalEntry;
  onRead: (slug: string) => void;
  onEdit: () => void;
}) {
  return (
    <motion.div
      key={entry.slug}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35 }}
      className="flex h-full flex-col"
    >
      <div className="clip-notch-sm relative aspect-[16/7] w-full overflow-hidden border border-line/60">
        <HoloImage caption={entry.cover} label="ENTRY COVER" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-muted">
        <span className="clip-chip border border-accent-active/50 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-accent-active">
          {entry.category || "UNCATEGORIZED"}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[0.6rem] tracking-widest">
          <Calendar className="h-3 w-3" /> {formatDate(entry.date)}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[0.6rem] tracking-widest">
          <Tag className="h-3 w-3" /> {readingTime(entry.body.join(" "))} MIN
        </span>
      </div>

      <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-wide text-text text-glow sm:text-2xl">
        {entry.title || "UNTITLED ENTRY"}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {entry.excerpt || "No excerpt yet. Click EDIT to start writing."}
      </p>

      <div className="mt-4 flex items-center gap-3">
        <HudButton
          variant="solid"
          icon={<ArrowRight className="h-3.5 w-3.5" />}
          onClick={() => onRead(entry.slug)}
        >
          READ MORE
        </HudButton>
        <HudButton
          variant="outline"
          icon={<Pencil className="h-3.5 w-3.5" />}
          onClick={onEdit}
        >
          EDIT
        </HudButton>
      </div>
    </motion.div>
  );
}
