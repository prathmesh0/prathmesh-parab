/**
 * DRAFT case-study copy for flagship projects.
 * Written from the existing project descriptions only — no invented metrics.
 * Review and edit before publishing; keyed by project id.
 */
export interface CaseStudy {
  problem: string;
  approach: string;
  result: string;
}

export const caseStudies: Record<string, CaseStudy> = {
  repolens: {
    problem:
      "Getting oriented in an unfamiliar codebase means opening dozens of files and guessing how they connect, with no shared view of the structure.",
    approach:
      "RepoLens analyses a repository, visualises its file structure and answers questions with context-aware AI assistance. Next.js on the front, an Express and MongoDB service behind it.",
    result:
      "One place to explore a repository, see how it is laid out and ask questions about it. Live and usable today.",
  },
  smartvault: {
    problem:
      "Uploaded documents pile up unlabelled, and users get no feedback while a file is being processed.",
    approach:
      "A file-upload API that streams real-time processing status over Socket.IO and uses Groq AI to generate a summary, category and tags for PDF and TXT files. Files are stored on Cloudinary, metadata in MongoDB.",
    result:
      "Every upload arrives summarised, categorised and tagged, with live status from upload to completion.",
  },
  "rbac-api": {
    problem:
      "Hard-coded roles mean every access change is a code change and a deploy.",
    approach:
      "A database-driven role-based access control API where roles, modules, actions and permissions are managed at runtime. JWT access tokens with refresh-token rotation; requests validated with Zod.",
    result:
      "Permissions can change without redeploying, on an auth flow built to production standards.",
  },
};
