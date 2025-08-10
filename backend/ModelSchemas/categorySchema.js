import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true } // Category name
}, { timestamps: true });

export default mongoose.model("Category", CategorySchema, "categories");
