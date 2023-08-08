import { component$ } from "@builder.io/qwik";
import styles from "./latest.module.css";

export default component$(() => {
  return (
    <aside class={styles.container}>
      <a
        class="twitter-timeline"
        href="https://twitter.com/alexoliveira7x?ref_src=twsrc%5Etfw"
      >
        Tweets by alexoliveira7x
      </a>
    </aside>
  );
});
