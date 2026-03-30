import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Bóng đá Size 5",
      price: 17500,
      quantity: 2,
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png",
    },
    {
      id: 2,
      name: "Bóng chuyền Da",
      price: 40000,
      quantity: 1,
      image: "https://cdn-icons-png.flaticon.com/512/3255/3255393.png",
    },
    {
      id: 3,
      name: "Vợt cầu lông Pro",
      price: 250000,
      quantity: 1,
      image: "https://cdn-icons-png.flaticon.com/512/3255/3255375.png",
    },
    {
      id: 4,
      name: "Áo thun thể thao nam",
      price: 79000,
      quantity: 1,
      image: "https://cdn-icons-png.flaticon.com/512/2806/2806140.png",
    },
  ]);

  const discountVoucher = 22500;
  const shippingFee = 30000;

  const formatCurrency = (amount) => amount.toLocaleString("vi-VN") + " đ";

  const handleIncrease = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecrease = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
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
            {cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-info">{item.name}</div>

                <div className="item-quantity">
                  <button
                    className="qty-btn"
                    onClick={() => handleDecrease(item.id)}
                  >
                    -
                  </button>
                  <span className="qty-number">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleIncrease(item.id)}
                  >
                    +
                  </button>
                </div>

                <div className="item-price">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
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
              onClick={() => alert("Chức năng đặt hàng đang được xây dựng!")}
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
