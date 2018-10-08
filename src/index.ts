import env from "dotenv";
env.config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import { typeDefs, resolvers } from "./schema";

const { PORT = 4000 } = process.env;
const app = express();

const graphqlServer = new ApolloServer({ typeDefs, resolvers });

graphqlServer.applyMiddleware({ app });

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
