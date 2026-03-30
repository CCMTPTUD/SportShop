import React from 'react';
import { FiMenu, FiSearch, FiShoppingCart, FiHeart, FiUser } from 'react-icons/fi';
import './Header.css'; // Import file CSS

const Header = () => {
  return (
    <header className="header-container">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="brand-name">SPROTSTORE</div>

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
          <div className="icon-item cart">
            <FiShoppingCart />
            <span className="cart-badge">2</span> {/* Số lượng giỏ hàng */}
          </div>
          <div className="icon-item heart">
            <FiHeart />
          </div>
          <div className="icon-item user">
            <FiUser />
          </div>
        </div>
      </div>

      {/* Nav Bar */}
      <nav className="nav-bar">
        <div className="nav-links">
          <a href="/" className="nav-item home">Home</a>
          <a href="/shop" className="nav-item">Shop</a>
          <a href="/brand" className="nav-item">Brand</a>
          <a href="/danh-muc" className="nav-item">Danh mục</a>
          <a href="/khuyen-mai" className="nav-item promo">Khuyến mãi</a>
          {/* Đã thêm mục Liên hệ */}
          <a href="/contact" className="nav-item">Liên hệ</a> 
        </div>
      </nav>
    </header>
  );
};

export default Header;