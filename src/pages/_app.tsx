import { Navbar } from "@/components/Navbar";
import { ApiDataProvider } from "@/providers/ApiContextProvider";
import "@/styles/globals.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <ApiDataProvider>
        <Component {...pageProps} />
      </ApiDataProvider>
    </>
  );
}
