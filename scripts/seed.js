import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/product.model.js";

dotenv.config();

const products = [
  { name: "Apple iPhone 15", description: "Latest iPhone", price: 699, stock: 50, category: "smartphones" },
  { name: "Samsung Galaxy S25", description: "Android flagship", price: 649, stock: 40, category: "smartphones" },
  { name: "Logitech Mouse", description: "Wireless mouse", price: 29, stock: 200, category: "accessories" }
];

const run = async () => {
  await connectDB(process.env.MONGODB_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Seeded products");
  process.exit(0);
};

run();
