import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

import styles from "./styles.css?inline";
import markedown from "../assets/markdown-light.css?inline";
import Header from "~/components/common/Header";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    public: true,
    maxAge: 5,
    sMaxAge: 10,
    staleWhileRevalidate: 60 * 60 * 24 * 365,
  });
};

export default component$(() => {
  useStyles$(styles);
  useStyles$(markedown);
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
    </>
  );
});
