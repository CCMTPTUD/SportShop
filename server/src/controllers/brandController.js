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

// Cập nhật một brand
exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBrand) {
      return res.status(404).json({ message: "Không tìm thấy brand" });
    }
    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(400).json({ message: "Lỗi cập nhật brand", error: error.message });
  }
};

// Xóa một brand
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBrand = await Brand.findByIdAndDelete(id);
    if (!deletedBrand) {
      return res.status(404).json({ message: "Không tìm thấy brand" });
    }
    res.status(200).json({ message: "Xóa brand thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa brand", error: error.message });
  }
};
