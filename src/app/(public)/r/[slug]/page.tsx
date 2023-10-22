import client from '@/db/client';
import PageLayout from '@/layouts/page/PageLayout';
import PostLayout from '@/layouts/post/PostLayout';
import Head from 'next/head';

export default async function PostPage() {
  const post = await client.post.findUnique({
    where: { slug: 'the-end-of-mastery', published: true },
  });
  if (!post) {
    return null;
  }
  return (
    <PageLayout>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.blurb || ''} />
      </Head>
      <PostLayout post={post} />
    </PageLayout>
  );
}
