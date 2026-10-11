import { MongoClient } from "mongodb";

const uri = process.env.BETTER_AUTH_DB_URL;
const databaseName = process.env.BETTER_AUTH_DB_NAME;

if (!uri) {
  throw new Error("BETTER_AUTH_DB_URL must be set in the environment.");
}

if (!databaseName) {
  throw new Error("BETTER_AUTH_DB_NAME must be set in the environment.");
}

const globalForMongo = globalThis;
const client = globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

export const db = client.db(databaseName);
export { client };