const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 1. Middleware kiểm tra người dùng đã đăng nhập (Xác thực Token)
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Lấy token từ header "Bearer xxx"
      token = req.headers.authorization.split(" ")[1];

      // Giải mã token (lấy id user)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Tìm user trong DB bằng id, lưu vào req.user (không lấy password)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Không được phép! Token không hợp lệ" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Không được phép! Không có Token" });
  }
};

// 2. Middleware kiểm tra quyền admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Không được phép! Chỉ dành cho Admin" });
  }
};

module.exports = { protect, admin };
