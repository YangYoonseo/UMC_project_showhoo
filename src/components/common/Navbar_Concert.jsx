import "./Navbar_Concert.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import logo_concert from "../../assets/images/logo_concert.svg";
import logo_mypage from "../../assets/images/logo_mypage.svg";

import SwitchRoles from "./SwitchRoles";

const Navbar_Concert = () => {
  const [popup, setPopup] = useState(false);
  const nav = useNavigate();

  return (
    <div className="Container113">
      <div className="Frame128 concert_img">
        <img src={logo_concert} alt="" />
        <div className="Frame127 concert_navbar">
          <button className="home">홈</button>
          <button className="concert_register">공연장 등록</button>
          <button
            className="concert_ready"
            onClick={() => {
              nav("/con_ready");
            }}
          >
            공연 준비
          </button>
        </div>
      </div>
      <div className="Frame169">
        <button
          className="Button51"
          onClick={() => {
            setPopup(true);
          }}
        >
          역할 전환
        </button>
        <img
          src={logo_mypage}
          alt=""
          onClick={() => {
            nav("/mypage_concert");
          }}
        />
      </div>
      {popup && (
        <SwitchRoles
          onClose={() => {
            setPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default Navbar_Concert;
