const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, admin } = require("../middlewares/authMiddleware");

// Thống kê Dashboard (yêu cầu quyền Admin)
router.get("/dashboard", protect, admin, adminController.getDashboardStats);

module.exports = router;
