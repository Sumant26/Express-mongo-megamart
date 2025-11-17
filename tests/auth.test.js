import request from "supertest";
import app from "../server.js";
import { startInMemoryMongo, stopInMemoryMongo } from "./setup.js";
import User from "../models/user.model.js";

let mongod;
beforeAll(async () => {
  const res = await startInMemoryMongo();
  mongod = res.mongod;
});

afterAll(async () => {
  await stopInMemoryMongo(mongod);
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("Auth: register and login", () => {
  test("register new user -> returns token", async () => {
    const payload = { name: "Test", email: "t@example.com", password: "password123" };
    const res = await request(app).post("/api/auth/register").send(payload).expect(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe(payload.email);
  });

  test("login with correct credentials", async () => {
    // create user directly
    await request(app).post("/api/auth/register").send({ name: "T", email: "a@b.com", password: "pass123" });
    const res = await request(app).post("/api/auth/login").send({ email: "a@b.com", password: "pass123" }).expect(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("a@b.com");
  });

  test("login fails with wrong password", async () => {
    await request(app).post("/api/auth/register").send({ name: "T", email: "x@y.com", password: "pass123" });
    await request(app).post("/api/auth/login").send({ email: "x@y.com", password: "wrong" }).expect(401);
  });
});
