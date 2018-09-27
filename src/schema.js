const { gql } = require("apollo-server-express");
module.exports = gql`
  scalar DateTime

  type Report {
    id: ID!
    createdAt: DateTime
    createdBy: User
    title: String
    pages: [Page!]!
    organisation: Organisation
  }

  type Page {
    id: ID!
    type: PageType
    createdAt: DateTime
    title: String!
    subtitle: String!
    primaryText: String
    secondaryText: String
  }

  enum PageType {
    TwoTextColumns
    OneTextColumn
  }

  type User {
    id: ID!
    firstname: String
    lastname: String
    email: String
    address: Address
    subscriptions: [Subscription]
  }

  type Subscription {
    report: Report
    interval: Int
    subscribers: [User]
  }
  type Organisation {
    id: ID!
    name: String
    users: [User]
    reports: [Report]
    billingAddress: Address
  }

  type Address {
    addressLine1: String
    addressLine2: String
    zip: String
    city: String
    postcode: String
    country: String
  }

  type Query {
    reports: [Report!]!
    organisations: [Organisation]
  }
`;
