import { Post } from '@prisma/client';
import clsx from 'clsx';
import Link from 'next/link';
import PostsList from '../posts/PostsList';
import Subscribe from '../subscribe/Subscribe';
import s from './HomePage.module.scss';

type HomePageProps = {
  posts: Post[];
};

export default function HomePage({ posts }: HomePageProps) {
  const latestPost = posts[0];
  return (
    <div className={clsx(s.home, s.grid_content)}>
      {/* Latest post */}
      <section className={s.section}>
        <h1 className={s.section_title}>Latest</h1>
        <Link href={`/r/${latestPost.slug}`}>
          <section className={s.latestPost}>
            <h2 className={s.latestPost_title}>{latestPost.title}</h2>
            {latestPost.blurb && (
              <p className={s.latestPost_blurb}>{latestPost.blurb}</p>
            )}
          </section>
        </Link>
      </section>

      {/* Subscribe */}
      <section className={s.section}>
        <h1 className={s.section_title}>Subscribe</h1>
        <Subscribe email rss />
      </section>

      {/* Posts */}
      <section className={s.section}>
        <h1 className={s.section_title}>All posts</h1>
        <PostsList posts={posts} />
      </section>
    </div>
  );
}
