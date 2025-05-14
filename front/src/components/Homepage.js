import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css"; // 필요 시 스타일링

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">홈페이지</h1>
      <div className="button-group">
        <button className="homepage-button" onClick={() => navigate("/diet")}>
          식단관리
        </button>
        <button className="homepage-button" onClick={() => navigate("/routine")}>
          루틴관리
        </button>
      </div>
    </div>
  );
};

export default Homepage;
