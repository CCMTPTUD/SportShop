const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

// Lấy thống kê cho Admin Dashboard
exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    
    // Tổng số đơn hàng
    const totalOrders = await Order.countDocuments();
    
    // Số đơn hàng mới (Pending)
    const newOrders = await Order.countDocuments({ status: "Pending" });

    res.status(200).json({
      totalProducts,
      totalUsers,
      totalOrders,
      newOrders,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống khi lấy report admin", error: error.message });
  }
};
