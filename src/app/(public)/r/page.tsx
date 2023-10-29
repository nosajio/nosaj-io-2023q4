import PostsList from '@/components/posts/PostsList';
import { getPublishedPosts } from '@/db/posts';
import s from './PostsListPage.module.scss';

export default async function PostsListPage() {
  const publishedPosts = await getPublishedPosts();
  return (
    <div className={s.content_grid}>
      <div className={s.grid_content}>
        <PostsList posts={publishedPosts} />
      </div>
    </div>
  );
}
