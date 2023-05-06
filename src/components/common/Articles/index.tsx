import { component$, Slot } from "@builder.io/qwik";
import styles from "./articles.module.css";

export default component$(() => {
  return (
    <div class={styles.articles}>
      <Slot />
    </div>
  );
});
