import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";

import "./App.css";

// Import cÃ¡c trang giao diá»‡n
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
import Shop from "./pages/Shop"; /* ThÃªm dÃ²ng import Shop */
import AdminProduct from "./pages/AdminProduct";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    // BrowserRouter bá»c toÃ n bá»™ á»©ng dá»¥ng Ä‘á»ƒ kÃ­ch hoáº¡t tÃ­nh nÄƒng chuyá»ƒn trang
    <BrowserRouter>
      {/* Routes chá»©a cÃ¡c Ä‘á»‹nh nghÄ©a Ä‘Æ°á»ng dáº«n */}
      <Routes>
        {/* Äá»‹nh nghÄ©a tá»«ng Route cá»¥ thá»ƒ */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} /> {/* ThÃªm route má»›i */}
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
        
        {/* Khu vá»±c Ä‘Æ°á»£c báº£o vá»‡: DÃ nh riÃªng cho Admin */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/products" element={
          <AdminRoute>
            <AdminProduct />
          </AdminRoute>
        } />
        <Route path="*" element={<h1>404 - Trang khÃ´ng tá»“n táº¡i</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

