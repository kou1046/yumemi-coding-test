import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" style={{ minHeight: "100%" }}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <body style={{ minHeight: "100%" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
