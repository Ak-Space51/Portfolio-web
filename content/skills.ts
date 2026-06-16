import { SkillCategory } from "@/lib/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "LANGUAGES",
    proficiency: 92,
    technologies: ["TypeScript", "Python", "Rust", "Go", "SQL", "C++"],
    learning: ["Zig"],
  },
  {
    id: "frontend",
    label: "FRONTEND",
    proficiency: 95,
    technologies: ["React", "Next.js", "Tailwind", "Framer Motion", "WebGL"],
    learning: ["WebGPU"],
  },
  {
    id: "backend",
    label: "BACKEND",
    proficiency: 88,
    technologies: ["Node.js", "FastAPI", "gRPC", "GraphQL", "Redis"],
  },
  {
    id: "aiml",
    label: "AI / ML",
    proficiency: 80,
    technologies: ["PyTorch", "LangChain", "Transformers", "RAG", "OpenCV"],
    learning: ["Agentic systems"],
  },
  {
    id: "databases",
    label: "DATABASES",
    proficiency: 84,
    technologies: ["PostgreSQL", "MongoDB", "Prisma", "ClickHouse", "SQLite"],
  },
  {
    id: "tools",
    label: "TOOLS",
    proficiency: 90,
    technologies: ["Git", "Docker", "Vite", "Linux", "Figma", "Vercel"],
  },
  {
    id: "systems",
    label: "SYSTEMS",
    proficiency: 82,
    technologies: ["Distributed systems", "CI/CD", "Observability", "Caching"],
  },
];
