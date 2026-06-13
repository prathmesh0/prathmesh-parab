import type { BlogPost } from "@/types";

export const blogs: BlogPost[] = [
  {
    id: "nextjs-performance",
    title: "Mastering Next.js Performance: From Core Web Vitals to 100 Lighthouse",
    summary:
      "Deep dive into Next.js optimization techniques including image optimization, code splitting, caching strategies, and server components.",
    coverImage: "/images/blogs/nextjs-performance.jpg",
    publishedAt: "2024-11-15",
    readTime: "8 min read",
    url: "https://medium.com/@prathmeshparab",
    tags: ["Next.js", "Performance", "Web Dev"],
    featured: true,
  },
  {
    id: "flutter-firebase",
    title: "Building Production-Ready Flutter Apps with Firebase",
    summary:
      "A comprehensive guide to integrating Firebase services into Flutter applications - from Auth to Firestore to Cloud Functions.",
    coverImage: "/images/blogs/flutter-firebase.jpg",
    publishedAt: "2024-09-20",
    readTime: "10 min read",
    url: "https://medium.com/@prathmeshparab",
    tags: ["Flutter", "Firebase", "Mobile"],
    featured: false,
  },
  {
    id: "typescript-patterns",
    title: "Advanced TypeScript Patterns Every Developer Should Know",
    summary:
      "Explore conditional types, mapped types, template literal types, and other advanced TypeScript patterns for writing bulletproof code.",
    coverImage: "/images/blogs/typescript-patterns.jpg",
    publishedAt: "2024-07-10",
    readTime: "6 min read",
    url: "https://medium.com/@prathmeshparab",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    featured: false,
  },
];
