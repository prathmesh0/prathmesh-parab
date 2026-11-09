import { NextResponse } from 'next/server';
import { fetchMediumPosts } from '@/lib/medium';

export async function GET() {
  try {
    const posts = await fetchMediumPosts(3600);
    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    console.error('[/api/blogs] fetch error:', err);
    return NextResponse.json(
      { posts: [], error: 'Failed to fetch blogs' },
      { status: 200 },
    );
  }
}
