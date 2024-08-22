// BookingForm.jsx
// css 중복 이슈로 styled-component 사용
// 가격 설정하는 부분에 오류 있어서 덕지덕지 메워둠..
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';

import arrowbutton from "../../assets/images/venuedetailpage/oui_arrow-up.png";
import peopleimg from "../../assets/images/venuedetailpage/ion_people-outline.png";
import calenderimg from "../../assets/images/venuedetailpage/uil_calender.svg";
import plusimg from "../../assets/images/venuedetailpage/plus_button.png";
import checkOn from '../../assets/images/venuedetailpage/check_on.svg';
import checkOff from '../../assets/images/venuedetailpage/check_off.svg';

const BookingForm = ({ spaceId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [expectedAudience, setExpectedAudience] = useState([0, 500]);
  const [audienceText, setAudienceText] = useState('예상 관람객 수');
  const [showAudienceSlider, setShowAudienceSlider] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [isFirstOptionActive, setIsFirstOptionActive] = useState(false);
  const [isSecondOptionActive, setIsSecondOptionActive] = useState(false);
  const [isThirdOptionActive, setIsThirdOptionActive] = useState(false);
  const [rentalFee, setRentalFee] = useState(0);
  const [additionalServiceCost, setAdditionalServiceCost] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [additionalServices1, setAdditionalServices1] = useState([]); 
  const navigate = useNavigate();
  //const spaceId = 7;
  const performerId = 1; // 실제 performerId 값으로 교체 필요

  useEffect(() => {
    fetchAdditionalServices(); // 추가서비스 목록 뽑아오기
    fetchRentalFee();
  }, [selectedDate,selectedServices,spaceId]); // selectedDate가 변경될 때마다 fetchRentalFee 호출


  // 공연장 세부정보 공연장 소개 API 호출 -> 추가 서비스 목록만 뽑아오기
  const fetchAdditionalServices = async () => {
    try {
      const response = await axios.get(
        `https://showhoo.site/spaces/${spaceId}/description`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data.isSuccess) {
        setAdditionalServices1(response.data.result.additionalServices); // 추가 서비스 목록 설정
      }
    } catch (error) {
      console.error("추가 서비스 목록을 위한 공연장 소개 API 호출 실패:", error);
    }
  };


  // 공연장 세부정보 가격 API 호출 -> 날짜 & 추가서비스를 post 하면 가격을 반환받음
  const fetchRentalFee = async () => {
    const edittedDate = new Date(selectedDate);
    // edittedDate.setDate(edittedDate.getDate()+1); // 임시로 하루전 날짜...
    try {
      const response = await axios.post(
        `https://showhoo.site/spaces/${spaceId}/price`,
        {
          date: edittedDate.toISOString().split('T')[0],
          additionalServices: selectedServices,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log('선택된 날짜:',response.data.result);
      if (response.data.isSuccess) {
        setRentalFee(response.data.result.basePrice);
        setAdditionalServiceCost(response.data.result.additionalServicePrice);
        setTotalPrice(response.data.result.totalPrice);
      }
    } catch (error) {
      console.error("공연장 세부정보 가격 API 호출 실패:", error);
    }
  };

  const handleDateChange = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘의 날짜로 시간을 00:00:00으로 초기화
    const selected = new Date(date);

    if (selected < today) {
      alert("지난 날짜는 선택이 불가합니다.");
      return; // 이전 날짜 선택 시 아무 작업도 하지 않음
    }

    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
    setShowCalendar(false);
    setIsFirstOptionActive(false);
    console.log("선택된 날짜:", newDate.toISOString().split('T')[0]); // 선택된 날짜를 콘솔에 출력
    // fetchRentalFee(); //선택된 날짜에 따라 요금을 다시 계산
  };

  const toggleCalendar = () => {
    setIsFirstOptionActive(!isFirstOptionActive);
    setShowCalendar(!showCalendar);
  };

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

  const handleAudienceInputChange = (index, value) => {
    const newValue = [...expectedAudience];
    newValue[index] = value;
    setExpectedAudience(newValue);
  };

  const toggleServiceDropdown = () => {
    setShowServiceDropdown(!showServiceDropdown);
    setIsThirdOptionActive(!isThirdOptionActive);
    fetchRentalFee();
  };

  const handleServiceToggle = (service) => {
    const updatedServices = selectedServices.includes(service.title)
      ? selectedServices.filter((s) => s !== service.title)
      : [...selectedServices, service.title];

    setSelectedServices(updatedServices);
  };

  const selectedServiceCount = selectedServices.length;

  // 대관 신청하기 버튼 클릭 시 콘솔에 선택한 정보 출력
  const handleSubmit = () => {
    console.log("선택된 날짜:", selectedDate.toISOString().split('T')[0]);
    console.log("최소 예상 관람객 수:", expectedAudience[0]);
    console.log("최대 예상 관람객 수:", expectedAudience[1]);
    console.log("rentalFee:",rentalFee);
    console.log("rentalSum:",totalPrice);

    // 선택한 추가 서비스의 정수 ID 값들을 추출하여 출력
    const selectedAdditionalServiceIds = additionalServices1
      .filter(service => selectedServices.includes(service.title))
      .map(service => service.id);
    
    console.log("선택한 추가 서비스:", selectedServices);

    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      navigate("/login/oauth2/code/kakao");
    }
    else {
      // 윤서 네비게이팅 설정 시 주석 처리한 부분으로 사용할 것
      // navigate(`/rental_details/${spaceId}`, {
      navigate('/rental_details', {
        state: {
          selectedDate: selectedDate.toISOString().split('T')[0],
          expectedAudienceMin: expectedAudience[0],
          expectedAudienceMax: expectedAudience[1],
          rentalFee,
          rentalSum: totalPrice,
          selectedAdditionalServices: selectedAdditionalServiceIds,
          selectedServicesTitle: selectedServices,
          spaceId

        }
      });
    }

  };

  const isFormValid = selectedDate && audienceText !== '예상 관람객 수';

  return (
    <div className="booking-form" style={{ height: !showServiceDropdown && selectedServiceCount > 0 ? '530px' : '498px' }}>
      <div className="price-info">
        <span className="price-value">₩{totalPrice.toLocaleString()}</span>
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
              value={selectedDate}
              formatDay={(locale, date) => date.getDate()}
              prev2Label={null}
              next2Label={null}
              showNeighboringMonth={false}
              calendarType="gregory"
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
                  max={expectedAudience[1]}
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
                  min={expectedAudience[0]}
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
              trackStyle={[{ height: '2px' }]}
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
              railStyle={{ backgroundColor: '#e8e8e8', height: '2px' }}
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
              style={{ height: `${(additionalServices1.length + 1) * 60}px` }}
            >
              {additionalServices1.length > 0 ? (
                additionalServices1.map((service, index) => (
                  <div className="service-item" key={index} onClick={() => handleServiceToggle(service)}>
                    <img
                      src={selectedServices.includes(service.title) ? checkOn : checkOff}
                      alt={selectedServices.includes(service.title) ? "Checked" : "Unchecked"}
                      className="check-icon"
                    />
                    <span className="service-name">{service.title}</span>
                    <span className="service-price">{service.price.toLocaleString()}원</span>
                  </div>
                ))
              ) : (
                <div>추가 서비스가 없습니다</div>
              )}
            </div>
          )}
        </div>
    
        {/* 대관 신청하기 버튼 */}
        <button 
          className="booking-button" 
          onClick={handleSubmit} 
          disabled={!isFormValid} 
        >
          대관 신청하기
        </button>
        <div className="additional-info">
          <div className="additional-info-row">
            <span className="feetext">대관료</span>
            <span className="rental-fee">₩{rentalFee.toLocaleString()}</span>
          </div>
          {!showServiceDropdown && selectedServiceCount > 0 && (
            <div className="additional-info-row3">
              <span className="feetext">추가 서비스</span>
              <span className="additional-fee">₩{additionalServiceCost.toLocaleString()}</span>
            </div>
          )}
          <hr className="divider-line" style={{ top: !showServiceDropdown && selectedServiceCount > 0 ? '390px' : '360px' }}/>
          <div className="additional-info-row2" style={{ top: !showServiceDropdown && selectedServiceCount > 0 ? '400px' : '370px' }}>
            <span className="totaltext">총 합계</span>
            <span className="total-fee">₩{totalPrice.toLocaleString()}</span>
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
    margin-top: 20px;
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
