"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const http_1 = require("http");
const schema_1 = require("./schema");
const middleware_1 = require("graphql-voyager/middleware");
const { PORT = 4000 } = process.env;
const app = express_1.default();
const graphqlServer = new apollo_server_express_1.ApolloServer({ typeDefs: schema_1.typeDefs, resolvers: schema_1.resolvers });
graphqlServer.applyMiddleware({ app });
app.use("/voyager", middleware_1.express({ endpointUrl: "/graphql" }));
const server = http_1.createServer(app);
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
