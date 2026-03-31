import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import axios from "axios";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );

      alert("Đăng nhập thành công!");
      // Lưu token và thông tin người dùng vào localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", response.data.role);
      
      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/"); // Chuyển hướng về trang chủ
      }
      navigate("/"); // Chuyển hướng về trang chủ
    } catch (error) {
      alert(error.response?.data?.message || "Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-banner login-banner">
        <h1>NEVER</h1>
        <h1 className="text-outline">GIVE UP</h1>
      </div>

      <div className="auth-form-section">
        <div className="auth-form-box">
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Đăng nhập tài khoản để tiếp tục</p>

          <form onSubmit={handleSubmit}>
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
              <label>
                Password
                <Link to="/forgot-password" className="forgot-password">
                  Quên mật khẩu?
                </Link>
              </label>
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

            <button type="submit" className="btn-submit">
              Đăng nhập
            </button>
          </form>

          <div className="auth-footer">
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
