# TACTICAL/OS — Tactical HUD Portfolio

A software engineer's portfolio rendered as a futuristic **command-center operating system** — angled HUD panels, a three-column tactical layout, a boot sequence, an interactive terminal, and restrained, purposeful motion. Built to feel *engineered*, not decorated.

![stack](https://img.shields.io/badge/Next.js-15-000) ![ts](https://img.shields.io/badge/TypeScript-strict-3178c6) ![tw](https://img.shields.io/badge/Tailwind-v4-38bdf8) ![motion](https://img.shields.io/badge/Framer_Motion-11-ff0080)

---

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** — design tokens via `@theme` CSS variables
- **Framer Motion 11** — all motion (panel reveals, counters, boot, terminal)
- **next/font** — self-hosted Orbitron / Rajdhani / JetBrains Mono (no external CDN)

No UI kits, no video, no particle engines. Every component is custom.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

> **Note (Windows + OneDrive):** the live-reload file watcher can loop when the
> project lives inside a synced OneDrive folder. If `npm run dev` reloads
> repeatedly, either move the repo outside OneDrive, or just run the production
> server (`npm run build && npm run start`) which is unaffected.

```bash
npm run build    # production build
npm run start    # serve the production build
```

---

## Editing content

All site content lives in **`lib/data/`** — typed against `lib/types.ts`. Replace
the placeholders and everything (modules, terminal commands, metadata) updates:

| File | Drives |
|------|--------|
| `lib/data/profile.ts` | Hero + Profile dossier, system metrics, `whoami` |
| `lib/data/projects.ts` | Operations / mission dossiers |
| `lib/data/skills.ts` | Capabilities diagnostic meters |
| `lib/data/experience.ts` | Deployment-history timeline |
| `lib/data/nav.ts` | Navigation modules + ordering |

---

## Architecture

```
app/
  layout.tsx            fonts, metadata, tokens, skip link
  page.tsx              composes background + boot + frame + modules + terminal
  globals.css           design tokens (@theme), HUD panel system, bg layers, reduced-motion
components/
  background/           layered ambient background (grid · noise · HUD marks · vignette)
  boot/                 BootSequence — once-per-session, skippable, reduced-motion aware
  layout/               CommandFrame (3-col grid) · TopBar · Left/Right rails · MobileNav · NavContext (scrollspy)
  hud/                  design system — Panel, Counter, DiagnosticBar, HudButton, Reveal, ScanLine, Reticle…
  modules/              Hero · Profile · Operations · Capabilities · Experience · Transmit
  terminal/             Terminal widget + command registry
lib/
  data/                 all editable content
  hooks/                useReducedMotion · useInView · useCountUp · useSessionFlag
  motion/variants.ts    centralized motion language
  utils/                cn · scrollToModule
  types.ts              domain types
```

### Design tokens
Single source of truth in `app/globals.css` `@theme`. Colors, fonts and shadows
become Tailwind utilities (`bg-panel`, `text-dim`, `border-edge`, `font-head`…).
The 90 / 8 / 2 dark-surface-to-accent ratio is enforced by reserving `accent` for
status, active states and CTAs only.

### HUD panel system
Angled corners use the `.hud-panel` double-layer technique (no `border-radius`):
a clipped edge-color layer (`::before`) and a 1px-inset fill layer (`::after`)
produce a bevel-following border at any size. Set `--cut` for corner depth.

### Motion
One easing curve (`EASE_HUD`) and a small variant set keep the interface coherent.
Modules animate **once, on enter viewport** (IntersectionObserver) so off-screen
work is deferred. A single hook (`useReducedMotion`) plus a global CSS guard
collapse all motion to instant fades under `prefers-reduced-motion`.

### Terminal
`components/terminal/commands.ts` is a command registry
(`help · profile · projects · skills · experience · contact · clear` + aliases &
easter eggs). Navigation commands scroll to the matching module. Toggle with the
launcher or **Ctrl/Cmd + `**; supports input history (↑/↓).

---

## Accessibility

- Semantic landmarks (`header / nav / main / section / footer`) + skip link
- Full keyboard nav; visible `:focus-visible` rings; ESC closes modal/boot
- `aria-live` on boot, terminal and transmission; `role="meter"` on diagnostics
- `prefers-reduced-motion` fully honored
- Dark-surface palette meets WCAG contrast for body/dim text

---

## Performance

- Statically prerendered (`○ Static`) — first-load JS ≈ 155 kB
- Self-hosted subset fonts (`display: swap`), no layout shift
- SVG + CSS visuals only; no video or particle systems
- Viewport-gated animations; counters/meters run once

Remains **portable**: no server-only features are used, so a static export works
for non-Vercel hosts.

---

## Deployment

### Vercel (recommended)
1. Push to a Git repo and import it at [vercel.com/new](https://vercel.com/new).
2. Framework preset **Next.js** is auto-detected — no env vars required.
3. Deploy. (Or `npm i -g vercel && vercel`.)

### Static hosts (GitHub Pages / Netlify / any CDN)
The contact form is client-side simulated, so a fully static export works:

```js
// next.config.mjs
const nextConfig = { output: "export" };
```

```bash
npm run build      # emits ./out
```
Serve `./out` on any static host.

---

## License

Personal portfolio template — adapt freely for your own use.
