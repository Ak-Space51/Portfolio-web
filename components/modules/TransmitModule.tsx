"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Module } from "@/components/modules/Module";
import { Panel } from "@/components/hud/Panel";
import { Label } from "@/components/hud/Label";
import { HudButton } from "@/components/hud/HudButton";
import { Reveal } from "@/components/hud/Reveal";
import { panelRevealLeft, panelRevealRight } from "@/lib/motion/variants";
import { PROFILE } from "@/lib/data/profile";
import { cn } from "@/lib/utils/cn";

type Phase = "idle" | "transmitting" | "success";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const TX_LOG = [
  "› establishing secure channel...",
  "› negotiating handshake [AES-256]",
  "› encrypting payload...",
  "› routing through relay nodes...",
  "› transmission acknowledged",
];

export function TransmitModule() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const [logIndex, setLogIndex] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  function validate(): boolean {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Identification required";
    if (!form.email.trim()) next.email = "Return channel required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Invalid channel format";
    if (!form.message.trim()) next.message = "Empty payload";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phase !== "idle") return;
    if (!validate()) return;

    setPhase("transmitting");
    setLogIndex(0);
    // Simulated transmission — step through the log, then resolve to success.
    TX_LOG.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => setLogIndex(i + 1), 260 * (i + 1)),
      );
    });
    timers.current.push(
      setTimeout(() => setPhase("success"), 260 * (TX_LOG.length + 1)),
    );
  }

  function reset() {
    setForm({ name: "", email: "", message: "" });
    setErrors({});
    setPhase("idle");
    setLogIndex(0);
  }

  return (
    <Module
      id="transmit"
      code="06"
      title="Secure Transmission"
      meta="// open an encrypted channel · all fields required"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* Form */}
        <Reveal variants={panelRevealLeft}>
          <Panel label="TRANSMIT" code="TX" brackets active={phase !== "idle"}>
            <div className="relative">
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <Field
                  id="tx-name"
                  label="IDENTIFICATION"
                  placeholder="enter name / callsign"
                  value={form.name}
                  error={errors.name}
                  disabled={phase !== "idle"}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                />
                <Field
                  id="tx-email"
                  label="RETURN CHANNEL"
                  type="email"
                  placeholder="operator@domain.net"
                  value={form.email}
                  error={errors.email}
                  disabled={phase !== "idle"}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                />
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <Label>MESSAGE PAYLOAD</Label>
                    {errors.message && (
                      <span className="mono text-[10px] text-accent">
                        ! {errors.message}
                      </span>
                    )}
                  </div>
                  <textarea
                    id="tx-message"
                    rows={5}
                    value={form.message}
                    disabled={phase !== "idle"}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="compose transmission..."
                    aria-invalid={!!errors.message}
                    className={cn(
                      "w-full resize-none border bg-bg/60 px-3 py-2.5 font-mono text-sm text-text placeholder:text-dim/60 focus:outline-none focus:ring-1",
                      errors.message
                        ? "border-accent focus:ring-accent"
                        : "border-edge focus:border-accent/60 focus:ring-accent/40",
                    )}
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="mono text-[10px] text-dim">
                    ENCRYPTION: <span className="text-accent">AES-256</span>
                  </span>
                  <HudButton type="submit" disabled={phase !== "idle"}>
                    {phase === "idle" ? "TRANSMIT ▸" : "TRANSMITTING..."}
                  </HudButton>
                </div>
              </form>

              {/* Transmission / success overlay */}
              <AnimatePresence>
                {phase !== "idle" && (
                  <motion.div
                    className="absolute inset-0 -m-1 flex flex-col items-center justify-center bg-panel/95 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {phase === "transmitting" && (
                      <div className="w-full max-w-xs">
                        <p className="head mb-3 text-center text-sm text-accent">
                          TRANSMITTING
                        </p>
                        <ul className="space-y-1">
                          {TX_LOG.slice(0, logIndex).map((line, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="mono text-[11px] text-text/80"
                            >
                              {line}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {phase === "success" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                      >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center border-2 border-accent text-accent">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path
                              d="M4 12.5l5 5L20 6.5"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="square"
                            />
                          </svg>
                        </div>
                        <p className="head mt-4 text-lg text-text">
                          TRANSMISSION SENT
                        </p>
                        <p className="mono mt-1 text-xs text-dim">
                          channel closed · response inbound
                        </p>
                        <button
                          type="button"
                          onClick={reset}
                          className="head mt-5 px-3 py-1.5 text-[10px] tracking-widest text-accent ring-1 ring-accent/50 transition-colors hover:bg-accent hover:text-bg"
                        >
                          NEW TRANSMISSION
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Panel>
        </Reveal>

        {/* Direct channels */}
        <Reveal variants={panelRevealRight} className="flex flex-col gap-4">
          <Panel label="DIRECT CHANNELS" code="NET" dense>
            <ul className="space-y-1">
              {PROFILE.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="mono group flex items-center justify-between px-1 py-2 text-xs text-dim transition-colors hover:text-accent"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-edge-bright group-hover:text-accent">
                        ▸
                      </span>
                      {link.label}
                    </span>
                    <span className="opacity-0 transition-opacity group-hover:opacity-100">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel label="CHANNEL STATUS" code="SEC" dense>
            <dl className="space-y-2.5">
              <StatusRow label="ENCRYPTION" value="ACTIVE" ok />
              <StatusRow label="UPLINK" value="STABLE" ok />
              <StatusRow label="RESPONSE ETA" value="< 24H" />
              <StatusRow label="TIMEZONE" value="UTC+05:30" />
            </dl>
          </Panel>
        </Reveal>
      </div>
    </Module>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <Label>
          <label htmlFor={id}>{label}</label>
        </Label>
        {error && (
          <span className="mono text-[10px] text-accent">! {error}</span>
        )}
      </div>
      <input
        id={id}
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full border bg-bg/60 px-3 py-2.5 font-mono text-sm text-text placeholder:text-dim/60 focus:outline-none focus:ring-1",
          error
            ? "border-accent focus:ring-accent"
            : "border-edge focus:border-accent/60 focus:ring-accent/40",
        )}
      />
    </div>
  );
}

function StatusRow({
  label,
  value,
  ok,
}: {
  label: string;
  value: string;
  ok?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <Label>{label}</Label>
      <span className={cn("mono text-[11px]", ok ? "text-accent" : "text-text")}>
        {value}
      </span>
    </div>
  );
}
