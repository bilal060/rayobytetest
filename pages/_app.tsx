import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Head from "next/head";
import VwoScript from './vwo.js'
import FreshChat from './freshChat.js'

const Hydrated = ({ children }: { children?: any }) => {
  const [hydration, setHydration] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHydration(true);
    }
  }, []);
  return hydration ? children : hydration;
};

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Hydrated>
      {/* Start VWO Async SmartCode  */}
      <link rel="preconnect" href="https://dev.visualwebsiteoptimizer.com" />
      <VwoScript />
      {/* End VWO Async SmartCode  */}

      {/*Start Fresh Chat */}
      <FreshChat />
      {/*End Fresh Chat */}

      <Head>
        <title>Rayobyte</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

      </Head>
      {/* <Script strategy="afterInteractive" id="gtm-script">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-W35D5RC');
          `}
      </Script> */}

      <Component {...pageProps} />
      {/* <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-W35D5RC"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript> */}
    </Hydrated>
  );
}
