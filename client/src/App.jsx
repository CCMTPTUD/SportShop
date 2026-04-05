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
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";

import Home from "./pages/Home";
import Shop from "./pages/Shop"; /* Thêm dòng import Shop */
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Brands from "./pages/Brands";
import Brand from "./pages/Brand";
import AdminProduct from "./pages/AdminProduct";
import AdminCategory from "./pages/AdminCategory";
import AdminBrand from "./pages/AdminBrand";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import Promotion from "./pages/Promotion";

function App() {
  return (
    // BrowserRouter bọc toàn bộ ứng dụng để kích hoạt tính năng chuyển trang
    <BrowserRouter>
      {/* Routes chứa các định nghĩa đường dẫn */}
      <Routes>
        {/* Định nghĩa từng Route cụ thể */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} /> {/* Thêm route mới */}
        <Route path="/danh-muc" element={<Categories />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/thuong-hieu" element={<Brands />} />
        <Route path="/brand/:brandId" element={<Brand />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id/reviews" element={<ProductReviews />} />

        {/* Khu vực được bảo vệ: Dành riêng cho Admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminRoute>
              <AdminCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/brands"
          element={
            <AdminRoute>
              <AdminBrand />
            </AdminRoute>
          }
        />
        <Route path="/khuyen-mai" element={<Promotion />} />
        <Route path="*" element={<h1>404 - Trang không tồn tại</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
