import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, getCartTotal, clearCart } = useCart();

  const discountVoucher = 22500;
  const shippingFee = 30000;

  const formatCurrency = (amount) => amount.toLocaleString("vi-VN") + " đ";

  const handleIncrease = (id, size, qty) => {
    updateQuantity(id, size, qty + 1);
  };

  const handleDecrease = (id, size, qty) => {
    if (qty > 1) {
      updateQuantity(id, size, qty - 1);
    }
  };

  const subTotal = getCartTotal();
  const finalTotal = subTotal - discountVoucher + shippingFee;

  return (
    <>
      <Header />
      <div className="checkout-container">
        <div className="checkout-header">
          <FiArrowLeft
            className="back-button"
            onClick={() => navigate(-1)}
            title="Quay lại"
          />
          <h1 className="checkout-title">Thanh toán</h1>
        </div>

        <div className="checkout-content">
          <div className="checkout-items">
            {cart.length === 0 ? (
              <p style={{textAlign: "center", fontStyle: "italic", marginTop: "20px", color: "#888"}}>Không có sản phẩm nào để thanh toán.</p>
            ) : (
              cart.map((item) => (
                <div className="checkout-item" key={`${item._id}-${item.size}`}>
                  <img src={item.imageUrl || "https://placehold.co/300x300/e5e5e5/666?text=No+Image"} alt={item.name} className="item-image" />
                  <div className="item-info">
                    {item.name}
                    <div style={{fontSize: "0.85rem", color: "#666", marginTop: "4px"}}>Size: {item.size}</div>
                  </div>

                  <div className="item-quantity">
                    <button
                      className="qty-btn"
                      onClick={() => handleDecrease(item._id, item.size, item.qty)}
                    >
                      -
                    </button>
                    <span className="qty-number">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleIncrease(item._id, item.size, item.qty)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-price" style={{fontWeight: '600', color: '#000'}}>
                    {formatCurrency(item.price * item.qty)}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="checkout-summary">
            <h2 className="summary-title">Tóm tắt đơn hàng</h2>

            <div className="summary-row">
              <span>Tiền hàng (tạm tính)</span>
              <span style={{ fontWeight: "600", color: "#000" }}>
                {formatCurrency(subTotal)}
              </span>
            </div>

            <div className="summary-row discount">
              <span>Voucher giảm giá</span>
              <span>- {formatCurrency(discountVoucher)}</span>
            </div>

            <div className="summary-row shipping">
              <span>Phí vận chuyển</span>
              <span>{formatCurrency(shippingFee)}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Tổng cộng</span>
              <span>{formatCurrency(finalTotal)}</span>
            </div>

            <button
              className="btn-order"
              onClick={() => {
                if(cart.length === 0) return alert("Giỏ hàng đang trống!");
                alert("Đặt hàng thành công! Cửa hàng sẽ liên hệ bạn sớm.");
                clearCart();
                navigate("/");
              }}
              disabled={cart.length === 0}
            >
              HOÀN TẤT ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
