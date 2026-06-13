import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "lauren-it",
    role: "Associate Frontend Developer",
    company: "Lauren Information Technology",
    companyUrl: "https://www.laureninfotech.com",
    period: "Aug 2024 – Present",
    startDate: "2024-08",
    current: true,
    description:
      "Building scalable financial automation platforms and mobile applications using cutting-edge web and mobile technologies.",
    achievements: [
      "Built a role-based financial automation platform from scratch, reducing manual operations by 85%",
      "Developed AI-powered chatbot experiences improving user engagement",
      "Built complete project onboarding workflows streamlining client onboarding by 60%",
      "Developed cross-platform Flutter mobile applications deployed to both iOS and Android",
      "Led frontend architecture decisions for a team of 4 developers",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Flutter", "Node.js", "MongoDB"],
  },
];
