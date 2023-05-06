import { component$, Slot } from "@builder.io/qwik";
import styles from "./articles.module.css";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class={styles.articles}>
      <Slot />
    </div>
  );
});
