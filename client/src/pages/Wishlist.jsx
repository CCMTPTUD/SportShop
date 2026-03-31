import React from "react";
import { FiHeart, FiImage } from "react-icons/fi";
import Header from "../components/Header/Header";
import "./Wishlist.css";

const Wishlist = () => {
  const wishlistItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
  const recentItems = JSON.parse(localStorage.getItem("recentViewedItems") || "[]");

  const formatPrice = (price) => {
    if (typeof price !== "number") return "";
    return `${price.toLocaleString("vi-VN")} VND`;
  };

  const renderProductCard = (item, mode) => (
    <article className="wishlist-card" key={`${mode}-${item._id || item.id || item.name}`}>
      <div className="wishlist-card-image">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name || "Product"} />
        ) : (
          <div className="wishlist-image-placeholder">
            <FiImage />
          </div>
        )}
      </div>

      <div className="wishlist-card-info">
        <h3>{item.name || "Sản phẩm"}</h3>
        <p>{formatPrice(item.price)}</p>
      </div>

      <button type="button" className="wishlist-action-btn" aria-label="Yêu thích">
        <FiHeart />
      </button>
    </article>
  );

  return (
    <div className="wishlist-page">
      <Header />

      <main className="wishlist-main">
        <h1 className="wishlist-title">Wishlist</h1>

        <section className="wishlist-section">
          {wishlistItems.length > 0 ? (
            <div className="wishlist-grid">
              {wishlistItems.map((item) => renderProductCard(item, "wishlist"))}
            </div>
          ) : (
            <div className="wishlist-empty">Chưa có sản phẩm yêu thích.</div>
          )}
        </section>

        <section className="wishlist-section">
          <h2 className="wishlist-subtitle">Đã từng xem qua</h2>

          {recentItems.length > 0 ? (
            <div className="wishlist-grid">
              {recentItems.map((item) => renderProductCard(item, "recent"))}
            </div>
          ) : (
            <div className="wishlist-empty">Chưa có sản phẩm đã xem.</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Wishlist;
