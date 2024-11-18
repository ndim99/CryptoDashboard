import "../styles/globals.css";
import React from "react";
import { AppProps } from "next/app";
import Layout from "@/app/components/Layout";
import { AppProvider } from "@/providers/app";
import { ThemeProvider } from "next-themes";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange
      defaultTheme="dark"
    >
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </ThemeProvider>
  );
}
