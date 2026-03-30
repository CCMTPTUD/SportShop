const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

// Khai báo các API endpoints và gắn với Controller tương ứng
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
