import { component$ } from "@builder.io/qwik";
import styles from "./post.module.css";

interface PostProps {
  title: string;
  description: string;
}

export default component$<PostProps>(({ title, description }) => {
  return (
    <section class={styles.section}>
      <h3>{title}</h3>
      <p>{description}</p>
    </section>
  );
});
