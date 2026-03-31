import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";

import "./App.css";

// Import các trang giao diện
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import ProductReviews from "./pages/ProductReviews";

import Home from "./pages/Home";
import Shop from "./pages/Shop"; /* Thêm dòng import Shop */

function App() {
  return (
    // BrowserRouter bọc toàn bộ ứng dụng để kích hoạt tính năng chuyển trang
    <BrowserRouter>
      {/* Routes chứa các định nghĩa đường dẫn */}
      <Routes>
        {/* Định nghĩa từng Route cụ thể */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} /> {/* Thêm route mới */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id/reviews" element={<ProductReviews />} />
        <Route path="*" element={<h1>404 - Trang không tồn tại</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
