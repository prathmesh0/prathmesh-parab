import type { BlogPost } from "@/types";

export const MEDIUM_PROFILE_URL = "https://medium.com/@Esh.";
const MEDIUM_RSS = "https://medium.com/feed/@Esh.";

function extractCoverImage(content: string): string {
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
  if (imgMatch) return imgMatch[1];
  const figureMatch = content.match(/https:\/\/cdn-images[^"'\s]+/);
  if (figureMatch) return figureMatch[0];
  return "";
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadTime(content: string): string {
  const words = stripHtml(content).split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function parsePubDate(dateStr: string): string {
  try {
    return new Date(dateStr).toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

export function parseMediumXml(xml: string): BlogPost[] {
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];
  return items.map((item, i) => {
    const titleMatch =
      item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ?? item.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/) ?? item.match(/<guid[^>]*>([\s\S]*?)<\/guid>/);
    const pubDateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const contentMatch =
      item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/) ??
      item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/);
    const rawContent = contentMatch ? contentMatch[1] : "";
    const summaryRaw = stripHtml(rawContent).slice(0, 200);
    const tags = [...item.matchAll(/<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g)].map((m) => m[1]).slice(0, 4);

    return {
      id: `medium-${i}`,
      title: titleMatch ? titleMatch[1].trim() : "Untitled",
      summary: summaryRaw.length === 200 ? summaryRaw + "..." : summaryRaw,
      coverImage: extractCoverImage(rawContent),
      publishedAt: pubDateMatch ? parsePubDate(pubDateMatch[1]) : new Date().toISOString().split("T")[0],
      readTime: estimateReadTime(rawContent),
      url: linkMatch ? linkMatch[1].trim() : "#",
      tags,
      featured: i === 0,
    };
  });
}

/** Fetches and parses the Medium RSS feed. Throws on network / HTTP failure. */
export async function fetchMediumPosts(revalidate: number): Promise<BlogPost[]> {
  const res = await fetch(MEDIUM_RSS, {
    next: { revalidate },
    headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio-bot/1.0)" },
  });
  if (!res.ok) throw new Error(`Medium RSS returned ${res.status}`);
  return parseMediumXml(await res.text());
}
