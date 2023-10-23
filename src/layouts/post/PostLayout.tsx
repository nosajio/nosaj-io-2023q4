import { Post } from '@prisma/client';
import clsx from 'clsx';
import { CSSProperties } from 'react';
import s from './PostLayout.module.scss';

type PostLayoutProps = {
  post: Post;
};

const calculateReadingTime = (content: string) => {
  const wpm = 200;
  const numWords = content.split(/\s/g).length;
  const minutes = numWords / wpm;
  return Math.ceil(minutes);
};

const formatDate = (date: Date) => {
  const monthShort = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day} ${monthShort}${
    year !== new Date().getFullYear() ? ` ${year}` : ''
  }`;
};

export default function PostLayout({ post }: PostLayoutProps) {
  const readingTime = calculateReadingTime(post.markdown);
  const pubdate = formatDate(post.pubDate);

  return (
    <div className={clsx(s.post, s.grid_content)} role="article">
      <header className={s.header} role="heading" aria-level={1}>
        <h1 className={s.title}>{post.title}</h1>
        <ul className={s.meta}>
          <li className={s.meta_item}>
            <time dateTime={post.pubDate.toISOString()}>{pubdate}</time>
          </li>
          <li className={s.meta_item}>{readingTime} minutes</li>
        </ul>
      </header>
      {post.blurb && <p className={s.blurb}>{post.blurb}</p>}
      {post.coverImage && (
        <div
          className={s.cover}
          style={{ '--url': `url('${post.coverImage}')` } as CSSProperties}
        />
      )}
      <div className={s.body} dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
}
