// // import { buildSchema } from "graphql";
// // import { graphqlHTTP } from "express-graphql";
// // import { ApolloServer } from "@apollo/server";
// // import { NextApiRequest, NextApiResponse } from "next";

// // // Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   type Query {
//     date: String
//   }
// `);

// // // The root provides a resolver function for each API endpoint
// const root = {
//   date: () => {
//     const date = new Date().toString();
//     return date;
//   },
// };

// // // export default graphqlHTTP(() => {
// // //   console.log("hit graphql " + new Date().toString());
// // //   return {
// // //     schema: schema,
// // //     rootValue: root,
// // //     graphiql: true,
// // //   };
// // // });

// // const apolloServer = new ApolloServer({
// //   schema,
// //   rootValue: root,
// // });

// // const startServer = apolloServer.start();

// // export default async function handler(
// //   req: NextApiRequest,
// //   res: NextApiResponse
// // ) {
// //   await startServer;
// //   await apolloServer.createHandler({
// //     path: "/api/graphql",
// //   })(req, res);
// // }

// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // };

// // // You can access the GraphQL endpoint at /api/graphql

// import { gql, ApolloServer } from "apollo-server-micro";
// import { buildSchema } from "graphql";
// import { NextApiRequest, NextApiResponse } from "next";

// const typeDefs = gql`
//   type Query {
//     date: String
//   }
// `;

// const resolvers = {
//   Query: {
//     date: () => {
//       const date = new Date().toString();
//       return date;
//     },
//   },
// };

// const apolloServer = new ApolloServer({
//   schema,
//   rootValue: root,
// });

// const startServer = apolloServer.start();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   await startServer;
//   await apolloServer.createHandler({
//     path: "/api/graphql",
//   })(req, res);
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";

const resolvers = {
  Query: {
    date: () => new Date().toString(),
  },
};

const typeDefs = gql`
  type Query {
    date: String
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export default handler;
