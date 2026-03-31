import React, { useEffect, useState } from "react";
import { FiMenu, FiSearch, FiShoppingCart, FiHeart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Header.css";

const Header = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const readWishlistCount = () => {
      try {
        const items = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
        setWishlistCount(items.length);
      } catch {
        setWishlistCount(0);
      }
    };

    readWishlistCount();
    window.addEventListener("wishlistUpdated", readWishlistCount);
    window.addEventListener("storage", readWishlistCount);
    return () => {
      window.removeEventListener("wishlistUpdated", readWishlistCount);
      window.removeEventListener("storage", readWishlistCount);
    };
  }, []);

  return (
    <header className="header-container">
      <div className="top-bar">
        <div className="brand-name">SPORTSTORE</div>

        <div className="search-bar-container">
          <FiMenu className="hamburger-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm, thương hiệu"
            className="search-input"
          />
          <FiSearch className="search-icon" />
        </div>

        <div className="icon-group">
          <Link
            to="/cart"
            className="icon-item cart"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <Link
            to="/wishlist"
            className="icon-item heart"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <FiHeart />
            {wishlistCount > 0 && (
              <span className="cart-badge wishlist-badge">{wishlistCount}</span>
            )}
          </Link>

          <Link
            to="/profile"
            className="icon-item user"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <FiUser />
          </Link>
        </div>
      </div>

      <nav className="nav-bar">
        <div className="nav-links">
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

