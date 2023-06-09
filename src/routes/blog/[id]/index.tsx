import { component$ } from "@builder.io/qwik";
import type {
  DocumentHead,
  StaticGenerateHandler,
} from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import getPost from "@alexcastrodev/core/src/services/get-post";
import getFirstImageSource from "@alexcastrodev/core/src/utils/get-og-image";

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

export const head: DocumentHead = ({ resolveValue, params }) => {
  const post = resolveValue(usePosts);
  return {
    title: post.title,
    meta: [
      {
        name: "description",
        content: post.paragraph.slice(0, 100),
      },
      {
        name: "id",
        content: params.id,
      },
      {
        property: "og:title",
        content: post.title,
      },
      {
        property: "og:description",
        content: post.title,
      },
      {
        property: "og:image",
        content: getFirstImageSource(post.paragraph) || "",
      },
    ],
  };
};

export default component$(() => {
  const post = usePosts();
  return <div dangerouslySetInnerHTML={post.value?.paragraph}></div>;
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  const ids = ["code-spliting-com-nextjs-2"];

  return {
    params: ids.map((id) => {
      return { id };
    }),
  };
};
