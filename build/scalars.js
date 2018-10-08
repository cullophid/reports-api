"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const email_validator_1 = require("email-validator");
const mongodb_1 = require("mongodb");
const graphql_1 = require("graphql");
exports.ObjectIdScalar = new graphql_1.GraphQLScalarType({
    name: "ObjectId",
    description: "Mongo db ObjectId",
    serialize: (value) => value.toHexString(),
    parseValue: (value) => new mongodb_1.ObjectId(value),
    parseLiteral: (ast) => ast.kind === "StringValue" ? new mongodb_1.ObjectId(ast.value) : null
});
exports.EmailScalar = new graphql_1.GraphQLScalarType({
    name: "Email",
    description: "Validated email",
    serialize: (value) => value,
    parseValue: (value) => (email_validator_1.validate(value) ? value : null),
    parseLiteral: (ast) => ast.kind === "StringValue" && email_validator_1.validate(ast.value) ? ast.value : null
});
