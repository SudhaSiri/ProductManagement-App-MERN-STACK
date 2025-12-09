import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, default: "NA" },
});

export default mongoose.model("Product", productSchema);
