import type { Project } from "@/lib/types";

/**
 * Operations = projects, framed as mission dossiers.
 * Synced from github.com/Ak-Space51 — all public, non-empty repos.
 */
export const PROJECTS: Project[] = [
  {
    id: "internship-tracker",
    missionId: "OP-2601",
    name: "INTERNSHIP TRACKER",
    status: "ACTIVE",
    summary:
      "An internship aggregation platform tracking the nearest upcoming season across India, Singapore, UK and Hong Kong.",
    briefing: [
      "An internship aggregation platform targeting the nearest upcoming internship season across India, Singapore, UK, and Hong Kong. A Python ingestion pipeline pulls from Greenhouse, Ashby, Lever and Workday ATS boards, normalizes and upserts into Postgres, which a Next.js job board reads — the browser never talks to company APIs directly.",
      "Key capabilities: season-aware filtering with off-cycle as a first-class season, an LLM classification fallback for unclassified postings, stipend extraction from posting text, saved jobs via localStorage, and scheduled email alert digests.",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Python", "Tailwind CSS"],
    metrics: [
      { label: "CLASS", value: "WEB APPLICATION" },
      { label: "STACK", value: "5 TECH" },
      { label: "FEATURES", value: "4" },
    ],
    links: {
      deploy: "https://internship-tracker-psi-five.vercel.app",
      source: "https://github.com/Ak-Space51/Internship-Tracker",
    },
    year: "2026",
  },
  {
    id: "ml-galaxy-classifier",
    missionId: "OP-2602",
    name: "ML GALAXY CLASSIFIER",
    status: "ACTIVE",
    summary:
      "A Convolutional Neural Network built to classify galaxy morphologies, using the Galaxy Zoo 2 dataset and GPU-accelerated tensor pipelines.",
    briefing: [
      "A Convolutional Neural Network built to classify galaxy morphologies, utilizing the Galaxy Zoo 2 dataset and GPU-accelerated tensor pipelines.",
      "Key capabilities: CNN architecture, galaxy morphology classification, Galaxy Zoo 2 dataset integration, GPU-accelerated training loop, tensor-based data processing pipeline.",
    ],
    stack: ["Python", "PyTorch", "NumPy", "Google Colab"],
    metrics: [
      { label: "CLASS", value: "MACHINE LEARNING MODEL" },
      { label: "STACK", value: "4 TECH" },
      { label: "FEATURES", value: "5" },
    ],
    links: { source: "https://github.com/Ak-Space51/ml-astronomy" },
    year: "2026",
  },
  {
    id: "code-scout-agent",
    missionId: "OP-2603",
    name: "CODE SCOUT AGENT",
    status: "ARCHIVED",
    summary:
      "A from-scratch coding agent — tool dispatchers, agent loops, memory systems and execution environments implemented by hand, no framework abstractions.",
    briefing: [
      "Built over a five-week agentic-systems track: starting from raw LLM API calls and manual conversation state, through custom tool-calling and a TUI research agent, to persistent memory and a full file-editing toolset.",
      "Key capabilities: sandboxed command execution with an approval gate for destructive operations, a todo-driven loop that verifies changes rather than just attempting them, repository search tooling, a read-only Explore subagent, and a Skills + MCP extension system for adding new procedures and external tools without touching the core.",
    ],
    stack: ["Python", "OpenAI SDK", "MCP", "Textual"],
    metrics: [
      { label: "CLASS", value: "AI AGENT / DEV TOOLING" },
      { label: "STACK", value: "4 TECH" },
      { label: "FEATURES", value: "5" },
    ],
    links: { source: "https://github.com/Ak-Space51/agentic-loop-toolkit" },
    year: "2026",
  },
  {
    id: "dataframe-core",
    missionId: "OP-2604",
    name: "DATAFRAME CORE",
    status: "DEPLOYED",
    summary:
      "A high-performance C++ DataFrame library built on Apache Arrow and Parquet, executing analytical workflows via a DAG-based planner and rule-based query optimizer.",
    briefing: [
      "A high-performance C++ DataFrame library built on Apache Arrow and Parquet, executing analytical workflows via a DAG-based planner and rule-based query optimizer.",
      "Key capabilities: eager and lazy execution APIs, DAG-based deferred execution, rule-based query optimization, predicate & projection pushdown, columnar memory backend.",
    ],
    stack: ["C++", "Apache Arrow", "Apache Parquet", "CMake"],
    metrics: [
      { label: "CLASS", value: "ANALYTICS ENGINE" },
      { label: "STACK", value: "4 TECH" },
      { label: "FEATURES", value: "5" },
    ],
    links: {
      source: "https://github.com/Ak-Space51/cpp-lazy-eager-optimized-dataframe",
    },
    year: "2026",
  },
  {
    id: "portfolio-os",
    missionId: "OP-2605",
    name: "PORTFOLIO OS",
    status: "ACTIVE",
    summary:
      "A futuristic portfolio website built as an interactive operating system with a cyberpunk HUD interface, terminal access and dynamic modules.",
    briefing: [
      "A futuristic portfolio website built as an interactive operating system with a cyberpunk HUD interface, terminal access and dynamic modules.",
      "Key capabilities: cyberpunk HUD interface, interactive terminal, dynamic modules, responsive design, high performance.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    metrics: [
      { label: "CLASS", value: "WEB APPLICATION" },
      { label: "STACK", value: "4 TECH" },
      { label: "FEATURES", value: "5" },
    ],
    links: {
      deploy: "https://portfolio-console-sigma.vercel.app/",
      source: "https://github.com/Ak-Space51/Portfolio-web",
    },
    year: "2026",
  },
  {
    id: "fpga-racer",
    missionId: "OP-2606",
    name: "FPGA RACER",
    status: "ARCHIVED",
    summary:
      "A real-time car racing game synthesized directly onto FPGA hardware, featuring 60Hz VGA rendering, hardware-level collision logic, and a linear feedback shift register for AI behavior.",
    briefing: [
      "A real-time car racing game synthesized directly onto FPGA hardware, featuring 60Hz VGA rendering, hardware-level collision logic, and a linear feedback shift register for AI behavior.",
      "Key capabilities: 60Hz VGA pixel-by-pixel rendering, hardware-level hitbox collision, LFSR pseudo-random generation, ROM-based sprite layering, finite state machine (FSM) core.",
    ],
    stack: ["Verilog", "FPGA", "VGA"],
    metrics: [
      { label: "CLASS", value: "HARDWARE SYNTHESIS" },
      { label: "STACK", value: "3 TECH" },
      { label: "FEATURES", value: "5" },
    ],
    links: { source: "https://github.com/Ak-Space51/FPGA-CAR-RACER" },
    year: "2026",
  },
  {
    id: "cache-graph-bench",
    missionId: "OP-2607",
    name: "CACHE GRAPH BENCH",
    status: "ARCHIVED",
    summary:
      "A performance-focused graph processing engine benchmarking BFS over pointer-based adjacency lists against cache-friendly Compressed Sparse Row memory layouts.",
    briefing: [
      "A performance-focused graph processing engine benchmarking Breadth-First Search (BFS) over pointer-based adjacency lists against cache-friendly Compressed Sparse Row (CSR) memory layouts.",
      "Key capabilities: CSR memory layout conversion, hardware-level cache profiling via Cachegrind, memory locality optimization, sequential memory traversal, algorithmic performance benchmarking.",
    ],
    stack: ["C", "Cachegrind", "Valgrind", "Python"],
    metrics: [
      { label: "CLASS", value: "SYSTEMS PROFILER" },
      { label: "STACK", value: "4 TECH" },
      { label: "FEATURES", value: "5" },
    ],
    links: { source: "https://github.com/Ak-Space51/Cache-Graphs" },
    year: "2026",
  },
  {
    id: "leveldb-enhanced",
    missionId: "OP-2608",
    name: "LEVELDB ENHANCED",
    status: "ARCHIVED",
    summary:
      "A custom enhancement of the LevelDB storage engine, implementing a sequential Range Scan, a contiguous DeleteRange function, and a manual ForceFullCompaction utility with I/O observability.",
    briefing: [
      "A custom enhancement of the LevelDB storage engine, implementing new APIs including a sequential Range Scan, a contiguous DeleteRange function, and a manual ForceFullCompaction utility with I/O observability.",
      "Key capabilities: sequential Range Scan API, contiguous DeleteRange execution, ForceFullCompaction manual trigger, I/O cost and file churn observability, LSM-Tree multi-way merge sort.",
    ],
    stack: ["C++", "LevelDB", "LSM-Tree"],
    metrics: [
      { label: "CLASS", value: "STORAGE ENGINE" },
      { label: "STACK", value: "3 TECH" },
      { label: "FEATURES", value: "5" },
    ],
    links: { source: "https://github.com/Ak-Space51/Enhanced-LevelDB" },
    year: "2026",
  },
  {
    id: "taskflow-kanban",
    missionId: "OP-2609",
    name: "TASKFLOW KANBAN",
    status: "ACTIVE",
    summary:
      "A robust real-time project management backend featuring Kanban boards, dynamic task tracking, JWT-based authentication, and role-based access control.",
    briefing: [
      "A robust real-time project management backend featuring Kanban boards, dynamic task tracking, JWT-based authentication, and role-based access control.",
      "Key capabilities: real-time REST API endpoints, role-based access control (RBAC), JWT session management, multi-board task syncing, mentions and commentary engine.",
    ],
    stack: ["Node.js", "Express", "MongoDB", "JWT", "TypeScript", "JavaScript"],
    metrics: [
      { label: "CLASS", value: "SAAS PLATFORM" },
      { label: "STACK", value: "6 TECH" },
      { label: "FEATURES", value: "5" },
    ],
    links: { source: "https://github.com/Ak-Space51/Project-Manager" },
    year: "2026",
  },
  {
    id: "z3-sudoku-decoder",
    missionId: "OP-2610",
    name: "Z3 SUDOKU DECODER",
    status: "ARCHIVED",
    summary:
      "An automated Sudoku puzzle solver that translates grid states into DIMACS CNF formulas and resolves them instantaneously using the Z3 SAT solver.",
    briefing: [
      "An automated Sudoku puzzle solver that translates grid states into DIMACS CNF formulas and resolves them instantaneously using the Z3 SAT solver.",
      "Key capabilities: DIMACS CNF constraint translation, Z3 SAT solver integration, 16x16 grid expansion support, automated state decoding.",
    ],
    stack: ["OCaml", "Z3"],
    metrics: [
      { label: "CLASS", value: "ALGORITHMIC SOLVER" },
      { label: "STACK", value: "2 TECH" },
      { label: "FEATURES", value: "4" },
    ],
    links: { source: "https://github.com/Ak-Space51/Z3-Sudoku-Solver" },
    year: "2026",
  },
  {
    id: "graph-socialnet-simulator",
    missionId: "OP-2611",
    name: "GRAPH-SOCIALNET SIMULATOR",
    status: "ARCHIVED",
    summary:
      "A social network simulator operating on graph data structures, mapping user interactions, sorting posts via AVL trees, and calculating degrees of separation.",
    briefing: [
      "A social network simulator operating on complex graph data structures, mapping user interactions, sorting posts via AVL trees, and calculating shortest-path degrees of separation.",
      "Key capabilities: graph-based relationship mapping, AVL tree content sorting, bidirectional friendship tracking, degrees of separation via BFS search, algorithmic friend suggestions.",
    ],
    stack: ["C++", "Bash"],
    metrics: [
      { label: "CLASS", value: "NETWORK SIMULATOR" },
      { label: "STACK", value: "2 TECH" },
      { label: "FEATURES", value: "5" },
    ],
    links: {
      source: "https://github.com/Ak-Space51/graph-based-socialnet-simulator",
    },
    year: "2026",
  },
  {
    id: "riscv-ooo-simulator",
    missionId: "OP-2612",
    name: "RISCV OOO SIMULATOR",
    status: "DEPLOYED",
    summary:
      "A 32-bit out-of-order execution RISC-V processor simulator implementing Tomasulo's algorithm with precise exception handling, a Reorder Buffer, and a 2-bit saturating branch predictor.",
    briefing: [
      "A 32-bit out-of-order execution RISC-V processor simulator implementing Tomasulo's algorithm with precise exception handling, a Reorder Buffer, and a 2-bit saturating branch predictor.",
      "Key capabilities: out-of-order execution pipeline, Reorder Buffer (ROB) integration, Register Alias Table (RAT), precise exception handling, 2-bit saturating branch prediction.",
    ],
    stack: ["C++", "Makefile", "RISC-V Assembly"],
    metrics: [
      { label: "CLASS", value: "HARDWARE EMULATOR" },
      { label: "STACK", value: "3 TECH" },
      { label: "FEATURES", value: "5" },
    ],
    links: { source: "https://github.com/Ak-Space51/Riscv-ooo-Simulator" },
    year: "2026",
  },
];
