import HomePage from '@/components/home/HomePage';
import { getPublishedPosts } from '@/db/posts';
import Head from 'next/head';

export default async function Home() {
  const posts = await getPublishedPosts();
  return (
    <>
      <Head>
        <title>Jason Howmans</title>
        <meta name="description" content="" />
      </Head>
      <HomePage posts={posts} />
    </>
  );
}
