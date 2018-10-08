import { gql } from "apollo-server-express";
import { ObjectIdScalar } from "./scalars";
import { EmailScalar } from "./scalars";
import {
  Report,
  fetchReports,
  createReport,
  deleteReport,
  updateReport,
  fetchReport
} from "./data/reports";
export const typeDefs = gql`
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

export const resolvers = {
  ObjectID: ObjectIdScalar,
  Email: EmailScalar,
  Report,
  Query: {
    reports: () => fetchReports(),
    report: (_: any, { _id }: any) => fetchReport(_id)
  },
  Mutation: {
    createReport: (_: any, { title }: any) => createReport(title || "Untitled"),
    deleteReport: (_: any, { _id }: any) => deleteReport(_id),
    updateReport: (_: any, { report }: any) => updateReport(report)
  }
};
