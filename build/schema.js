"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const reports_1 = require("./reports");
exports.typeDefs = apollo_server_express_1.gql `
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
exports.resolvers = {
    Report: reports_1.Report,
    Query: {
        reports: () => reports_1.fetchReports()
    },
    Mutation: {
        createReport: (_, { title }) => reports_1.createReport(title || "Untitled"),
        deleteReport: (_, { id }) => reports_1.deleteReport(id),
        updateReport: (_, { report }) => __awaiter(this, void 0, void 0, function* () {
            let res = yield reports_1.updateReport(report);
            console.log(res);
            return res;
        })
    }
};
