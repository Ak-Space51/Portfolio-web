"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSessionFlag } from "@/lib/hooks/useSessionFlag";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { PROFILE } from "@/lib/data/profile";

const STEPS = [
  "INITIALIZING SYSTEM",
  "LOADING MODULES",
  "ESTABLISHING CONNECTION",
  "AUTHENTICATING USER",
  "ACCESS GRANTED",
];

const STEP_MS = 460;

/**
 * Boot / initialization overlay. Plays once per session (sessionStorage), is
 * skippable (button + ESC), and is bypassed entirely under reduced-motion.
 * Renders above all content and locks scroll while active.
 */
export function BootSequence() {
  const { ready, value: booted, set } = useSessionFlag("boot-complete");
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout);
    set(true);
    setVisible(false);
  }, [set]);

  // Decide whether to run, once we know the session state.
  useEffect(() => {
    if (!ready) return;
    if (booted || reduced) {
      setVisible(false);
      if (reduced) set(true);
      return;
    }
    // Drive the sequence.
    STEPS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStep(i + 1), STEP_MS * (i + 1)));
    });
    timers.current.push(
      setTimeout(finish, STEP_MS * (STEPS.length + 1)),
    );
    return () => timers.current.forEach(clearTimeout);
  }, [ready, booted, reduced, finish, set]);

  // ESC to skip + lock scroll while visible.
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [visible, finish]);

  const progress = Math.min((step / STEPS.length) * 100, 100);
  const done = step >= STEPS.length;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-bg p-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-live="polite"
          aria-label="System initializing"
        >
          {/* grid backdrop */}
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />

          <div className="relative w-full max-w-md">
            {/* header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center bg-accent text-bg">
                  <span className="head text-sm font-black">T</span>
                </span>
                <span className="head text-sm tracking-[0.2em] text-text">
                  TACTICAL<span className="text-accent">/</span>OS
                </span>
              </div>
              <span className="mono text-[10px] text-dim">v2.4.1</span>
            </div>

            {/* log */}
            <div className="hud-panel cut-sm">
              <div className="space-y-2 p-5">
                {STEPS.map((label, i) => {
                  const active = i < step;
                  const isLast = i === STEPS.length - 1;
                  return (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-3"
                      style={{ opacity: active ? 1 : 0.25 }}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`mono text-xs ${
                            active
                              ? isLast
                                ? "text-accent"
                                : "text-text"
                              : "text-dim"
                          }`}
                        >
                          {label}
                        </span>
                      </span>
                      <span
                        className={`mono text-[10px] ${
                          active ? "text-accent" : "text-dim"
                        }`}
                      >
                        {active ? (isLast ? "■" : "OK") : "··"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* progress */}
              <div className="border-t border-edge px-5 py-3">
                <div className="mb-1.5 flex justify-between">
                  <span className="mono text-[10px] text-dim">
                    {done ? "READY" : "LOADING"}
                  </span>
                  <span className="mono text-[10px] text-accent">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-1 w-full overflow-hidden bg-bg ring-1 ring-edge">
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                  />
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="mt-4 flex items-center justify-between">
              <span className="mono text-[10px] text-dim">
                {done ? (
                  <span className="text-accent">
                    WELCOME, {PROFILE.callsign}
                  </span>
                ) : (
                  "authenticating secure session..."
                )}
              </span>
              <button
                type="button"
                onClick={finish}
                autoFocus
                className="head text-[10px] tracking-[0.2em] text-dim underline-offset-4 transition-colors hover:text-accent focus-visible:underline"
              >
                SKIP ▸
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
