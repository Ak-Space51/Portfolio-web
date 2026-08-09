/**
 * Layered ambient background, fixed behind all content:
 *   1. solid bg (body)   2. technical grid   3. noise texture
 *   4. HUD overlay marks  5. vignette + animated horizon line
 * All understated, all pointer-events-none. Pure / server-rendered.
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Layer 2 — technical grid, masked to fade toward edges */}
      <div
        className="absolute inset-0 bg-grid"
        style={{
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 35%, #000 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 35%, #000 55%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 bg-grid-fine opacity-40"
        style={{
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 30%, #000 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 30%, #000 0%, transparent 80%)",
        }}
      />

      {/* Layer 3 — noise texture */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.04]">
        <filter id="bg-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bg-noise)" />
      </svg>

      {/* Layer 4 — HUD frame marks */}
      <div className="absolute inset-3 hidden md:block">
        <span className="absolute left-0 top-0 h-6 w-6 border-l border-t border-edge/60" />
        <span className="absolute right-0 top-0 h-6 w-6 border-r border-t border-edge/60" />
        <span className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-edge/60" />
        <span className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-edge/60" />
      </div>

      {/* Layer 5 — top accent horizon + vignette */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, transparent 60%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
