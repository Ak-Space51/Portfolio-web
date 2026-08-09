"use client";

import { motion } from "framer-motion";
import { Module } from "@/components/modules/Module";
import { Panel } from "@/components/hud/Panel";
import { Label } from "@/components/hud/Label";
import { Counter } from "@/components/hud/Counter";
import { HudButton } from "@/components/hud/HudButton";
import { StatusDot } from "@/components/hud/StatusDot";
import { ScanLine } from "@/components/hud/ScanLine";
import { Reticle } from "@/components/hud/Reticle";
import { Divider } from "@/components/hud/Divider";
import { scrollToModule } from "@/lib/utils/navigate";
import { staggerContainer, fadeUp } from "@/lib/motion/variants";
import { useRevealVariants } from "@/lib/hooks/useReducedMotion";
import { PROFILE, SYSTEM_METRICS } from "@/lib/data/profile";

export function HeroModule() {
  const container = useRevealVariants(staggerContainer);
  const item = useRevealVariants(fadeUp);

  return (
    <Module id="dashboard" code="01" title="Dashboard" showHeading={false}>
      <Panel className="cut-lg" brackets>
        <div className="relative overflow-hidden">
          <ScanLine />

          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
          >
            {/* Identity */}
            <div>
              <motion.div variants={item} className="flex items-center gap-3">
                <span className="mono text-xs text-accent">PROFILE ID</span>
                <span className="h-px w-10 bg-accent/50" />
                <span className="mono text-xs text-dim">{PROFILE.serial}</span>
              </motion.div>

              <motion.h1
                variants={item}
                className="mt-4 text-4xl leading-[0.95] text-text sm:text-5xl lg:text-6xl"
              >
                {PROFILE.name}
              </motion.h1>

              <motion.div
                variants={item}
                className="mt-3 flex flex-wrap items-center gap-3"
              >
                <span className="head text-sm tracking-[0.2em] text-accent">
                  {PROFILE.role}
                </span>
                <span className="text-edge-bright">/</span>
                <span className="mono text-xs text-dim">{PROFILE.tagline}</span>
              </motion.div>

              {/* Spec grid */}
              <motion.dl
                variants={item}
                className="mt-7 grid grid-cols-2 gap-px bg-edge/60 sm:grid-cols-4"
              >
                <Spec label="STATUS">
                  <span className="flex items-center gap-1.5">
                    <StatusDot tone="online" />
                    <span className="text-accent">{PROFILE.status}</span>
                  </span>
                </Spec>
                <Spec label="LOCATION">{PROFILE.location}</Spec>
                <Spec label="CLEARANCE">{PROFILE.clearance}</Spec>
                <Spec label="CALLSIGN">{PROFILE.callsign}</Spec>
              </motion.dl>

              <motion.div
                variants={item}
                className="mt-7 flex flex-col gap-3 sm:flex-row"
              >
                <HudButton onClick={() => scrollToModule("profile")}>
                  ENTER SYSTEM
                </HudButton>
                <HudButton
                  variant="ghost"
                  onClick={() => scrollToModule("operations")}
                >
                  VIEW OPERATIONS
                </HudButton>
              </motion.div>
            </div>

            {/* Telemetry card */}
            <motion.div variants={item} className="flex flex-col gap-4">
              <div className="relative flex items-center justify-between border border-edge bg-bg/40 p-4">
                <div>
                  <Label>SYSTEM</Label>
                  <p className="head mt-1 text-lg text-text">OPERATIONAL</p>
                  <p className="mono mt-0.5 text-[10px] text-dim">
                    ALL MODULES NOMINAL
                  </p>
                </div>
                <Reticle size={42} className="text-accent/80" />
              </div>

              <Divider label="METRICS" />

              <div className="grid grid-cols-2 gap-px bg-edge/60">
                {SYSTEM_METRICS.map((m) => (
                  <div key={m.label} className="bg-panel p-3">
                    <Label className="text-[8px]">{m.label}</Label>
                    <div className="mt-1 text-xl text-accent">
                      <Counter
                        value={m.value}
                        decimals={m.display === "%" ? 2 : 0}
                        suffix={m.display}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Panel>
    </Module>
  );
}

function Spec({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-panel px-3 py-2.5">
      <Label className="text-[8px]">{label}</Label>
      <div className="mono mt-1 text-sm text-text">{children}</div>
    </div>
  );
}
