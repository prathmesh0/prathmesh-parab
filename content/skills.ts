import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    icon: "Monitor",
    skills: [
      { name: "React.js", level: 92 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Shadcn UI", level: 85 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: "Server",
    skills: [
      { name: "Node.js", level: 78 },
      { name: "Express.js", level: 75 },
    ],
  },
  {
    id: "database",
    name: "Database",
    icon: "Database",
    skills: [
      { name: "MongoDB", level: 78 },
      { name: "SQL", level: 72 },
      { name: "Firebase", level: 80 },
    ],
  },
  {
    id: "mobile",
    name: "Mobile",
    icon: "Smartphone",
    skills: [{ name: "Flutter", level: 80 }],
  },
  {
    id: "languages",
    name: "Programming Languages",
    icon: "Code2",
    skills: [
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "C++", level: 75 },
      { name: "C", level: 72 },
    ],
  },
  {
    id: "concepts",
    name: "Core Concepts",
    icon: "Brain",
    skills: [
      { name: "Data Structures", level: 85 },
      { name: "Algorithms", level: 82 },
      { name: "DBMS", level: 78 },
      { name: "SDLC", level: 80 },
      { name: "Operating Systems", level: 75 },
    ],
  },
  {
    id: "tools",
    name: "Tools",
    icon: "Wrench",
    skills: [
      { name: "Git", level: 88 },
      { name: "GitHub", level: 88 },
      { name: "VS Code", level: 92 },
      { name: "Postman", level: 82 },
    ],
  },
];
