import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import "./AdminBrand.css";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiArrowLeft } from "react-icons/fi";

const AdminBrand = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // State for the form
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    description: "",
    logoUrl: "",
  });

  const API_URL = API_ENDPOINTS.BRANDS;

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "admin") {
      alert("Bạn không có quyền truy cập trang Admin!");
      navigate("/");
      return;
    }
    fetchBrands();
  }, [navigate]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchBrands = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setBrands(response.data);
    } catch (error) {
      console.error("Lỗi khi tải thương hiệu:", error);
      alert("Không thể tải thương hiệu. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (brand = null) => {
    if (brand) {
      setFormData(brand);
      setEditingId(brand._id);
    } else {
      setFormData({ _id: "", name: "", description: "", logoUrl: "" });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ _id: "", name: "", description: "", logoUrl: "" });
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
      alert("Vui lòng nhập tên thương hiệu!");
      return;
    }

    try {
      setIsLoading(true);
      const config = getAuthHeaders();

      const dataToSend = {
        name: formData.name,
        description: formData.description,
        logoUrl: formData.logoUrl,
      };

      if (editingId) {
        // Update
        const response = await axios.put(
          `${API_URL}/${editingId}`,
          dataToSend,
          config,
        );
        setBrands((prev) =>
          prev.map((brand) =>
            brand._id === editingId ? response.data : brand,
          ),
        );
        alert("Cập nhật thương hiệu thành công!");
      } else {
        // Create
        const response = await axios.post(API_URL, dataToSend, config);
        setBrands((prev) => [...prev, response.data]);
        alert("Tạo thương hiệu thành công!");
      }

      handleCloseModal();
    } catch (error) {
      console.error("Lỗi khi lưu thương hiệu:", error);
      alert(error.response?.data?.message || "Lỗi khi lưu thương hiệu!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa thương hiệu này?")) {
      return;
    }

    try {
      setIsLoading(true);
      const config = getAuthHeaders();
      await axios.delete(`${API_URL}/${id}`, config);
      setBrands((prev) => prev.filter((brand) => brand._id !== id));
      alert("Xóa thương hiệu thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa thương hiệu:", error);
      alert(error.response?.data?.message || "Lỗi khi xóa thương hiệu!");
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
        <h1>Quản Lý Thương Hiệu</h1>
        <button
          className="btn-add-brand"
          onClick={() => handleOpenModal()}
          disabled={isLoading}
        >
          <FiPlus /> Thêm Thương Hiệu
        </button>
      </div>

      {/* Content */}
      <div className="admin-content">
        {isLoading && brands.length === 0 ? (
          <div className="loading">Đang tải thương hiệu...</div>
        ) : brands.length === 0 ? (
          <div className="no-data">
            <p>Chưa có thương hiệu nào. Hãy thêm thương hiệu mới!</p>
          </div>
        ) : (
          <div className="brands-table">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên Thương Hiệu</th>
                  <th>Mô Tả</th>
                  <th>Logo</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand, index) => (
                  <tr key={brand._id}>
                    <td>{index + 1}</td>
                    <td className="name-cell">{brand.name}</td>
                    <td className="description-cell">
                      {brand.description || "Không có mô tả"}
                    </td>
                    <td className="image-cell">
                      {brand.logoUrl ? (
                        <img src={brand.logoUrl} alt={brand.name} />
                      ) : (
                        <span className="no-image">Không có ảnh</span>
                      )}
                    </td>
                    <td className="actions-cell">
                      <button
                        className="btn-edit"
                        onClick={() => handleOpenModal(brand)}
                        disabled={isLoading}
                        title="Chỉnh sửa"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(brand._id)}
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
              <h2>
                {editingId ? "Chỉnh Sửa Thương Hiệu" : "Thêm Thương Hiệu Mới"}
              </h2>
              <button className="btn-close" onClick={handleCloseModal}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Tên Thương Hiệu *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên thương hiệu"
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
                  placeholder="Nhập mô tả thương hiệu"
                  rows="4"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="logoUrl">URL Logo</label>
                <input
                  type="text"
                  id="logoUrl"
                  name="logoUrl"
                  value={formData.logoUrl || ""}
                  onChange={handleInputChange}
                  placeholder="https://example.com/logo.jpg"
                  disabled={isLoading}
                />
                {formData.logoUrl && (
                  <div className="image-preview">
                    <img src={formData.logoUrl} alt="Preview" />
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

export default AdminBrand;
