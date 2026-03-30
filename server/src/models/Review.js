const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    // THÊM TRƯỜNG NÀY ĐỂ LƯU ẢNH:
    images: [
      {
        type: String, // Lưu trữ các đường dẫn (URL) của hình ảnh
      },
    ],
  },
  { timestamps: true },
);

// Đảm bảo một người dùng chỉ được đánh giá 1 lần cho 1 sản phẩm
reviewSchema.index({ product_id: 1, user_id: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
