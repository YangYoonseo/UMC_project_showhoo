// BookingForm.jsx
// css 중복 이슈로 styled-component 사용
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import arrowbutton from "../../assets/images/venuedetailpage/oui_arrow-up.png";
import peopleimg from "../../assets/images/venuedetailpage/ion_people-outline.png";
import calenderimg from "../../assets/images/venuedetailpage/uil_calender.svg";
import plusimg from "../../assets/images/venuedetailpage/plus_button.png";
import checkOn from '../../assets/images/venuedetailpage/check_on.svg';
import checkOff from '../../assets/images/venuedetailpage/check_off.svg';

const BookingForm = ({ rentalFee, additionalServices1 = [] }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [expectedAudience, setExpectedAudience] = useState([0, 500]);
  const [audienceText, setAudienceText] = useState('예상 관람객 수');
  const [additionalServices, setAdditionalServices] = useState([]);
  const [showAudienceSlider, setShowAudienceSlider] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [isFirstOptionActive, setIsFirstOptionActive] = useState(false); // toggle border focusing
  const [isSecondOptionActive, setIsSecondOptionActive] = useState(false);
  const [isThirdOptionActive, setIsThirdOptionActive] = useState(false);
  const navigate = useNavigate();

  // 날짜에 하루 더해서 사용하는 함수
  const handleDateChange = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  // 캘린더 함수
  const toggleCalendar = () => {
    setIsFirstOptionActive(!isFirstOptionActive); // 토글로 상태값 변경
    setShowCalendar(!showCalendar);
  };

  // 슬라이더 함수
  const toggleAudienceSlider = () => {
    if (showAudienceSlider) {
      setAudienceText(`${expectedAudience[0]}명 ~ ${expectedAudience[1]}명`);
    }
    setIsSecondOptionActive(!isSecondOptionActive);
    setShowAudienceSlider(!showAudienceSlider);
  };

  const handleAudienceChange = (newValue) => {
    setExpectedAudience(newValue);
  };

  // 텍스트 입력 핸들러
  const handleAudienceInputChange = (index, value) => {
    const newValue = [...expectedAudience];
    newValue[index] = value;
    setExpectedAudience(newValue);
  };

  // 추가 서비스 함수
  const toggleServiceDropdown = () => {
    setShowServiceDropdown(!showServiceDropdown);
    setIsThirdOptionActive(!isThirdOptionActive);
  };

  const handleServiceToggle = (service) => {
    const updatedServices = selectedServices.includes(service.name)
      ? selectedServices.filter((s) => s !== service.name)
      : [...selectedServices, service.name];

    setSelectedServices(updatedServices);
  };

  const selectedServiceCount = selectedServices.length; // 추가서비스 개수세는

  // 대관 신청 버튼 클릭 시 -> 다음 페이지로 이동 [콘솔창에 출력]
  const handleSubmit = () => {
    if (isFormValid) {
      console.log("선택한 날짜:", selectedDate);
      console.log("최소 인원:", expectedAudience[0]);
      console.log("최대 인원:", expectedAudience[1]);
      console.log("선택한 추가 서비스:", selectedServices);
      navigate('/rental_details');
    }
  };

  // 버튼 활성화 조건
  const isFormValid = selectedDate && audienceText !== '예상 관람객 수';


  return (
    <div className="booking-form">
      <div className="price-info">
        <span className="price-value">₩{rentalFee.toLocaleString()}</span>
        <span className="price-unit">/일</span>
      </div>
      <div className="booking-options">

        {/* 첫번째 옵션 */}
        <div className={`booking-option first-option ${isFirstOptionActive ? 'active' : ''}`} onClick={toggleCalendar}>
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
              value={selectedDate} // 선택된 날짜 (+1일 후의 날짜가 저장됨)
              formatDay={(locale, date) => date.getDate()} // 날짜 부분에서 '일' 제거
              prev2Label={null}
              next2Label={null}
              showNeighboringMonth={false} // 이웃달 안 보여줌
              calendarType="gregory" //시작 요일 일요일
              tileContent={({ date, view }) =>
                view === 'month' &&
                selectedDate &&
                date.toDateString() ===
                  new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 1).toDateString() ? (
                  <Circle />
                ) : null
              }
            />
          </CalendarContainer>
        )}

        {/* 두번째 옵션 */}
        <div className={`booking-option sec-option ${isSecondOptionActive ? 'active' : ''}`} onClick={toggleAudienceSlider}>
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
                  onChange={(e) => handleAudienceInputChange(0, parseInt(e.target.value))}
                  min={0}
                  max={expectedAudience[1]} // 최대값은 다른 입력값의 현재값 이하로 설정
                />
                <Span2>명</Span2>
              </AudienceInput>
              <SliderDivisonline></SliderDivisonline>
              <AudienceInput>
                <Span1>최고</Span1>
                <input
                  type="number"
                  value={expectedAudience[1]}
                  onChange={(e) => handleAudienceInputChange(1, parseInt(e.target.value))}
                  min={expectedAudience[0]} // 최소값은 다른 입력값의 현재값 이상으로 설정
                  max={500}
                />
                <Span2>명</Span2>
              </AudienceInput>
            </AudienceSliderContent>
            <SliderContainer>
              <StyledSlider
                range
                min={0}
                max={500}
                value={expectedAudience}
                onChange={handleAudienceChange}
                trackStyle={[{ height: '2px' }]} // 슬라이더 트랙 두께
                handleStyle={[
                  { 
                    backgroundColor: '#ffffff', 
                    borderColor: '#cfcfcf',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                    width: '35px',
                    height: '35px',
                    top: '-5px', 
                  },
                  { 
                    backgroundColor: '#ffffff', 
                    borderColor: '#cfcfcf',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                    width: '35px',
                    height: '35px',
                    top: '-5px',
                  },
                ]}
                railStyle={{ backgroundColor: '#e8e8e8', height: '2px' }} // 레일 두께
              />
            </SliderContainer>
          </AudienceSliderContainer>
        )}

        {/* 세번째 옵션 */}
        <div className={`booking-option last-option ${isThirdOptionActive ? 'active' : ''}`} onClick={toggleServiceDropdown}>
          <img src={plusimg} alt="Plus" />
          <span className="booking-option-label">
            {selectedServiceCount > 0 ? `택 ${selectedServiceCount}` : '추가 서비스'}
          </span>
          <img src={arrowbutton} alt="Arrow" className="arrow-button" />
        </div>
        {showServiceDropdown && (
          <div
            className="service-dropdown"
            style={{ height: `${(additionalServices1.length+1) * 60}px` }} // 추가 서비스 개수에 따라 height 동적으로 설정
          >
            {additionalServices1.length > 0 ? (
              additionalServices1.map((service, index) => (
                <div className="service-item" key={index} onClick={() => handleServiceToggle(service)}>
                  <img
                    src={selectedServices.includes(service.name) ? checkOn : checkOff}
                    alt={selectedServices.includes(service.name) ? "Checked" : "Unchecked"}
                    className="check-icon"
                  />
                  <span className="service-name">{service.name}</span>
                  <span className="service-price">{service.price.toLocaleString()}원</span>
                </div>
              ))
            ) : (
              <div>추가 서비스가 없습니다</div>
            )}
          </div>
        )}
      </div>

       {/* 대관 신청하기 버튼  */}
      <button 
        className="booking-button" 
        onClick={handleSubmit} 
        disabled={!isFormValid} // 폼이 유효하지 않으면 버튼 비활성화
      >
        대관 신청하기
      </button>
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
  top: 155px;
  left: -48px;
  z-index: 10;
  background: white;
  border-radius: 25px 0px 25px 25px !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  height: 410px;
  border: none;
  padding-left:10px;
  padding-right:10px;
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

    /* 요일 글자색 변경 */
  .react-calendar__month-view__weekdays {
    color: #828282; /* 원하는 색상 코드로 변경 */
  }

  .react-calendar__tile {
    font-size: 12px; /* 날짜 글자 크기 조정 */
    height: 50px !important;
    position: relative; /* 위치 조정을 위한 설정 */
    z-index: 1; /* 기본적으로 날짜 타일이 위에 위치 */
    color: #000000 !important;
  }

  .react-calendar__tile--now {
    background: #fff !important;
  }

  .react-calendar__tile--active {
    background: transparent !important;
    z-index: 2; /* 날짜 숫자가 동그라미 위로 오도록 설정 */
  }

  .react-calendar__tile--active::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    z-index: -1; /* 동그라미가 숫자 아래에 위치하도록 설정 */
  }

  /* 포커싱 되면 회색 배경 없애기*/
  .react-calendar__tile:focus {
    background-color: transparent !important;
    box-shadow: none !important; /* 포커스 시 나타나는 그림자 제거 */
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
  transform: translate(-50%, -75%);
  z-index: -1; /* 동그라미가 날짜 숫자 아래에 위치하도록 설정 */
`;

//옵션 2 : 슬라이더
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
  border: 1.2px solid #000;
  min-width: 150px;
  height:60px;
  border-radius: 10px;
  padding: 5px;

  width: 80px;
  margin-bottom:30px;
  box-sizing: border-box;
  

  & > input {
    width: 50px;
    text-align: left;
    margin-top: 10px;
    margin-left:-50px;
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
  }
`;

const Span1 = styled.span`
  font-size: 11px;
  color: #4F4F4F;

  position:relative;
  left: -42px;
  top: 5px;

`;

const Span2 = styled.span`
  font-size: 14px;
  color: #0f0f0f;

  position:relative;
  left: 40px;
  top: -18px;
`;

const SliderDivisonline = styled.div`
  border: 1px solid #b5b5b5;
  transform: rotate(90deg);
  height:30px;

  position:relative;
  top: 10px;
`;
const SliderContainer = styled.div`
  width: 400px; /* 슬라이더의 전체 길이를 375px로 설정 */
  margin: 0 auto; /* 중앙 정렬 */
`;

const StyledSlider = styled(Slider)`
  .rc-slider-rail {
    height: 2px;
  
  }

  .rc-slider-track {
    border: 1.58px solid #07C093;
  }

  .rc-slider-handle {
    border: 2px solid #cfcfcf;
    width: 50px;
    height: 50px;
    background: #ffffff;
    opacity:100%;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }

`;
