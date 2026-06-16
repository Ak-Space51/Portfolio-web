# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page "Portfolio OS" — a portfolio site styled as a futuristic cyberpunk command-center HUD. Next.js 16 (App Router) + TypeScript + Tailwind CSS v3 + Framer Motion + lucide-react. Performance-first: **no Three.js / WebGL / heavy deps**. See `README.md` for the user-facing feature list and customization guide.

## Commands

```bash
npm run dev          # dev server on http://localhost:3000 (Turbopack)
npm run build        # production build — ALSO runs the TypeScript typecheck
npm start            # serve the production build
npm run lint         # next lint
npx tsc --noEmit     # typecheck only (faster than a full build)
```

There is **no test framework** in this project.

> **Authoritative correctness check is `npm run build`, not `npx tsc --noEmit`.** tsc uses an incremental cache (`.tsbuildinfo`) and can report success on a stale/broken file. When verifying changes, prefer a build.

## Dev-server caveat (important)

The repo lives under a **OneDrive** path, where Turbopack's file watching is unreliable. Symptoms after a few edits: stale SSR/HMR, hydration-mismatch errors whose diffs reference *old* code, a stuck Next.js error overlay, or `?section=` deep-links rendering the landing instead of the target section. **Fix: stop and restart the dev server** (a fresh process recompiles cleanly). A passing `npm run build` confirms the code itself is fine.

## Architecture

### The OS shell (most important to understand)

`app/page.tsx` renders `components/OSApp.tsx` inside a `<Suspense>`. **`OSApp` is the entire app shell** and is driven by two pieces of client state:

- `booted` — `false` = Landing screen, `true` = dashboard. Toggled by ENTER SYSTEM; **not** a route change.
- `active: SectionId` — which dashboard section is shown.

