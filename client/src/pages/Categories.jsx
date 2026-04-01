import React, { useEffect, useState, useMemo } from "react";
import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Categories.css";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState("M");

  // Tạo mảng A-Z
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter categories based on selected letter
  const filteredCategories = useMemo(() => {
    if (selectedLetter === "All") {
      return categories;
    }
    return categories.filter((cat) =>
      cat.name.toUpperCase().startsWith(selectedLetter)
    );
  }, [categories, selectedLetter]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="categories-page">
      <Header />

      {/* Main Content */}
      <div className="categories-wrapper">
        {/* Title Section */}
        <div className="categories-header">
          <h1>Danh mục sản phẩm</h1>
          <p>Tất cả các danh mục sản phẩm trong shop</p>
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

        {/* Categories Section */}
        <div className="categories-section">
          <h2>Categories</h2>

          {isLoading ? (
            <div className="loading">Đang tải danh mục...</div>
          ) : filteredCategories.length === 0 ? (
            <div className="no-categories">
              <p>Không có danh mục nào bắt đầu bằng chữ "{selectedLetter}"</p>
            </div>
          ) : (
            <div className="categories-grid">
              {filteredCategories.map((category) => (
                <div key={category._id} className="category-card">
                  <div className="category-image-box">
                    {category.image ? (
                      <img src={category.image} alt={category.name} />
                    ) : (
                      <div className="image-placeholder">📦</div>
                    )}
                  </div>
                  <div className="category-content">
                    <h3>{category.name}</h3>
                    <p>{category.description || "Khám phá danh mục sản phẩm này"}</p>
                    <button
                      className="btn-shop-now"
                      onClick={() => handleCategoryClick(category._id)}
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

export default Categories;
