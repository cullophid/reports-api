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
const db_1 = require("./db");
const ramda_1 = require("ramda");
exports.Report = {
    slides: (report) => __awaiter(this, void 0, void 0, function* () {
        console.log(report);
        let { rows } = yield db_1.query("SELECT * FROM slides WHERE report=?", [
            report.id
        ]);
        console.log(rows);
        return rows;
    })
};
exports.fetchReports = () => __awaiter(this, void 0, void 0, function* () {
    let { rows } = yield db_1.query("SELECT * FROM reports", []);
    return rows;
});
exports.createReport = (title) => __awaiter(this, void 0, void 0, function* () {
    let res = yield db_1.query("INSERT INTO reports (title) VALUES (?)", [title]);
    let { rows } = yield db_1.query("SELECT * from reports WHERE id=?", [
        res.rows.insertId
    ]);
    return rows[0];
});
exports.deleteReport = (id) => __awaiter(this, void 0, void 0, function* () {
    let { rows } = yield db_1.query("DELETE FROM reports WHERE id=?", [id]);
    console.log(rows);
    return id;
});
exports.updateReport = (report) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield db_1.beginTransaction();
        yield db_1.query("UPDATE reports SET title=?", [report.title]);
        yield db_1.query("DELETE FROM slides WHERE report=? AND id NOT IN (?)", [
            report.id,
            ramda_1.pluck("id", report.slides)
        ]);
        yield db_1.query("REPLACE INTO slides (id, report, template, title, subtitle, primaryText, secondaryText) VALUES (?)", report.slides.map((slide) => [
            slide.id,
            report.id,
            slide.template,
            slide.title,
            slide.subtitle,
            slide.primaryText,
            slide.secondaryText
        ]));
        yield db_1.commit();
    }
    catch (e) {
        yield db_1.rollback();
        throw e;
    }
    return report;
});
