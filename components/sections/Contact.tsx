"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { profile } from "@/content/profile";
import { HudSection } from "@/components/hud/HudSection";
import { TerminalWindow } from "@/components/hud/TerminalWindow";
import { HudInput } from "@/components/hud/HudInput";
import { HudButton } from "@/components/hud/HudButton";
import { NotchedFrame } from "@/components/hud/NotchedFrame";

type Phase = "idle" | "encrypting" | "transmitting" | "delivered";

const SEQUENCE: { phase: Phase; label: string; ms: number }[] = [
  { phase: "encrypting", label: "ENCRYPTING…", ms: 1100 },
  { phase: "transmitting", label: "TRANSMITTING…", ms: 1100 },
  { phase: "delivered", label: "DELIVERED", ms: 0 },
];

export function Contact() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [form, setForm] = useState({
    identifier: "",
    message: "",
    priority: "STANDARD",
  });

  const sending = phase === "encrypting" || phase === "transmitting";

  const runSequence = () => {
    let acc = 0;
    SEQUENCE.forEach((step) => {
      setTimeout(() => setPhase(step.phase), acc);
      acc += step.ms;
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    runSequence();
    // NOTE: wire a real handler here (fetch to an API route / form service).
  };

  const reset = () => {
    setPhase("idle");
    setForm({ identifier: "", message: "", priority: "STANDARD" });
  };

  return (
    <HudSection
      index="07"
      tone="cyan"
      title="TRANSMISSION"
      subtitle="Open a secure channel. Messages are encrypted before transmit."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <TerminalWindow title="TRANSMISSION" path="~/comms/uplink">
            <AnimatePresence mode="wait">
              {phase === "delivered" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-3 py-10 text-center"
                >
                  <CheckCircle2 className="h-12 w-12 text-ok" />
                  <p className="font-display text-xl font-bold tracking-wide text-ok">
                    TRANSMISSION DELIVERED
                  </p>
                  <p className="max-w-sm text-sm text-muted">
                    Your message has been encrypted and routed to the operative.
                    Expect a response on this channel shortly.
                  </p>
                  <HudButton variant="outline" onClick={reset} className="mt-2">
                    NEW TRANSMISSION
                  </HudButton>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <HudInput
                    label="IDENTIFIER"
                    placeholder="callsign / email"
                    required
                    value={form.identifier}
                    disabled={sending}
                    onChange={(e) =>
                      setForm({ ...form, identifier: e.target.value })
                    }
                  />
                  <HudInput
                    as="textarea"
                    label="MESSAGE"
                    placeholder="compose your transmission…"
                    required
                    value={form.message}
                    disabled={sending}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                  <HudInput
                    as="select"
                    label="PRIORITY"
                    options={["STANDARD", "ELEVATED", "URGENT", "CLASSIFIED"]}
                    value={form.priority}
                    disabled={sending}
                    onChange={(e) =>
                      setForm({ ...form, priority: e.target.value })
                    }
                  />

                  <div className="flex items-center gap-4 pt-1">
                    <HudButton
                      type="submit"
                      variant="solid"
                      disabled={sending}
                      icon={
                        sending ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Send className="h-3.5 w-3.5" />
                        )
                      }
                    >
                      {sending ? "SENDING" : "TRANSMIT"}
                    </HudButton>

                    <AnimatePresence>
                      {sending && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="font-mono text-[0.7rem] uppercase tracking-widest text-accent-active"
                        >
                          {phase === "encrypting"
                            ? "ENCRYPTING…"
                            : "TRANSMITTING…"}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </TerminalWindow>
        </div>

        {/* channel info */}
        <div className="lg:col-span-5">
          <NotchedFrame className="h-full">
            <div className="flex h-full flex-col p-5">
              <span className="hud-label mb-3 block">// DIRECT CHANNELS</span>
              <div className="space-y-2.5">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between border-b border-line/50 py-2 transition-colors hover:border-accent-active"
                  >
                    <span className="font-mono text-xs uppercase tracking-widest text-muted group-hover:text-accent-active">
                      {s.label}
                    </span>
                    <span className="font-mono text-[0.6rem] text-accent">
                      → OPEN
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-auto pt-5">
                <div className="clip-notch-sm border border-line/60 bg-surface/40 p-3">
                  <p className="font-mono text-[0.65rem] leading-relaxed text-muted">
                    <span className="text-ok">●</span> CHANNEL STATUS: SECURE
                    <br />
                    <span className="text-accent-active">●</span> AVAILABILITY:{" "}
                    {profile.availability}
                    <br />
                    <span className="text-accent">●</span> RESPONSE: &lt; 24H
                  </p>
                </div>
              </div>
            </div>
          </NotchedFrame>
        </div>
      </div>
    </HudSection>
  );
}
