import React from "react";
import Header from "../components/Header/Header";
import heroImg from "../assets/hero.jpg";
import "./Home.css";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-page">
      {/* Component Header dùng chung */}
      <Header />

      {/* Hero Banner Section */}
      <main className="main-content">
        <div className="hero-section">
          <div className="hero-image-container">
            <img src={heroImg} alt="Chạy bộ thể thao" className="hero-img" />

            {/* Button nằm góc dưới bên trái */}
            <button className="hero-btn">
              Khám phá ngay <FiArrowRight className="arrow-icon" />
            </button>

            {/* Khối text nằm góc dưới bên phải */}
            <div className="hero-texts">
              <h1 className="hero-title">Bức Phá Giới hạn</h1>
              <p className="hero-subtitle">Mùa hè rực lửa</p>
              <p className="hero-discount">Sale 50%</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
