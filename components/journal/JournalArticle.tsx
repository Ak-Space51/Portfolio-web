"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Hash,
  Share2,
  Twitter,
  Linkedin,
  Link2,
} from "lucide-react";
import { JournalEntry } from "@/lib/types";
import { HoloImage } from "@/components/hud/HoloImage";
import { NotchedFrame } from "@/components/hud/NotchedFrame";
import { CodeRain } from "@/components/fx/CodeRain";
import { EdgeTicker } from "@/components/fx/EdgeTicker";
import { ThemeSwitcher } from "@/components/nav/ThemeSwitcher";
import { formatDate, readingTime, isEditable } from "@/lib/utils";

export function JournalArticle({ entry }: { entry: JournalEntry }) {
  const router = useRouter();
  const minutes = readingTime(entry.body.join(" "));

  // Left arrow / Escape returns to the archive (mirrors the BACK link).
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
      if (isEditable(document.activeElement)) return;
      if (e.key === "ArrowLeft" || e.key === "Escape") {
        e.preventDefault();
        router.push("/?section=JOURNAL");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  const share = (network: "x" | "linkedin" | "copy") => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    const text = encodeURIComponent(entry.title);
    if (network === "x") {
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
        "_blank",
      );
    } else if (network === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        "_blank",
      );
    } else {
      navigator.clipboard?.writeText(url);
    }
  };

  return (
    <div data-tone="red" className="relative min-h-screen">
      <CodeRain className="fixed inset-0 z-0" opacity={0.11} />
      <EdgeTicker side="left" />

      {/* top bar */}
      <header className="sticky top-0 z-30 border-b border-line/60 bg-bg/85 px-4 py-3 backdrop-blur-sm sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/?section=JOURNAL"
            className="group flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-muted transition-colors hover:text-accent-active"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            BACK TO ARCHIVE
          </Link>
          <ThemeSwitcher />
        </div>
      </header>

      <main className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-12">
        {/* article */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-8"
        >
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-accent">
            {entry.code}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold uppercase leading-tight tracking-wide text-text text-glow sm:text-4xl">
            {entry.title}
          </h1>

          <div className="clip-notch-sm relative mt-5 aspect-[16/8] w-full overflow-hidden border border-line/60">
            <HoloImage caption={entry.cover} label="COVER FEED" />
          </div>

          <div className="prose-hud mt-6 space-y-4">
            {entry.body.map((block, i) =>
              block.startsWith("## ") ? (
                <h2
                  key={i}
                  className="flex items-center gap-2 pt-2 font-display text-lg font-bold uppercase tracking-wide text-accent-active"
                >
                  <span className="h-3 w-1 bg-accent" />
                  {block.replace(/^##\s+/, "")}
                </h2>
              ) : (
                <p key={i} className="text-[0.95rem] leading-relaxed text-muted">
                  {renderInline(block)}
                </p>
              ),
            )}
          </div>
        </motion.article>

        {/* sidebar: ENTRY INFO */}
        <motion.aside
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-4"
        >
          <NotchedFrame glow="active" className="lg:sticky lg:top-20">
            <div className="border-b border-line/70 px-4 py-2.5">
              <span className="hud-label text-text">ENTRY INFO</span>
            </div>
            <div className="space-y-4 p-4">
              <InfoRow icon={<Hash className="h-3.5 w-3.5" />} label="CATEGORY">
                <span className="clip-chip border border-accent-active/50 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-accent-active">
                  {entry.category}
                </span>
              </InfoRow>

              <InfoRow
                icon={<Calendar className="h-3.5 w-3.5" />}
                label="DATE"
              >
                <span className="font-mono text-xs text-text">
                  {formatDate(entry.date)}
                </span>
              </InfoRow>

              <InfoRow icon={<Clock className="h-3.5 w-3.5" />} label="READ TIME">
                <span className="font-mono text-xs text-text">
                  {minutes} MIN
                </span>
              </InfoRow>

              <div>
                <span className="hud-label mb-2 block">// TAGS</span>
                <div className="flex flex-wrap gap-1.5">
                  {entry.tags.map((t) => (
                    <span
                      key={t}
                      className="clip-chip border border-line/60 px-1.5 py-0.5 font-mono text-[0.6rem] text-muted"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="hud-label mb-2 flex items-center gap-1.5">
                  <Share2 className="h-3 w-3" /> // SHARE
                </span>
                <div className="flex gap-2">
                  <ShareBtn onClick={() => share("x")} label="Share on X">
                    <Twitter className="h-4 w-4" />
                  </ShareBtn>
                  <ShareBtn
                    onClick={() => share("linkedin")}
                    label="Share on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </ShareBtn>
                  <ShareBtn onClick={() => share("copy")} label="Copy link">
                    <Link2 className="h-4 w-4" />
                  </ShareBtn>
                </div>
              </div>
            </div>
          </NotchedFrame>
        </motion.aside>
      </main>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line/40 pb-3">
      <span className="flex items-center gap-2 hud-label">
        <span className="text-accent">{icon}</span>
        {label}
      </span>
      {children}
    </div>
  );
}

function ShareBtn({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="clip-chip grid h-9 w-9 place-items-center border border-line text-muted transition-colors hover:border-accent-active hover:text-accent-active focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-active"
    >
      {children}
    </button>
  );
}

/** Render **bold** and *italic* inline markers. */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={i} className="text-text">
          {p.slice(2, -2)}
        </strong>
      );
    }
    if (p.startsWith("*") && p.endsWith("*")) {
      return (
        <em key={i} className="text-accent-active">
          {p.slice(1, -1)}
        </em>
      );
    }
    return p;
  });
}
