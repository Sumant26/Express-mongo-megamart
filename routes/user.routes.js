import express from "express";
import { createUser, getUsers } from "../controllers/user.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import { celebrate, Joi, Segments } from "celebrate";

const router = express.Router();

const createSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("user", "admin").optional()
  })
};

router.post("/", celebrate(createSchema), createUser);
router.get("/", protect, adminOnly, getUsers);

export default router;
