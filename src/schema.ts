import { gql } from "apollo-server-express";
import {
  Report,
  fetchReports,
  createReport,
  deleteReport,
  updateReport
} from "./reports";
export const typeDefs = gql`
  enum SlideTemplate {
    TitleSlide
    TwoColumn
  }
  type Slide {
    id: Int!
    template: SlideTemplate!
    title: String!
    subtitle: String!
    primaryText: String!
    secondaryText: String!
  }
  input SlideUpdate {
    id: Int!
    template: SlideTemplate!
    title: String!
    subtitle: String!
    primaryText: String!
    secondaryText: String!
  }
  type Report {
    id: Int!
    title: String!
    slides: [Slide!]!
  }

  input ReportUpdate {
    id: Int!
    title: String!
    slides: [SlideUpdate!]!
  }
  type Query {
    reports: [Report!]!
  }
  type Mutation {
    createReport(title: String): Report
    updateReport(report: ReportUpdate!): Report
    deleteReport(id: ID!): ID!
  }
`;
export const resolvers = {
  Report,
  Query: {
    reports: () => fetchReports()
  },
  Mutation: {
    createReport: (_: any, { title }: any) => createReport(title || "Untitled"),
    deleteReport: (_: any, { id }: any) => deleteReport(id),
    updateReport: async (_: any, { report }: any) => {
      let res = await updateReport(report);
      console.log(res);
      return res;
    }
  }
};