Sections are **not routes** — they are swapped client-side via `AnimatePresence` and a `SECTION_COMPONENTS: Record<SectionId, ComponentType>` map. The only real Next route is **`/journal/[slug]`** (deep-linkable full articles, statically generated via `generateStaticParams`). Deep-linking *into a section* uses the `?section=XXX` query param, which `OSApp` reads on mount to boot straight in (e.g. the journal article's "back to archive" link → `/?section=JOURNAL`).

The **city video background lives in `OSApp` as a single persistent `fixed inset-0 z-0` layer** (`CityBackground`), so it stays mounted/continuous across the landing→dashboard transition. The dashboard renders a scrim (`bg-bg/[0.66]`) over it for readability; the landing does not.

### Adding or renaming a section — touches 4 places (TS-enforced)

`SECTION_COMPONENTS` is typed `Record<SectionId, …>`, so the compiler forces these to stay in sync:

1. `lib/types.ts` — add the id to the `SectionId` union.
2. `lib/nav.ts` — add `{ id, label }` to `SECTIONS` (array order = nav order = carousel ring order).
3. `components/OSApp.tsx` — add the id → component entry in `SECTION_COMPONENTS`.
4. `components/sections/<Name>.tsx` — create the section (wrap it in `<HudSection index="NN" title subtitle>`; `index` is the decorative HUD number — keep these sequential).

### Theme system (CSS variables, not Tailwind dark:)

Colors are CSS custom properties defined in `app/globals.css` under `[data-theme="dark"]` (default) and `[data-theme="light"]`, exposed to Tailwind as `rgb(var(--x) / <alpha-value>)` (see `tailwind.config.ts`). So write `bg-accent`, `text-accent-active`, `border-line`, etc. — they auto-adapt to the theme.

- `--accent` = resting color; `--accent-active` = hover/selected/focus color. In dark mode this gives the signature **red → cyan-on-select** behavior; light mode is white/blue.
- `components/nav/ThemeProvider.tsx` sets `data-theme` on `<html>` and persists to `localStorage['pos-theme']`. An inline pre-paint script in `app/layout.tsx` applies the stored theme before React hydrates (avoids a flash) — `<html>` uses `suppressHydrationWarning`.
- Theme-dependent rendering reads `useTheme()` (e.g. `Scanlines` returns `null` in light mode; `CityBackground` inverts the video in light mode).

**Per-section text tone (dark mode only).** In dark mode there is *no neutral white/grey text* — `--text` and `--muted` are themed. Their defaults can be re-scoped per section: `HudSection` accepts a `tone="red"|"cyan"|"amber"` prop that sets `data-tone` on the `<section>`, and `globals.css` has `[data-theme="dark"] [data-tone="…"]` rules that override `--text`/`--muted`. So a whole section recolors via one prop without touching its children. Interactive colors (`--accent`/`--accent-active`) are left alone so hover/selected cues survive. Light mode ignores `data-tone` (keeps readable neutrals).

**CRT phosphor glow.** A dark-mode-only `text-shadow` on `body` (inherited by all text, `color-mix(... currentColor ...)` so each glow matches its own colour) gives the "glowing monitor" look; `.text-glow` / `.text-glow-active` are the stronger heading versions, also colour-matched in dark. Light mode has no glow.

### HUD visual system

The angular look is built from **`clip-path` utilities** (`.clip-notch`, `.clip-notch-sm`, `.clip-btn`, `.clip-chip`, …) defined in `app/globals.css`. `components/hud/NotchedFrame.tsx` is the backbone — a **double-layer technique** (accent-filled outer + inset fill) so the notched diagonal corners keep a visible 1px outline. The outline layer's opacity is intentionally low (`bg-accent/30`, `bg-accent-active/35`): because the default fill is translucent (`bg-bg/80`), a higher-opacity outline bleeds its colour through the whole interior and the panels read as saturated red/cyan. The accent identity is carried by the `shadow-glow` box-shadow instead — **don't raise the outline opacity** or the translucent panels go saturated again. Most panels build on it (`HudPanel`, `HudSidebar`, `TerminalWindow`, …). Shape-language rules: angular cuts, notched corners, no large border-radius. Images use the procedural `HoloImage` placeholder (pass a real `/public` path as `src` to override).

- **Translucent fills.** `NotchedFrame`'s fill defaults to `fillClassName="bg-bg/80"` — a *dark translucent glass*: the base is the darkest token (`--bg`, not `--panel`) so the panel stays dark while the ~20% transparency lets the city background show through (using `--panel` at low opacity looked too bright/saturated). Two panels are intentionally kept opaque/solid by passing `fillClassName="bg-panel/95"`: the **mission dossier** (Projects) and the **journal entry preview** — they hold dense reading content. (The "no glassmorphism" intent has been relaxed: the landing menu panel deliberately uses a red radial wash + `backdrop-blur` glass to match a reference.)
- **Entry rows (`components/hud/EntryPanel.tsx`).** The journal-archive and mission-log list rows are NOT `NotchedFrame` — they use `EntryPanel`, an angular row recreated from `public/assets/PANEL.svg` (notch + divider + main panel) drawn as a stretched inline SVG with `currentColor` strokes, with the **icon sitting beside** the panel (content is padded `pl-[11%]` to clear the divider). Journal rows use `public/assets/icon.svg` as the icon; mission rows use a lucide glyph in a notched holder and pass `variant="flip"` (frame stays red, fills red when selected, text stays cyan).
- **Top nav (`components/nav/HudNav.tsx`)** is a centered circular carousel: the active section is always centered in a "game bar", with the rest wrapping left/right (`ringAround`). Items use `currentColor` so the frame follows hover/selected colour. The landing menu (`components/nav/LandingMenu.tsx`) is separate — a vertical list with an angular SVG selection bracket shown only on hover/keyboard-focus.

### Global FX (`components/fx/`)

`Scanlines` (CRT overlay, **dark-mode only**), `CodeRain` (canvas matrix rain — time-throttled/slow, alpha-masked to the side columns so the centre stays clear, bright leading heads), `EdgeTicker`, `Counter`, `ParallaxCity` (procedural SVG skyline — the light-mode/reduced-motion fallback background), `CityBackground` (the video bg). All FX honor `prefers-reduced-motion`.

> **Do not use `mix-blend-mode` over the landing video.** The video sits in an isolated stacking context, so blend modes don't composite against it (they just lay the texture on top) and they're expensive enough to stall rendering. The CRT effect is therefore a **transparent dark-line image** (`public/assets/crt-scanlines.webp`) drawn at normal blend, not a blend-mode filter.

### Content & assets

- `content/*.ts` — typed (via `lib/types.ts`) placeholder data for profile, skills, projects (missions), journal, experience. Editing these updates the UI.
- `public/assets/` — `cyberpunk-city.mp4` (background), `crt-scanlines.webp` (CRT overlay, derived from the source `CRT.jpg` via **`sharp`**, available as a Next.js transitive dependency — use it for any image processing), plus `PANEL.svg` (the `EntryPanel` row frame) and `icon.svg` (the journal entry chip icon).
- `public/fonts/` — `Mechline.otf` is the title font (`@font-face` + Tailwind `font-title` / `--font-dystopian`); falls back to Orbitron if missing. Orbitron / Rajdhani / JetBrains Mono load via `next/font` in `app/layout.tsx`, mapped to Tailwind `font-display` / `font-body` / `font-mono`.

## Verifying UI changes

Use the Claude Preview MCP (`.claude/launch.json` defines the `portfolio-os` dev server). The screenshot tool **intermittently hangs while capturing the playing video** at desktop sizes — pause it first (`document.querySelector('video')?.pause()`) and/or capture at a smaller viewport. This is a tooling limitation, not a runtime issue.
