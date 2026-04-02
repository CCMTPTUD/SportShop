const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Route cho Client / Admin truy xuất danh sách
router.get("/", brandController.getBrands);

// Route thêm mới (Chỉ Admin)
router.post("/", protect, admin, brandController.createBrand);

// Route cập nhật (Chỉ Admin)
router.put("/:id", protect, admin, brandController.updateBrand);

// Route xóa (Chỉ Admin)
router.delete("/:id", protect, admin, brandController.deleteBrand);

module.exports = router;
