// restart the server to see the changes..

import mongoose from "mongoose";

const QASchema = new mongoose.Schema(
  {
    // id: {
    //   type: String,
    //   default: ()=>{ return 'q'+ new Date().getTime() + Math.random();}
    // },
    user: {
      type: String,
      require: true,
    },
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProductsSchema = new mongoose.Schema(
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
    subcategory: {
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
    QA: [QASchema],
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
  {
    timestamps: true,
  }
);

export default mongoose.models.product ||
  mongoose.model("product", ProductsSchema);
