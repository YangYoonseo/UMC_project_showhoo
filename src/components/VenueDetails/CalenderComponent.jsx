//CalenderComponent.jsx
// 로딩은 구현 안함
import "./CalenderComponent.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import axios from "axios";

const CalenderComponent = ({ spaceId }) => {
    const [scheduleData, setScheduleData] = useState([]);
    const [holidayData, setHolidayData] = useState([]);
    const [date, setDate] = useState(new Date());
    //const spaceId = 7; 

    useEffect(() => {
        fetchScheduleData();
    }, [spaceId]);

    const fetchScheduleData = async () => {
        try {
            const response = await axios.get(
                `https://showhoo.site/spaces/${spaceId}/spaceApply/info`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                    },
                }
            );
            if (response.data.isSuccess) {
                console.log("[Schedule] API 결과 조회:", response.data.result);
                setScheduleData(response.data.result[0] || []);
                // 휴무일 배열(2번째 배열)이 없는 경우에도 정상적으로 작동하도록 초기화하는 코드
                setHolidayData(response.data.result[1] || []);
            } else {
                console.warn("[Schedule] API 결과 조회 실패:", response.data.message);
            }
        } catch (error) {
            console.error("[Schedule] API 호출 실패 ; 대관 일정을 가져오는데 실패했습니다:", error);
        }
    };

    const getTileContent = ({ date, view }) => {
        if (view === "month") {
            // 대관 현황 처리
            const schedule = scheduleData.find(d => 
                new Date(d.date).getFullYear() === date.getFullYear() &&
                new Date(d.date).getMonth() === date.getMonth() &&
                new Date(d.date).getDate() === date.getDate()
            );
            if (schedule) {
                if (schedule.status === 1) {
                    return <div className="event event_complete">대관 완료</div>;
                } else if (schedule.status === 0) {
                    return <div className="event event_conference">대관 협의 중</div>;
                }
            }

            // 휴무일 처리
            const holiday = holidayData.find(d => 
                new Date(d.date).getFullYear() === date.getFullYear() &&
                new Date(d.date).getMonth() === date.getMonth() &&
                new Date(d.date).getDate() === date.getDate()
            );
            if (holiday) {
                return <div className="event event_holiday">휴무일</div>;
            }
        }
        return null;  // 일정이 없는 경우 아무 것도 반환하지 않음
    };

    return (
        <div className="Host_Calender">
            <Calendar
                value={date}
                formatDay={(locale, date) => date.getDate().toString()}
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

