import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";
import Header from "../components/Header/Header";
import "./Cart.css";

const Cart = () => {
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
  ]);

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

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const goToCheckout = () => {
    if (cartItems.length === 0) return alert("Giỏ hàng đang trống!");
    navigate("/checkout");
  };

  return (
    <>
      <Header />
      <div className="cart-container">
        <h1 className="cart-title">Giỏ hàng</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <FiShoppingBag
              style={{
                fontSize: "3.5rem",
                color: "#ccc",
                marginBottom: "15px",
              }}
            />
            <p>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
            <Link
              to="/"
              style={{
                display: "inline-block",
                marginTop: "15px",
                color: "#fff",
                background: "#000",
                padding: "10px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "0.95rem",
              }}
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-section">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="cart-product-info">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="cart-product-img"
                          />
                          <span className="cart-product-name">{item.name}</span>
                        </div>
                      </td>
                      <td style={{ color: "#555", fontWeight: "500" }}>
                        {formatCurrency(item.price)}
                      </td>
                      <td>
                        <div className="cart-qty-controls">
                          <button
                            className="cart-qty-btn"
                            onClick={() => handleDecrease(item.id)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="cart-qty-btn"
                            onClick={() => handleIncrease(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td style={{ fontWeight: "700", color: "#000" }}>
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                      <td>
                        <button
                          className="btn-remove"
                          onClick={() => handleRemove(item.id)}
                          title="Xóa"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-summary-section">
              <h2 className="cart-summary-title">Tóm tắt đơn hàng</h2>
              <div className="cart-summary-row">
                <span>Tạm tính</span>
                <span style={{ fontWeight: "600", color: "#000" }}>
                  {formatCurrency(totalAmount)}
                </span>
              </div>
              <div className="cart-summary-row cart-summary-total">
                <span>Tổng cộng</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#888",
                  marginTop: "12px",
                  lineHeight: "1.5",
                }}
              >
                Thuế và phí vận chuyển sẽ được tính toán ở bước thanh toán.
              </p>

              <button className="btn-checkout" onClick={goToCheckout}>
                TIẾN HÀNH THANH TOÁN
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
