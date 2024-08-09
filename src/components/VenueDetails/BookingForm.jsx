import React, { useState } from 'react';
import './VenueDetails.css';
import arrowbutton from "../../assets/images/venuedetailpage/oui_arrow-up.png";
import peopleimg from "../../assets/images/venuedetailpage/ion_people-outline.png";
import calenderimg from "../../assets/images/venuedetailpage/uil_calender.svg";
import plusimg from "../../assets/images/venuedetailpage/plus_button.png";

const BookingForm = ({ rentalFee }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [expectedAudience, setExpectedAudience] = useState(null);
  const [additionalServices, setAdditionalServices] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAudienceChange = (audience) => {
    setExpectedAudience(audience);
  };

  const handleServiceToggle = (service) => {
    setAdditionalServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  return (
    <div className="booking-form">
      <div className="price-info">
        <span className="price-value">₩{rentalFee.toLocaleString()}</span>
        <span className="price-unit">/일</span>
      </div>
      <div className="booking-options">
        <div className="booking-option first-option">
          <img src={calenderimg} alt="Calendar" />
          <span className="booking-option-label">예약 날짜</span>
          <img src={arrowbutton} alt="Arrow" className="arrow-button" />
        </div>
        <div className="booking-option sec-option">
          <img src={peopleimg} alt="People" />
          <span className="booking-option-label">예상 관람객 수</span>
          <img src={arrowbutton} alt="Arrow" className="arrow-button" />
        </div>
        <div className="booking-option last-option">
          <img src={plusimg} alt="Plus" />
          <span className="booking-option-label">추가 서비스</span>
          <img src={arrowbutton} alt="Arrow" className="arrow-button" />
        </div>
      </div>
      <button className="booking-button">대관 신청하기</button>
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
