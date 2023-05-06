import { component$ } from "@builder.io/qwik";
import styles from "./footer.module.css";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <footer class={styles.footer}>
      <span class={styles.text}>
        Create with by ❤️‍🔥{" "}
        <Link
          rel="github"
          href="https://github.com/AlexcastroDev"
          target="_blank"
        >
          Alexandro Castro
        </Link>
      </span>
    </footer>
  );
});
