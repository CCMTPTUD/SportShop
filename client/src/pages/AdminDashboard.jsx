import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FiBox, FiUsers, FiShoppingCart, FiSettings, FiLogOut, FiTag, FiAward } from "react-icons/fi";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    newOrders: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

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
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [brandCount, setBrandCount] = useState(0);
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
      const config = getAuthHeaders();
      const { data } = await axios.get("http://localhost:5000/api/admin/dashboard", config);
      setStats(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thống kê:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
         alert("Bạn không có quyền truy cập thống kê!");
         navigate("/");
      }
      // Fallback: Lấy số lượng sản phẩm
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProductCount(data.length);
      } catch (innerError) {
        console.error("Lỗi khi lấy số lượng sản phẩm:", innerError);
      }
    } finally {
      // Luôn fetch categories và brands dù stats lỗi hay không
      try {
        const { data } = await axios.get("http://localhost:5000/api/categories");
        setCategoryCount(data.length);
      } catch (error) {
        console.error("Lỗi khi lấy số lượng danh mục:", error);
      }

      try {
        const { data } = await axios.get("http://localhost:5000/api/brands");
        setBrandCount(data.length);
      } catch (error) {
        console.error("Lỗi khi lấy số lượng thương hiệu:", error);
      }

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
          <Link to="/admin/categories" className="nav-item">
            <FiTag className="nav-icon" /> Quản Lý Danh Mục
          </Link>
          <Link to="/admin/brands" className="nav-item">
            <FiAward className="nav-icon" /> Quản Lý Thương Hiệu
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
              <p className="stat-number">{isLoading ? "..." : (stats.totalProducts > 0 ? stats.totalProducts : productCount)}</p>
            </div>
          </div>

          <div className="stat-card secondary-gradient">
            <div className="stat-icon-wrapper">
              <FiUsers className="stat-icon" />
            </div>
            <div className="stat-details">
              <h3>Tổng Khách Hàng</h3>
              <p className="stat-number">{isLoading ? "..." : stats.totalUsers}</p>
              <span className="stat-trend positive">Cập nhật lúc này</span>
            </div>
          </div>

          <div className="stat-card accent-gradient">
            <div className="stat-icon-wrapper">
              <FiShoppingCart className="stat-icon" />
            </div>
            <div className="stat-details">
              <h3>Tổng Đơn Hàng</h3>
              <p className="stat-number">{isLoading ? "..." : stats.totalOrders}</p>
              <span className="stat-trend neutral">{stats.newOrders} đơn chờ xử lý</span>
            </div>
          </div>

          <div className="stat-card success-gradient">
            <div className="stat-icon-wrapper">
              <FiTag className="stat-icon" />
            </div>
            <div className="stat-details">
              <h3>Tổng Danh Mục</h3>
              <p className="stat-number">{isLoading ? "..." : categoryCount}</p>
              <span className="stat-trend positive">Quản lý danh mục</span>
            </div>
          </div>

          <div className="stat-card warning-gradient">
            <div className="stat-icon-wrapper">
              <FiAward className="stat-icon" />
            </div>
            <div className="stat-details">
              <h3>Tổng Thương Hiệu</h3>
              <p className="stat-number">{isLoading ? "..." : brandCount}</p>
              <span className="stat-trend positive">Quản lý thương hiệu</span>
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
             <Link to="/admin/categories" className="action-card">
                <div className="action-icon">
                   <FiTag />
                </div>
                <h3>Quản Lý Danh Mục</h3>
                <p>Quản lý các danh mục sản phẩm</p>
             </Link>
             <Link to="/admin/brands" className="action-card">
                <div className="action-icon">
                   <FiAward />
                </div>
                <h3>Quản Lý Thương Hiệu</h3>
                <p>Quản lý các thương hiệu sản phẩm</p>
             </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
