require("dotenv").config();
const mongoose = require("mongoose");
const Brand = require("./src/models/Brand");
const Category = require("./src/models/Category");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Đã kết nối Database thành công.");

    // Xóa dữ liệu cũ (tùy chọn)
    await Brand.deleteMany({});
    await Category.deleteMany({});

    // Thêm Brands
    const brands = [
      { name: "Nike" },
      { name: "Adidas" },
      { name: "Puma" },
      { name: "NewBalance" },
      { name: "Onitsuka Tiger" },
    ];
    await Brand.insertMany(brands);
    console.log("Đã tạo bảng Brands thành công!");

    // Thêm Categories
    const categories = [
      { name: "Giày Thể Thao", slug: "giay-the-thao" },
      { name: "Quần Áo", slug: "quan-ao" },
      { name: "Phụ Kiện", slug: "phu-kien" },
      { name: "Dụng Cụ", slug: "dung-cu" },
    ];
    await Category.insertMany(categories);
    console.log("Đã tạo bảng Categories thành công!");

    process.exit();
  } catch (error) {
    console.error("Lỗi khi seed data:", error);
    process.exit(1);
  }
};

seedData();
