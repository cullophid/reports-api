import { MongoClient } from "mongodb";
import { connect } from "tls";
const { MONGODB = "localhost:27017/reports" } = process.env;

export const run = async (f: Function) => {
  let client = await MongoClient.connect(MONGODB);
  let db = client.db("reports");
  let result = await f(db);
  client.close();
  return result;
};
