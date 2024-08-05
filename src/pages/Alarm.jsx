import "../styles/yoonseo/Alarm.css";

import Navbar_Perforemr from "../components/common/Navbar_Performer";
import AlarmDetail from "../components/com_Performer/AlarmDetail";

const Alarm = () => {
  const ex_alarms = [
    {
      type: "comment",
      message: "001클럽이 회원님의 후기 댓글을 남겼습니다.",
      timestamp: "2024.08.23 17:43:54",
    },
    {
      type: "ticket",
      message: '박예술님이 "고소각 제 23회 공연" 티켓 환불 요청을 하셨습니다.',
      timestamp: "2024.08.22 18:12:45",
    },
    {
      type: "comment",
      message:
        "001클럽이 회원님의 대관 신청을 승인하였습니다. 이제 공연 준비를 시작해보세요.",
      timestamp: "2024.03.18 13:51:14",
    },
  ];
  return (
    <div className="Alarm">
      <Navbar_Perforemr />

      <div className="Alarm_content">
        <h1>알림</h1>
        <div className="Alarm_map">
          {ex_alarms.map((notification, index) => (
            <AlarmDetail
              key={index}
              type={notification.type}
              message={notification.message}
              timestamp={notification.timestamp}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alarm;
