import { validate as validateEmail } from "email-validator";
import { ObjectId } from "mongodb";
import { GraphQLScalarType, validate } from "graphql";
export const ObjectIdScalar = new GraphQLScalarType({
  name: "ObjectId",
  description: "Mongo db ObjectId",
  serialize: (value) => value.toHexString(),
  parseValue: (value) => new ObjectId(value),
  parseLiteral: (ast) =>
    ast.kind === "StringValue" ? new ObjectId(ast.value) : null
});

export const EmailScalar = new GraphQLScalarType({
  name: "Email",
  description: "Validated email",
  serialize: (value) => value,
  parseValue: (value) => (validateEmail(value) ? value : null),
  parseLiteral: (ast) =>
    ast.kind === "StringValue" && validateEmail(ast.value) ? ast.value : null
});
