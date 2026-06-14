import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'repolens',
    title: 'RepoLens',
    description:
      'AI-powered developer platform for repository analysis, codebase exploration, file structure visualization, and context-aware assistance.',
    image: '/images/projects/repolens.png',
    technologies: ['Next.js', 'TypeScript', 'Express.js', 'MongoDB', 'AI'],
    liveUrl: 'https://repolens-frontend.vercel.app/login',
    featured: true,
    category: 'AI / Web',
  },
  {
    id: 'innerbalance',
    title: 'InnerBalance',
    description:
      'A mental wellness platform focused on mood tracking, self-reflection, and improving emotional well-being.',
    image: '/images/projects/innerbalance.png',
    technologies: ['Flutter', 'Firebase', 'Express.js', 'Dart'],
    githubUrl: 'https://github.com/sahilwaradkar/innerbalance',
    featured: true,
    category: 'Mobile / Health',
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
    id: 'simpliadmission',
    title: 'SimpliAdmission',
    description:
      'Helping students simplify college admissions through detailed college insights, cutoffs, and guidance resources.',
    image: '/images/projects/simpliAdmission.jpeg',
    technologies: ['Android', 'Java', 'Firebase'],
    githubUrl: 'https://github.com/prathmesh0/SimpliAdmission',
    featured: false,
    category: 'Mobile / Education',
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
