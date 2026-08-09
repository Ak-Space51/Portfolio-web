/**
 * Targeting reticle SVG — decorative HUD marker. Replaceable via a Figma export
 * placed at public/hud/reticle.svg if a custom asset is preferred.
 */
export function Reticle({
  size = 26,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden
      className={className}
    >
      <circle cx="13" cy="13" r="8" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <circle cx="13" cy="13" r="1.5" fill="currentColor" />
      <path d="M13 0v5M13 21v5M0 13h5M21 13h5" stroke="currentColor" strokeWidth="1" />
      <path
        d="M3 3h3M20 3h3M3 23h3M20 23h3M3 3v3M23 3v3M3 20v3M23 20v3"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}
