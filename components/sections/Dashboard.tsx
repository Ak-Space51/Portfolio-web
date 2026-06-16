"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { MapPin, Radio, ExternalLink } from "lucide-react";
import {
  attributes,
  missionStats,
  profile,
  techStatus,
} from "@/content/profile";
import { HudSection } from "@/components/hud/HudSection";
import { HudPanel } from "@/components/hud/HudPanel";
import { HoloImage } from "@/components/hud/HoloImage";
import { StatusIndicator } from "@/components/hud/StatusIndicator";
import { Counter } from "@/components/fx/Counter";

export function Dashboard() {
  return (
    <HudSection
      index="01"
      tone="cyan"
      title="OPERATIVE PROFILE"
      subtitle="System overview and live operational metrics."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Profile */}
        <HudPanel
          title="OPERATIVE PROFILE"
          status={profile.availability}
          className="lg:col-span-5"
          glow="active"
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="clip-notch-sm relative h-36 w-full shrink-0 overflow-hidden sm:w-32">
              <HoloImage caption={profile.name} src={profile.avatar || undefined} label="OPERATIVE" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-xl font-bold tracking-wide text-text">
                {profile.name}
              </h3>
              <p className="font-mono text-[0.7rem] uppercase tracking-widest text-accent-active">
                {profile.role}
              </p>
              <div className="mt-3 space-y-1.5 text-xs text-muted">
                <p className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-accent" />
                  {profile.location}
                </p>
                <p className="flex items-center gap-2">
                  <Radio className="h-3.5 w-3.5 text-ok" />
                  STATUS: <span className="text-ok">{profile.availability}</span>
                </p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {profile.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="clip-chip flex items-center gap-1.5 border border-line px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-muted transition-colors hover:border-accent-active hover:text-accent-active"
              >
                {s.label}
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </HudPanel>

        {/* Core Attributes */}
        <HudPanel
          title="CORE ATTRIBUTES"
          status="CALIBRATED"
          className="lg:col-span-4"
          delay={0.05}
        >
          <div className="space-y-3.5">
            {attributes.map((a) => (
              <AttributeBar key={a.label} label={a.label} value={a.value} />
            ))}
          </div>
        </HudPanel>

        {/* Tech Status */}
        <HudPanel
          title="TECH STATUS"
          status="LIVE"
          className="lg:col-span-3"
          delay={0.1}
        >
          <div className="space-y-3.5">
            {techStatus.map((t) => (
              <StatusIndicator
                key={t.label}
                label={t.label}
                value={t.value}
                state={t.state}
              />
            ))}
          </div>
        </HudPanel>

        {/* Mission Summary */}
        <HudPanel
          title="MISSION SUMMARY"
          status="ARCHIVE"
          className="lg:col-span-12"
          delay={0.15}
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {missionStats.map((m) => (
              <div
                key={m.label}
                className="clip-notch-sm border border-line/60 bg-surface/50 p-4 text-center"
              >
                <div className="font-display text-3xl font-bold text-accent-active text-glow-active sm:text-4xl">
                  <Counter to={m.value} suffix={m.suffix} />
                </div>
                <div className="mt-1 hud-label">{m.label}</div>
              </div>
            ))}
          </div>
        </HudPanel>
      </div>
    </HudSection>
  );
}

function AttributeBar({ label, value }: { label: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref}>
      <div className="mb-1 flex items-center justify-between">
        <span className="hud-label text-text">{label}</span>
        <span className="font-mono text-[0.65rem] text-accent-active">
          {value}
        </span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden bg-surface">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-accent-active"
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: reduce ? 0 : 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
