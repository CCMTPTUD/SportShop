import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import axios from "axios";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        },
      );

      alert("Đăng ký thành công!");
      // Lưu token và userRole vào localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", response.data.role);
      navigate("/"); // Chuyển hướng về trang chủ
    } catch (error) {
      alert(error.response?.data?.message || "Đã có lỗi xảy ra");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-banner register-banner">
        <h1 className="text-outline">GET IN</h1>
        <h1>SHAPE</h1>
      </div>

      <div className="auth-form-section">
        <div className="auth-form-box">
          <h2 className="auth-title">Đăng ký tài khoản</h2>
          <p className="auth-subtitle">Đăng ký tài khoản mới để tiếp tục</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Nguyễn Văn A"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="phamhuynhtai2004@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="******"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password again</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="******"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-submit">
              Đăng Ký
            </button>
          </form>

          <div className="auth-footer">
            Đã có tài khoản? <Link to="/login">Đăng Nhập</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
