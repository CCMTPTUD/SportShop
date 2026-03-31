import React from "react";
import {
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiUser,
} from "react-icons/fi";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import { useCart } from "../../context/CartContext";
import "./Header.css"; // Import file CSS

const Header = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  return (
    <header className="header-container">
      {/* Top Bar */}
      <div className="top-bar">
        {/* Bật mí nhỏ: Hình như chữ SPORTSTORE đang bị gõ nhầm thành SPROTSTORE nè 😉 */}
        <div className="brand-name">SPORTSTORE</div>

        {/* Thanh tìm kiếm */}
        <div className="search-bar-container">
          <FiMenu className="hamburger-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm, thương hiệu"
            className="search-input"
          />
          <FiSearch className="search-icon" />
        </div>

        {/* Nhóm Icons */}
        <div className="icon-group">
          {/* Thay div bằng Link để chuyển hướng mượt mà không reload trang */}
          <Link
            to="/cart"
            className="icon-item cart"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <div className="icon-item heart">
            <FiHeart />
          </div>

          <Link
            to="/login"
            className="icon-item user"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <FiUser />
          </Link>
        </div>
      </div>

      {/* Nav Bar */}
      <nav className="nav-bar">
        <div className="nav-links">
          {/* Lời khuyên: Về sau bạn nên thay thẻ <a> bằng thẻ <Link to="..."> để trang web chạy nhanh như một app thực thụ nhé */}
          <a href="/" className="nav-item home">
            Home
          </a>
          <a href="/shop" className="nav-item">
            Shop
          </a>
          <a href="/brand" className="nav-item">
            Brand
          </a>
          <a href="/danh-muc" className="nav-item">
            Danh mục
          </a>
          <a href="/khuyen-mai" className="nav-item promo">
            Khuyến mãi
          </a>
          <a href="/contact" className="nav-item">
            Liên hệ
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
