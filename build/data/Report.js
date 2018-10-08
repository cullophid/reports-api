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
const mongo_1 = require("../mongo");
const run = mongo_1.collection("reports");
exports.Report = {};
exports.fetchReports = () => __awaiter(this, void 0, void 0, function* () {
    let res = yield run((reports) => reports.find({}).toArray());
    console.log(res);
    return res;
});
exports.createReport = (title) => __awaiter(this, void 0, void 0, function* () {
    const report = {
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
    let res = yield run((reports) => reports.insertOne(report));
    return Object.assign({}, report, { _id: res.insertedId });
});
exports.deleteReport = (_id) => __awaiter(this, void 0, void 0, function* () {
    let res = yield run((reports) => reports.deleteOne({ _id }));
    console.log(res);
    return _id;
});
exports.updateReport = (report) => __awaiter(this, void 0, void 0, function* () {
    let res = yield run((reports) => reports.updateOne({ _id: report._id }, { $set: report }));
    return report;
});
