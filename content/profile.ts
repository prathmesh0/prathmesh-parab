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
    'I craft high-performance, visually stunning web experiences. Currently building financial automation platforms and Flutter apps at Lauren IT.',
  email: 'prathmeshparab010@gmail.com',
  location: 'Mumbai, India',
  avatar: '/images/avatar.jpeg',
  resume: '/resume.pdf',
};

export const stats: Stat[] = [
  {
    label: 'Years Experience',
    value: 2,
    suffix: '+',
    description: 'Professional development experience',
  },
  {
    label: 'Projects Delivered',
    value: 10,
    suffix: '+',
    description: 'End-to-end products shipped',
  },
  {
    label: 'Users Reached',
    value: 5000,
    suffix: '+',
    description: 'Across platforms and apps',
  },
  {
    label: 'DSA Problems Solved',
    value: 300,
    suffix: '+',
    description: 'On LeetCode & TakeUForward',
  },
];
