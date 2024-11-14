import "../styles/globals.css";
import React from "react";
import { AppProps } from "next/app";
import Layout from "@/app/components/layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
