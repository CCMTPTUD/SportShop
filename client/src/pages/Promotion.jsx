import React from 'react';
import './Promotion.css';

const Promotion = () => {
  const products = [
    // Giày Dép - giảm 50%
    { id: 1, name: 'Giày chạy bộ Nike Air Zoom', originalPrice: 200000, discountPercent: 50, category: 'Giày Dép' },
    { id: 2, name: 'Giày bóng đá Adidas Predator', originalPrice: 250000, discountPercent: 50, category: 'Giày Dép' },
    // Quần Áo - giảm 30%
    { id: 3, name: 'Áo thun thể thao Puma', originalPrice: 50000, discountPercent: 30, category: 'Quần Áo' },
    { id: 4, name: 'Quần short Nike Dri-FIT', originalPrice: 60000, discountPercent: 30, category: 'Quần Áo' },
    // Dụng Cụ Thể Thao - giảm 40%
    { id: 5, name: 'Vợt cầu lông Yonex', originalPrice: 150000, discountPercent: 40, category: 'Dụng Cụ Thể Thao' },
    { id: 6, name: 'Quả bóng đá Adidas', originalPrice: 30000, discountPercent: 40, category: 'Dụng Cụ Thể Thao' },
  ];

  const categories = ['Giày Dép', 'Quần Áo', 'Dụng Cụ Thể Thao'];

  const getProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="promotion-page">
      <header className="promotion-header">
        <h1>🎉 1 NĂM KHAI TRƯƠNG SPORTSTORE 🎉</h1>
        <p className="subtitle">Sale sốc lên đến 50% - Cơ hội vàng mua sắm!</p>
      </header>

      {categories.map(category => (
        <section key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="products-grid">
            {getProductsByCategory(category).map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <div className="sale-tag">SALE {product.discountPercent}%</div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="price-section">
                    <span className="original-price">{formatPrice(product.originalPrice)}</span>
                    <span className="discounted-price">
                      {formatPrice(product.originalPrice * (1 - product.discountPercent / 100))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Promotion;
