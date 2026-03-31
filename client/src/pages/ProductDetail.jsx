import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { FaStar, FaRegStar, FaStarHalfAlt, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import Header from '../components/Header/Header';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('review');
  const [comment, setComment] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        // Gộp ảnh chính và thư viện ảnh phụ vào một mảng duy nhất để render UI thuận tiện
        const allImages = [data.imageUrl, ...(data.gallery || [])].filter(Boolean);
        
        setProduct({
          ...data,
          images: allImages.length > 0 ? allImages : ["https://placehold.co/600x600/e5e5e5/666?text=No+Image"],
          brandName: data.brand_id?.name || "Đang cập nhật",
          status: data.stock > 0 ? 'Còn hàng' : 'Hết hàng',
          sizes: data.sizes?.length > 0 ? data.sizes : ['36', '37', '38', '39', '40', '41', '42'], // Default mock sizes nếu db chưa có
          description: data.description || "Chưa có mô tả cho sản phẩm này."
        });
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => {
      if (star <= rating) return <FaStar key={star} className="star filled" />;
      if (star - 0.5 <= rating) return <FaStarHalfAlt key={star} className="star filled" />;
      return <FaRegStar key={star} className="star" />;
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Vui lòng chọn Size trước khi thêm vào giỏ hàng!');
      return;
    }
    alert(`Đã thêm vào giỏ hàng! Size: ${selectedSize}`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Vui lòng chọn Size trước khi mua!');
      return;
    }
    alert(`Mua ngay! Size: ${selectedSize}`);
  };

  const handleSendComment = () => {
    if (!comment.trim()) return;
    alert(`Đã gửi bình luận: "${comment}"`);
    setComment('');
  };

  if (!product)
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );

  return (
    <>
      <Header />

      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb-inner">
          <Link to="/" className="bc-link">Home</Link>
          <span className="bc-sep">/</span>
          <Link to="/shop" className="bc-link">Cầu lông</Link>
          <span className="bc-sep">/</span>
          <Link to="/shop" className="bc-link">Giày</Link>
          <span className="bc-sep">/</span>
          <span className="bc-current">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="pd-wrapper">
        {/* LEFT: Images */}
        <div className="pd-images">
          {/* Thumbnails */}
          <div className="pd-thumbs">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                className={`pd-thumb-btn ${activeImage === idx ? 'active' : ''}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={img} alt={`thumb-${idx}`} />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="pd-main-image-wrap">
            <button className="expand-btn" title="Phóng to">⛶</button>
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="pd-main-image"
            />
          </div>
        </div>

        {/* RIGHT: Info */}
        <div className="pd-info">
          <h1 className="pd-name">{product.name}</h1>

          <div className="pd-meta-row">
            <span className="pd-code">Mã: {product._id}</span>
            <button
              className={`pd-wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <FiHeart /> thêm vào yêu thích
            </button>
          </div>

          <div className="pd-brand-row">
            <span>Thương hiệu: <a href="/shop" className="pd-brand-link">{product.brandName}</a></span>
            <span className="pd-divider">|</span>
            <span>Tình trạng: <strong className="pd-status">{product.status}</strong></span>
          </div>

          <div className="pd-price">
            Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price || 0)}
          </div>

          {/* Size Selection */}
          <div className="pd-size-block">
            <span className="pd-section-label">Size:</span>
            <div className="pd-sizes">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`pd-size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pd-actions">
            <button className="btn-cart" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </button>
            <button className="btn-buy" onClick={handleBuyNow}>
              Mua Ngay
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="pd-tabs-wrapper">
        <div className="pd-tabs">
          <button
            className={`pd-tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Mô tả sản phẩm
          </button>
          <button
            className={`pd-tab-btn ${activeTab === 'review' ? 'active' : ''}`}
            onClick={() => setActiveTab('review')}
          >
            Đánh giá
          </button>
        </div>

        <div className="pd-tab-content">
          {activeTab === 'description' && (
            <div className="pd-description">
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === 'review' && (
            <div className="pd-review-section">
              <div className="review-header">
                <p className="review-product-name">
                  Đánh giá &amp; nhận xét {product.name} ({product._id})
                </p>
                <div className="review-stars-row">
                  {renderStars(product.rating || 0)}
                  <span className="review-score">
                    {product.rating || 0}/5 ({product.numReviews || 0} reviews)
                  </span>
                </div>
              </div>

              <div className="comment-block">
                <label className="comment-label">Bình luận</label>
                <div className="comment-input-row">
                  <textarea
                    className="comment-textarea"
                    placeholder="Xin mời để lại câu hỏi"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                  <button className="comment-send-btn" onClick={handleSendComment}>
                    <FaPaperPlane /> Gửi
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;