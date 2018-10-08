"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const { MYSQL = "localhost:3306" } = process.env;
console.log(MYSQL);
const connection = mysql_1.default.createConnection(MYSQL);
exports.beginTransaction = () => new Promise((resolve, reject) => {
    connection.beginTransaction((err) => (err ? reject(err) : resolve()));
});
exports.commit = () => new Promise((resolve, reject) => {
    connection.commit((err) => (err ? reject(err) : resolve()));
});
exports.rollback = () => new Promise((resolve) => {
    connection.rollback(() => resolve());
});
exports.query = (q, params) => new Promise((resolve, reject) => connection.query(q, params, (error, rows, fields) => error ? reject(error) : resolve({ rows, fields })));
exports.transaction = (queries) => __awaiter(this, void 0, void 0, function* () {
    let i = 0;
    connection.beginTransaction((err) => {
        if (err)
            throw err;
    });
});
