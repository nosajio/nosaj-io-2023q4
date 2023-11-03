import PostsList from '@/components/posts/PostsList';
import { getPublishedPosts } from '@/db/posts';
import { unsubscribeSubscriber } from '@/helpers/subscribeHelpers';
import s from './UnsubscribePage.module.scss';

type UnsubscribePageProps = {
  searchParams?: {
    token?: string;
    eid?: string;
  };
};

export default async function UnsubscribePage({
  searchParams,
}: UnsubscribePageProps) {
  const posts = await getPublishedPosts();
  const { token, eid } = searchParams ?? {};
  const result = token ? await unsubscribeSubscriber(token, eid) : false;

  return (
    <div className={s.content_grid}>
      <div className={s.grid_content}>
        <div className={s.section}>
          {!result && (
            <>
              <h1>Thanks for being a subscriber to nosaj.io</h1>
              <p>❤️ Sorry to see you go.</p>
            </>
          )}
        </div>
        <div className={s.section}>
          <h2 className={s.section_title}>Latest Posts</h2>
          <PostsList posts={posts} />
        </div>
      </div>
    </div>
  );
}
