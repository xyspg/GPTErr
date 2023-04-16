import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>GPTErr</title>
        <meta
          name="description"
          content="Generate grammar errors in your text"
        />
        <meta property="og:site_name" content="Grammar Error Generator" />
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
      <Component {...pageProps} />
    </>
  );
}
