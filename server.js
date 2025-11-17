import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { errors as celebrateErrors } from "celebrate";

dotenv.config();

const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// celebrate errors middleware
app.use(celebrateErrors());
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

// only start server if not in test env
if (process.env.NODE_ENV !== "test") {
  startServer();
}

export default app;
