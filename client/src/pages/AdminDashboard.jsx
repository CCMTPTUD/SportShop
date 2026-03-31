import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FiBox, FiUsers, FiShoppingCart, FiSettings, FiLogOut } from "react-icons/fi";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Bảo vệ trang Admin (Phân quyền UI)
    const role = localStorage.getItem("userRole");
    if (role !== "admin") {
      alert("Bạn không có quyền truy cập trang Admin!");
      navigate("/");
      return;
    }

    // 2. Tải dữ liệu thống kê
    fetchDashboardStats();
  }, [navigate]);

  const fetchDashboardStats = async () => {
    try {
      // Vì hiện tại chỉ có API sản phẩm, ta lấy số lượng sản phẩm làm thống kê
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProductCount(data.length);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thống kê:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? "Chào buổi sáng" : currentHour < 18 ? "Chào buổi chiều" : "Chào buổi tối";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>SportShop</h2>
          <span className="badge">Admin Panel</span>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/admin" className="nav-item active">
            <FiSettings className="nav-icon" /> Dashboard
          </Link>
          <Link to="/admin/products" className="nav-item">
            <FiBox className="nav-icon" /> Quản Lý Sản Phẩm
          </Link>
          <div className="nav-item disabled" title="Tính năng đang phát triển">
            <FiUsers className="nav-icon" /> Quản Lý User
          </div>
          <div className="nav-item disabled" title="Tính năng đang phát triển">
            <FiShoppingCart className="nav-icon" /> Quản Lý Đơn Hàng
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="btn-logout" onClick={handleLogout}>
            <FiLogOut className="nav-icon" /> Đăng Xuất
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="main-header">
          <div>
            <h1 className="greeting-text">{greeting}, Admin! 👋</h1>
            <p className="subtitle">Dưới đây là tổng quan về cửa hàng hôm nay.</p>
          </div>
          <div className="header-actions">
            <Link to="/" className="btn-storefront">Xem Cửa Hàng</Link>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card primary-gradient">
            <div className="stat-icon-wrapper">
              <FiBox className="stat-icon" />
            </div>
            <div className="stat-details">
              <h3>Tổng Sản Phẩm</h3>
              <p className="stat-number">{isLoading ? "..." : productCount}</p>
            </div>
          </div>

          <div className="stat-card secondary-gradient">
            <div className="stat-icon-wrapper">
              <FiUsers className="stat-icon" />
            </div>
            <div className="stat-details">
              <h3>Tổng Khách Hàng</h3>
              <p className="stat-number">1,204</p>
              <span className="stat-trend positive">+12% so với tháng trước</span>
            </div>
          </div>

          <div className="stat-card accent-gradient">
            <div className="stat-icon-wrapper">
              <FiShoppingCart className="stat-icon" />
            </div>
            <div className="stat-details">
              <h3>Đơn Hàng Mới</h3>
              <p className="stat-number">45</p>
              <span className="stat-trend neutral">Chưa xử lý</span>
            </div>
          </div>
        </section>

        <section className="quick-actions">
          <h2>Truy Cập Nhanh</h2>
          <div className="actions-grid">
             <Link to="/admin/products" className="action-card">
                <div className="action-icon">
                   <FiBox />
                </div>
                <h3>CRUD Sản Phẩm</h3>
                <p>Thêm, sửa, xóa các sản phẩm kinh doanh</p>
             </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
