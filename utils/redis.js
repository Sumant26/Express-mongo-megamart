// import { createClient } from "redis";

// const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
// const client = createClient({ url: redisUrl });
// client.on("error", (err) => console.error("Redis Client Error", err));

// (async () => {
//   try {
//     await client.connect();
//     console.log("Redis connected");
//   } catch (e) {
//     console.warn("Redis not available", e.message);
//   }
// })();

// export default client;


import { createClient } from "redis";

let client;

try {
  client = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
  });

  client.on("error", (err) => {
    console.log("⚠ Redis not running. Continuing without cache...");
  });

  client.connect();
} catch (err) {
  console.log("⚠ Redis failed to initialize:", err.message);
}

export default client;
