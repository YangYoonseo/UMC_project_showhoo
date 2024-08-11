import "./CalenderComponent.css";
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

const CalenderComponent = () => {
    const date=new Date(); // 현재 선택된 날짜 관리
    const mockdata = initialMockdata;

    // 라벨 설정하는 함수
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

    return (
        <div className="Host_Calender">
            <Calendar
                value={date} //현재 선택된 날짜?
                formatDay={(locale, date) => date.getDate().toString()} // 일 제거 숫자만 보이게
                prev2Label={null}
                next2Label={null}
                calendarType="gregory"
                showNeighboringMonth={false} 
                tileContent={getTileContent}
            />
        </div>
    );
}

export default CalenderComponent;

