import "./calender.css";
import DatePicker from "react-datepicker";
import ko from 'date-fns/locale/ko';
import { format } from 'date-fns'; // 날짜 포맷팅을 위해 가져오기
import "react-datepicker/dist/react-datepicker.css"; // DatePicker 스타일 가져오기


const SelectCalender = ({ selectedDate, handleDateChange }) => {
    
    return (
        <div className="Calender">
            <DatePicker 
                selected={selectedDate} 
                onChange={handleDateChange} 
                showTimeSelect 
                timeCaption="Time"  // 시간 캡션 설정
                dateFormat="yyyy-MM-dd h:mm aa" // 날짜와 시간을 원하는 형식으로 표시
                inline 
                locale={ko} // 로케일을 'ko'로 설정
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                <div className="custom-header">
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                        {"<"}
                    </button>
                    <span>
                        {format(date, "yyyy년 M월", { locale: ko })}
                    </span>
                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                        {">"}
                    </button>
                </div>
            )}
        />
    </div>
    )
}

export default SelectCalender;