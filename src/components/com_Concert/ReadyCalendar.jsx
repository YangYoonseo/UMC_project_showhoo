import Calendar from "react-calendar";
import "../../styles/yoonseo/ReadyCalendar.css";
import "react-calendar/dist/Calendar.css";
import { useState, useContext } from "react";
import { ProfileContext } from "../../App";
import PerformerCalendar from "./PerformerCalendar";

const ReadyCalendar = () => {
  const profiles = useContext(ProfileContext);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [application, setApplication] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleDateClick = (date) => {
    const day = date.getDate();

    // Reset all states
    setShow(false);
    setApplication(false);
    setCompleted(false);

    if (day === 1) {
      setShow(true);
    } else if (day === 13 || day === 16 || day === 28) {
      setApplication(true);
    } else if (day === 23) {
      setCompleted(true);
    }
  };

  const getTileContent = ({ date, view }) => {
    if (view === "month") {
      const day = date.getDate();
      let className = "";
      let text = "";

      if (day === 1) {
        className = "event event_show";
        text = "공연 완료";
      } else if (day === 13 || day === 16 || day === 28) {
        className = "event event_application";
        text = "대관 신청";
      } else if (day === 23) {
        className = "event event_completed";
        text = "대관 완료";
      }

      return <div className={className}>{text}</div>;
    }
    return null;
  };

  return (
    <div className="ReadyCalendar">
      <Calendar
        onChange={setDate}
        value={date}
        formatDay={(locale, date) => date.getDate().toString()} // 일 제거 숫자만 보이게
        prev2Label={null}
        next2Label={null}
        calendarType="gregory" // 시작 요일 일요일로 변경
        showNeighboringMonth={false} // 이웃달 안 보여줌
        tileContent={getTileContent}
        onClickDay={handleDateClick} // 클릭된 날짜에 대한 핸들러 추가
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
