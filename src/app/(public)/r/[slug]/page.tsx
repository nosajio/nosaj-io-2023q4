import client from '@/db/client';
import PageLayout from '@/layouts/page/PageLayout';
import PostLayout from '@/layouts/post/PostLayout';
import Head from 'next/head';

export async function generateStaticParams() {
  const posts = await client.post.findMany({
    where: { published: true },
  });
  return posts.map(p => ({
    slug: p.slug,
  }));
}

type PostPageProps = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: PostPageProps) {
  const post = await client.post.findUnique({
    where: { slug: params.slug, published: true },
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
