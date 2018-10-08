import { MongoClient, Db, Collection } from "mongodb";
import { connect } from "tls";
const { MONGODB = "localhost:27017/reports" } = process.env;

export const run = async <T>(f: (db: Db) => Promise<T>): Promise<T> => {
  let client = await MongoClient.connect(
    MONGODB,
    { useNewUrlParser: true }
  );
  let db = client.db("reports");
  let result = await f(db);
  client.close();
  return result;
};

export const collection = (collection: string) => <T>(
  f: (collection: Collection) => Promise<T>
): Promise<T> => run((db) => f(db.collection(collection)));
