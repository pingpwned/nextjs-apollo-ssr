import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    date: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  date: () => {
    const date = new Date().toString();
    return date;
  },
};

export default graphqlHTTP(() => {
  console.log("hit graphql " + new Date().toString());
  return {
    schema: schema,
    rootValue: root,
    graphiql: true,
  };
});

// You can access the GraphQL endpoint at /api/graphql
