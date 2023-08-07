import { Slot, component$ } from "@builder.io/qwik";
import styles from "./feed.module.css";

export default component$(() => {
  return (
    <div class={styles.container}>
      <Slot />
    </div>
  );
});
