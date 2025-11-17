import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, index: true },
    stock: { type: Number, default: 0 },
    images: [String],
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// text index for simple search
productSchema.index({ name: "text", description: "text" });

export default mongoose.model("Product", productSchema);
