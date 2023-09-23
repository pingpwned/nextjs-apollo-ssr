import Image from "next/image";
import { Inter } from "next/font/google";
import { gql } from "@apollo/client";
import { client } from "@/client";

const inter = Inter({ subsets: ["latin"] });

export default function NativeApolloCache({ date }: any) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24 ${inter.className}`}
    >
      <h1 className="mb-4 text-2xl leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
        {date}
      </h1>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="p-5 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Refresh the page to see new time-stamp every 10 seconds. If you
          refresh faster, you will see cached response. Check server logs for
          more info.
        </p>
      </div>

      <div className="mt-20 relative flex place-items-center">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  );
}

export const getServerSideProps = async () => {
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
    fetchPolicy: "network-only",
    context: {
      fetchOptions: {
        next: { revalidate: 10 },
      },
    },
  });

  return {
    props: {
      date,
    },
  };
};
