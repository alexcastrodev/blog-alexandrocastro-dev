import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import styles from "./header.module.css";

export default component$(() => {
  return (
    <header class={styles.header}>
      <Link href="/" aria-label="home">
        <h3>👨‍💻 Alexandro castro's Blog</h3>
      </Link>
    </header>
  );
});
