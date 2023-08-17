import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      require: true,
    },
    productName: {
      type: String,
      require: true,
    },
    describtion: {
      type: Array,
      require: true,
    },
    mediaURL: {
      type: Array,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    productFor: {
      type: String,
      require: true,
    },
    size: {
      type: Array,
      default: [],
    },
    color: {
      type: Array,
      default: [],
    },
    ratings: {
      type: Number,
    },
    buyOrNot: {
      type: Number,
    },
    quality: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
