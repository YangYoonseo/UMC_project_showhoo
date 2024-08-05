import Calendar from "react-calendar";
import "../../styles/yoonseo/ReadyCalendar.css";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { useContext } from "react";
import { ProfileContext } from "../../App";

import PerformerCalendar from "./PerformerCalendar";

const ReadyCalendar = () => {
  const profiles = useContext(ProfileContext);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [application, setApplication] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleEventShow = () => {
    setApplication(false);
    setCompleted(false);
    setShow(true);
  };

  const handleEventApplication = () => {
    setCompleted(false);
    setShow(false);
    setApplication(true);
  };

  const handleEventCompleted = () => {
    setShow(false);
    setApplication(false);
    setCompleted(true);
  };

  return (
    <div className="ReadyCalendar">
      <Calendar
        onChange={setDate}
        value={date}
        formatDay={(locale, date) => date.getDate().toString()} // 일 제거 숫자만 보이게
        prev2Label={null}
        next2Label={null}
        calendarType="gregory" //시작 요일 일요일로 변경
        showNeighboringMonth={false} //이웃달 안 보여줌
        tileContent={({ date, view }) => {
          if (view === "month") {
            // 추후에 수정해야함. 현재는 날짜별로 되어있음
            if (date.getDate() === 1) {
              return (
                <div className="event event_show" onClick={handleEventShow}>
                  공연 완료
                </div>
              );
            } else if (date.getDate() === 13) {
              return (
                <div
                  className="event event_application"
                  onClick={handleEventApplication}
                >
                  대관 신청
                </div>
              );
            } else if (date.getDate() === 23) {
              return (
                <div
                  className="event event_completed"
                  onClick={handleEventCompleted}
                >
                  대관 완료
                </div>
              );
            } else if (date.getDate() === 16 || date.getDate() === 28) {
              return <div className="event event_application">대관 신청</div>;
            }
          }
        }}
      />

      {/* 공연완료 */}
      {show && (
        <PerformerCalendar
          profile={profiles[1]}
          className={"PerformerCalendar PerformerCalendar_calendar"}
        />
      )}

      {/* 대관 완료 */}
      {completed && (
        <PerformerCalendar
          profile={profiles[2]}
          className={"PerformerCalendar PerformerCalendar_calendar"}
        />
      )}

      {/* 대관 신청 */}
      {application && (
        <PerformerCalendar
          profile={profiles[0]}
          className={"PerformerCalendar PerformerCalendar_calendar"}
        />
      )}
    </div>
  );
};

export default ReadyCalendar;
