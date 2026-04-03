import React, { useEffect, useState, useMemo } from "react";
import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import "./Brands.css";

const Brands = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState("A");

  // Tạo mảng A-Z
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_ENDPOINTS.BRANDS);
      setBrands(response.data);
    } catch (error) {
      console.error("Lỗi khi tải thương hiệu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter brands based on selected letter
  const filteredBrands = useMemo(() => {
    if (selectedLetter === "All") {
      return brands;
    }
    return brands.filter((brand) =>
      brand.name.toUpperCase().startsWith(selectedLetter)
    );
  }, [brands, selectedLetter]);

  const handleBrandClick = (brandId) => {
    navigate(`/brand/${brandId}`);
  };

  return (
    <div className="brands-page">
      <Header />

      {/* Main Content */}
      <div className="brands-wrapper">
        {/* Title Section */}
        <div className="brands-header">
          <h1>Thương hiệu sản phẩm</h1>
          <p>Tất cả các thương hiệu sản phẩm trong shop</p>
          <button className="btn-see-all" onClick={() => setSelectedLetter("All")}>
            ≡ Xem tất cả
          </button>
        </div>

        {/* Alphabet Filter */}
        <div className="alphabet-filter">
          {alphabet.map((letter) => (
            <button
              key={letter}
              className={`filter-btn ${selectedLetter === letter ? "active" : ""}`}
              onClick={() => setSelectedLetter(letter)}
            >
              {letter}
            </button>
          ))}
          <button
            className={`filter-btn ${selectedLetter === "All" ? "active" : ""}`}
            onClick={() => setSelectedLetter("All")}
          >
            ...
          </button>
        </div>

        {/* Brands Section */}
        <div className="brands-section">
          <h2>Thương hiệu</h2>

          {isLoading ? (
            <div className="loading">Đang tải thương hiệu...</div>
          ) : filteredBrands.length === 0 ? (
            <div className="no-brands">
              <p>Không có thương hiệu nào bắt đầu bằng chữ "{selectedLetter}"</p>
            </div>
          ) : (
            <div className="brands-grid">
              {filteredBrands.map((brand) => (
                <div key={brand._id} className="brand-card">
                  <div className="brand-image-box">
                    {brand.logoUrl ? (
                      <img src={brand.logoUrl} alt={brand.name} />
                    ) : (
                      <div className="image-placeholder">🏷️</div>
                    )}
                  </div>
                  <div className="brand-content">
                    <h3>{brand.name}</h3>
                    <p>{brand.description || "Khám phá thương hiệu sản phẩm này"}</p>
                    <button
                      className="btn-shop-now"
                      onClick={() => handleBrandClick(brand._id)}
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Brands;
