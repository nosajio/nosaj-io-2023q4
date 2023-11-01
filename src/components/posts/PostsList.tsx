import { formatDate } from '@/helpers/postHelpers';
import { Post } from '@prisma/client';
import Link from 'next/link';
import s from './PostsList.module.scss';

type PostsListProps = {
  posts: Post[];
};

export default function PostsList({ posts }: PostsListProps) {
  return (
    <div className={s.posts}>
      <header className={s.posts_header}>
        <h1 className={s.posts_title}>All Posts</h1>
      </header>
      {posts.map(p => (
        <Link key={p.id} href={`/r/${p.slug}`}>
          <div className={s.post}>
            <div className={s.post_date}>
              {formatDate(p.pubDate, true, true)}
            </div>
            <h2 className={s.post_title}>{p.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
