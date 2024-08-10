import "./Navbar_Booking.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import logo_booking from "../../assets/images/logo_booking.svg";
import logo_mypage from "../../assets/images/logo_mypage.svg";

import SwitchRoles from "./SwitchRoles";

const Navbar_Booking = () => {
  const [popup, setPopup] = useState(false);
  const nav = useNavigate();

  return (
    <div className="Container113">
      <div className="Frame128 booking_img">
        <img src={logo_booking} alt="" />
        <div className="Frame127 booking_navbar">
          <button className="home">홈</button>
          <button className="booking">공연 예매</button>
          <button
            className="booking_history"
            onClick={() => {
              nav("/booking_history");
            }}
          >
            예매 내역
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
            nav("/mypage_booking");
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

export default Navbar_Booking;
