import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: `https://${process.env.VERCEL_URL}/api/graphql`,
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy: "no-cache",
      fetchPolicy: "no-cache",
    },
  },
});

// export async function getStandaloneApolloClient() {
//   const { ApolloClient, InMemoryCache, HttpLink } = await import(
//     "@apollo/client"
//   );
//   return new ApolloClient({
//     ssrMode: true,
//     link: new HttpLink({
//       uri: "http://localhost:3005/graphql",
//     }),
//     cache: new InMemoryCache(),
//   });
// }
