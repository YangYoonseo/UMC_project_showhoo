import "./Navbar_Performer.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import logo_performer from "../../assets/images/logo_performer.svg";
import logo_mypage from "../../assets/images/logo_mypage.svg";

import SwitchRoles from "./SwitchRoles";
import AlarmNumber from "../../api/AlarmNumber";

const Navbar_Perforemr = () => {
  const [popup, setPopup] = useState(false);
  const [numberOfAlarm, setNumberOfAlarm] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchAlarmNumber = async () => {
      const data = await AlarmNumber("PERFORMER");
      if (data) {
        setNumberOfAlarm(data.result);
      }
    };
    fetchAlarmNumber();
  }, []);

  const handleRoleSwitchClick = () => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setPopup(true);
    } else {
      nav("/login/oauth2/code/kakao"); // Redirect to Login page if not logged in
    }
  };

  const handleMypageClick = () => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      nav("/mypage");
    } else {
      nav("/login/oauth2/code/kakao");
    }
  };

  const handleReadyClick = () => {
    const token = sessionStorage.getItem("accesToken");
    if (token) {
      nav("/performer_ready");
    } else {
      nav("/login/oauth2/code/kakao");
    }
  };

  return (
    <div className="Container113">
      <div className="Frame128">
        <img src={logo_performer} alt="" />
        <div className="Frame127">
          <button
            className="Button47"
            onClick={() => {
              nav("/");
            }}
          >
            홈
          </button>
          <button
            className="Button48"
            onClick={() => {
              nav("/rental");
            }}
          >
            공연장 대관
          </button>
          <button
            className="Button49"
            onClick={() => {
              nav("/rental_history");
            }}
          >
            대관 내역
          </button>
          <button className="Button50" onClick={handleReadyClick}>
            공연 준비
          </button>
        </div>
      </div>
      <div className="Frame169">
        <button className="Button51" onClick={handleRoleSwitchClick}>
          역할 전환
        </button>
        <img
          className="mypageImg"
          src={logo_mypage}
          alt=""
          onClick={handleMypageClick}
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

export default Navbar_Perforemr;
