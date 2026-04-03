import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import "./AdminCategory.css";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiArrowLeft } from "react-icons/fi";

const AdminCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // State for the form
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    description: "",
    image: "",
  });

  const API_URL = API_ENDPOINTS.CATEGORIES;

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "admin") {
      alert("Bạn không có quyền truy cập trang Admin!");
      navigate("/");
      return;
    }
    fetchCategories();
  }, [navigate]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
      alert("Không thể tải danh mục. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setFormData(category);
      setEditingId(category._id);
    } else {
      setFormData({ _id: "", name: "", description: "", image: "" });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ _id: "", name: "", description: "", image: "" });
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert("Vui lòng nhập tên danh mục!");
      return;
    }

    try {
      setIsLoading(true);
      const config = getAuthHeaders();

      // Generate slug from name
      const slug = formData.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

      const dataToSend = {
        ...formData,
        slug: slug,
      };

      if (editingId) {
        // Update
        const response = await axios.put(`${API_URL}/${editingId}`, dataToSend, config);
        setCategories((prev) =>
          prev.map((cat) => (cat._id === editingId ? response.data : cat))
        );
        alert("Cập nhật danh mục thành công!");
      } else {
        // Create
        const response = await axios.post(API_URL, dataToSend, config);
        setCategories((prev) => [...prev, response.data]);
        alert("Tạo danh mục thành công!");
      }

      handleCloseModal();
    } catch (error) {
      console.error("Lỗi khi lưu danh mục:", error);
      alert(error.response?.data?.message || "Lỗi khi lưu danh mục!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      return;
    }

    try {
      setIsLoading(true);
      const config = getAuthHeaders();
      await axios.delete(`${API_URL}/${id}`, config);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      alert("Xóa danh mục thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
      alert(error.response?.data?.message || "Lỗi khi xóa danh mục!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <Link to="/admin" className="btn-back">
          <FiArrowLeft /> Quay lại
        </Link>
        <h1>Quản Lý Danh Mục</h1>
        <button
          className="btn-add-category"
          onClick={() => handleOpenModal()}
          disabled={isLoading}
        >
          <FiPlus /> Thêm Danh Mục
        </button>
      </div>

      {/* Content */}
      <div className="admin-content">
        {isLoading && categories.length === 0 ? (
          <div className="loading">Đang tải danh mục...</div>
        ) : categories.length === 0 ? (
          <div className="no-data">
            <p>Chưa có danh mục nào. Hãy thêm danh mục mới!</p>
          </div>
        ) : (
          <div className="categories-table">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên Danh Mục</th>
                  <th>Mô Tả</th>
                  <th>Hình Ảnh</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category._id}>
                    <td>{index + 1}</td>
                    <td className="name-cell">{category.name}</td>
                    <td className="description-cell">
                      {category.description || "Không có mô tả"}
                    </td>
                    <td className="image-cell">
                      {category.image ? (
                        <img src={category.image} alt={category.name} />
                      ) : (
                        <span className="no-image">Không có ảnh</span>
                      )}
                    </td>
                    <td className="actions-cell">
                      <button
                        className="btn-edit"
                        onClick={() => handleOpenModal(category)}
                        disabled={isLoading}
                        title="Chỉnh sửa"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(category._id)}
                        disabled={isLoading}
                        title="Xóa"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? "Chỉnh Sửa Danh Mục" : "Thêm Danh Mục Mới"}</h2>
              <button className="btn-close" onClick={handleCloseModal}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Tên Danh Mục *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên danh mục"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Mô Tả</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  placeholder="Nhập mô tả danh mục"
                  rows="4"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">URL Hình Ảnh</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image || ""}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  disabled={isLoading}
                />
                {formData.image && (
                  <div className="image-preview">
                    <img src={formData.image} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCloseModal}
                  disabled={isLoading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Đang xử lý..."
                    : editingId
                    ? "Cập Nhật"
                    : "Tạo Mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategory;
