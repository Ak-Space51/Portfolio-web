"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

// ---- deterministic skyline generation (SSR-safe) -----------------
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

interface B {
  x: number;
  w: number;
  h: number;
  lit: boolean[];
}

function buildings(seed: number, count: number, maxH: number): B[] {
  const r = rng(seed);
  const out: B[] = [];
  let x = -4;
  for (let i = 0; i < count; i++) {
    const w = 3 + Math.floor(r() * 6);
    const h = 12 + Math.floor(r() * maxH);
    const lit = Array.from({ length: 18 }, () => r() > 0.55);
    out.push({ x, w, h, lit });
    x += w + 1 + Math.floor(r() * 2);
  }
  return out;
}

function Skyline({
  seed,
  count,
  maxH,
  fill,
  windows,
  baseline,
}: {
  seed: number;
  count: number;
  maxH: number;
  fill: string;
  windows?: boolean;
  baseline: number;
}) {
  const bs = buildings(seed, count, maxH);
  return (
    <svg
      viewBox="0 0 100 60"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-full w-full"
    >
      {bs.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={baseline - b.h}
            width={b.w}
            height={b.h + 10}
            fill={fill}
          />
          {windows &&
            b.lit.map((on, wi) => {
              if (!on) return null;
              const cols = Math.max(1, Math.floor(b.w / 1.6));
              const cx = b.x + 0.6 + (wi % cols) * 1.3;
              const cy = baseline - b.h + 2 + Math.floor(wi / cols) * 1.6;
              if (cy > baseline - 1) return null;
              return (
                <rect
                  key={wi}
                  x={cx}
                  y={cy}
                  width={0.5}
                  height={0.7}
                  fill="rgb(var(--accent-active))"
                  opacity={0.5 + (wi % 3) * 0.15}
                  className="animate-flicker"
                  style={{ animationDelay: `${(i + wi) % 7}s` }}
                />
              );
            })}
        </g>
      ))}
    </svg>
  );
}

/**
 * Layered cyberpunk skyline with pointer + idle parallax.
 * No video — procedural SVG silhouettes, neon flicker, drifting haze,
 * and a periodic scan sweep. Freezes flat under reduced motion / touch.
 */
export function ParallaxCity() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  const far = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const farY = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const mid = useTransform(sx, [-0.5, 0.5], [26, -26]);
  const midY = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const fore = useTransform(sx, [-0.5, 0.5], [46, -46]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Sky / atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 18%, rgb(var(--accent) / 0.30), transparent 55%), radial-gradient(90% 70% at 18% 30%, rgb(var(--accent-active) / 0.16), transparent 60%), linear-gradient(180deg, rgb(var(--bg)) 0%, rgb(var(--surface)) 60%, rgb(var(--bg)) 100%)",
        }}
      />
      {/* horizon glow */}
      <div
        className="absolute inset-x-0"
        style={{
          top: "42%",
          height: "16%",
          background:
            "linear-gradient(180deg, transparent, rgb(var(--accent) / 0.28), transparent)",
          filter: "blur(8px)",
        }}
      />

      {/* Far skyline */}
      <motion.div
        className="absolute inset-x-[-6%] bottom-0 h-[46%] opacity-50"
        style={{ x: far, y: farY }}
      >
        <Skyline seed={7} count={34} maxH={22} fill="rgb(var(--bg))" baseline={60} />
      </motion.div>

      {/* Mid skyline with lit windows */}
      <motion.div
        className="absolute inset-x-[-8%] bottom-0 h-[62%]"
        style={{ x: mid, y: midY }}
      >
        <Skyline
          seed={21}
          count={22}
          maxH={34}
          fill="rgb(4 5 9)"
          windows
          baseline={60}
        />
      </motion.div>

      {/* Foreground silhouettes */}
      <motion.div
        className="absolute inset-x-[-12%] bottom-0 h-[40%]"
        style={{ x: fore }}
      >
        <Skyline seed={44} count={12} maxH={26} fill="rgb(2 2 5)" baseline={60} />
      </motion.div>

      {/* Drifting haze */}
      <div
        className="absolute inset-0 animate-flicker"
        style={{
          background:
            "linear-gradient(180deg, transparent 50%, rgb(var(--accent) / 0.05) 78%, rgb(var(--bg) / 0.6) 100%)",
        }}
      />

      {/* Scan sweep */}
      {!reduce && (
        <div className="absolute inset-y-0 left-0 w-1/3 animate-sweep bg-gradient-to-r from-transparent via-[rgb(var(--accent-active)/0.07)] to-transparent" />
      )}

      {/* bottom fade into UI */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgb(var(--bg)) 92%)",
        }}
      />
    </div>
  );
}
