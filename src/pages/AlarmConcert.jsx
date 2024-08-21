import "../styles/yoonseo/Alarm.css";

import axios from "axios";
import { useEffect, useState } from "react";

import Navbar_Concert from "../components/common/Navbar_Concert";
import AlarmDetail from "../components/com_Performer/AlarmDetail";

import AlarmDelete from "../api/AlarmDelete";

const AlarmConcert = () => {
  const url = "https://showhoo.site";
  const [alarmResult, setAlarmResult] = useState([]);
  const spaceUserId = sessionStorage.getItem("spaceUserId");

  useEffect(() => {
    const ConcertAlarmCheck = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${url}/notifications/SPACEUSER/${spaceUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("알림 데이터", response.data.result);
        setAlarmResult(response.data.result);
      } catch (error) {
        console.error("알림 데이터를 가져오는데 실패했습니다:", error);
      }
    };
    ConcertAlarmCheck();
  }, []);

  // 알림 배열을 만들어서 하나씩 넣기

  return (
    <div className="Alarm">
      <Navbar_Concert />

      <div className="Alarm_content">
        <h1>알림</h1>
        <div className="Alarm_map">
          {alarmResult.map((notification) => (
            <AlarmDetail
              key={notification.id}
              id={notification.id}
              type={notification.type}
              message={notification.message}
              timestamp={notification.createdAt}
              AlarmDelete={AlarmDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlarmConcert;
