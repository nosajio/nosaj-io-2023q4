import Post from '@/components/post/Post';
import client from '@/db/client';
import { Metadata } from 'next';
import Head from 'next/head';

type PostPageProps = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params: { slug },
}: PostPageProps): Promise<Metadata> => {
  const post = await client.post.findUnique({
    where: { slug, published: true },
  });
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.blurb || '',
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
    openGraph: {
      images: post?.coverImage ? [post.coverImage] : undefined,
      title: post.title,
      description: post.blurb || '',
      type: 'article',
    },
    twitter: {
      title: post.title,
      description: post.blurb || '',
      images: post?.coverImage ? [post.coverImage] : undefined,
      card: 'summary_large_image',
      creator: '@nosajio',
    },
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
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.blurb || ''} />
      </Head>
      <Post post={post} />
    </>
  );
}
