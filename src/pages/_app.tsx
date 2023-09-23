import { client } from "@/client";
import { Navbar } from "@/components/Navbar";
import "@/styles/globals.css";
import { CacheUtil } from "@/utils/cache";
import { gql } from "@apollo/client";
import type { AppContext, AppProps } from "next/app";
import NextApp from "next/app";

export const cacheUtl = new CacheUtil();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

App.getInitialProps = async (context: AppContext) => {
  const ctx = await NextApp.getInitialProps(context);
  const cacheKey = "date";
  const cacheData = cacheUtl.get(cacheKey);

  console.log(cacheData, "cacheData");

  if (cacheData) {
    return {
      ...ctx,
      pageProps: {
        date: cacheData.date,
      },
    };
  }

  const query = gql`
    query {
      date
      __typename
    }
  `;

  const {
    data: { date },
  }: any = await client.query({
    query,
  });

  cacheUtl.set(cacheKey, { date, expiration: Date.now() });

  return {
    ...ctx,
    pageProps: {
      date,
    },
  };
};
