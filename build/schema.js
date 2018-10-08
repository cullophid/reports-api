"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const scalars_1 = require("./scalars");
const scalars_2 = require("./scalars");
const reports_1 = require("./data/reports");
exports.typeDefs = apollo_server_express_1.gql `
  scalar Email
  scalar ObjectID
  enum SlideTemplate {
    TitleSlide
    TwoColumn
  }
  type Slide {
    template: SlideTemplate!
    title: String!
    subtitle: String!
    primaryText: String!
    secondaryText: String!
  }
  input SlideUpdate {
    template: SlideTemplate!
    title: String!
    subtitle: String!
    primaryText: String!
    secondaryText: String!
  }
  type Report {
    _id: ObjectID!
    title: String!
    slides: [Slide!]!
  }

  input ReportUpdate {
    _id: ObjectID!
    title: String!
    slides: [SlideUpdate!]!
  }
  type Query {
    reports: [Report!]!
    report(_id: ObjectID!): Report!
  }
  type Mutation {
    createReport(title: String): Report!
    updateReport(report: ReportUpdate!): Report!
    deleteReport(_id: ObjectID!): ObjectID!
  }
`;
exports.resolvers = {
    ObjectID: scalars_1.ObjectIdScalar,
    Email: scalars_2.EmailScalar,
    Report: reports_1.Report,
    Query: {
        reports: () => reports_1.fetchReports(),
        report: (_, { _id }) => reports_1.fetchReport(_id)
    },
    Mutation: {
        createReport: (_, { title }) => reports_1.createReport(title || "Untitled"),
        deleteReport: (_, { _id }) => reports_1.deleteReport(_id),
        updateReport: (_, { report }) => reports_1.updateReport(report)
    }
};
