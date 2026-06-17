import { SkillCategory } from "@/lib/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "LANGUAGES",
    proficiency: 92,
    technologies: ["TypeScript", "Python", "C++", "SystemVerilog", "SQL", "Ocaml"],
    learning: ["Rust"],
  },
  {
    id: "frontend",
    label: "FRONTEND",
    proficiency: 95,
    technologies: ["React", "Next.js", "Tailwind", "Framer Motion", "WebGL", "Bootstrap"],
    learning: ["Three.js"],
  },
  {
    id: "backend",
    label: "BACKEND",
    proficiency: 88,
    technologies: ["Node.js", "FastAPI", "Flask", "GraphQL", "Redis"],
  },
  // {
  //   id: "aiml",
  //   label: "AI / ML",
  //   proficiency: 80,
  //   technologies: ["PyTorch", "LangChain", "Transformers", "RAG", "OpenCV"],
  //   learning: ["Agentic systems"],
  // },
  {
    id: "databases",
    label: "DATABASES",
    proficiency: 90,
    technologies: ["PostgreSQL", "MongoDB", "Prisma", "MySQL", "SQLite"],
  },
  {
    id: "tools",
    label: "TOOLS",
    proficiency: 90,
    technologies: ["Git", "Docker", "Figma", "Vercel", "Photoshop", "Blender"],
  },
  // {
  //   id: "systems",
  //   label: "SYSTEMS",
  //   proficiency: 82,
  //   technologies: ["Distributed systems", "CI/CD", "Observability", "Caching"],
  // },
];
