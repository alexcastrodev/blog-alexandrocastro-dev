import Post from "../components/common/Post";
import Articles from "../components/common/Articles";
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import getAllPosts from "@alexcastrodev/core/src/services/get-posts";
import getRecentLinks from "@alexcastrodev/core/src/services/get-recents-links";

import Latest from "~/components/common/Latest";
import Feed from "~/components/common/Feed";

export const usePosts = routeLoader$(async () => {
  const postsRequest = getAllPosts();
  const recentLinksRequest = getRecentLinks();
  const [posts, recentLinks] = await Promise.all([
    postsRequest,
    recentLinksRequest,
  ]);
  return { posts, recentLinks };
});

export default component$(() => {
  const { value } = usePosts();

  return (
    <Feed>
      <Articles>
        {value.posts.map((post) => (
          <Post
            key={post.url}
            title={post.title}
            description={`${post.paragraph.slice(0, 255)}...`}
            url={`/blog/${post.url}`}
            tags={post.labels}
          />
        ))}
      </Articles>
      <Latest />
    </Feed>
  );
});
