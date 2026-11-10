import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "lauren-it",
    role: "Associate Frontend Developer",
    company: "Lauren Information Technology",
    companyUrl: "https://www.laurengroup.ai/",
    period: "Aug 2024 - Present",
    startDate: "2024-08",
    current: true,
    description:
      "Building scalable web and mobile products across enterprise, AI and transportation domains, working directly with cross-functional teams and US-based clients from concept to production.",
    projects: [
      {
        name: "Dubai Education Marketplace",
        kind: "Education marketplace",
        current: true,
        description:
          "Microsites for Dubai schools and universities where students and parents compare institutions and get AI match scores. Now shipping change requests and new features.",
        highlights: ["Institution microsites", "Comparison", "AI match score", "New CRs & features"],
      },
      {
        name: "Transportation Management Platform",
        kind: "Live US transportation platform",
        description:
          "Owned end-to-end modules, including route setup that recalculates timings automatically as stops change.",
        highlights: ["RBAC", "Paratransit", "Route setup", "Stop allocation map", "Family onboarding", "Auto-save drafts"],
      },
      {
        name: "SecuritizePro",
        kind: "Financial automation",
        description:
          "Led the frontend of a role-based platform covering onboarding, deal verification and portfolio management.",
        highlights: ["Next.js", "TypeScript", "Shadcn UI", "L1/L2 roles", "Approver flows"],
      },
      {
        name: "PMO",
        kind: "Project Management Operations",
        description:
          "Revamped internal workflows for onboarding, approvals and RFP assignment across sales and delivery.",
        highlights: ["Admin roles", "Master data", "Dashboards", "Approval workflows"],
      },
      {
        name: "Finalyze AI",
        kind: "Cloud cost management",
        description:
          "Built provisioning workflows and cross-provider cost comparison, backed by validations and end-to-end tests.",
        highlights: ["Provisioning", "Cost comparison", "Field validations", "E2E testing"],
      },
      {
        name: "Ask Tara",
        kind: "Pharma chatbot",
        description:
          "Improved engagement on an existing chatbot with quick actions, contextual insights and smarter greetings.",
        highlights: ["Quick-access buttons", "Insight triggers", "Greeting flows"],
      },
      {
        name: "Offline Data Sync",
        kind: "Proof of concept",
        description:
          "Flutter app proving offline-first sync, with maps and text-to-speech for field use.",
        highlights: ["Flutter", "Offline sync", "Google Maps", "Text-to-speech"],
      },
    ],
    technologies: [],
  },
];
