import React from 'react';
import './VenueDetails.css';

const BookingForm = ({ rentalFee }) => {
  return (
    <div className="booking-form">
      <div className="price-info">
        <span className="price-value">₩{rentalFee.toLocaleString()}</span>
        <span className="price-unit">/일</span>
      </div>
      <div className="booking-options">
        <div className="booking-option">
          <span className="booking-option-label">예약 날짜</span>
          <span className="booking-option-arrow">⌄</span>
        </div>
        <div className="booking-option">
          <span className="booking-option-label">예상 관람객 수</span>
          <span className="booking-option-arrow">⌄</span>
        </div>
        <div className="booking-option">
          <span className="booking-option-label">추가 서비스</span>
          <span className="booking-option-arrow">⌄</span>
        </div>
      </div>
      <button className="booking-button">대관 신청하기</button>
      <div className="additional-info">
        <div className="additional-info-row">
          <span>대관료</span>
          <span className="rental-fee">₩{rentalFee.toLocaleString()}</span>
        </div>
        <div className="additional-info-row">
          <span>총 합계</span>
          <span className="total-fee">₩{rentalFee.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

