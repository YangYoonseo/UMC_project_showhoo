import "../../styles/Eojin/Host_VenueSchedule.css";
import { useState, useEffect } from "react";
import Host_Calender from "./Host_Calender";

const Host_VenueSchedule = ({ updateHoliday, holidays }) => {
    const [holiday, setHoliday] = useState(holidays);


    // 휴일 추가 함수 
    const addHoliday = (date) => {
        if (holiday) {
            // 날짜가 배열에 없는 경우에만 추가
            if (!holiday.includes(date)) {
                setHoliday(prevHolidays => [...prevHolidays, date]);
            }
        } else {
            setHoliday(prevHolidays => [...prevHolidays, date]);
        }
    }

    // 휴일 삭제 함수 
    const deleteHoliday = (date) => {
        if (holiday) {
            // 날짜가 배열에 있는 경우 해당 날짜를 제거
            if (holiday.includes(date)) {
                setHoliday(prevHolidays => prevHolidays.filter(holiday => holiday !== date));
            }
        }
    }

    useEffect(() => {
        updateHoliday(holiday);
        console.log(holiday)
    }, [holiday]);
    
    return (
        <div className="Host_VenueSchedule">
            <h4>대관 일정</h4>
            <p>원하는 날짜를 클릭해<span className="highlight">&nbsp;휴무일을 입력해주세요</span></p>
            <div className="calender">
                <Host_Calender addHoliday={addHoliday} deleteHoliday={deleteHoliday} holidays={holiday}/>
            </div>
        </div>
    )
}

export default Host_VenueSchedule;