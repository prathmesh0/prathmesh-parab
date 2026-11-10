import { fetchMediumPosts } from "@/lib/medium";
import type { BlogPost } from "@/types";
import { BlogsClient } from "@/components/sections/BlogsClient";

/** Server component: Medium RSS is fetched on the server (ISR, 6h) so the HTML contains the posts. */
export async function BlogsSection() {
  let posts: BlogPost[] = [];
  let failed = false;
  try {
    posts = await fetchMediumPosts(60 * 60 * 6);
  } catch {
    failed = true;
  }
  return <BlogsClient initialPosts={posts} initialFailed={failed} />;
}
