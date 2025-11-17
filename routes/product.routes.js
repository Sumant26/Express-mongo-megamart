import express from "express";
import { celebrate, Joi, Segments } from "celebrate";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

const createSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().allow(""),
    price: Joi.number().min(0).required(),
    category: Joi.string().optional(),
    stock: Joi.number().integer().min(0).optional(),
    images: Joi.array().items(Joi.string().uri()).optional()
  })
};

const updateSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    description: Joi.string().allow("").optional(),
    price: Joi.number().min(0).optional(),
    category: Joi.string().optional(),
    stock: Joi.number().integer().min(0).optional(),
    images: Joi.array().items(Joi.string().uri()).optional()
  })
};

router.post("/", protect, adminOnly, celebrate(createSchema), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, adminOnly, celebrate(updateSchema), updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
