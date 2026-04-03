import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import { FiSliders, FiHeart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { API_ENDPOINTS } from "../config/api";
import "./Shop.css";

const Shop = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // States bộ lọc
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  // States phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
      return new Set(stored.map((item) => item._id || item.id));
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [prodRes, catRes, brandRes] = await Promise.all([
          axios.get(API_ENDPOINTS.PRODUCTS),
          axios.get(API_ENDPOINTS.CATEGORIES),
          axios.get(API_ENDPOINTS.BRANDS),
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
        setBrands(brandRes.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu shop:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Xử lý Checkbox bộ lọc
  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
    setCurrentPage(1); // Reset trang mỗi khi đổi bộ lọc
  };

  const toggleBrand = (id) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id],
    );
    setCurrentPage(1);
  };

  // Tính toán lưới sản phẩm dựa trên bộ lọc
  const filteredProducts = products.filter((p) => {
    const matchCat =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.category_id?._id || p.category_id);
    const matchBrand =
      selectedBrands.length === 0 ||
      selectedBrands.includes(p.brand_id?._id || p.brand_id);
    return matchCat && matchBrand;
  });

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const toggleWishlist = (product, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const id = product._id || product.id;
    if (!id) return;

    const stored = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
    const exists = stored.find((item) => (item._id || item.id) === id);

    let updated;
    if (exists) {
      updated = stored.filter((item) => (item._id || item.id) !== id);
    } else {
      updated = [
        ...stored,
        {
          _id: product._id || product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
        },
      ];
    }

    localStorage.setItem("wishlistItems", JSON.stringify(updated));
    setWishlistIds(new Set(updated.map((item) => item._id || item.id)));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const trackRecentViewed = (product) => {
    const id = product._id || product.id;
    if (!id) return;

    const stored = JSON.parse(localStorage.getItem("recentViewedItems") || "[]");
    const trimmed = stored.filter((item) => (item._id || item.id) !== id);
    const next = [
      {
        _id: product._id || product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      },
      ...trimmed,
    ].slice(0, 8);

    localStorage.setItem("recentViewedItems", JSON.stringify(next));
  };

  return (
    <div className="shop-page">
      {/* Tái sử dụng Header */}
      <Header />

      {/* Main body của trang Danh sách */}
      <div className="shop-container">
        {/* Cột trái: Bộ lọc */}
        <aside className="filter-sidebar">
          <div className="filter-header">
            <FiSliders className="filter-icon" />
            <h3 className="filter-title">Bộ lọc</h3>
          </div>

          <div className="filter-group">
            <h4 className="filter-group-title">Danh mục</h4>
            {categories.map((cat) => (
              <label className="filter-option" key={cat._id}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat._id)}
                  onChange={() => toggleCategory(cat._id)}
                />
                {cat.name}
              </label>
            ))}
            {categories.length === 0 && (
              <span style={{ fontSize: "0.85rem", color: "#888" }}>
                Không có danh mục
              </span>
            )}
          </div>

          <div className="filter-group">
            <h4 className="filter-group-title">Brands</h4>
            {brands.map((brand) => (
              <label className="filter-option" key={brand._id}>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand._id)}
                  onChange={() => toggleBrand(brand._id)}
                />
                {brand.name}
              </label>
            ))}
            {brands.length === 0 && (
              <span style={{ fontSize: "0.85rem", color: "#888" }}>
                Không có brand
              </span>
            )}
          </div>
        </aside>

        {/* Cột phải: Product grid & Phân trang */}
        <main className="product-area">
          {/* Lưới sản phẩm */}
          <div className="product-grid">
            {isLoading ? (
              <p>Đang tải dữ liệu sản phẩm...</p>
            ) : currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div className="product-card" key={product._id}>
                  <Link
                    to={`/product/${product._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={() => trackRecentViewed(product)}
                  >
                    <div className="product-image-container">
                      {/* Icon Heart Góc phải */}
                      <button
                        type="button"
                        className="heart-icon-wrapper"
                        onClick={(e) => toggleWishlist(product, e)}
                        aria-label="Yêu thích"
                      >
                        {wishlistIds.has(product._id || product.id) ? (
                          <FaHeart className="heart-filled heart-icon" />
                        ) : (
                          <FiHeart className="heart-outline heart-icon" />
                        )}
                      </button>
                      {/* Ảnh sản phẩm */}
                      <img
                        src={
                          product.imageUrl ||
                          "https://placehold.co/300x300/e5e5e5/666?text=No+Image"
                        }
                        alt={product.name}
                        className="product-img"
                      />
                    </div>

                    <div className="product-info">
                      <div className="product-brand-rating">
                        <span className="product-brand">
                          {product.brand_id?.name || "No Brand"}
                        </span>
                        <span className="product-rating">
                          {product.rating || "0"} <FaStar className="star-icon" />
                        </span>
                      </div>
                      <h4 className="product-name">{product.name}</h4>
                      <p className="product-price">
                        {(product.price || 0).toLocaleString("vi-VN")} VNĐ
                      </p>
                    </div>
                  </Link>

                  <div className="product-info" style={{ paddingTop: 0 }}>
                    <button
                      className="add-to-cart-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product, 1, product.sizes?.[0] || "Default");
                        alert("Đã thêm vào giỏ hàng thành công!");
                      }}
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Chưa có sản phẩm nào phù hợp với bộ lọc.</p>
            )}
          </div>

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-nav-btn"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
              >
                <FiChevronLeft />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  className={`page-num-btn ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="page-nav-btn"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
