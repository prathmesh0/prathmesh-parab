export interface Profile {
  name: string;
  title: string;
  taglines: string[];
  description: string;
  email: string;
  location: string;
  avatar: string;
  resume: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  logo?: string;
  period: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  url: string;
  tags: string[];
  featured: boolean;
}

export interface Social {
  name: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}
