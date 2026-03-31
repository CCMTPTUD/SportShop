const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Lấy danh sách sản phẩm
router.get("/", productController.getAllProducts);

// Lấy chi tiết 1 sản phẩm
router.get("/:id", productController.getProductById);

// Thêm sản phẩm
router.post("/", protect, admin, productController.createProduct);

// Cập nhật sản phẩm
router.put("/:id", protect, admin, productController.updateProduct);

// Xóa sản phẩm
router.delete("/:id", protect, admin, productController.deleteProduct);

module.exports = router;
