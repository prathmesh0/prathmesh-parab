"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { blogs } from "@/content/blogs";
import { staggerContainer, fadeInUp, scaleIn } from "@/animations/variants";
import { formatDate } from "@/lib/utils";

export function BlogsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [search, setSearch] = useState("");

  const filtered = search
    ? blogs.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      )
    : blogs;

  const featured = filtered.find((b) => b.featured);
  const rest = filtered.filter((b) => !b.featured);

  return (
    <section id="blogs" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.p variants={fadeInUp} className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
            Writing
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-black">
            Latest <span className="gradient-text">Blogs</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Thoughts, tutorials, and deep-dives on frontend development, performance, and more.
          </motion.p>
        </motion.div>

        {/* Search */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-center mb-10"
        >
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </motion.div>

        {/* Featured blog */}
        {featured && (
          <motion.a
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block mb-8 bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto bg-gradient-to-br from-indigo-500/20 to-purple-600/20">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="gradient" className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Featured
                  </Badge>
                  {featured.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                  {featured.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{featured.summary}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(featured.publishedAt)}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.readTime}</span>
                </div>
                <Button variant="gradient" size="sm" className="self-start">
                  Read Article <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.a>
        )}

        {/* Rest */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {rest.map((blog) => (
            <motion.a
              key={blog.id}
              variants={scaleIn}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
            >
              <div className="relative h-44 bg-gradient-to-br from-indigo-500/20 to-purple-600/20">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {blog.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <h3 className="font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">{blog.summary}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(blog.publishedAt)}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{blog.readTime}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* View all */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mt-10"
        >
          <Button variant="outline" size="lg" asChild>
            <a href="https://medium.com/@prathmeshparab" target="_blank" rel="noopener noreferrer">
              View All Articles on Medium
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
