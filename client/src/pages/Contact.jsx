import React from "react";
import Header from "../components/Header/Header"; // Import component Header
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./Contact.css"; // Import file CSS trang Liên hệ (nếu có)

const Contact = () => {
  return (
    <div>
      {/* 1. Gắn Header vào đây */}
      <Header />

      {/* 2. Nội dung trang Liên hệ */}
      <div
        className="contact-container"
        style={{
          maxWidth: "800px",
          margin: "50px auto",
          padding: "40px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <h1
          className="contact-title"
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: 900,
            marginBottom: "40px",
            color: "#000",
            textTransform: "uppercase",
          }}
        >
          CONTACT
        </h1>

        <div
          className="contact-info-list"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            marginBottom: "40px",
            padding: "0 20px",
          }}
        >
          {/* Item 1: Phone */}
          <div
            className="contact-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              className="icon-wrapper"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "50px",
                backgroundColor: "#111",
                color: "#fff",
                borderRadius: "50%",
                fontSize: "1.2rem",
                flexShrink: 0,
              }}
            >
              <FaPhoneAlt />
            </div>
            <div
              className="text-wrapper"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: "20px",
              }}
            >
              <span
                className="contact-label"
                style={{
                  fontSize: "0.85rem",
                  color: "#888",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  marginBottom: "4px",
                }}
              >
                Phone Number
              </span>
              <span
                className="contact-value"
                style={{ fontSize: "1.1rem", color: "#000", fontWeight: 500 }}
              >
                0326 104 339
              </span>
            </div>
          </div>

          {/* Item 2: Email */}
          <div
            className="contact-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              className="icon-wrapper"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "50px",
                backgroundColor: "#111",
                color: "#fff",
                borderRadius: "50%",
                fontSize: "1.2rem",
                flexShrink: 0,
              }}
            >
              <FaEnvelope />
            </div>
            <div
              className="text-wrapper"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: "20px",
              }}
            >
              <span
                className="contact-label"
                style={{
                  fontSize: "0.85rem",
                  color: "#888",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  marginBottom: "4px",
                }}
              >
                Email
              </span>
              <span
                className="contact-value"
                style={{ fontSize: "1.1rem", color: "#000", fontWeight: 500 }}
              >
                trump@gmailgmail.com
              </span>
            </div>
          </div>

          {/* Item 3: Address */}
          <div
            className="contact-item"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              className="icon-wrapper"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "50px",
                backgroundColor: "#111",
                color: "#fff",
                borderRadius: "50%",
                fontSize: "1.2rem",
                flexShrink: 0,
              }}
            >
              <FaMapMarkerAlt />
            </div>
            <div
              className="text-wrapper"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: "20px",
              }}
            >
              <span
                className="contact-label"
                style={{
                  fontSize: "0.85rem",
                  color: "#888",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  marginBottom: "4px",
                }}
              >
                Address
              </span>
              <span
                className="contact-value"
                style={{ fontSize: "1.1rem", color: "#000", fontWeight: 500 }}
              >
                123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
              </span>
            </div>
          </div>
        </div>

        {/* Phần Bản đồ */}
        <div
          className="map-container"
          style={{
            width: "100%",
            height: "400px",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #eee",
          }}
        >
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4946681007846!2d106.699028215334!3d10.773374292323577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4124375af1%3A0x6a2c270c50ceb1c3!2zTMOqIEzhu6NpLCBC4bq_biBOZ2jDqSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1698765432100!5m2!1svi!2s"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ width: "100%", height: "100%", border: "none" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
