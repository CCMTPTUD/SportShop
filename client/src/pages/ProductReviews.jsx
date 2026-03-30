import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import {
  FiEdit,
  FiImage,
  FiThumbsUp,
  FiThumbsDown,
  FiChevronRight,
} from "react-icons/fi";
// Import component Header
import Header from "../components/Header/Header";
import "./ProductReviews.css";

const ProductReviews = () => {
  const [activeFilter, setActiveFilter] = useState("All reviews");

  // Dữ liệu mẫu (Mock data)
  const galleryImages = [
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200",
    "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=200",
  ];

  const reviewsData = [
    {
      id: 1,
      user: "Trần Văn A",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      rating: 4,
      title: "Sản phẩm tốt!!!",
      content: "Giày đẹp, mang êm, giá rẻ hơn shop khác",
      images: [galleryImages[0], galleryImages[1]],
      likes: 5,
      dislikes: 2,
    },
    {
      id: 2,
      user: "Trần Văn B",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
      rating: 4,
      title: "Sản phẩm khá!!!",
      content: "Giày đẹp, mang êm, giá rẻ hơn shop khác",
      images: [galleryImages[2], galleryImages[3]],
      likes: 5,
      dislikes: 2,
    },
  ];

  // Hàm render số lượng sao
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) =>
      index < rating ? (
        <FaStar key={index} />
      ) : (
        <FaRegStar key={index} style={{ color: "#ddd" }} />
      ),
    );
  };

  return (
    <>
      {/* Hiển thị Header ở trên cùng */}
      <Header />

      <div className="reviews-container">
        {/* Breadcrumb giả lập */}
        <div className="breadcrumb">
          Home/ Cầu lông/ Giày/ <strong>Asics Court Control FF 4 Wide</strong>
        </div>

        {/* Header */}
        <div className="reviews-header">
          <div className="rating-summary">
            <div className="stars-container">{renderStars(4)}</div>
            <div className="rating-text">
              4/5 <span className="rating-count">(222 reviews)</span>
            </div>
          </div>
          <button className="btn-write-review">
            <FiEdit /> Viết đánh giá
          </button>
        </div>

        {/* Community Gallery */}
        <div className="gallery-section">
          <div className="gallery-title">
            <FiImage /> Community Gallery
          </div>
          <div className="gallery-images">
            {galleryImages.map((img, index) => (
              <div className="gallery-img-wrapper" key={index}>
                <img src={img} alt={`Gallery ${index}`} />
                {/* Hiển thị lớp phủ cho ảnh cuối cùng để báo hiệu còn nhiều ảnh */}
                {index === 4 && (
                  <div className="more-overlay">
                    <FiChevronRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Filters & Sorting */}
        <div className="reviews-filters">
          <div className="filter-pills">
            {[
              "All reviews",
              "With photos (120)",
              "Verified purchase",
              "5 Stars only",
            ].map((filter) => (
              <button
                key={filter}
                className={`filter-pill ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="sort-container">
            <span>sort by:</span>
            <select className="sort-select">
              <option value="latest">Gần nhất</option>
              <option value="highest">Đánh giá cao</option>
              <option value="lowest">Đánh giá thấp</option>
            </select>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {reviewsData.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="reviewer-info">
                <img
                  src={review.avatar}
                  alt={review.user}
                  className="reviewer-avatar"
                />
                <span className="reviewer-name">{review.user}</span>
              </div>

              <div className="review-rating-title">
                <div className="stars-container" style={{ fontSize: "1rem" }}>
                  {renderStars(review.rating)}
                </div>
                <span className="review-title">{review.title}</span>
              </div>

              <p className="review-content">{review.content}</p>

              {review.images && review.images.length > 0 && (
                <div className="review-images">
                  {review.images.map((img, idx) => (
                    <img
                      src={img}
                      alt={`Review pic ${idx}`}
                      className="review-img"
                      key={idx}
                    />
                  ))}
                </div>
              )}

              <div className="review-footer">
                <span>Bài đánh giá này có hữu ích không?</span>
                <div className="helpfulness">
                  <button className="help-btn">
                    <FiThumbsUp /> {review.likes}
                  </button>
                  <button className="help-btn">
                    <FiThumbsDown /> {review.dislikes}
                  </button>
                </div>
                <button className="report-btn">Report</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
