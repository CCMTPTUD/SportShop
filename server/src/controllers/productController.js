const Product = require("../models/Product");

// Lấy danh sách tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category_id", "name")
      .populate("brand_id", "name")
      .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm", error: error.message });
  }
};

// Lấy thông tin 1 sản phẩm
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category_id", "name")
      .populate("brand_id", "name");
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin sản phẩm", error: error.message });
  }
};

// Lấy sản phẩm theo danh mục
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category_id: categoryId })
      .populate("category_id", "name")
      .populate("brand_id", "name")
      .sort({ createdAt: -1 });
    
    if (!products || products.length === 0) {
      return res.status(200).json({ 
        message: "Không có sản phẩm trong danh mục này",
        products: [],
        categoryId: categoryId
      });
    }
    
    // Lấy tên danh mục từ sản phẩm đầu tiên
    const categoryName = products[0].category_id?.name || "Danh mục";
    
    res.status(200).json({ 
      products,
      categoryName,
      categoryId: categoryId
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm theo danh mục", error: error.message });
  }
};

// Lấy sản phẩm theo thương hiệu
exports.getProductsByBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const products = await Product.find({ brand_id: brandId })
      .populate("category_id", "name")
      .populate("brand_id", "name")
      .sort({ createdAt: -1 });
    
    if (!products || products.length === 0) {
      return res.status(200).json({ 
        message: "Không có sản phẩm của thương hiệu này",
        products: [],
        brandId: brandId
      });
    }
    
    // Lấy tên thương hiệu từ sản phẩm đầu tiên
    const brandName = products[0].brand_id?.name || "Thương hiệu";
    
    res.status(200).json({ 
      products,
      brandName,
      brandId: brandId
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm theo thương hiệu", error: error.message });
  }
};

// Thêm mới sản phẩm
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi tạo sản phẩm", error: error.message });
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm để cập nhật" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi cập nhật sản phẩm", error: error.message });
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm để xóa" });
    }
    res.status(200).json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error: error.message });
  }
};
