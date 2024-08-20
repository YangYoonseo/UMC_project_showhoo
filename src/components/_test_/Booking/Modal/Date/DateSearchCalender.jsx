import Calendar from "react-calendar";
import "../../../../../styles/Jisu/DateSearchCalender.css";
import "react-calendar/dist/Calendar.css";
import { useState, useContext, useEffect } from "react";
import { ProfileContext } from "../../../../../App";
import PerformerCalendar from "../../../../com_Concert/PerformerCalendar";
import SpaceRental from "../../../../../api/yoonseo/SpaceRental";

const DateSearchCalender = () => {
  const profiles = useContext(ProfileContext);
  const [date, setDate] = useState(new Date());

  const [show, setShow] = useState(false);
  const [application, setApplication] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [rental, setRental] = useState([]);

  useEffect(() => {
    const fetchSpaceRental = async () => {
      const data = await SpaceRental();
      if (data) {
        setRental(data);
      }
    };
    fetchSpaceRental();
  }, []);

  console.log("rental", rental);

    const handleDateClick = (selectedDate) => {
    const selectedDay = selectedDate.toISOString().split("T")[0]; // 날짜를 "YYYY-MM-DD" 포맷으로 변환

    // Reset all states
    setShow(false);
    setApplication(false);
    setCompleted(false);

    // rental 배열을 순회하면서 날짜와 상태를 체크
    rental.forEach((rentalItem) => {
      if (rentalItem.date === selectedDay) {
        switch (rentalItem.status) {
          case -2:
            setShow(true);
            break;
          case 0:
            setApplication(true);
            break;
          case 1:
            setCompleted(true);
            break;
          default:
            break;
        }
      }
    });
  };

  return (
    <div className="DateSearchCalender">
      <Calendar
        onChange={setDate}
        value={date}
        formatDay={(locale, date) => date.getDate().toString()} // 일 제거 숫자만 보이게
        prev2Label={null}
        next2Label={null}
        calendarType="gregory" // 시작 요일 일요일로 변경
        showNeighboringMonth={false} // 이웃달 안 보여줌
        onClickDay={handleDateClick} // 클릭된 날짜에 대한 핸들러 추가
      />
    </div>
  );
};

export default DateSearchCalender;
