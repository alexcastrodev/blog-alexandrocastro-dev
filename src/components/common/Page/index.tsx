import { Slot, component$ } from "@builder.io/qwik";
import styles from "./page.module.css";

export default component$(() => {
  return (
    <div class={styles.page}>
      <Slot />
    </div>
  );
});
