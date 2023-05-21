import { component$, Slot } from "@builder.io/qwik";
import styles from "./articles.module.css";

export default component$(() => {
  return (
    <section class={styles.articles}>
      <Slot />
    </section>
  );
});
