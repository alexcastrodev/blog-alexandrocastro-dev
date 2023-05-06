import { component$ } from "@builder.io/qwik";
import styles from "./post.module.css";
import { Link } from "@builder.io/qwik-city";

interface PostProps {
  title: string;
  description: string;
  url: string;
}

export default component$<PostProps>(({ title, description, url }) => {
  return (
    <Link class={styles.section} href={url}>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
});
