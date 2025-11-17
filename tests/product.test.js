import request from "supertest";
import app from "../server.js";
import { startInMemoryMongo, stopInMemoryMongo } from "./setup.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

let mongod;

beforeAll(async () => {
  const res = await startInMemoryMongo();
  mongod = res.mongod;
  // create an admin user and get token
  const register = await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "admin@example.com",
    password: "adminpass",
    role: "admin"
  });
});

afterAll(async () => {
  await stopInMemoryMongo(mongod);
});

afterEach(async () => {
  await Product.deleteMany({});
  await User.deleteMany({});
});

describe("Products", () => {
  test("admin can create product", async () => {
    // register admin
    const reg = await request(app).post("/api/auth/register").send({
      name: "Admin",
      email: "admin@example.com",
      password: "adminpass",
      role: "admin"
    });
    const token = reg.body.token;

    const payload = { name: "Test product", price: 10, category: "test", stock: 5 };
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(payload)
      .expect(201);

    expect(res.body.name).toBe(payload.name);
  });

  test("public can get products list", async () => {
    // insert a product directly
    await Product.create({ name: "p1", price: 5, stock: 3 });
    const res = await request(app).get("/api/products").expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("non-admin cannot create product", async () => {
    const u = await request(app).post("/api/auth/register").send({
      name: "User",
      email: "u@example.com",
      password: "userpass",
      role: "user"
    });
    const token = u.body.token;
    await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "x", price: 1 })
      .expect(403);
  });
});
