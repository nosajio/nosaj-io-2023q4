import AlertBanner from '@/components/alertBanner/AlertBanner';
import HomePage from '@/components/home/HomePage';
import { getPublishedPosts } from '@/db/posts';
import { saveConfirmationWithToken } from '@/helpers/subscribeHelpers';
import Head from 'next/head';

type HomeProps = {
  searchParams?: {
    token?: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const confirmToken = searchParams?.token;
  const posts = await getPublishedPosts();
  let emailConfirmed = false;

  if (confirmToken) {
    emailConfirmed = await saveConfirmationWithToken(confirmToken);
  }

  return (
    <>
      <Head>
        <title>Jason Howmans</title>
        <meta name="description" content="" />
      </Head>
      {emailConfirmed && (
        <AlertBanner>
          Your email has been confirmed! Thanks for subscribing.
        </AlertBanner>
      )}
      <HomePage posts={posts} />
    </>
  );
}
