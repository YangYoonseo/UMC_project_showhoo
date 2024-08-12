//loginpage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import styled from 'styled-components';
import '../styles/LoginPage.css';
import Navbar_Performer from '../components/common/Navbar_Performer.jsx';
import Footer from '../components/common/Footer.jsx';
import kakaologinbutton from "../assets/images/loginpage/kakaologinbutton.png";
import x_button from "../assets/images/loginpage/x_button.png";

const LoginPage = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 생성

  const handleClose = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className='navfot2'>
      <Navbar_Performer/>
        <Footer />
      <div className="login-page">
        <div className="login-box">
          <img 
            src={x_button} 
            alt="Close" 
            className="close-button" 
            onClick={handleClose} // x 버튼 클릭 시 handleClose 함수 호출
          />
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
    </div>
  );
};

export default LoginPage;
