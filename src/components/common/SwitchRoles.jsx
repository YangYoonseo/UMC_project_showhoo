import "./SwitchRoles.css";
import logo_performer from "../../assets/images/logo_performer.svg";
import logo_booking from "../../assets/images/logo_booking.svg";
import logo_concert from "../../assets/images/logo_concert.svg";

import { useNavigate } from "react-router-dom";

// 제가 홈화면 페이지가 없어서 일단 제 페이지로 nav 연결 해놨습니다. 다시 연결 부탁드립니다!!

const SwitchRoles = ({ onClose }) => {
  const nav = useNavigate();
  return (
    <div className="x_button">
      <button className="x" onClick={onClose}>
        ×
      </button>
      <div className="SwitchRoles">
        <h1>역할 전환하기</h1>
        <p>공연자, 관람객, 공연장 역할 페이지로 전환하세요</p>
        <div className="performer">
          <img src={logo_performer} alt="" />
          <button
            onClick={() => {
              nav("/performer_registration");
            }}
          >
            공연자
          </button>
        </div>
        <div className="booking">
          <img src={logo_booking} alt="" />
          <button
            onClick={() => {
              nav("/booking_history");
            }}
          >
            관람객
          </button>
        </div>
        <div className="concert">
          <img src={logo_concert} alt="" />
          <button
            onClick={() => {
              nav("/concert_ready");
            }}
          >
            공연장
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwitchRoles;
