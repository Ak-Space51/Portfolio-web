"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { SectionId } from "@/lib/types";
import { SECTIONS, stepSection } from "@/lib/nav";
import { isEditable } from "@/lib/utils";
import { Landing } from "@/components/sections/Landing";
import { HudNav } from "@/components/nav/HudNav";
import { Dashboard } from "@/components/sections/Dashboard";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Visuals } from "@/components/sections/Visuals";
import { Journal } from "@/components/sections/Journal";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { CodeRain } from "@/components/fx/CodeRain";
import { EdgeTicker } from "@/components/fx/EdgeTicker";
import { CityBackground } from "@/components/fx/CityBackground";

const SECTION_COMPONENTS: Record<SectionId, React.ComponentType> = {
  PROFILE: Dashboard,
  SKILLS: Skills,
  PROJECTS: Projects,
  VISUALS: Visuals,
  JOURNAL: Journal,
  EXPERIENCE: Experience,
  CONTACT: Contact,
};

function isSection(v: string | null): v is SectionId {
  return !!v && SECTIONS.some((s) => s.id === v);
}

export function OSApp() {
  const params = useSearchParams();
  const initialSection = params.get("section");

  const [booted, setBooted] = useState(false);
  const [active, setActive] = useState<SectionId>("PROFILE");

  // Deep-return from /journal/[slug] -> ?section=JOURNAL boots straight in.
  useEffect(() => {
    if (isSection(initialSection)) {
      setActive(initialSection);
      setBooted(true);
    }
  }, [initialSection]);

  const enter = (section: SectionId = "PROFILE") => {
    setActive(section);
    setBooted(true);
  };

  const navigate = (section: SectionId) => {
    setActive(section);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Latest active section, read by the key handler (avoids stale-closure /
  // listener re-attachment on every section change).
  const activeRef = useRef(active);
  activeRef.current = active;

  // Global arrow-key section nav (dashboard only). Left/Right cycle sections,
  // Home/End jump to the ends. Up/Down are left to the list sections.
  useEffect(() => {
    if (!booted) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
      if (isEditable(document.activeElement)) return;
      switch (e.key) {
        case "ArrowLeft":
          navigate(stepSection(activeRef.current, -1));
          break;
        case "ArrowRight":
          navigate(stepSection(activeRef.current, 1));
          break;
        case "Home":
          navigate(SECTIONS[0].id);
          break;
        case "End":
          navigate(SECTIONS[SECTIONS.length - 1].id);
          break;
        default:
          return;
      }
      e.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [booted]);

  const Active = SECTION_COMPONENTS[active];

  return (
    <div className="relative min-h-screen">
      {/* persistent cyberpunk city background on every page */}
      <div className="fixed inset-0 z-0">
        <CityBackground />
      </div>

      <AnimatePresence mode="wait">
        {!booted ? (
          <motion.div
            key="landing"
            exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <Landing onEnter={() => enter("PROFILE")} onNavigate={enter} />
          </motion.div>
        ) : (
          <motion.div
            key="os"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex min-h-screen flex-col"
          >
            {/* scrim keeps dashboard content readable over the live background */}
            <div aria-hidden className="fixed inset-0 z-0 bg-bg/[0.66]" />

            {/* ambient FX behind the dashboard */}
            <CodeRain className="fixed inset-0 z-0" opacity={0.13} />
          <EdgeTicker side="left" />
          <EdgeTicker side="right" />

          <HudNav
            active={active}
            onNavigate={navigate}
            onHome={() => setBooted(false)}
          />

          <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Active />
              </motion.div>
            </AnimatePresence>
          </main>

          <footer className="relative z-10 border-t border-line/60 px-6 py-5">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted">
                AK SPACE // PORTFOLIO OS v2.0
              </span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted">
                ◄ ► SECTIONS · ▲ ▼ LIST · ENTER OPEN
              </span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted">
                © 2026 — ALL SYSTEMS NOMINAL
              </span>
            </div>
          </footer>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
