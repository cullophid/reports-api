import { collection } from "../mongo";
import { ObjectID } from "bson";
import { omit } from "ramda";
const run = collection("reports");

type SlideTemplate = "TitleSlide" | "TwoColumn";
type Slide = {
  template: SlideTemplate;
  title: string;
  subtitle: string;
  primaryText: string;
  secondaryText: string;
};
type Report = {
  _id: ObjectID;
  title: string;
};

type ReportUpdate = {
  _id: ObjectID;
  title: string;
  slides: Slide[];
};

type ReportCreate = {
  title: string;
  slides: Slide[];
};

export const Report = {};

export const fetchReports = () => run((reports) => reports.find({}).toArray());

export const fetchReport = (_id: ObjectID) =>
  run((reports) => reports.findOne({ _id }));

export const createReport = async (title: string) => {
  const report: ReportCreate = {
    title,
    slides: [
      {
        template: "TitleSlide",
        title: title,
        subtitle: "",
        primaryText: "",
        secondaryText: ""
      }
    ]
  };
  let res = await run((reports) => reports.insertOne(report));
  return { ...report, _id: res.insertedId };
};

export const deleteReport = async (_id: number) => {
  await run((reports) => reports.deleteOne({ _id }));
  return _id;
};

export const updateReport = async (report: ReportUpdate) => {
  await run((reports) =>
    reports.updateOne({ _id: report._id }, { $set: report })
  );
  return report;
};
