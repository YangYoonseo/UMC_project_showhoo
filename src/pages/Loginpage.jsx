import React from 'react';
import '../styles/LoginPage.css';
import kakaologinbutton from "../assets/images/loginpage/kakaologinbutton.png";
import x_button from "../assets/images/loginpage/x_button.png";

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-box">
        <img src={x_button} alt="Close" className="close-button" />
        <div className="login-content">
          <h1><span className="showhoo-text">ShowHoo</span><span className="welcome-text">에 오신 걸</span></h1>
          <h2 className="greeting-text">환영합니다</h2>
          <img src={kakaologinbutton} alt="카카오로 로그인" className="kakao-login-button" />
          <div className="login-links">
            <span>쇼호 서비스 약관</span>
            <span>쇼호 개인정보 처리방침</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
