// Nạp các biến môi trường từ file .env
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const brandRoutes = require("./src/routes/brandRoutes");

// Khởi tạo app Express
const app = express();

// Gọi hàm kết nối Database
connectDB();

// Middlewares
app.use(cors()); // Cho phép React gọi API
app.use(express.json()); // Giúp server đọc được dữ liệu JSON từ request body
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);

// Route kiểm tra cơ bản
app.get("/", (req, res) => {
  res.send("Server bán đồ thể thao đang chạy!");
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
