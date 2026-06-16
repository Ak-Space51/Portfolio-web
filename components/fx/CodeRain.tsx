"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const GLYPHS =
  "01ｱｲｳｴｵｶｷｸ<>/\\[]{}=+*#ABCDEF0123456789アカサ:;.".split("");

/**
 * Canvas Matrix-style "code rain" of faint mono glyphs.
 * Defaults to a fixed full-screen layer. Honors prefers-reduced-motion
 * (renders a single static frame instead of animating).
 */
export function CodeRain({
  className,
  opacity = 0.12,
}: {
  className?: string;
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let drops: number[] = [];
    const fontSize = 14;
    let columns = 0;

    const accent = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-active")
        .trim() || "38 222 238";

    function resize() {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(w / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * h) / fontSize),
      );
    }

    let last = 0;
    const STEP_MS = 95; // time per row — higher = slower rain

    function frame(now?: number) {
      raf = requestAnimationFrame(frame);
      // throttle the fall to STEP_MS regardless of refresh rate
      if (now && now - last < STEP_MS) return;
      last = now ?? 0;
      if (!canvas || !ctx) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w / 2;
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(0,0,0,0.085)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px var(--font-jetbrains), monospace`;
      const color = accent();
      for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        // keep the rain to the sides — fade columns out toward the centre
        const d = Math.abs(x + fontSize / 2 - cx) / cx;
        const weight = Math.max(0, Math.min(1, (d - 0.42) / 0.4));
        if (weight <= 0) continue;
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const y = drops[i] * fontSize;
        ctx.globalAlpha = weight;
        // trailing glyph in the theme colour
        ctx.fillStyle = `rgb(${color})`;
        ctx.fillText(char, x, y);
        // bright leading head so the streams read clearly
        ctx.fillStyle = "rgba(225, 255, 255, 0.85)";
        ctx.fillText(char, x, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      ctx.globalAlpha = 1;
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduce) {
      // one static pass
      frame();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ opacity }}
    />
  );
}
