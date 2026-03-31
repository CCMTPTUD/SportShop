require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");

const seedAdmin = async () => {
  try {
    // Kết nối Database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Đã kết nối Database thành công.");

    // Kiểm tra xem admin đã tồn tại chưa
    let admin = await User.findOne({ email: "admin@sportshop.com" });
    
    if (admin) {
      console.log("Tài khoản admin mặc định đã tồn tại!");
      // Nâng cấp quyền nếu cần thiết
      if (admin.role !== "admin") {
         admin.role = "admin";
         await admin.save();
         console.log("Đã cập nhật role thành admin cho tài khoản này.");
      }
    } else {
      // Mã hóa mật khẩu
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);

      // Tạo admin
      admin = await User.create({
        fullName: "Administrator",
        email: "admin@sportshop.com",
        password: hashedPassword,
        role: "admin", // Đặt quyền admin
      });
      console.log("Tạo tài khoản admin thành công!");
      console.log("Email: admin@sportshop.com");
      console.log("Mật khẩu: admin123");
    }

    process.exit(); // Thoát chương trình sau khi chạy xong
  } catch (error) {
    console.error("Lỗi khi tạo admin:", error);
    process.exit(1);
  }
};

seedAdmin();
