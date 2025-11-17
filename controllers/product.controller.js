import Product from "../models/product.model.js";
import redisClient from "../utils/redis.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    try { await redisClient.del("products:all"); } catch (e) {}
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const cached = await redisClient.get("products:all");
    if (cached) return res.json(JSON.parse(cached));

    const { q, category, min, max, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q };
    if (category) filter.category = category;
    if (min || max) filter.price = {};
    if (min) filter.price.$gte = Number(min);
    if (max) filter.price.$lte = Number(max);

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .exec();

    try { await redisClient.setEx("products:all", 60, JSON.stringify(products)); } catch (e) {}

    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) { next(err); }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    try { await redisClient.del("products:all"); } catch (e) {}
    res.json(product);
  } catch (err) { next(err); }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    try { await redisClient.del("products:all"); } catch (e) {}
    res.json({ message: "Deleted" });
  } catch (err) { next(err); }
};
