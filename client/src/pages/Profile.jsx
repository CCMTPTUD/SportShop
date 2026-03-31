import React, { useEffect, useState } from "react";
import { FiBell, FiCheckCircle, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { useCart } from "../context/CartContext";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const [profileInfo, setProfileInfo] = useState(() => ({
    fullName: localStorage.getItem("userFullName") || "",
    email: localStorage.getItem("userEmail") || "",
    phone: localStorage.getItem("userPhone") || "",
  }));
  const [wishlistCount, setWishlistCount] = useState(0);
  const [paidCount, setPaidCount] = useState(0);

  const [editForm, setEditForm] = useState(profileInfo);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    browser: false,
  });
  const [saveMessage, setSaveMessage] = useState("");

  const toggleSetting = (key) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    const normalizedData = {
      ...editForm,
      phone: editForm.phone.trim(),
    };

    setProfileInfo(normalizedData);
    localStorage.setItem("userFullName", normalizedData.fullName);
    localStorage.setItem("userEmail", normalizedData.email);
    localStorage.setItem("userPhone", normalizedData.phone);
    setSaveMessage("Đã lưu thông tin hồ sơ.");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userFullName");
    localStorage.removeItem("userPhone");
    navigate("/login");
  };

  useEffect(() => {
    const readWishlistCount = () => {
      try {
        const items = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
        setWishlistCount(items.length);
      } catch {
        setWishlistCount(0);
      }
    };

    const readPaidCount = () => {
      try {
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");
        let total = 0;
        orders.forEach((order) => {
          const status = (order.status || "").toLowerCase();
          const isPaid =
            status === "paid" ||
            status === "đã thanh toán" ||
            status === "da thanh toan";
          if (!isPaid) return;
          const items = order.items || order.orderItems || [];
          items.forEach((item) => {
            const qty = Number(item.qty ?? item.quantity ?? 1);
            total += Number.isNaN(qty) ? 1 : qty;
          });
        });

        if (orders.length === 0) {
          const paidItems = JSON.parse(localStorage.getItem("paidItems") || "[]");
          total = Array.isArray(paidItems) ? paidItems.length : 0;
        }

        setPaidCount(total);
      } catch {
        setPaidCount(0);
      }
    };

    readWishlistCount();
    readPaidCount();
    window.addEventListener("wishlistUpdated", readWishlistCount);
    window.addEventListener("storage", readWishlistCount);
    window.addEventListener("storage", readPaidCount);
    return () => {
      window.removeEventListener("wishlistUpdated", readWishlistCount);
      window.removeEventListener("storage", readWishlistCount);
      window.removeEventListener("storage", readPaidCount);
    };
  }, []);

  return (
    <div className="profile-page">
      <Header />

      <main className="profile-main">
        <section className="profile-summary-card">
          <div className="profile-avatar">
            <FiUser />
          </div>

          <div className="profile-user-info">
            <p>
              <strong>EMAIL USER :</strong> {profileInfo.email}
            </p>
            <p>
              <strong>PHONE NUMBER USER :</strong> {profileInfo.phone}
            </p>
          </div>

          <button type="button" className="profile-edit-btn" onClick={handleLogout}>
            Đăng xuất
          </button>
        </section>

        <section className="profile-stats-grid">
          <div className="profile-stat-item">
            <div className="profile-stat-icon blue">
              <FiCheckCircle />
            </div>
            <p>TỔNG ĐƠN HÀNG : {paidCount}</p>
          </div>

          <div className="profile-stat-item">
            <div className="profile-stat-icon orange">
              <FiShoppingCart />
            </div>
            <p>GIỎ HÀNG : {getCartCount()}</p>
          </div>

          <div className="profile-stat-item">
            <div className="profile-stat-icon red">
              <FiHeart />
            </div>
            <p>YÊU THÍCH : {wishlistCount}</p>
          </div>
        </section>

        <section className="profile-notification-card">
          <h2>
            <FiBell /> Cài đặt thông báo
          </h2>

          <div className="profile-notify-row">
            <div>
              <h3>Thông báo qua Email</h3>
              <p>Nhận cập nhật đơn hàng và khuyến mãi qua email</p>
            </div>
            <button
              type="button"
              className={`profile-switch ${notificationSettings.email ? "active" : ""}`}
              onClick={() => toggleSetting("email")}
              aria-label="Bật tắt thông báo email"
            >
              <span />
            </button>
          </div>

          <div className="profile-notify-row">
            <div>
              <h3>Thông báo qua SMS</h3>
              <p>Nhận tin nhắn về trạng thái đơn hàng</p>
            </div>
            <button
              type="button"
              className={`profile-switch ${notificationSettings.sms ? "active" : ""}`}
              onClick={() => toggleSetting("sms")}
              aria-label="Bật tắt thông báo sms"
            >
              <span />
            </button>
          </div>

          <div className="profile-notify-row">
            <div>
              <h3>Thông báo đẩy</h3>
              <p>Nhận thông báo trực tiếp trên trình duyệt</p>
            </div>
            <button
              type="button"
              className={`profile-switch ${notificationSettings.browser ? "active" : ""}`}
              onClick={() => toggleSetting("browser")}
              aria-label="Bật tắt thông báo trình duyệt"
            >
              <span />
            </button>
          </div>
        </section>

        <section className="profile-edit-card">
          <h2>Chỉnh sửa hồ sơ</h2>

          <form className="profile-edit-form" onSubmit={handleSaveProfile}>
            <div className="profile-edit-grid">
              <div className="profile-field">
                <label htmlFor="fullName">Họ và tên</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={editForm.fullName}
                  onChange={handleEditChange}
                  placeholder="Nhập họ và tên"
                />
              </div>

              <div className="profile-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  placeholder="Nhập email"
                  required
                />
              </div>
            </div>

            <div className="profile-field">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={editForm.phone}
                onChange={handleEditChange}
                placeholder="Để trống nếu chưa có"
              />
            </div>

            <div className="profile-edit-actions">
              <button type="submit" className="profile-save-btn">
                Lưu hồ sơ
              </button>
              {saveMessage && <span className="profile-save-message">{saveMessage}</span>}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Profile;
