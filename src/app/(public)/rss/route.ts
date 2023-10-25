import { ROOT_URL } from '@/config/constants';
import { getPublishedPosts } from '@/db/posts';
import { marked } from 'marked';
import { NextResponse } from 'next/server';
import RSS, { type FeedOptions } from 'rss';

const feedUrl = `${ROOT_URL}/rss`;

export async function GET() {
  const posts = await getPublishedPosts();
  const options: FeedOptions = {
    title: 'nosaj.io',
    description: 'Posts by Jason Howmans',
    feed_url: feedUrl,
    site_url: ROOT_URL,
  };
  const feed = new RSS(options);

  posts.forEach(post => {
    const html = marked.parse(post.markdown);
    feed.item({
      title: post.title,
      description: html,
      url: `${ROOT_URL}/r/${post.slug}`,
      date: post.pubDate,
      author: post.author.name,
    });
  });

  const res = new NextResponse(feed.xml(), {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });

  return res;
}
