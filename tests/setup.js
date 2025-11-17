import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

/**
 * Starts in-memory mongo and connects mongoose.
 * Returns the mongod instance and the URI.
 */
export async function startInMemoryMongo() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  await mongoose.disconnect();
  await mongoose.connect(uri, { dbName: "test" });
  return { mongod, uri };
}

export async function stopInMemoryMongo(mongod) {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
}
