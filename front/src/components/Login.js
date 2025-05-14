import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // 스타일링 파일 추가

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));

    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.status === 200) {
      setLoginCheck(false);
      localStorage.setItem("accessToken", result.data.accessToken);
      console.log("토큰", localStorage);
      // navigate('/diet'); // 원하는 페이지로 이동
    } else {
      setLoginCheck(true);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="title">남윤형의 식단</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
        {loginCheck && <p className="error-message">로그인 실패. 다시 시도하세요.</p>}
        <p className="signup-link">
          <Link to="/signup">회원 가입</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
