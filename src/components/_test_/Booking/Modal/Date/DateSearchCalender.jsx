import Calendar from "react-calendar";
import "../../../../../styles/Jisu/DateSearchCalender.css";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

const DateSearchCalender = ({ onDateSelect }) => {
  const [date, setDate] = useState(new Date());

  // 날짜 클릭 핸들러 함수
  const handleDateClick = (selectedDate) => {
    // 날짜를 "YYYY-MM-DD" 형식으로 변환하는 대신, toLocaleDateString을 사용하여 로컬 시간대를 기준으로 변환
    const selectedDay = selectedDate.toLocaleDateString('en-CA'); // "YYYY-MM-DD" 형식으로 변환
    setDate(selectedDate); // 선택된 날짜를 상태로 설정
    console.log("handleDateClick 호출, 선택된 날짜: ", selectedDay);
    onDateSelect(selectedDay); // 선택된 날짜를 부모 컴포넌트로 전달
  };

  return (
    <div className="DateSearchCalender">
      <Calendar
        onChange={setDate} // 날짜 변경 시 호출되는 핸들러
        value={date} // 현재 선택된 날짜를 설정
        formatDay={(locale, date) => date.getDate().toString()} // 요일을 제거하고 숫자만 보이게 함
        prev2Label={null} // 이전 월로 가는 두 번째 화살표를 숨김
        next2Label={null} // 다음 월로 가는 두 번째 화살표를 숨김
        calendarType="gregory" // 그레고리오 달력 사용 (일요일 시작)
        showNeighboringMonth={false} // 이웃 달의 날짜를 표시하지 않음
        onClickDay={handleDateClick} // 날짜 클릭 시 호출되는 핸들러
      />
    </div>
  );
};

export default DateSearchCalender;
