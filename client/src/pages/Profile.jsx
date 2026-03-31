import React, { useState } from "react";
import { FiBell, FiBox, FiHeart, FiPackage, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState(() => ({
    fullName: localStorage.getItem("userFullName") || "",
    email: localStorage.getItem("userEmail") || "",
    phone: localStorage.getItem("userPhone") || "",
  }));

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
              <FiBox />
            </div>
            <p>TỔNG ĐƠN HÀNG : 25</p>
          </div>

          <div className="profile-stat-item">
            <div className="profile-stat-icon orange">
              <FiPackage />
            </div>
            <p>ĐANG XỬ LÝ : 2</p>
          </div>

          <div className="profile-stat-item">
            <div className="profile-stat-icon red">
              <FiHeart />
            </div>
            <p>YÊU THÍCH : 5</p>
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


