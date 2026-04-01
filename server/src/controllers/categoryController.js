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
    let { name, description, image, slug } = req.body;

    // Generate slug if not provided
    if (!slug && name) {
      slug = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
    }

    const newCategory = new Category({
      name,
      description,
      image,
      slug,
    });

    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Lỗi tạo category", error: error.message });
  }
};

// Cập nhật category
exports.updateCategory = async (req, res) => {
  try {
    let { name, description, image, slug } = req.body;

    // Generate slug if not provided but name is changed
    if (!slug && name) {
      slug = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");
    }

    const updateData = {
      name,
      description,
      image,
      slug,
    };

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Không tìm thấy category" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: "Lỗi cập nhật category", error: error.message });
  }
};

// Xóa category
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Không tìm thấy category" });
    }
    res.status(200).json({ message: "Xóa category thành công", category: deletedCategory });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa category", error: error.message });
  }
};
