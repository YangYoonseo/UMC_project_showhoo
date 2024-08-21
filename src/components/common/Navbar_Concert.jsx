import "./Navbar_Concert.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import logo_concert from "../../assets/images/logo_concert.svg";
import logo_mypage from "../../assets/images/logo_mypage.svg";

import SwitchRoles from "./SwitchRoles";
import AlarmNumber from "../../api/AlarmNumber";

const Navbar_Concert = () => {
  const [popup, setPopup] = useState(false);
  const [numberOfAlarm, setNumberOfAlarm] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchAlarmNumber = async () => {
      const data = await AlarmNumber("SPACEUSER");
      if (data) {
        setNumberOfAlarm(data.result);
      }
    };
    fetchAlarmNumber();
  }, []);

  return (
    <div className="Container113">
      <div className="Frame128 concert_img">
        <img src={logo_concert} alt="" />
        <div className="Frame127 concert_navbar">
          <button
            className="Button47"
            onClick={() => {
              nav("/home_concert");
            }}
          >
            홈
          </button>
          <button
            className="concert_register"
            onClick={() => {
              nav("/venue_register");
            }}
          >
            공연장 등록
          </button>
          <button
            className="concert_ready"
            onClick={() => {
              nav("/concert_ready");
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
          className="mypageImg"
          src={logo_mypage}
          alt=""
          onClick={() => {
            nav("/mypage_concert");
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

export default Navbar_Concert;
