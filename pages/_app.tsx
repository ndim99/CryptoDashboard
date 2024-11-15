import "../styles/globals.css";
import React from "react";
import { AppProps } from "next/app";
import Layout from "@/app/components/Layout";
import { AppProvider } from "@/providers/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}
