import express from "express";
import { createOrder, getOrders, checkout } from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/", protect, createOrder);
router.post("/checkout", protect, checkout);
router.get("/", protect, getOrders);

export default router;
