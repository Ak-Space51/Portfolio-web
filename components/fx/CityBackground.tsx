"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/nav/ThemeProvider";

/**
 * Landing background — the real cyberpunk city video in both themes.
 * - Dark theme: video as-is.
 * - Light theme: the same video with its colors inverted (a bright, blue-cast
 *   daylight version that fits the white/blue light theme).
 * Reduced motion holds the video paused on its first frame (a still from the
 * mp4). Atmospheric overlays (horizon glow, left vignette, bottom fade) use
 * theme CSS vars so they adapt automatically.
 */
export function CityBackground() {
  const reduce = useReducedMotion();
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const light = theme === "light";

  // When reduced motion is on, hold the video on its first frame.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !reduce) return;
    v.pause();
    try {
      v.currentTime = 0.05;
    } catch {
      /* ignore */
    }
  }, [reduce]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay={!reduce}
        muted
        loop={!reduce}
        playsInline
        preload="auto"
        className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        style={{
          filter: light ? "invert(1) hue-rotate(180deg)" : "none",
          transition: "filter 0.5s ease",
        }}
      >
        <source src="/assets/cyberpunk-city.mp4" type="video/mp4" />
      </video>

      {/* atmospheric overlays (theme-aware via CSS vars) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 18% 12%, rgb(var(--accent-active) / 0.14), transparent 60%), radial-gradient(90% 70% at 88% 55%, rgb(var(--accent) / 0.22), transparent 60%), linear-gradient(180deg, rgb(var(--bg) / 0.55), rgb(var(--bg) / 0.25) 40%, rgb(var(--bg) / 0.65) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0"
        style={{
          top: "48%",
          height: "14%",
          background:
            "linear-gradient(180deg, transparent, rgb(var(--accent) / 0.35), transparent)",
          filter: "blur(10px)",
        }}
      />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-bg/85 via-bg/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
