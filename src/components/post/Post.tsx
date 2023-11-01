import { calculateReadingTime, formatDateFull } from '@/helpers/postHelpers';
import { Post } from '@prisma/client';
import cn from 'classnames';
import { CSSProperties } from 'react';
import Subscribe from '../subscribe/Subscribe';
import s from './Post.module.scss';

type PostProps = {
  post: Post;
};

export default function Post({ post }: PostProps) {
  const readingTime = calculateReadingTime(post.markdown);
  const pubdate = formatDateFull(post.pubDate);

  return (
    <div className={s.content_grid}>
      <div className={cn(s.post, s.grid_content)} role="article">
        <header className={s.header} role="heading" aria-level={1}>
          <h1 className={s.title}>{post.title}</h1>
          <ul className={s.meta}>
            <li className={s.meta_item}>
              <time dateTime={post.pubDate.toISOString()}>{pubdate}</time>
            </li>
            <li className={s.meta_item}>{readingTime} minutes</li>
          </ul>
          {/* {post.blurb && <p className={s.blurb}>{post.blurb}</p>} */}
        </header>
        {post.coverImage && (
          <div
            className={s.cover}
            style={{ '--url': `url('${post.coverImage}')` } as CSSProperties}
          />
        )}
        <div
          className={s.body}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <footer className={s.footer}>
          <Subscribe email rss />
        </footer>
      </div>
    </div>
  );
}
