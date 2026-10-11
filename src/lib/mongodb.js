import { MongoClient } from "mongodb";

// During `next build` the database is never queried, so a missing connection
// string should not fail the build. Fall back to a placeholder URI there and
// only require the real variables at runtime.
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

const uri = process.env.BETTER_AUTH_DB_URL ?? (isBuildPhase ? "mongodb://127.0.0.1:27017" : undefined);
const databaseName = process.env.BETTER_AUTH_DB_NAME ?? (isBuildPhase ? "build-placeholder" : undefined);

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
