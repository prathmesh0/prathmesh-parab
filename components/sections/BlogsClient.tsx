"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Search, SearchX } from "lucide-react";
import type { BlogPost } from "@/types";
import { MEDIUM_PROFILE_URL } from "@/lib/medium";
import { formatDate } from "@/lib/utils";
import { EASE_OUT, SPRING_UI } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionLabel } from "@/components/motion/SectionLabel";
import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";

const INITIAL_VISIBLE = 3;

function Cover({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);
  if (!src || errored) return <div aria-hidden className="size-full bg-accent" />;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 700px, 100vw"
      className="object-cover"
      onError={() => setErrored(true)}
      unoptimized
    />
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  const frame = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <Reveal>
      <a href={post.url} target="_blank" rel="noopener noreferrer" className="group grid-12 items-end gap-y-8">
        <div ref={frame} className="relative col-span-12 aspect-[16/10] overflow-hidden rounded-sm border border-border bg-surface lg:col-span-7">
          <motion.div className="absolute -inset-[10%]" style={reduced ? undefined : { y }}>
            <Cover src={post.coverImage} alt="" />
          </motion.div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-brand">Featured</span> · {formatDate(post.publishedAt)} · {post.readTime}
          </p>
          <h3 className="mt-4 text-3xl font-medium leading-tight tracking-tight transition-colors group-hover:text-brand md:text-4xl">
            {post.title}
          </h3>
          <p className="mt-4 line-clamp-4 text-muted-foreground">{post.summary}</p>
          <p className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm">
            Read Article <ArrowUpRight className="size-4 transition-transform duration-[240ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </p>
        </div>
      </a>
    </Reveal>
  );
}

function PostRow({ post }: { post: BlogPost }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: EASE_OUT, layout: SPRING_UI }}
      className="border-b border-border"
    >
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid gap-x-6 gap-y-2 py-6 md:grid-cols-12 md:items-baseline"
      >
        <p className="font-mono text-xs text-muted-foreground md:col-span-3">
          {formatDate(post.publishedAt)} · {post.readTime}
        </p>
        <div className="md:col-span-7">
          <h4 className="text-xl font-medium tracking-tight transition-colors group-hover:text-brand">{post.title}</h4>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{post.summary}</p>
          {post.tags.length > 0 && (
            <p className="mt-2 font-mono text-xs text-muted-foreground">{post.tags.slice(0, 3).join(" · ")}</p>
          )}
        </div>
        <ArrowUpRight
          aria-hidden
          className="hidden size-5 text-muted-foreground transition-transform duration-[240ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:col-span-2 md:block md:justify-self-end"
        />
      </a>
    </motion.li>
  );
}

interface Props {
  initialPosts: BlogPost[];
  initialFailed: boolean;
}

export function BlogsClient({ initialPosts, initialFailed }: Props) {
  const [posts, setPosts] = useState(initialPosts);
  // If the server fetch failed, retry once from the client via the API route.
  const [status, setStatus] = useState<"ready" | "retrying" | "error">(initialFailed ? "retrying" : "ready");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!initialFailed) return;
    let cancelled = false;
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data: { posts?: BlogPost[] }) => {
        if (cancelled) return;
        if (Array.isArray(data.posts) && data.posts.length > 0) {
          setPosts(data.posts);
          setStatus("ready");
        } else setStatus("error");
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => {
      cancelled = true;
    };
  }, [initialFailed]);

  const query = search.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      query
        ? posts.filter(
            (b) =>
              b.title.toLowerCase().includes(query) ||
              b.summary.toLowerCase().includes(query) ||
              b.tags.some((t) => t.toLowerCase().includes(query)),
          )
        : posts,
    [posts, query],
  );

  const featured = query ? undefined : filtered[0];
  const rest = query ? filtered : filtered.slice(1);
  const visibleRest = query || showAll ? rest : rest.slice(0, INITIAL_VISIBLE);

  return (
    <section id="blogs" className="section-padding border-t border-border">
      <div className="container-grid">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="05">Writing</SectionLabel>
            <SplitLines text="Latest Blogs" em="Blogs" className="text-heading mt-4" />
          </div>
          <label className="relative block w-full md:w-64">
            <span className="sr-only">Search articles</span>
            <Search aria-hidden className="absolute left-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles"
              className="h-11 w-full border-b border-border bg-transparent pl-7 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand"
            />
          </label>
        </div>

        {status === "retrying" && (
          <div aria-busy className="mt-12 grid-12 gap-y-8">
            <div className="col-span-12 aspect-[16/10] animate-pulse rounded-sm bg-accent lg:col-span-7" />
            <div className="col-span-12 space-y-3 lg:col-span-5">
              <div className="h-8 w-3/4 animate-pulse rounded bg-accent" />
              <div className="h-4 w-full animate-pulse rounded bg-accent" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-accent" />
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="mt-12 flex flex-col items-start gap-3 border-t border-border pt-8 text-muted-foreground">
            <p>Unable to fetch articles from Medium right now.</p>
            <a
              href={MEDIUM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 font-mono text-sm text-foreground hover:text-brand"
            >
              Visit Medium directly <ArrowUpRight className="size-4" />
            </a>
          </div>
        )}

        {status === "ready" && (
          <div className="mt-12" aria-live="polite">
            {featured && <FeaturedPost post={featured} />}

            {rest.length > 0 && (
              <ul className={featured ? "mt-16 border-t border-border" : "border-t border-border"}>
                <AnimatePresence mode="popLayout" initial={false}>
                  {visibleRest.map((p) => (
                    <PostRow key={p.id} post={p} />
                  ))}
                </AnimatePresence>
              </ul>
            )}

            {filtered.length === 0 && (
              <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
                <SearchX className="size-6" />
                <p>No articles match &ldquo;{search.trim()}&rdquo;.</p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              {!query && rest.length > INITIAL_VISIBLE ? (
                <button
                  type="button"
                  onClick={() => setShowAll((v) => !v)}
                  className="inline-flex min-h-11 items-center font-mono text-sm text-muted-foreground hover:text-foreground"
                >
                  {showAll ? "Show fewer" : `Show all ${rest.length}`}
                </button>
              ) : (
                <span />
              )}
              <a
                href={MEDIUM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-1.5 font-mono text-sm hover:text-brand"
              >
                All writing
                <ArrowUpRight className="size-4 transition-transform duration-[240ms] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
