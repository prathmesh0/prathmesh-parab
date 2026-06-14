"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Search, Star, AlertCircle, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, fadeInUp, scaleIn } from "@/animations/variants";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

function SkeletonFeatured() {
  return (
    <div className="mb-8 bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-64 md:h-72 bg-muted" />
        <div className="p-8 flex flex-col justify-center gap-4">
          <div className="flex gap-2">
            <div className="h-5 w-20 bg-muted rounded-full" />
            <div className="h-5 w-16 bg-muted rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="h-7 w-3/4 bg-muted rounded-lg" />
            <div className="h-7 w-1/2 bg-muted rounded-lg" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-4/6 bg-muted rounded" />
          </div>
          <div className="flex gap-4">
            <div className="h-3.5 w-24 bg-muted rounded" />
            <div className="h-3.5 w-20 bg-muted rounded" />
          </div>
          <div className="h-9 w-32 bg-muted rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
      <div className="h-36 bg-muted" />
      <div className="p-4 space-y-2.5">
        <div className="flex gap-1.5">
          <div className="h-4 w-14 bg-muted rounded-full" />
          <div className="h-4 w-14 bg-muted rounded-full" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3.5 w-full bg-muted rounded" />
          <div className="h-3.5 w-3/4 bg-muted rounded" />
        </div>
        <div className="space-y-1">
          <div className="h-3 w-full bg-muted rounded" />
          <div className="h-3 w-5/6 bg-muted rounded" />
        </div>
        <div className="flex justify-between pt-0.5">
          <div className="h-2.5 w-20 bg-muted rounded" />
          <div className="h-2.5 w-16 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}

function BlogImage({ src, alt, fill }: { src: string; alt: string; fill?: boolean }) {
  const [errored, setErrored] = useState(false);

  const fallback = (
    <div
      className="w-full h-full"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--gradient-start) 30%, transparent), color-mix(in srgb, var(--gradient-end) 20%, transparent))",
      }}
    />
  );

  if (!src || errored) return fallback;

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover group-hover:scale-105 transition-transform duration-500"
      onError={() => setErrored(true)}
      unoptimized
    />
  );
}

export function BlogsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.posts && Array.isArray(data.posts)) {
          setBlogs(data.posts);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setIsSearching(true);
    const t = setTimeout(() => {
      setDebouncedSearch(value);
      setIsSearching(false);
    }, 350);
    return () => clearTimeout(t);
  }, []);

  const filtered = debouncedSearch
    ? blogs.filter(
        (b) =>
          b.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          b.tags.some((t) => t.toLowerCase().includes(debouncedSearch.toLowerCase()))
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
            Ideas, insights, and lessons learned - one article at a time.
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
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Initial load skeleton */}
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SkeletonFeatured />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            </motion.div>
          ) : isSearching ? (
            /* Search debounce skeleton */
            <motion.div
              key="searching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
            </motion.div>
          ) : error ? (
            /* Error state */
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center py-20 gap-4 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-7 w-7 text-destructive" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Could not load blogs</p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Unable to fetch articles from Medium right now.
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="https://medium.com/@Esh." target="_blank" rel="noopener noreferrer">
                  Visit Medium directly
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          ) : filtered.length === 0 ? (
            /* Empty / no results */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center py-20 gap-4 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <SearchX className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">
                  {blogs.length === 0 ? "No blogs yet" : "No results found"}
                </p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  {blogs.length === 0
                    ? "Check back soon for new articles."
                    : `No blogs match "${debouncedSearch}". Try a different keyword.`}
                </p>
              </div>
              {search && (
                <button
                  onClick={() => { setSearch(""); handleSearch(""); }}
                  className="text-xs font-medium text-primary hover:underline underline-offset-4 transition-all"
                >
                  Clear search
                </button>
              )}
            </motion.div>
          ) : (
            /* Content */
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
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
                    <div className="relative h-64 md:h-auto min-h-[16rem]">
                      <BlogImage src={featured.coverImage} alt={featured.title} fill />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge variant="gradient" className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Featured
                        </Badge>
                        {featured.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-3">
                        {featured.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">{featured.summary}</p>
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

              {/* Rest grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {rest.map((blog) => (
                  <motion.a
                    key={blog.id}
                    variants={scaleIn}
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="relative h-36">
                      <BlogImage src={blog.coverImage} alt={blog.title} fill />
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {blog.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">{tag}</Badge>
                        ))}
                      </div>
                      <h3 className="font-semibold text-sm text-foreground mb-1.5 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed mb-2.5 line-clamp-2">{blog.summary}</p>
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-2.5 w-2.5" />{formatDate(blog.publishedAt)}</span>
                        <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" />{blog.readTime}</span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View all */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mt-10"
        >
          <Button variant="outline" size="lg" asChild>
            <a href="https://medium.com/@Esh." target="_blank" rel="noopener noreferrer">
              View All Articles on Medium
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
