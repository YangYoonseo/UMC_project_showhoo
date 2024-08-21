import "../../styles/Eojin/Host_Calender.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";


const Host_Calender = ({ holidays, addHoliday, deleteHoliday }) => {
    const [date, setDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState([]);

    useEffect(() => {
        if (holidays) {
            const holidaysAsDates = holidays.map(dateString => new Date(dateString));
            setFormattedDate(holidaysAsDates);
        }
    }, [holidays]);
    

    const getTileContent = ({ date, view }) => {
        if (view === "month") {
            const isHoliday = formattedDate.some(d => 
                d.getFullYear() === date.getFullYear() &&
                d.getMonth() === date.getMonth() &&
                d.getDate() === date.getDate()
            );

            if (isHoliday) {
                return <div className="event event_holiday">휴무일</div>;
            }
        }
        return null;
    };

    // 날짜를 "YYYY-MM-DD" 형식으로 변환하는 헬퍼 함수
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateClick = (date) => {
        const format = formatDate(date);

        if (holidays) {
            if (holidays.includes(format)) {
                // holidays 배열에 해당 날짜가 있으면 삭제
                deleteHoliday(format);
            } else {
                // holidays 배열에 해당 날짜가 없으면 추가
                addHoliday(format);
            }
        } else {
            // holidays 배열이 비어있을 경우
            addHoliday(format);
        }
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month' && date.toDateString() === new Date().toDateString()) {
            return 'hide-today'; // 오늘 날짜 숨김 클래스
        }
        return null;
    };

    return (
        <div className="Host_Calender">
            <Calendar
                onChange={setDate}
                value={date}
                formatDay={(locale, date) => date.getDate().toString()} // 일 제거 숫자만 보이게
                prev2Label={null}
                next2Label={null}
                calendarType="gregory" // 시작 요일 일요일로 변경
                showNeighboringMonth={false} // 이웃달 안 보여줌
                tileContent={getTileContent} // 휴무일 표시
                onClickDay={handleDateClick} // 날짜 클릭 핸들러
                tileClassName={tileClassName} // 오늘 날짜 숨기기 위한 클래스
            />
        </div>
    );
}

export default Host_Calender;

