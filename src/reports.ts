import { query, beginTransaction, rollback, commit } from "./db";
import { run } from "./mongo";
import { pluck, props } from "ramda";

type SlideTemplate = "TitleSlide" | "TwoColumn";
type Slide = {
  id: number;
  template: SlideTemplate;
  report: number;
  title: string;
  subtitle: string;
  primaryText: string;
  secondaryText: string;
};
type Report = {
  id: number;
  title: string;
};

type ReportUpdate = {
  id: number;
  title: string;
  slides: Slide[];
};

export const Report = {
  slides: async (report: Report) => {
    console.log(report);
    let { rows } = await query("SELECT * FROM slides WHERE report=?", [
      report.id
    ]);
    console.log(rows);
    return rows;
  }
};
export const fetchReports = async () => {
  let { rows } = await query("SELECT * FROM reports", []);
  return rows;
};

export const createReport = async (title: string) => {
  let res = await query("INSERT INTO reports (title) VALUES (?)", [title]);
  let { rows } = await query("SELECT * from reports WHERE id=?", [
    res.rows.insertId
  ]);
  return rows[0];
};

export const deleteReport = async (id: number) => {
  let { rows } = await query("DELETE FROM reports WHERE id=?", [id]);
  console.log(rows);
  return id;
};

export const updateReport = async (report: ReportUpdate) => {
  try {
    await beginTransaction();
    await query("UPDATE reports SET title=?", [report.title]);
    await query("DELETE FROM slides WHERE report=? AND id NOT IN (?)", [
      report.id,
      pluck("id", report.slides)
    ]);
    await query(
      "REPLACE INTO slides (id, report, template, title, subtitle, primaryText, secondaryText) VALUES (?)",
      report.slides.map((slide) => [
        slide.id,
        report.id,
        slide.template,
        slide.title,
        slide.subtitle,
        slide.primaryText,
        slide.secondaryText
      ])
    );
    await commit();
  } catch (e) {
    await rollback();
    throw e;
  }
  return report;
};
