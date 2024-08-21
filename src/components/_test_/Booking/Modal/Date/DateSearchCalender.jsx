import Calendar from "react-calendar";
import "../../../../../styles/Jisu/DateSearchCalender.css";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import SpaceRental from "../../../../../api/yoonseo/SpaceRental";

const DateSearchCalender = () => {
  const [date, setDate] = useState(new Date());
  const [rental, setRental] = useState([]);

  const [status, setStatus] = useState({
    show: false,
    application: false,
    completed: false,
  });

  useEffect(() => {
    const fetchSpaceRental = async () => {
      const data = await SpaceRental();
      if (data) {
        setRental(data);
      }
    };
    fetchSpaceRental();
  }, []);

  const resetStatus = () => {
    setStatus({
      show: false,
      application: false,
      completed: false,
    });
  };

  const handleDateClick = (selectedDate) => {
    const selectedDay = selectedDate.toISOString().split("T")[0]; // 날짜를 "YYYY-MM-DD" 포맷으로 변환
    setDate(selectedDate);

    resetStatus();

    const rentalItem = rental.find((item) => item.date === selectedDay);
    if (rentalItem) {
      updateStatus(rentalItem.status);
    }
  };

  const updateStatus = (status) => {
    setStatus({
      show: status === -2,
      application: status === 0,
      completed: status === 1,
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
