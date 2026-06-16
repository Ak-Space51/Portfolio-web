"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories } from "@/content/skills";
import { cn } from "@/lib/utils";

const SIZE = 320;
const C = SIZE / 2;
const R = 120;

function point(i: number, n: number, value: number) {
  const angle = (-90 + (360 / n) * i) * (Math.PI / 180);
  const r = (R * value) / 100;
  return { x: C + r * Math.cos(angle), y: C + r * Math.sin(angle) };
}

/** Interactive capability radar + category breakdown. */
export function SkillMatrix() {
  const n = skillCategories.length;
  const [hover, setHover] = useState<string | null>(null);
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const dataPoints = skillCategories.map((s, i) =>
    point(i, n, s.proficiency),
  );
  const polygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Radar */}
      <div className="flex items-center justify-center">
        <svg
          ref={ref}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-auto w-full max-w-sm"
          role="img"
          aria-label="Skills radar chart"
        >
          {/* rings */}
          {rings.map((rr, ri) => (
            <polygon
              key={ri}
              points={skillCategories
                .map((_, i) => {
                  const p = point(i, n, rr * 100);
                  return `${p.x},${p.y}`;
                })
                .join(" ")}
              fill="none"
              stroke="rgb(var(--line))"
              strokeOpacity={0.4}
              strokeWidth={1}
            />
          ))}
          {/* axes + labels */}
          {skillCategories.map((s, i) => {
            const edge = point(i, n, 100);
            const lbl = point(i, n, 122);
            const active = hover === s.id;
            return (
              <g key={s.id}>
                <line
                  x1={C}
                  y1={C}
                  x2={edge.x}
                  y2={edge.y}
                  stroke="rgb(var(--line))"
                  strokeOpacity={0.4}
                />
                <text
                  x={lbl.x}
                  y={lbl.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={cn(
                    "font-mono uppercase transition-colors",
                    active ? "fill-accent-active" : "fill-muted",
                  )}
                  style={{ fontSize: 8, letterSpacing: "0.1em" }}
                >
                  {s.label}
                </text>
              </g>
            );
          })}
          {/* data polygon */}
          <motion.polygon
            points={polygon}
            fill="rgb(var(--accent) / 0.18)"
            stroke="rgb(var(--accent-active))"
            strokeWidth={1.5}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "center" }}
          />
          {/* vertices */}
          {dataPoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={hover === skillCategories[i].id ? 4 : 2.5}
              className="fill-accent-active transition-all"
            />
          ))}
        </svg>
      </div>

      {/* Category list */}
      <div className="space-y-2.5">
        {skillCategories.map((s, i) => (
          <motion.div
            key={s.id}
            onMouseEnter={() => setHover(s.id)}
            onMouseLeave={() => setHover(null)}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "clip-notch-sm border bg-surface/40 p-3 transition-colors",
              hover === s.id
                ? "border-accent-active bg-surface/70"
                : "border-line/60",
            )}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="hud-label text-text">{s.label}</span>
              <span className="font-mono text-[0.65rem] text-accent-active">
                {s.proficiency}%
              </span>
            </div>
            <div className="relative mb-2 h-1 w-full overflow-hidden bg-bg">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent-active"
                initial={{ width: 0 }}
                whileInView={{ width: `${s.proficiency}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.05 }}
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {s.technologies.map((t) => (
                <span
                  key={t}
                  className="clip-chip border border-line/60 px-1.5 py-0.5 font-mono text-[0.6rem] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
            {s.learning && s.learning.length > 0 && (
              <p className="mt-2 font-mono text-[0.6rem] text-muted/80">
                <span className="text-accent">LEARNING:</span>{" "}
                {s.learning.join(", ")}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
