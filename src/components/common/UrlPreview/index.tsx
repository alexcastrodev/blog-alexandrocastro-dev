import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import styles from "./url-preview.module.css";

interface PreviewCard {
  url: string;
  content: string;
  title: string;
}

export default component$<PreviewCard>(({ url, content, title }) => {
  const metadata = useSignal<any>({});

  useTask$(async () => {
    try {
      const response = await fetch(url);
      const plain = await response.text();

      if (response.ok && plain) {
        const pageTitle = plain.match(/<title>(.*?)<\/title>/)?.at(1) || "";
        const pageDescription = plain
          .match(/<meta name="description" content="(.*?)">/)
          ?.at(1);

        const pageImage = plain
          .match(/<meta property="og:image" content="(.*?)">/)
          ?.at(1);

        const data = {
          title: pageTitle,
          description: pageDescription,
          image: pageImage,
        };

        metadata.value = data;
      }
    } catch (error) {
      console.warn(error);
    }
  });

  return (
    <article class={styles.container}>
      <h6>{metadata.value.title || title}</h6>
      {metadata.value.description ? (
        <p>{metadata.value.description}</p>
      ) : (
        content
      )}

      {metadata.value.image && (
        <img
          width={200}
          height={100}
          src={metadata.value.image}
          alt={metadata.value.title}
        />
      )}
    </article>
  );
});
