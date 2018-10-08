import mysql from "mysql";
import { resolve } from "path";
const { MYSQL = "localhost:3306" } = process.env;
console.log(MYSQL);
const connection = mysql.createConnection(MYSQL);

export const beginTransaction = (): Promise<void> =>
  new Promise((resolve, reject) => {
    connection.beginTransaction((err) => (err ? reject(err) : resolve()));
  });

export const commit = (): Promise<void> =>
  new Promise((resolve, reject) => {
    connection.commit((err) => (err ? reject(err) : resolve()));
  });

export const rollback = (): Promise<void> =>
  new Promise((resolve) => {
    connection.rollback(() => resolve());
  });

type QueryParam = any;
type Result = {
  rows: any;
  fields?: mysql.FieldInfo[];
};
export const query = (q: string, params: QueryParam[]): Promise<Result> =>
  new Promise((resolve, reject) =>
    connection.query(
      q,
      params,
      (error, rows, fields) =>
        error ? reject(error) : resolve({ rows, fields })
    )
  );

export const transaction = async (
  queries: { query: string; params: QueryParam[] }[]
) => {
  let i = 0;
  connection.beginTransaction((err) => {
    if (err) throw err;
  });
};
