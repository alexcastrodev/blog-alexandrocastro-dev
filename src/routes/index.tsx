import Post from "../components/common/Post";
import Articles from "../components/common/Articles";
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import getAllPosts from "@alexcastrodev/core/src/services/get-posts";

export const usePosts = routeLoader$(async () => {
  const posts = await getAllPosts();
  return posts;
});

export default component$(() => {
  const posts = usePosts();
  return (
    <Articles>
      {posts.value.map((post) => (
        <Post
          key={post.url}
          title={post.title}
          description={`${post.paragraph.slice(0, 100)}...`}
          url={`/blog/${post.url}`}
        />
      ))}
    </Articles>
  );
});
