import { component$ } from "@builder.io/qwik";
import styles from "./latest.module.css";
import type { IRecentLink } from "@alexcastrodev/core/src/types/RecentLink";
import { Link } from "@builder.io/qwik-city";
import UrlPreview from "../UrlPreview";

interface ILatestProps {
  data: IRecentLink[];
}
export default component$(({ data }: ILatestProps) => {
  return (
    <aside class={styles.container}>
      <div class={styles.block}>
        <div class={styles.header}>
          <h2 class={styles.title}>Latest Links</h2>
        </div>
        <div class={styles.body}>
          {data.map((link) => (
            <Link key={link.link}>
              <UrlPreview
                url={link.link}
                content={link.p}
                title={link.summary}
              />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
});
