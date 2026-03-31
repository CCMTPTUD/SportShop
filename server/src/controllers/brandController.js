const Brand = require("../models/Brand");

// Lấy danh sách brand
exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy brands", error: error.message });
  }
};

// Thêm một brand
exports.createBrand = async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    const saved = await newBrand.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Lỗi tạo brand", error: error.message });
  }
};
