import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";
import Header from "../components/Header/Header";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const formatCurrency = (amount) => amount.toLocaleString("vi-VN") + " đ";

  const handleIncrease = (id, size, qty) => {
    updateQuantity(id, size, qty + 1);
  };

  const handleDecrease = (id, size, qty) => {
    if (qty > 1) {
      updateQuantity(id, size, qty - 1);
    }
  };

  const handleRemove = (id, size) => {
    removeFromCart(id, size);
  };

  const totalAmount = getCartTotal();

  const goToCheckout = () => {
    if (cart.length === 0) return alert("Giỏ hàng đang trống!");
    navigate("/checkout");
  };

  return (
    <>
      <Header />
      <div className="cart-container">
        <h1 className="cart-title">Giỏ hàng</h1>

        {cart.length === 0 ? (
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
                    <th>Size</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={`${item._id}-${item.size}`}>
                      <td>
                        <div className="cart-product-info">
                          <img
                            src={item.imageUrl || "https://placehold.co/300x300/e5e5e5/666?text=No+Image"}
                            alt={item.name}
                            className="cart-product-img"
                          />
                          <span className="cart-product-name">{item.name}</span>
                        </div>
                      </td>
                      <td style={{ color: "#555", fontWeight: "500" }}>{item.size}</td>
                      <td style={{ color: "#555", fontWeight: "500" }}>
                        {formatCurrency(item.price)}
                      </td>
                      <td>
                        <div className="cart-qty-controls">
                          <button
                            className="cart-qty-btn"
                            onClick={() => handleDecrease(item._id, item.size, item.qty)}
                          >
                            -
                          </button>
                          <span>{item.qty}</span>
                          <button
                            className="cart-qty-btn"
                            onClick={() => handleIncrease(item._id, item.size, item.qty)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td style={{ fontWeight: "700", color: "#000" }}>
                        {formatCurrency(item.price * item.qty)}
                      </td>
                      <td>
                        <button
                          className="btn-remove"
                          onClick={() => handleRemove(item._id, item.size)}
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
