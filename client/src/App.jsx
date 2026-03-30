import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

// Import các trang giao diện
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Contact from "./pages/Contact";

// Component Trang chủ (tạm thời)
const Home = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Chào mừng đến với Sportswear Shop 🏆</h1>
      <p>Trang chủ đang được xây dựng...</p>
      <p>
        <a href="/login" style={{ marginRight: "15px", color: "#0d5dd6" }}>
          Đến trang Đăng Nhập
        </a>
        <a href="/register" style={{ color: "#0d5dd6" }}>
          Đến trang Đăng Ký
        </a>
      </p>
    </div>
  );
};

function App() {
  return (
    // BrowserRouter bọc toàn bộ ứng dụng để kích hoạt tính năng chuyển trang
    <BrowserRouter>
      {/* Routes chứa các định nghĩa đường dẫn */}
      <Routes>
        {/* Định nghĩa từng Route cụ thể */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
