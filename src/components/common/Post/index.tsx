import { component$ } from "@builder.io/qwik";
import styles from "./post.module.css";
import { Link } from "@builder.io/qwik-city";

interface PostProps {
  title: string;
  description: string;
  url: string;
  tags?: string[];
}

export default component$<PostProps>(
  ({ title, description, url, tags = [] }) => {
    return (
      <article class={styles.section}>
        <Link href={url}>
          <h3 class={styles.description}>{title}</h3>
          <p class={styles.description}>{description}</p>
        </Link>
        {tags.length > 0 && (
          <div class={styles.footer}>
            {tags.map((tag) => (
              <span key={tag} class={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    );
  }
);
