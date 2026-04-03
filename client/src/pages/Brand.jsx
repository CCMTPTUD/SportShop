import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { FaHeart, FaStar } from "react-icons/fa";
import { FiHeart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { API_ENDPOINTS } from "../config/api";
import "./Brand.css";

const Brand = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
      return new Set(stored.map((item) => item._id || item.id));
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    const fetchBrandProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          API_ENDPOINTS.PRODUCTS_BY_BRAND(brandId),
        );
        setProducts(response.data.products || response.data);
        setBrandName(response.data.brandName || "Thương hiệu");
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (brandId) {
      fetchBrandProducts();
    }
  }, [brandId]);

  // Sắp xếp sản phẩm
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "newest":
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Phân trang
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  const handleWishlistToggle = (productId) => {
    const newWishlist = new Set(wishlistIds);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlistIds(newWishlist);
    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(Array.from(newWishlist)),
    );
  };

  if (isLoading) {
    return (
      <div className="brand-page">
        <Header />
        <div className="loading">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="brand-page">
      <Header />

      {/* Hero Section */}
      <div className="brand-hero">
        <h1>{brandName}</h1>
        <p className="product-count">{sortedProducts.length} sản phẩm</p>
      </div>

      {/* Main Content */}
      <div className="brand-container">
        {/* Sidebar */}
        <div className="brand-sidebar">
          <div className="filter-section">
            <h3>Sắp xếp</h3>
            <div className="sort-options">
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="newest"
                  checked={sortBy === "newest"}
                  onChange={(e) => setSortBy(e.target.value)}
                />
                Mới nhất
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="price-low"
                  checked={sortBy === "price-low"}
                  onChange={(e) => setSortBy(e.target.value)}
                />
                Giá: Thấp đến Cao
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="price-high"
                  checked={sortBy === "price-high"}
                  onChange={(e) => setSortBy(e.target.value)}
                />
                Giá: Cao đến Thấp
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="rating"
                  checked={sortBy === "rating"}
                  onChange={(e) => setSortBy(e.target.value)}
                />
                Đánh giá cao nhất
              </label>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="brand-content">
          <div className="products-grid">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <div key={product._id} className="product-card">
                  {/* Product Image */}
                  <div
                    className="product-image-wrapper"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="product-overlay">
                      <button className="view-btn">Xem chi tiết</button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-brand">
                      {product.brand_id?.name || "Thương hiệu"}
                    </p>

                    {/* Rating */}
                    <div className="product-rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          color={i < (product.rating || 0) ? "#ffc107" : "#ddd"}
                          size={14}
                        />
                      ))}
                      <span className="rating-count">
                        ({product.numReviews || 0})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="product-price">
                      <span className="current-price">
                        {product.price.toLocaleString("vi-VN")} đ
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="product-actions">
                      <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(product)}
                      >
                        Thêm vào giỏ
                      </button>
                      <button
                        className={`wishlist-btn ${
                          wishlistIds.has(product._id) ? "active" : ""
                        }`}
                        onClick={() => handleWishlistToggle(product._id)}
                      >
                        {wishlistIds.has(product._id) ? (
                          <FaHeart size={20} />
                        ) : (
                          <FiHeart size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <p>Không có sản phẩm của thương hiệu này</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                <FiChevronLeft /> Trước
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`pagination-number ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Sau <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Brand;
