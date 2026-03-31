const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Route cho Client / Admin truy xuất danh sách
router.get("/", categoryController.getCategories);

// Route thêm mới (Chỉ Admin)
router.post("/", protect, admin, categoryController.createCategory);

module.exports = router;
