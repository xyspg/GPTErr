import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Generate grammar errors in your text"
        />
        <meta property="og:site_name" content="Grammar Error Generator" />
        <meta property="og:title" content="GPTErr" />
        <meta
          property="og:image"
          content="https://gpt-err.vercel.app/og-image.png"
        />
        <meta
          property="og:description"
          content="Generate grammar errors in your text"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
      <Analytics />
    </>
  );
}
