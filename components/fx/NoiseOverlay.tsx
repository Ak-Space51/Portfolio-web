"use client";

/** Very low-opacity film-grain noise across the whole OS. */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="bg-noise pointer-events-none fixed inset-0 z-30 opacity-[0.035]"
    />
  );
}
