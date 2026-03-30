const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    stock: { type: Number, required: true, default: 0 },

    // THÊM 2 TRƯỜNG NÀY VÀO:
    rating: {
      type: Number,
      required: true,
      default: 0, // Điểm đánh giá trung bình (vd: 4.5 sao)
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0, // Tổng số lượt đã đánh giá
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
