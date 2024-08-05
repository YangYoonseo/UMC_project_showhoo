import "./Navbar_Booking.css";
import { useNavigate } from "react-router-dom";

import logo_performer from "../../assets/images/logo_performer.png";
import logo_mypage from "../../assets/images/logo_mypage.png";

const Navbar_Booking = () => {
  const nav = useNavigate();

  return (
    <div className="Container113">
      <div className="Frame128 booking_img">
        <img src={logo_performer} alt="" />
        <div className="Frame127 booking_navbar">
          <button className="home">홈</button>
          <button className="booking">공연 예매</button>
          <button className="booking_history">예매 내역</button>
        </div>
      </div>
      <div className="Frame169">
        <button className="Button51">역할 전환</button>
        <img src={logo_mypage} alt="" />
      </div>
    </div>
  );
};

export default Navbar_Booking;
