# AK SPACE // Portfolio OS v2.0

An immersive **cyberpunk "Portfolio OS"** — a single-page portfolio that feels like a
futuristic command-center HUD. Built with Next.js (App Router), TypeScript, Tailwind
CSS and Framer Motion. No Three.js, no WebGL, no video backgrounds — the moving city
skyline is fully procedural SVG + CSS for performance.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Features

- **Landing / main menu** with a procedural parallax cyberpunk skyline, code-rain and edge tickers
- **Dashboard** — operative profile, animated attribute bars, mission-summary counters, live tech status
- **Skills** — interactive 7-axis capability radar + category breakdown
- **Projects (MISSIONS)** — mission log + animated dossier
- **Journal** — archive list + preview, with full entries at `/journal/[slug]`
- **Experience (MISSION HISTORY)** — HUD timeline of completed operations
- **Contact (TRANSMISSION)** — terminal form with an Encrypting → Transmitting → Delivered flow
- **Theming** — dark crimson (active states glow cyan) + a light white/blue theme, toggle persists
- Responsive (desktop / tablet / mobile), keyboard-navigable, `prefers-reduced-motion` aware

## Customizing

All content lives in **`/content`** — edit these typed files and the UI updates:

| File | What it controls |
|------|------------------|
| `content/profile.ts`    | Name, role, summary, socials, attributes, stats, tech status |
| `content/skills.ts`     | Skill categories, proficiencies, technologies |
| `content/projects.ts`   | Missions (projects) |
| `content/journal.ts`    | Journal entries (`/journal/[slug]`) |
| `content/experience.ts` | Mission history (experience) |

Types are defined in `lib/types.ts`.

### Images
Visuals use a procedural `HoloImage` placeholder so nothing is ever broken. To use a real
image, drop it in `/public/assets` and pass its path as the `src` prop (e.g. set
`profile.avatar = "/assets/me.webp"`, or render `<HoloImage src="/assets/shot.webp" />`).

### Title font
The big "AK SPACE" logo uses **SDDystopianDemo** if present, falling back to Orbitron.
Drop your font file in `public/fonts/` — see `public/fonts/README.txt` for exact filenames.

### Theme colors
All colors are CSS variables in `app/globals.css` under `[data-theme="dark"]` /
`[data-theme="light"]`. Tweak `--accent` (resting) and `--accent-active` (selected/hover).

### Contact form
`components/sections/Contact.tsx` simulates the send. Wire a real handler where the
`// NOTE: wire a real handler here` comment is (e.g. a Next.js Route Handler or a form service).

## Stack

Next.js · TypeScript · Tailwind CSS · Framer Motion · lucide-react
