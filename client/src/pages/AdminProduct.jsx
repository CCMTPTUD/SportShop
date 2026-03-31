import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminProduct.css";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // State for the form
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    stock: "",
    category_id: "60d21b4667d0d8992e610c85", // Placeholder ObjectId
    brand_id: "60d21b4667d0d8992e610c85", // Placeholder ObjectId
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
  }, [navigate]);

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
        stock: product.stock,
        category_id: product.category_id?._id || product.category_id || "60d21b4667d0d8992e610c85",
        brand_id: product.brand_id?._id || product.brand_id || "60d21b4667d0d8992e610c85",
      });
    } else {
      setFormData({
        _id: "",
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        stock: "",
        category_id: "60d21b4667d0d8992e610c85",
        brand_id: "60d21b4667d0d8992e610c85",
      });
    }
    setIsModalOpen(true);
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
                <label>Đường Dẫn Hình Ảnh (URL)</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category ID *</label>
                  <input
                    type="text"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Brand ID *</label>
                  <input
                    type="text"
                    name="brand_id"
                    value={formData.brand_id}
                    onChange={handleChange}
                    required
                  />
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
