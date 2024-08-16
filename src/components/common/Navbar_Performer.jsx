import "./Navbar_Performer.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import logo_performer from "../../assets/images/logo_performer.svg";
import logo_mypage from "../../assets/images/logo_mypage.svg";

import SwitchRoles from "./SwitchRoles";
import AlarmNumber from "../../api/AlarmNumber";

const Navbar_Perforemr = () => {
  const [popup, setPopup] = useState(false);
  const [numberOfAlarm, setNumberOfAlarm] = useState();
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
          <button
            className="Button50"
            onClick={() => {
              nav("/performer_ready");
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
            nav("/mypage_performer");
          }}
        />
        <h6 className={numberOfAlarm === 0 ? "no_alarm" : "number_of_alarm"}>
          {numberOfAlarm}
        </h6>
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
