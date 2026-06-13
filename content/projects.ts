import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "repolens",
    title: "RepoLens",
    description:
      "AI-powered repository analysis platform that visualizes codebases and provides intelligent insights through a conversational interface.",
    longDescription:
      "RepoLens transforms the way developers understand large codebases. It uses advanced AI to analyze repository structure, dependencies, and patterns — then surfaces insights through a natural chat interface.",
    image: "/images/projects/repolens.png",
    technologies: ["Next.js", "Node.js", "MongoDB", "AI", "TypeScript"],
    liveUrl: "https://repolens.vercel.app",
    githubUrl: "https://github.com/prathmeshparab",
    featured: true,
    category: "AI / Web",
  },
  {
    id: "innerbalance",
    title: "InnerBalance",
    description:
      "A mental wellness application featuring mood tracking, journaling, AI chatbot support, and mental health assessments.",
    longDescription:
      "InnerBalance helps users track their mental well-being with daily mood logs, reflection journals, and an empathetic AI chatbot. Built with Flutter for cross-platform reach.",
    image: "/images/projects/innerbalance.png",
    technologies: ["Flutter", "Firebase", "SQL", "Dart"],
    githubUrl: "https://github.com/prathmeshparab",
    featured: true,
    category: "Mobile / Health",
  },
  {
    id: "simpliadmission",
    title: "SimpliAdmission",
    description:
      "Engineering admission guidance app helping students compare colleges, analyze cutoffs, and find scholarships.",
    longDescription:
      "SimpliAdmission was built to simplify the complex engineering admission process in India. It provides cutoff analysis, college comparisons, scholarship information, and frequently asked questions.",
    image: "/images/projects/simpliadmission.png",
    technologies: ["Android", "Firebase", "Java"],
    githubUrl: "https://github.com/prathmeshparab",
    featured: false,
    category: "Mobile / Education",
  },
];
