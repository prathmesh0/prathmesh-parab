import { NextResponse } from 'next/server';
import type { BlogPost } from '@/types';

const MEDIUM_RSS = 'https://medium.com/feed/@Esh.';

function extractCoverImage(content: string): string {
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
  if (imgMatch) return imgMatch[1];
  const figureMatch = content.match(/https:\/\/cdn-images[^"'\s]+/);
  if (figureMatch) return figureMatch[0];
  return '';
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function estimateReadTime(content: string): string {
  const words = stripHtml(content).split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function extractTags(categories: string[]): string[] {
  return categories.slice(0, 4);
}

function parsePubDate(dateStr: string): string {
  try {
    return new Date(dateStr).toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

function parseXML(xml: string): BlogPost[] {
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];
  const posts: BlogPost[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const titleMatch =
      item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ??
      item.match(/<title>([\s\S]*?)<\/title>/);
    const title = titleMatch ? titleMatch[1].trim() : 'Untitled';

    const linkMatch =
      item.match(/<link>([\s\S]*?)<\/link>/) ??
      item.match(/<guid[^>]*>([\s\S]*?)<\/guid>/);
    const url = linkMatch ? linkMatch[1].trim() : '#';

    const pubDateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const publishedAt = pubDateMatch
      ? parsePubDate(pubDateMatch[1])
      : new Date().toISOString().split('T')[0];

    const contentMatch =
      item.match(
        /<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/,
      ) ?? item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/);
    const rawContent = contentMatch ? contentMatch[1] : '';

    const summaryRaw = stripHtml(rawContent).slice(0, 200);
    const summary = summaryRaw.length === 200 ? summaryRaw + '...' : summaryRaw;

    const coverImage = extractCoverImage(rawContent);
    const readTime = estimateReadTime(rawContent);

    const categoryMatches = [
      ...item.matchAll(/<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g),
    ];
    const tags = extractTags(categoryMatches.map((m) => m[1]));

    posts.push({
      id: `medium-${i}`,
      title,
      summary,
      coverImage,
      publishedAt,
      readTime,
      url,
      tags,
      featured: i === 0,
    });
  }

  return posts;
}

export async function GET() {
  try {
    const res = await fetch(MEDIUM_RSS, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; portfolio-bot/1.0)' },
    });

    if (!res.ok) {
      throw new Error(`Medium RSS returned ${res.status}`);
    }

    const xml = await res.text();
    const posts = parseXML(xml);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    console.error('[/api/blogs] fetch error:', err);
    return NextResponse.json(
      { posts: [], error: 'Failed to fetch blogs' },
      { status: 200 },
    );
  }
}
