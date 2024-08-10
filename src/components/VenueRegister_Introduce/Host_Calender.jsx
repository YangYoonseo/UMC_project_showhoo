import "../../styles/Eojin/Host_Calender.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

const initialMockdata = [
    {
        'id': 0,
        'date': new Date('2024-08-01'),
        'holiday': false,
        'isSuccess': true
    },
    {
        'id': 1,
        'date': new Date('2024-08-06'),
        'holiday': false,
        'isSuccess': false
    },
    {
        'id': 2,
        'date': new Date('2024-08-16'),
        'holiday': true,
        'isSuccess': false
    },
    {
        'id': 3,
        'date': new Date('2024-08-23'),
        'holiday': false,
        'isSuccess': false
    },
    {
        'id': 4,
        'date': new Date('2024-08-28'),
        'holiday': false,
        'isSuccess': true
    },
];

const Host_Calender = () => {
    const [date, setDate] = useState(new Date());
    const [mockdata, setMockdata] = useState(initialMockdata);

    const getTileContent = ({ date, view }) => {
        if (view === "month") {
            const mockDate = mockdata.find(d => 
                d.date.getFullYear() === date.getFullYear() &&
                d.date.getMonth() === date.getMonth() &&
                d.date.getDate() === date.getDate()
            );

            if (mockDate) {
                if (mockDate.holiday) {
                    return <div className="event event_holiday">휴무일</div>;
                } else if (mockDate.isSuccess) {
                    return <div className="event event_complete">대관 완료</div>;
                } else {
                    return <div className="event event_conference">대관 협의 중</div>;
                }
            }
        }
        return null;
    };

    const handleDateClick = (date) => {
        const foundIndex = mockdata.findIndex(d =>
            d.date.getFullYear() === date.getFullYear() &&
            d.date.getMonth() === date.getMonth() &&
            d.date.getDate() === date.getDate()
        );

        if (foundIndex !== -1) {
            // 날짜가 mockdata에 이미 있으면 삭제
            setMockdata(prev => prev.filter((_, idx) => idx !== foundIndex));
        } else {
            // 날짜가 mockdata에 없으면 추가
            setMockdata(prev => [
                ...prev,
                {
                    id: prev.length, // 새로운 id는 현재 길이로 설정
                    date: date,
                    holiday: true,
                    isSuccess: false
                }
            ]);
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
                tileContent={getTileContent}
                onClickDay={handleDateClick} // 날짜 클릭 핸들러
                tileClassName={tileClassName} // 오늘 날짜 숨기기 위한 클래스
            />
        </div>
    );
}

export default Host_Calender;

