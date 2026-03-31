const Category = require("../models/Category");

// Lấy danh sách category
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy categories", error: error.message });
  }
};

// Thêm một category
exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Lỗi tạo category", error: error.message });
  }
};
