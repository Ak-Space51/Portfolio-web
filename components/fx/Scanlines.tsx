"use client";

import { useTheme } from "@/components/nav/ThemeProvider";

/**
 * CRT overlay (dark theme only). The scanline layer is derived from the real
 * CRT glass photo (CRT.jpg -> public/assets/crt-scanlines.webp): dark lines on
 * transparent gaps, plus a rolling refresh bar and an edge vignette. It is
 * disabled in light mode where it hurt readability.
 */
export function Scanlines() {
  const { theme } = useTheme();
  if (theme === "light") return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40">
      {/* real CRT scanlines (dark lines, transparent gaps) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/assets/crt-scanlines.webp)",
          backgroundSize: "100% 100%",
          opacity: 0.54,
        }}
      />
      {/* rolling refresh bar */}
      <div className="absolute inset-x-0 top-0 h-1/3 motion-safe:animate-[crt-roll_7s_linear_infinite]">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
      </div>
      {/* vignette / screen curvature */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 50%, transparent 62%, rgb(0 0 0 / 0.45) 100%)",
        }}
      />
    </div>
  );
}
