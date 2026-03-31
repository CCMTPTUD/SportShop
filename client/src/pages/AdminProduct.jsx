import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminProduct.css";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // State for the form
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    gallery: [], // Mảng lưu các ảnh phụ
    category_id: "", 
    brand_id: "", 
  });

  const API_URL = "http://localhost:5000/api/products";

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "admin") {
      alert("Bạn không có quyền truy cập trang Admin!");
      navigate("/");
      return;
    }
    fetchProducts();
    fetchCategoriesAndBrands();
  }, [navigate]);

  const fetchCategoriesAndBrands = async () => {
    try {
      const authConfig = getAuthHeaders(); // Tuỳ API, hiện backend Get /categories và /brands đang mở public
      const resCategories = await axios.get("http://localhost:5000/api/categories");
      const resBrands = await axios.get("http://localhost:5000/api/brands");
      setCategories(resCategories.data);
      setBrands(resBrands.data);
    } catch (error) {
      console.error("Lỗi khi tải Categories/Brands", error);
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(API_URL);
      setProducts(data);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper để lấy token
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      navigate("/login");
      throw new Error("No token");
    }
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (product = null) => {
    if (product) {
      setFormData({
        _id: product._id,
        name: product.name,
        description: product.description || "",
        price: product.price,
        imageUrl: product.imageUrl || "",
        gallery: product.gallery || [],
        stock: product.stock,
        category_id: product.category_id?._id || product.category_id || "",
        brand_id: product.brand_id?._id || product.brand_id || "",
      });
    } else {
      setFormData({
        _id: "",
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        gallery: [],
        stock: "",
        category_id: categories.length > 0 ? categories[0]._id : "",
        brand_id: brands.length > 0 ? brands[0]._id : "",
      });
    }
    setIsModalOpen(true);
  };

  const addGalleryItem = () => {
    setFormData({ ...formData, gallery: [...formData.gallery, ""] });
  };

  const removeGalleryItem = (index) => {
    const newGallery = formData.gallery.filter((_, i) => i !== index);
    setFormData({ ...formData, gallery: newGallery });
  };

  const handleGalleryChange = (index, value) => {
    const newGallery = [...formData.gallery];
    newGallery[index] = value;
    setFormData({ ...formData, gallery: newGallery });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      const config = getAuthHeaders();
      
      if (formData._id) {
        // Cập nhật sản phẩm
        await axios.put(`${API_URL}/${formData._id}`, payload, config);
      } else {
        // Form gửi đi không cần trường "_id" rỗng
        delete payload._id;
        await axios.post(API_URL, payload, config);
      }
      fetchProducts();
      closeModal();
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert("Bạn không có quyền thực hiện hành động này!");
        if (error.response?.status === 401) navigate("/login");
      } else if (error.message !== "No token") {
        alert("Đã xảy ra lỗi khi lưu sản phẩm: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      try {
        const config = getAuthHeaders();
        await axios.delete(`${API_URL}/${id}`, config);
        fetchProducts();
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          alert("Bạn không có quyền thực hiện hành động này!");
        }
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/admin" className="btn-secondary" style={{ padding: '8px 12px' }}>
             <FiArrowLeft /> Dashboard
          </Link>
          <h2>Quản Lý Sản Phẩm</h2>
        </div>
        <button className="btn-primary" onClick={() => openModal()}>
          <FiPlus /> Thêm Sản Phẩm
        </button>
      </div>

      <div className="table-responsive">
        {isLoading ? (
          <div className="loading">Đang tải dữ liệu...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hình Ảnh</th>
                <th>Tên SP</th>
                <th>Giá</th>
                <th>Tồn Kho</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="product-thumb" />
                    ) : (
                      <div className="no-image">No IMG</div>
                    )}
                  </td>
                  <td className="product-name">{product.name}</td>
                  <td className="product-price">{product.price.toLocaleString("vi-VN")} đ</td>
                  <td>
                    <span className={`stock-badge ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="action-btns">
                    <button className="btn-edit" onClick={() => openModal(product)}>
                      <FiEdit2 />
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(product._id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty-state">Không có sản phẩm nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{formData._id ? "Cập Nhật Sản Phẩm" : "Thêm Sản Phẩm Mới"}</h3>
              <button className="btn-close" onClick={closeModal}>
                <FiX />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Tên Sản Phẩm *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Nhập tên sản phẩm"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Giá Thành *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    placeholder="VD: 500000"
                  />
                </div>
                <div className="form-group">
                  <label>Số Lượng Tồn Kho *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    placeholder="VD: 50"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Đường Dẫn Hình Ảnh Chính (URL) *</label>
                <label>Đường Dẫn Hình Ảnh (URL)</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="form-group gallery-group">
                <div className="gallery-header">
                  <label>Hình Ảnh Phụ (Gallery)</label>
                  <button type="button" className="btn-add-gallery" onClick={addGalleryItem}>
                    <FiPlus /> Thêm Ảnh Phụ
                  </button>
                </div>
                {formData.gallery.map((imgUrl, index) => (
                  <div key={index} className="gallery-item-input">
                    <input
                      type="text"
                      placeholder="Nhập đường dẫn ảnh phụ..."
                      value={imgUrl}
                      onChange={(e) => handleGalleryChange(index, e.target.value)}
                    />
                    <button type="button" className="btn-remove-gallery" onClick={() => removeGalleryItem(index)}>
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Danh Mục (Category) *</label>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>-- Chọn Danh Mục --</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Thương Hiệu (Brand) *</label>
                  <select
                    name="brand_id"
                    value={formData.brand_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>-- Chọn Thương Hiệu --</option>
                    {brands.map((brand) => (
                      <option key={brand._id} value={brand._id}>{brand.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Mô Tả Sản Phẩm</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Nhập mô tả chi tiết sản phẩm..."
                  rows="4"
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={closeModal}>Hủy Bỏ</button>
                <button type="submit" className="btn-primary">
                  {formData._id ? "Lưu Cập Nhật" : "Tạo Mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;
