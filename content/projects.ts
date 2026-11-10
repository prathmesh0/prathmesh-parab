import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'repolens',
    title: 'RepoLens',
    description:
      'AI-powered developer platform for repository analysis, codebase exploration, file structure visualization, and context-aware assistance.',
    image: '/images/projects/repolens-v2.png',
    imageWidth: 1897,
    imageHeight: 829,
    technologies: ['Next.js', 'TypeScript', 'Express.js', 'MongoDB', 'AI'],
    liveUrl: 'https://repolens-frontend.vercel.app/',
    featured: true,
    flagship: true,
    category: 'AI / Web',
  },
  {
    id: 'innerbalance',
    title: 'InnerBalance',
    description:
      'A mental wellness platform focused on mood tracking, self-reflection, and improving emotional well-being.',
    image: '/images/projects/innerbalance.png',
    imageWidth: 1085,
    imageHeight: 1450,
    gallery: [
      { src: '/images/projects/innerbalance.png', width: 1085, height: 1450 },
      { src: '/images/projects/innerbalance1.jpeg', width: 720, height: 1600 },
      { src: '/images/projects/innerbalance2.jpeg', width: 720, height: 1600 },
    ],
    technologies: ['Flutter', 'Firebase', 'Express.js', 'Dart'],
    githubUrl: 'https://github.com/sahilwaradkar/innerbalance',
    featured: true,
    flagship: true,
    category: 'Mobile / Health',
  },
  {
    id: 'simpliadmission',
    title: 'SimpliAdmission',
    description:
      'Helping students simplify college admissions through detailed college insights, cutoffs, and guidance resources.',
    image: '/images/projects/simpliAdmission.jpeg',
    imageWidth: 736,
    imageHeight: 1089,
    gallery: [
      { src: '/images/projects/simpliAdmission1.jpeg', width: 720, height: 1600 },
      { src: '/images/projects/simpliAdmission.jpeg', width: 736, height: 1089 },
      { src: '/images/projects/simpliAdmission2.jpeg', width: 720, height: 1600 },
    ],
    technologies: ['Android', 'Java', 'Firebase'],
    githubUrl: 'https://github.com/prathmesh0/SimpliAdmission',
    featured: true,
    flagship: true,
    category: 'Mobile / Education',
  },
  {
    id: 'visitlume',
    title: 'VisitLume AI',
    description:
      'AI-powered website visitor intelligence for small businesses, turning anonymous visitors into customers with behaviour analytics, lead capture, and AI next-best-actions.',
    longDescription:
      'Multi-tenant SaaS monorepo: a JS tracker snippet collects visitor behaviour, BullMQ workers turn it into KPIs, leads, and AI next steps, and won/lost outcomes flow back to prove revenue attribution. Includes a Next.js dashboard, an Express event-ingest service, background workers, and a browser SDK.',
    image: '/images/projects/visitlume.svg',
    technologies: ['Next.js', 'TypeScript', 'Express.js', 'MongoDB', 'Redis', 'BullMQ', 'Turborepo', 'AI'],
    featured: true,
    inProgress: true,
    category: 'AI / Web',
  },
  {
    id: 'smartvault',
    title: 'SmartVault',
    description:
      'File upload API with real-time processing status via Socket.IO and AI-generated summaries, categories, and tags for PDF/TXT documents.',
    image: '/images/projects/smartvault.svg',
    technologies: ['Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'Socket.IO', 'Groq AI', 'Cloudinary'],
    githubUrl: 'https://github.com/prathmesh0/SmartVault',
    featured: true,
    category: 'Backend / AI',
  },
  {
    id: 'rbac-api',
    title: 'RBAC API',
    description:
      'Production-grade, database-driven role-based access control API with runtime-managed roles, modules, actions, and permissions plus JWT refresh-token rotation.',
    image: '/images/projects/rbac-api.svg',
    technologies: ['Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'JWT', 'Zod'],
    githubUrl: 'https://github.com/prathmesh0/rbac-be',
    featured: true,
    category: 'Backend',
  },
  {
    id: 'task-manager-api',
    title: 'Task Manager API',
    description:
      'Task management backend with Clerk authentication, per-user task ownership, status and priority tracking, rate limiting, and Swagger API docs.',
    image: '/images/projects/task-manager.svg',
    technologies: ['Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'Clerk', 'Swagger'],
    githubUrl: 'https://github.com/prathmesh0/task-manager-be',
    featured: false,
    category: 'Backend',
  },
  {
    id: 'video-streaming',
    title: 'Video Streaming Backend',
    description:
      'Scalable backend service for video uploading, streaming, authentication, and content management using modern backend practices.',
    image: '/images/projects/video-streaming.jpg',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary'],
    githubUrl: 'https://github.com/prathmesh0/video-streaming-backend',
    featured: false,
    category: 'Backend',
  },
  {
    id: 'vortex',
    title: 'Vortex',
    description:
      'AI-powered virtual assistant capable of generating text, images, and intelligent responses through conversational interactions.',
    image: '/images/projects/vortexx.jpeg',
    technologies: ['Flutter', 'OpenAI', 'Dart'],
    githubUrl: 'https://github.com/prathmesh0/Vortex',
    featured: false,
    category: 'AI / Mobile',
  },
  {
    id: 'expense-tracker',
    title: 'Expense Tracker',
    description:
      'Personal finance management application for tracking expenses, budgets, and spending habits with ease.',
    image: '/images/projects/expense.jpeg',
    technologies: ['Flutter', 'Firebase', 'Dart'],
    githubUrl:
      'https://github.com/prathmesh0/https---github.com-prathmesh0-Expense_Tracker',
    featured: false,
    category: 'Mobile / Finance',
  },
  {
    id: 'maggie',
    title: 'Maggie - Virtual Assistant',
    description:
      'Voice-controlled Python assistant capable of automating tasks, executing commands, and improving productivity.',
    image: '/images/projects/maggie.png',
    technologies: ['Python', 'Speech Recognition'],
    githubUrl: 'https://github.com/prathmesh0/VIRTUAL-ASSISTANT-Maggie',
    featured: false,
    category: 'AI / Python',
  },
  {
    id: 'meal-app',
    title: 'Meal App',
    description:
      'Recipe discovery application featuring categorized meals, detailed instructions, and personalized filtering options.',
    image: '/images/projects/meal.jpeg',
    technologies: ['Flutter', 'Dart'],
    githubUrl: 'https://github.com/prathmesh0/Meal_App',
    featured: false,
    category: 'Mobile / Flutter',
  },
];
