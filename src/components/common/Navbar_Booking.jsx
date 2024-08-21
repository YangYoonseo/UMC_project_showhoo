import "./Navbar_Booking.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import logo_booking from "../../assets/images/logo_booking.svg";
import logo_mypage from "../../assets/images/logo_mypage.svg";

import SwitchRoles from "./SwitchRoles";
import AlarmNumber from "../../api/AlarmNumber";

const Navbar_Booking = () => {
  const [popup, setPopup] = useState(false);
  const [numberOfAlarm, setNumberOfAlarm] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchAlarmNumber = async () => {
      const data = await AlarmNumber("AUDIENCE");
      if (data) {
        setNumberOfAlarm(data.result);
      }
    };
    fetchAlarmNumber();
  }, []);

  return (
    <div className="Container113">
      <div className="Frame128 booking_img">
        <img src={logo_booking} alt="" />
        <div className="Frame127 booking_navbar">
          <button
            className="Button47"
            onClick={() => {
              nav("/home_booking");
            }}
          >
            홈
          </button>
          <button
            className="booking"
            onClick={() => {
              nav("/booking");
            }}
          >
            공연 예매
          </button>
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
          className="mypageImg"
          src={logo_mypage}
          alt=""
          onClick={() => {
            nav("/mypage_booking");
          }}
        />
        {numberOfAlarm !== null && ( // 알림 데이터가 로드되었을 때만 렌더링
          <h6 className={numberOfAlarm === 0 ? "no_alarm" : "number_of_alarm"}>
            {numberOfAlarm}
          </h6>
        )}
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
