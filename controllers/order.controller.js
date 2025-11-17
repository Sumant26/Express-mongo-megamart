import mongoose from "mongoose";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// Create order without transaction (simple)
export const createOrder = async (req, res, next) => {
  try {
    const { user, products } = req.body; // products: [{ product, quantity }]
    let total = 0;
    for (const item of products) {
      const p = await Product.findById(item.product);
      if (!p) return res.status(400).json({ message: "Invalid product" });
      total += p.price * item.quantity;
    }
    const order = await Order.create({ user, products, totalAmount: total });
    res.status(201).json(order);
  } catch (err) { next(err); }
};

// Checkout with transaction to decrement stock and create order atomically
export const checkout = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { user, products } = req.body;
    let total = 0;

    for (const item of products) {
      const productDoc = await Product.findById(item.product).session(session);
      if (!productDoc) throw new Error("Product not found");
      if (productDoc.stock < item.quantity) throw new Error(`Insufficient stock for ${productDoc.name}`);

      total += productDoc.price * item.quantity;

      productDoc.stock -= item.quantity;
      await productDoc.save({ session });
    }

    const order = await Order.create([{ user, products, totalAmount: total }], { session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(order[0]);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user").populate("products.product");
    res.json(orders);
  } catch (err) { next(err); }
};
