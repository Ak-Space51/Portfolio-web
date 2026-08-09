import { Mission } from "@/lib/types";

export const missions: Mission[] = [
  {
    id: "MISSION_01",
    codename: "PORTFOLIO OS",
    type: "WEB APPLICATION",
    status: "DEPLOYING",
    year: "2026",
    description:
      "A futuristic portfolio website built as an interactive operating system with a cyberpunk HUD interface, terminal access and dynamic modules.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: [
      "Cyberpunk HUD interface",
      "Interactive terminal",
      "Dynamic modules",
      "Responsive design",
      "High performance",
    ],
    screenshots: ["assets/landing.png", "assets/landing2.png", "assets/page.png"],
    liveDemo: "https://portfolio-console-sigma.vercel.app/",
    sourceCode: "https://github.com/Ak-Space51/Portfolio-web",
  },
  {
    "id": "MISSION_02",
    "codename": "DATAFRAME CORE",
    "type": "ANALYTICS ENGINE",
    "status": "DEPLOYED",
    "year": "2026",
    "description": "A high-performance C++ DataFrame library built on Apache Arrow and Parquet, executing analytical workflows via a DAG-based planner and rule-based query optimizer.",
    "techStack": ["C++", "Apache Arrow", "Apache Parquet", "CMake"],
    "features": [
      "Eager and lazy execution APIs",
      "DAG-based deferred execution",
      "Rule-based query optimization",
      "Predicate & projection pushdown",
      "Columnar memory backend"
    ],
    "screenshots": ["DAG PLANNER // EXECUTION", "OPTIMIZER TRACE", "MEMORY ALLOCATION"],
    "liveDemo": "#",
    "sourceCode": "https://github.com/Ak-Space51/cpp-lazy-eager-optimized-dataframe"
  },
  {
    "id": "MISSION_03",
    "codename": "CACHE GRAPH BENCH",
    "type": "SYSTEMS PROFILER",
    "status": "COMPLETE",
    "year": "2026",
    "description": "A performance-focused graph processing engine benchmarking Breadth-First Search (BFS) over pointer-based adjacency lists against cache-friendly Compressed Sparse Row (CSR) memory layouts.",
    "techStack": ["C", "Cachegrind", "Valgrind", "Python"],
    "features": [
      "CSR memory layout conversion",
      "Hardware-level cache profiling",
      "Memory locality optimization",
      "Sequential memory traversal",
      "Algorithmic performance benchmarking"
    ],
    "screenshots": ["MEMORY LAYOUT ANALYSIS", "CACHE MISS DOSSIER"],
    "liveDemo": "#",
    "sourceCode": "https://github.com/Ak-Space51/Cache-Graphs"
  },
  {
    "id": "MISSION_04",
    "codename": "RISCV OOO SIMULATOR",
    "type": "HARDWARE EMULATOR",
    "status": "DEPLOYED",
    "year": "2026",
    "description": "A 32-bit out-of-order execution RISC-V processor simulator implementing Tomasulo's algorithm with precise exception handling, a Reorder Buffer, and a 2-bit saturating branch predictor.",
    "techStack": ["C++", "Makefile", "RISC-V Assembly"],
    "features": [
      "Out-of-order execution pipeline",
      "Reorder Buffer (ROB) integration",
      "Register Alias Table (RAT)",
      "Precise exception handling",
      "2-bit saturating branch prediction"
    ],
    "screenshots": ["PIPELINE TRACE", "EXECUTION UNITS", "BRANCH PREDICTOR LOG"],
    "liveDemo": "#",
    "sourceCode": "https://github.com/Ak-Space51/Riscv-ooo-Simulator"
  },
  {
    "id": "MISSION_05",
    "codename": "FPGA RACER",
    "type": "HARDWARE SYNTHESIS",
    "status": "COMPLETE",
    "year": "2026",
    "description": "A real-time car racing game synthesized directly onto FPGA hardware, featuring 60Hz VGA rendering, hardware-level collision logic, and a linear feedback shift register for AI behavior.",
    "techStack": ["Verilog", "FPGA", "VGA"],
    "features": [
      "60Hz VGA pixel-by-pixel rendering",
      "Hardware-level hitbox collision",
      "LFSR pseudo-random generation",
      "ROM-based sprite layering",
      "Finite State Machine (FSM) core"
    ],
    "screenshots": ["VGA OUTPUT STREAM", "HARDWARE FSM", "COLLISION MATRIX"],
    "liveDemo": "#",
    "sourceCode": "https://github.com/Ak-Space51/FPGA-CAR-RACER"
  },
  {
    "id": "MISSION_06",
    "codename": "TASKFLOW KANBAN",
    "type": "SAAS PLATFORM",
    "status": "DEPLOYING",
    "year": "2026",
    "description": "A robust real-time project management backend featuring Kanban boards, dynamic task tracking, JWT-based authentication, and role-based access control.",
    "techStack": ["Node.js", "Express", "MongoDB", "JWT", "TypeScript", "JavaScript"],
    "features": [
      "Real-time REST API endpoints",
      "Role-based access control (RBAC)",
      "JWT session management",
      "Multi-board task syncing",
      "Mentions and commentary engine"
    ],
    "screenshots": ["KANBAN OVERVIEW", "SECURITY PROTOCOL", "TASK DOSSIER"],
    "liveDemo": "#",
    "sourceCode": "https://github.com/Ak-Space51/Project-Manager"
  },
  {
    "id": "MISSION_07",
    "codename": "Z3 SUDOKU DECODER",
    "type": "ALGORITHMIC SOLVER",
    "status": "COMPLETE",
    "year": "2026",
    "description": "An automated Sudoku puzzle solver that translates grid states into DIMACS CNF formulas and resolves them instantaneously using the Z3 SAT solver.",
    "techStack": ["OCaml", "Z3"],
    "features": [
      "DIMACS CNF constraint translation",
      "Z3 SAT solver integration",
      "16x16 grid expansion support",
      "Automated state decoding"
    ],
    "screenshots": ["CNF MATRIX", "Z3 TERMINAL OUTPUT"],
    "liveDemo": "#",
    "sourceCode": "https://github.com/Ak-Space51/Z3-Sudoku-Solver"
  },
  {
    "id": "MISSION_08",
    "codename": "GRAPH-SOCIALNET SIMULATOR",
    "type": "NETWORK SIMULATOR",
    "status": "COMPLETE",
    "year": "2026",
    "description": "A social network simulator operating on complex graph data structures, mapping user interactions, sorting posts via AVL trees, and calculating shortest-path degrees of separation.",
    "techStack": ["C++", "Bash"],
    "features": [
      "Graph-based relationship mapping",
      "AVL tree content sorting",
      "Bidirectional friendship tracking",
      "Degrees of separation (BFS search)",
      "Algorithmic friend suggestions"
    ],
    "screenshots": ["GRAPH TOPOLOGY", "AVL DATA LOG", "DEGREES OF SEPARATION"],
    "liveDemo": "#",
    "sourceCode": "https://github.com/Ak-Space51/graph-based-socialnet-simulator"
  },
  {
    "id": "MISSION_09",
    "codename": "LEVELDB ENHANCED",
    "type": "STORAGE ENGINE",
    "status": "COMPLETE",
    "year": "2026",
    "description": "A custom enhancement of the LevelDB storage engine, implementing new APIs including a sequential Range Scan, a contiguous DeleteRange function, and a manual ForceFullCompaction utility with I/O observability.",
    "techStack": [
      "C++", 
      "LevelDB", 
      "LSM-Tree"
    ],
    "features": [
      "Sequential Range Scan API ",
      "Contiguous DeleteRange execution ",
      "ForceFullCompaction manual trigger ",
      "I/O cost and file churn observability ",
      "LSM-Tree multi-way merge sort"
    ],
    "screenshots": [
      "LSM-TREE COMPACTION", 
      "WRITE PATH TRACE", 
      "COMPACTION STATS"
    ],
    "liveDemo": "#",
    "sourceCode": "https://github.com/Ak-Space51/Enhanced-LevelDB"
  },
  {
    "id": "MISSION_10",
    "codename": "ML GALAXY CLASSIFIER",
    "type": "MACHINE LEARNING MODEL",
    "status": "DEPLOYING",
    "year": "2026",
    "description": "A Convolutional Neural Network built to classify galaxy morphologies, utilizing the Galaxy Zoo 2 dataset and GPU-accelerated tensor pipelines.",
    "techStack": [
      "Python",
      "PyTorch",
      "NumPy",
      "Google Colab"
    ],
    "features": [
      "Convolutional Neural Network (CNN) architecture",
      "Galaxy morphology classification",
      "Galaxy Zoo 2 dataset integration",
      "GPU-accelerated training loop",
      "Tensor-based data processing pipeline"
    ],
    "screenshots": [
      "TENSOR PIPELINE",
      "CNN ARCHITECTURE",
      "GALAXY CLASSIFICATION"
    ],
    "liveDemo": "#",
    "sourceCode": "https://github.com/Ak-Space51/ml-astronomy"
  },
  {
    "id": "MISSION_11",
    "codename": "INTERNSHIP TRACKER",
    "type": "DATA PLATFORM",
    "status": "DEPLOYING",
    "year": "2026",
    "description": "An internship aggregation platform targeting the nearest upcoming season across India, Singapore, the UK and Hong Kong, ingesting live ATS job boards into a single searchable source of truth.",
    "techStack": [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Python",
      "Tailwind CSS"
    ],
    "features": [
      "Ingestion across 61 verified Greenhouse, Ashby, Lever and Workday boards",
      "Season-aware classification with off-cycle as a first-class season",
      "LLM fallback classification for unlabelled postings",
      "Stipend extraction with per-region market estimates",
      "Scheduled email alert digests with per-subscriber filters"
    ],
    "screenshots": [
      "INGESTION PIPELINE",
      "SEASON FILTER MATRIX",
      "ALERT DISPATCH LOG"
    ],
    "liveDemo": "https://internship-tracker-psi-five.vercel.app",
    "sourceCode": "https://github.com/Ak-Space51/Internship-Tracker"
  },
  {
    "id": "MISSION_12",
    "codename": "CODE SCOUT AGENT",
    "type": "AI AGENT FRAMEWORK",
    "status": "COMPLETE",
    "year": "2026",
    "description": "A coding agent built entirely from primitives — hand-written tool dispatchers, agent loops, memory systems and a sandboxed execution environment, with no orchestration frameworks.",
    "techStack": [
      "Python",
      "OpenAI SDK",
      "MCP",
      "Textual"
    ],
    "features": [
      "Manual tool calling and multi-turn agent loop",
      "Persistent resumable sessions with long-term memory",
      "File read, edit and write toolset with paging",
      "Sandboxed command execution behind an approval gate",
      "Extensible via Skills and authenticated MCP servers"
    ],
    "screenshots": [
      "AGENT LOOP TRACE",
      "TOOL DISPATCH LOG",
      "MEMORY STORE"
    ],
    "liveDemo": "#",
    "sourceCode": "https://github.com/Ak-Space51/agentic-loop-toolkit"
  },
];
