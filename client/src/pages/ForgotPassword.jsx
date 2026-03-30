import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="auth-container">
      <div className="auth-banner forgot-banner">
        <h1 className="text-outline">RESET</h1>
        <h1>PASSWORD</h1>
      </div>

      <div className="auth-form-section">
        <div className="auth-form-box">
          <h2 className="auth-title">Quên mật khẩu</h2>
          <p className="auth-subtitle">
            Nhập email đã đăng ký, chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="phamhuynhtai2004@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-submit">
                Gửi yêu cầu đặt lại
              </button>
            </form>
          ) : (
            <div className="auth-footer" style={{ marginTop: "8px" }}>
              Nếu email tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu đã
              được gửi.
            </div>
          )}

          <div className="auth-footer">
            Nhớ lại mật khẩu? <Link to="/login">Đăng nhập</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
