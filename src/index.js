const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const voyager = require("graphql-voyager/middleware");
const schema = require("./schema");
// Construct a schema, using GraphQL schema language

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {}
};

const server = new ApolloServer({ typeDefs: schema, resolvers });

const app = express();
server.applyMiddleware({ app });

app.get("/voyager", voyager.express({ endpointUrl: "/graphql" }));

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
