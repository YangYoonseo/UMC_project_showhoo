// BookingForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate 훅을 가져옵니다.
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import arrowbutton from "../../assets/images/venuedetailpage/oui_arrow-up.png";
import peopleimg from "../../assets/images/venuedetailpage/ion_people-outline.png";
import calenderimg from "../../assets/images/venuedetailpage/uil_calender.svg";
import plusimg from "../../assets/images/venuedetailpage/plus_button.png";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const BookingForm = ({ rentalFee }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [expectedAudience, setExpectedAudience] = useState([0, 500]);
  const [audienceText, setAudienceText] = useState('예상 관람객 수');
  const [additionalServices, setAdditionalServices] = useState([]);
  const [showAudienceSlider, setShowAudienceSlider] = useState(false);

  const navigate = useNavigate(); // 2. useNavigate 훅 사용

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const toggleAudienceSlider = () => {
    if (showAudienceSlider) {
      setAudienceText(`${expectedAudience[0]}명 ~ ${expectedAudience[1]}명`);
    }
    setShowAudienceSlider(!showAudienceSlider);
  };

  const handleAudienceChange = (newValue) => {
    setExpectedAudience(newValue);
  };

  const handleServiceToggle = (service) => {
    setAdditionalServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = () => {
    // 3. /rental_details로 이동
    navigate('/rental_details');
  };

  return (
    <div className="booking-form">
      <div className="price-info">
        <span className="price-value">₩{rentalFee.toLocaleString()}</span>
        <span className="price-unit">/일</span>
      </div>
      <div className="booking-options">
        <div className="booking-option first-option" onClick={toggleCalendar}>
          <img src={calenderimg} alt="Calendar" />
          <span className="booking-option-label">
            {selectedDate ? selectedDate.toISOString().split('T')[0] : '예약 날짜'}
          </span>
          <img src={arrowbutton} alt="Arrow" className="arrow-button" />
        </div>
        {showCalendar && (
          <CalendarContainer>
            <StyledCalendar
              onChange={handleDateChange}
              value={selectedDate} // 선택된 날짜
              formatDay={(locale, date) => date.getDate()} // 날짜 부분에서 '일' 제거
              tileContent={({ date, view }) =>
                view === 'month' &&
                selectedDate &&
                date.toDateString() === selectedDate.toDateString() ? (
                  <Circle />
                ) : null
              }
            />
          </CalendarContainer>
        )}
        <div className="booking-option sec-option" onClick={toggleAudienceSlider}>
          <img src={peopleimg} alt="People" />
          <span className="booking-option-label">
            {audienceText}
          </span>
          <img src={arrowbutton} alt="Arrow" className="arrow-button" />
        </div>
        {showAudienceSlider && (
          <AudienceSliderContainer>
            <AudienceSliderHeader>예상 관람객 수</AudienceSliderHeader>
            <AudienceSliderContent>
              <AudienceInput>
                <Span1>최저</Span1>
                <input
                  type="number"
                  value={expectedAudience[0]}
                  readOnly
                />
                <Span2>명</Span2>
              </AudienceInput>
              <AudienceInput>
                <Span1>최고</Span1>
                <input
                  type="number"
                  value={expectedAudience[1]}
                  readOnly
                />
                <Span2>명</Span2>
              </AudienceInput>
            </AudienceSliderContent>
            <StyledSlider
              range
              min={0}
              max={500}
              value={expectedAudience}
              onChange={handleAudienceChange}
              trackStyle={[{ backgroundColor: '#09f1b9', height: '3px' }]} // 슬라이더 두께 조정
              handleStyle={[
                { 
                  backgroundColor: '#ffffff', 
                  borderColor: '#09f1b9',
                  boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                  width: '20px',
                  height: '20px'
                },
                { 
                  backgroundColor: '#ffffff', 
                  borderColor: '#09f1b9',
                  boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                  width: '20px',
                  height: '20px'
                },
              ]}
              railStyle={{ backgroundColor: '#e8e8e8', height: '3px' }} // 슬라이더 두께 조정
            />
          </AudienceSliderContainer>
        )}
        <div className="booking-option last-option">
          <img src={plusimg} alt="Plus" />
          <span className="booking-option-label">추가 서비스</span>
          <img src={arrowbutton} alt="Arrow" className="arrow-button" />
        </div>
      </div>
      <button className="booking-button" onClick={handleSubmit}>대관 신청하기</button>
      <div className="additional-info">
        <div className="additional-info-row">
          <span className="feetext">대관료</span>
          <span className="rental-fee">₩{rentalFee.toLocaleString()}</span>
        </div>
        <hr className="divider-line" />
        <div className="additional-info-row2">
          <span className="totaltext">총 합계</span>
          <span className="total-fee">₩{(rentalFee + (additionalServices.length * 100000)).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;


// Styled Components

const CalendarContainer = styled.div`
  position: absolute;
  top: 154px;
  left: -29px;
  z-index: 1;
  background: white;
  border-radius: 25px 0px 25px 25px !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  height: 380px;
  border: none;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 25px 0px 25px 25px !important;

  .react-calendar__navigation__label {
    margin-top: 5px;
    font-size: 15px !important; /* 년월 글자 크기 조정 */
  }

  .react-calendar__tile {
    font-size: 12px; /* 날짜 글자 크기 조정 */
    height: 50px !important;
    position: relative; /* 위치 조정을 위한 설정 */
    z-index: 1; /* 기본적으로 날짜 타일이 위에 위치 */
  }

  .react-calendar__tile--now {
    background: #fff !important;
  }

  .react-calendar__tile--active {
    background: none !important;
    color: black !important;
    z-index: 2; /* 날짜 숫자가 동그라미 위로 오도록 설정 */
  }

  .react-calendar__tile--active::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    background-color: #09f1b9;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: -1; /* 동그라미가 숫자 아래에 위치하도록 설정 */
  }

  /* 요일 밑줄 제거 및 요일 줄과 날짜 줄 사이 구분선 제거 */
  .react-calendar__month-view__weekdays,
  .react-calendar__month-view__weekdays__weekday {
    border-bottom: none !important; /* 요일 밑줄 제거 */
    margin-bottom: 5px !important; /* 요일과 날짜 사이의 간격 제거 */
  }

  .react-calendar__month-view__weekNumbers,
  .react-calendar__month-view__days {
    border-top: none !important; /* 요일 줄과 날짜 줄 사이 구분선 제거 */
  }
`;

const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  background-color: #09f1b9;
  border-radius: 50%;
  transform: translate(-50%, -60%);
  z-index: -1; /* 동그라미가 날짜 숫자 아래에 위치하도록 설정 */
`;

const AudienceSliderContainer = styled.div`
  position: absolute;
  top: 219px;
  left: -188px;
  width: 470px;
  height: 200px;
  background: #ffffff;
  border-radius: 25px 0px 25px 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 2;
`;

const AudienceSliderHeader = styled.h4`
  font-size: 16px;
  margin-bottom: 20px;
  margin-left: 30px;
`;

const AudienceSliderContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-left:25px;
  margin-right:25px;
`;

const AudienceInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  background: #fff;
  border: 1px solid #000;
  min-width: 130px;
  height:50px;
  border-radius: 10px;
  padding: 5px;

  width: 80px;
  margin-bottom:30px;

  & > input {
    width: 50px;
    text-align: left;
    margin-top: 10px;
    margin-left:-50px;
    border: none;
    outline: none;
    background: transparent;
  }
`;

const Span1 = styled.span`
  font-size: 11px;
  color: #4F4F4F;

  position:relative;
  left: -40px;
  top: 5px;

`;

const Span2 = styled.span`
  font-size: 12px;
  color: #0f0f0f;

  position:relative;
  left: 40px;
  top: -15px;
`;

const StyledSlider = styled(Slider)`
  .rc-slider-rail {
    height: 2px;
  }

  .rc-slider-track {
    background: #09f1b9;
    height: 5px; /* 슬라이더 두께 조정 */
  }

  .rc-slider-handle {
    border: 2px solid #cfcfcf;
    width: 50px;
    height: 50px;
    margin-top: -9px;
    background: #ffffff;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;
