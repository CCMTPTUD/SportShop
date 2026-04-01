const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Route cho Client / Admin truy xuất danh sách
router.get("/", categoryController.getCategories);

// Route thêm mới (Chỉ Admin)
router.post("/", protect, admin, categoryController.createCategory);

// Route cập nhật (Chỉ Admin)
router.put("/:id", protect, admin, categoryController.updateCategory);

// Route xóa (Chỉ Admin)
router.delete("/:id", protect, admin, categoryController.deleteCategory);

module.exports = router;
