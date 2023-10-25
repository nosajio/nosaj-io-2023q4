import client from './client';

export async function getPublishedPosts() {
  const posts = await client.post.findMany({
    where: { published: true },
    orderBy: { pubDate: 'desc' },
    include: { author: true },
  });
  if (!posts) {
    throw new Error('No posts found');
  }
  return posts;
}

export async function getPostBySlug(slug: string) {
  const post = await client.post.findUnique({
    where: { slug },
    include: { author: true },
  });
  return post;
}
