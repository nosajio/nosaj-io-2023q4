import { Post } from "@prisma/client";
import clsx from "clsx";
import s from "./PostLayout.module.scss";

type PostLayoutProps = {
  post: Post;
};

export default function PostLayout({ post }: PostLayoutProps) {
  return (
    <div className={clsx(s.post, s.grid_content)}>
      <header>
        <h1>{post.title}</h1>
        <p>{post.blurb}</p>
      </header>
    </div>
  );
}
