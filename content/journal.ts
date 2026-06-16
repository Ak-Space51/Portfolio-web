import { JournalEntry } from "@/lib/types";

export const journalEntries: JournalEntry[] = [
  {
    slug: "building-a-cyberpunk-portfolio-os",
    title: "BUILDING A CYBERPUNK PORTFOLIO OS",
    code: "SID: OCCUPATIONAL HAZARD",
    category: "DEVLOG",
    date: "2026-05-28",
    status: "JOB COMPLETE",
    excerpt:
      "The idea was simple: build a portfolio that doesn't look like every other portfolio. Something futuristic, interactive and memorable...",
    cover: "PORTFOLIO OS // BUILD",
    tags: ["webdev", "nextjs", "design", "hud", "cyberpunk"],
    body: [
      "The idea was simple: build a portfolio that doesn't look like every other portfolio. Something futuristic, interactive and memorable — a system you navigate, not a page you scroll.",
      "## The brief",
      "Most portfolios are a hero section, a grid of cards, and a contact form. They're fine. They're also forgettable. I wanted the visitor to feel like they were logging into a command center — booting a machine, browsing mission dossiers, reading logs from an archive.",
      "The design language had to feel *engineered*, not decorated. That meant angular cuts, notched corners, HUD frames and a strict information hierarchy. Every element earns its place.",
      "## The stack",
      "Next.js App Router, TypeScript, Tailwind and Framer Motion. No Three.js, no heavy WebGL, no video backgrounds. Performance was a hard requirement — the whole thing had to feel instant even with the ambient effects running.",
      "The trick to the moving city background is that it's entirely procedural: layered SVG silhouettes with parallax, neon flicker and a drifting haze. Zero bytes of video shipped.",
      "## Lessons",
      "Constraints made it better. Banning glassmorphism and large border-radius forced a sharper, more deliberate aesthetic. And building a reusable HUD component kit up front meant every new section snapped together in minutes.",
      "The result feels closer to a premium game interface than a website — which was exactly the point.",
    ],
  },
  {
    slug: "agentic-loops-that-actually-ship",
    title: "AGENTIC LOOPS THAT ACTUALLY SHIP",
    code: "SID: HIPPOCRATIC OATH",
    category: "RESEARCH",
    date: "2026-04-11",
    status: "JOB COMPLETE",
    excerpt:
      "Everyone is building agents. Most of them hallucinate their way into a corner. Here's the harness that kept mine honest...",
    cover: "AGENT HARNESS",
    tags: ["ai", "agents", "python", "rag"],
    body: [
      "Everyone is building agents. Most of them hallucinate their way into a corner. The difference between a demo and a tool is the harness around the model.",
      "## Verify, then trust",
      "The single biggest win was an adversarial verification step: every proposed edit is checked by an independent pass that's prompted to *refute* it. If the refutation holds, the edit is dropped.",
      "## Keep context tight",
      "Retrieval beats stuffing. A focused, ranked set of code snippets outperforms dumping the whole repo into the prompt — both on accuracy and on cost.",
      "Shipping agents is less about the model and more about the loop you wrap it in.",
    ],
  },
  {
    slug: "rendering-a-million-points-at-60fps",
    title: "RENDERING A MILLION POINTS AT 60FPS",
    code: "SID: FLIGHT OF THE CHEETAH",
    category: "PERFORMANCE",
    date: "2026-02-19",
    status: "JOB COMPLETE",
    excerpt:
      "The DOM gives up around a few thousand nodes. WebGL doesn't blink at a million. Here's how the data visualizer stays smooth...",
    cover: "RENDER GRID",
    tags: ["webgl", "performance", "wasm", "dataviz"],
    body: [
      "The DOM gives up around a few thousand nodes. WebGL doesn't blink at a million.",
      "## Batch everything",
      "Every point lives in a single buffer. One draw call. The CPU never touches geometry per-frame — it just updates uniforms for pan and zoom.",
      "## Aggregate off the main thread",
      "Heavy aggregation runs in a Rust module compiled to WASM, inside a worker. The UI thread stays free to do nothing but paint.",
      "Smoothness is a budget. Spend it on the frame, not on bookkeeping.",
    ],
  },
  {
    slug: "the-case-for-boring-databases",
    title: "THE CASE FOR BORING DATABASES",
    code: "SID: MANY WAYS TO SKIN A CAT",
    category: "ARCHITECTURE",
    date: "2025-12-03",
    status: "JOB COMPLETE",
    excerpt:
      "Postgres can do more than you think. Before you reach for five specialized stores, see how far one boring database gets you...",
    cover: "DATA LAYER",
    tags: ["postgres", "architecture", "backend"],
    body: [
      "Postgres can do more than you think. Queues, full-text search, JSON documents, geospatial — it's all in the box.",
      "## One store, fewer failure modes",
      "Every additional datastore is another thing to operate, back up, and keep consistent. Boring, well-understood infrastructure is a feature.",
      "Choose excitement in your product, not your plumbing.",
    ],
  },
  {
    slug: "designing-for-the-first-five-seconds",
    title: "DESIGNING FOR THE FIRST FIVE SECONDS",
    code: "SID: REPORTED CRIME PARANOIA",
    category: "DESIGN",
    date: "2025-10-22",
    status: "JOB COMPLETE",
    excerpt:
      "A visitor decides in five seconds whether to stay. That window is an interface problem, not a marketing one...",
    cover: "FIRST CONTACT",
    tags: ["design", "ux", "motion"],
    body: [
      "A visitor decides in five seconds whether to stay. That window is an interface problem, not a marketing one.",
      "## Motion as a signal",
      "Animation should communicate state, not decorate it. A panel that draws itself in tells you it just loaded. A counter that ticks up tells you what matters.",
      "Respect the visitor's attention and they'll give you the next five seconds.",
    ],
  },
  {
    slug: "shipping-on-a-schedule",
    title: "SHIPPING ON A SCHEDULE",
    code: "SID: PLAYING FOR TIME",
    category: "PROCESS",
    date: "2025-08-14",
    status: "IN PROGRESS",
    excerpt:
      "Velocity isn't typing faster. It's deciding faster and cutting scope without cutting quality...",
    cover: "DELIVERY LOG",
    tags: ["process", "productivity"],
    body: [
      "Velocity isn't typing faster. It's deciding faster and cutting scope without cutting quality.",
      "## Default to the smallest version",
      "Ship the thinnest slice that's genuinely useful, then iterate against real feedback instead of imagined requirements.",
      "Momentum compounds. Protect it.",
    ],
  },
];

export function getEntry(slug: string): JournalEntry | undefined {
  return journalEntries.find((e) => e.slug === slug);
}
