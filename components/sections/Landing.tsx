"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";
import { SectionId } from "@/lib/types";
import { CodeRain } from "@/components/fx/CodeRain";
import { EdgeTicker } from "@/components/fx/EdgeTicker";
import { LandingMenu } from "@/components/nav/LandingMenu";
import { ThemeSwitcher } from "@/components/nav/ThemeSwitcher";

export function Landing({
  onEnter,
  onNavigate,
}: {
  onEnter: () => void;
  onNavigate: (id: SectionId) => void;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Back layer: Effects */}
      <CodeRain className="z-[1]" opacity={0.16} />
      <EdgeTicker side="right" />

      {/* Middle layer: Artwork */}
      {/* Added pointer-events-none so it doesn't block interactions */}
      <div className="pointer-events-none absolute inset-0 z-[5]">
        {/* Shows only in light mode */}
        <img
          src="assets/light_art.PNG"
          alt="Landing Art"
          className="h-full w-full object-cover opacity-100 dark:hidden"
        />
        {/* Shows only in dark mode */}
        <img
          src="assets/dark_art.PNG"
          alt="Landing Art"
          className="hidden h-full w-full object-cover opacity-100 dark:block"
        />
      </div>

      {/* top status bar */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-3 sm:px-8">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted">
          PORTFOLIO OS // V2.0
        </span>
        <ThemeSwitcher />
      </div>

      {/* main menu (Front layer: z-10) */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 sm:pl-24 sm:pr-10 lg:pl-40">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative h-[92vh] max-h-[920px] w-full max-w-[320px]"
        >
          {/* offset outer frame — the raised/taller rectangle in the reference */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-3 bottom-0 left-0 right-0 border border-accent/45"
          />

          {/* full-height red-glass HUD panel */}
          <div
            className="relative h-full border-[3px] border-accent shadow-glow"
            style={{
              background:
                "radial-gradient(120% 55% at 50% 26%, rgb(var(--accent) / 0.45), rgb(var(--accent) / 0.14) 52%, rgb(var(--accent) / 0.04) 100%)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            {/* inner parallel line — gives the double-border edges */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-[6px] border border-accent/35"
            />

            {/* cyan corner brackets */}
            <span className="pointer-events-none absolute -left-[3px] -top-[3px] h-6 w-6 border-l-2 border-t-2 border-accent-active" />
            <span className="pointer-events-none absolute -right-[3px] -top-[3px] h-6 w-6 border-r-2 border-t-2 border-accent-active" />
            <span className="pointer-events-none absolute -bottom-[3px] -left-[3px] h-6 w-6 border-b-2 border-l-2 border-accent-active" />
            <span className="pointer-events-none absolute -bottom-[3px] -right-[3px] h-6 w-6 border-b-2 border-r-2 border-accent-active" />

            {/* menu sits below the overlapping title */}
            <div className="relative flex h-full flex-col px-4 pb-6 pt-56">
              <div className="flex min-h-0 flex-1 flex-col">
                <LandingMenu onEnter={onEnter} onNavigate={onNavigate} />
              </div>
              <div className="mx-1 mt-4 border-t border-accent/30 pt-3">
                <p className="font-mono text-[0.6rem] leading-relaxed text-muted/80">
                  // SYSTEM READY. SELECT A MODULE OR{" "}
                  <span className="text-accent-active">ENTER SYSTEM</span> TO
                  BOOT.
                </p>
              </div>
            </div>
          </div>

          {/* title */}
          <div className="absolute left-1/2 top-6 z-[3] w-max -translate-x-1/2">
            <h1
              className="whitespace-nowrap text-center font-title text-7xl font-bold uppercase leading-none tracking-[0.1em] text-accent sm:text-[8rem]"
              style={{
                textShadow:
                  "3px 3px 0 rgb(var(--accent-active)), 0 0 22px rgb(var(--accent) / 0.4)",
              }}
            >
              {profile.callsign}
            </h1>
            <div className="mt-2 flex items-center gap-3 pl-1">
              <span className="font-mono text-lg tracking-[0.42em] text-accent-active text-glow-active">
                2026
              </span>
              <span className="h-px w-36 bg-accent-active/40" />
            </div>
            <p
              className="mt-2 pl-1 font-mono text-[0.65rem] uppercase tracking-[0.32em] text-muted"
              style={{ color: "rgb(var(--ok) / 0.8)" }}
            >
              {profile.role}
            </p>
          </div>
        </motion.div>
      </div>

      {/* bottom corner HUD */}
      <div className="absolute bottom-4 right-5 z-20 hidden text-right sm:block">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted/70">
          STYLE // CMD-CENTER
        </span>
      </div>
    </div>
  );
}