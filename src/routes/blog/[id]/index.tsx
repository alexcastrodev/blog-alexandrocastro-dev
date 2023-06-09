import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import getPost from "@alexcastrodev/core/src/services/get-post";

export const usePosts = routeLoader$(async ({ params, redirect }) => {
  const id = Number((params.id as string).split("-").at(-1));
  if (Number.isNaN(id)) {
    throw redirect(302, "/");
  }

  const posts = await getPost(id);
  if (posts === null) {
    throw redirect(302, "/");
  }
  return posts;
});

export default component$(() => {
  const post = usePosts();
  return <div dangerouslySetInnerHTML={post.value?.paragraph}></div>;
});
