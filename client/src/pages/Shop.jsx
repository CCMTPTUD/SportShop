import React from "react";
import Header from "../components/Header/Header";
import { FiSliders, FiHeart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import "./Shop.css";

// Dữ liệu mẫu thay vì gọi API
const MOCK_PRODUCTS = [
  { 
    id: 1, 
    brand: "Nike", 
    name: "Nike air force 1 panda", 
    price: "999.000", 
    rating: "5.0", 
    liked: true, 
    // Dùng placeholder image giả lập ảnh giày tách nền
    imgUrl: "https://placehold.co/300x300/e5e5e5/666?text=Nike+Air" 
  },
  { 
    id: 2, 
    brand: "Adidas", 
    name: "Adidas Forum 84", 
    price: "888.000", 
    rating: "4.9", 
    liked: false, 
    imgUrl: "https://placehold.co/300x300/e5e5e5/666?text=Adidas" 
  },
  { 
    id: 3, 
    brand: "NewBalance", 
    name: "NewBalance 550", 
    price: "3.999.000", 
    rating: "5.0", 
    liked: false, 
    imgUrl: "https://placehold.co/300x300/e5e5e5/666?text=NB+550" 
  },
  { 
    id: 4, 
    brand: "Onitsuka Tiger", 
    name: "Mexico 66 yellow", 
    price: "4.999.000", 
    rating: "4.9", 
    liked: false, 
    imgUrl: "https://placehold.co/300x300/e5e5e5/666?text=Mexico+66" 
  },
  { 
    id: 5, brand: "Nike", name: "Nike Dunk Low Retro", price: "2.199.000", rating: "4.8", liked: true, 
    imgUrl: "https://placehold.co/300x300/e5e5e5/666?text=Dunk+Low" 
  },
  { 
    id: 6, brand: "Puma", name: "Puma Suede Classic", price: "2.500.000", rating: "4.7", liked: false, 
    imgUrl: "https://placehold.co/300x300/e5e5e5/666?text=Puma+Suede" 
  },
  { 
    id: 7, brand: "Adidas", name: "Adidas Stan Smith", price: "1.890.000", rating: "4.9", liked: false, 
    imgUrl: "https://placehold.co/300x300/e5e5e5/666?text=Stan+Smith" 
  },
  { 
    id: 8, brand: "NewBalance", name: "NewBalance 990v5", price: "5.500.000", rating: "5.0", liked: true, 
    imgUrl: "https://placehold.co/300x300/e5e5e5/666?text=NB+990v5" 
  },
];

const Shop = () => {
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
            <label className="filter-option"><input type="checkbox" /> Giày</label>
            <label className="filter-option"><input type="checkbox" /> Quần</label>
            <label className="filter-option"><input type="checkbox" /> Phụ kiện</label>
            <label className="filter-option"><input type="checkbox" /> Áo</label>
          </div>
          
          <div className="filter-group">
            <h4 className="filter-group-title">Brands</h4>
            <label className="filter-option"><input type="checkbox" /> Nike</label>
            <label className="filter-option"><input type="checkbox" /> Adidas</label>
            <label className="filter-option"><input type="checkbox" /> Onitsuka Tiger</label>
            <label className="filter-option"><input type="checkbox" /> NewBalance</label>
            <label className="filter-option"><input type="checkbox" /> Puma</label>
          </div>
        </aside>

        {/* Cột phải: Product grid & Phân trang */}
        <main className="product-area">
          
          {/* Lưới sản phẩm */}
          <div className="product-grid">
            {MOCK_PRODUCTS.map((product) => (
              <div className="product-card" key={product.id}>
                
                <div className="product-image-container">
                  {/* Icon Heart Góc phải */}
                  <div className="heart-icon-wrapper">
                    {product.liked ? (
                      <FaHeart className="heart-filled heart-icon" />
                    ) : (
                      <FiHeart className="heart-outline heart-icon" />
                    )}
                  </div>
                  
                  {/* Ảnh sản phẩm */}
                  <img 
                    src={product.imgUrl} 
                    alt={product.name} 
                    className="product-img" 
                  />
                </div>
                
                <div className="product-info">
                  <div className="product-brand-rating">
                    <span className="product-brand">{product.brand}</span>
                    <span className="product-rating">
                      {product.rating} <FaStar className="star-icon" />
                    </span>
                  </div>
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-price">{product.price} VNĐ</p>
                  
                  {/* Nút thêm vào giỏ hàng */}
                  <button className="add-to-cart-btn">Thêm vào giỏ</button>
                </div>
                
              </div>
            ))}
          </div>

          {/* Phân trang */}
          <div className="pagination">
            <button className="page-nav-btn"><FiChevronLeft /></button>
            <button className="page-num-btn active">1</button>
            <button className="page-num-btn">2</button>
            <button className="page-num-btn">3</button>
            <button className="page-nav-btn"><FiChevronRight /></button>
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default Shop;
