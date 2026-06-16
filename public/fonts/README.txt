SDDystopianDemo — main title font (the "AK SPACE" logo look)
============================================================

ACTIVE FILE: Sddystopiandemo-GO7xa.otf

The @font-face in app/globals.css points at this exact filename. The
font is mapped to the `font-title` Tailwind class + the
--font-dystopian CSS variable, and is used by the landing title.

To swap in a different file, either:
  - name it Sddystopiandemo-GO7xa.otf, or
  - update the src url() in the @font-face block in app/globals.css
    (set format() to match: "woff2" / "truetype" / "opentype").

If the font file is missing, the title falls back to Orbitron.
