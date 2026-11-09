import type { Profile, Stat } from '@/types';

export const profile: Profile = {
  name: 'Prathmesh Parab',
  title: 'Software Engineer & Frontend Developer',
  taglines: [
    'Frontend Developer',
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Software Engineer',
    'AI Enthusiast',
  ],
  description:
    'Building impactful products that solve meaningful problems and create lasting value for users. 🚀',
  email: 'prathmeshparab010@gmail.com',
  location: 'Mumbai, India',
  avatar: '/images/myp.png',
  resume: '/resume.pdf',
};

/** Verified metrics from the experience entry (shown in the impact strip). */
export const impactMetrics = [
  { value: 85, suffix: '%', label: 'less manual operations', source: 'Role-based financial automation platform' },
  { value: 40, suffix: '%', label: 'faster project onboarding', source: 'Onboarding & approval system' },
  { value: 30, suffix: '%', label: 'faster response time', source: 'Flutter app, offline sync, maps, TTS' },
];

export const stats: Stat[] = [
  {
    label: 'Years Experience',
    value: 2,
    suffix: '+',
    description: 'Professional development experience',
  },
  {
    label: 'Projects Delivered',
    value: 7,
    suffix: '+',
    description: 'Built and launched end-to-end digital products',
  },
  {
    label: 'Users Impacted',
    value: 8000,
    suffix: '+',
    description:
      'Estimated reach across enterprise and public-facing solutions',
  },
  {
    label: 'DSA Problems Solved',
    value: 300,
    suffix: '+',
    description: 'On LeetCode & TakeUForward',
  },
];
