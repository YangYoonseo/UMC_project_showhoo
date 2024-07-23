import React from 'react';
import './VenueDetails.css';

const Notice = () => {
  return (
    <div className="venue-notice">
      <div className="notice-section">
        <h3>1. 환불 절차</h3>
        <p>공연장 대관 예약을 취소할 경우, 아래의 환불 절차에 따라 환불이 진행됩니다.</p>
        <ul>
          <li>이용 당일 - 0일 전: 100% 환불</li>
          <li>이용 1일 - 5일 전: 70% 환불</li>
          <li>이용 6일 - 10일 전: 30% 환불</li>
          <li>이용 11일 - 20일 전: 10% 환불</li>
          <li>이용 21일 전: 전액 환불</li>
        </ul>
      </div>
      <div className="notice-section">
        <h3>2. 대관비, 예약금 및 잔금</h3>
        <p>대관비는 계약 시 예약금으로 50%, 잔금은 이용일 1주일 전까지 납부해야 합니다.</p>
        <p>예약금은 다음과 같이 납부할 수 있습니다.</p>
        <ul>
          <li>계좌이체: 우리은행 123-456-789, 예금주: 001 클럽</li>
          <li>카드결제: 공연장 방문 시 결제 가능</li>
        </ul>
      </div>
      <div className="notice-section">
        <h3>3. 예약 시 주의사항</h3>
        <ul>
          <li>예약 후 변경이 필요한 경우, 반드시 전화로 문의해주시기 바랍니다.</li>
          <li>예약 변경 시 추가 비용이 발생할 수 있습니다.</li>
        </ul>
      </div>
      <div className="notice-section">
        <h3>4. 추가, 청소비 및 연기료</h3>
        <ul>
          <li>추가 시간당 청소비는 50,000원입니다.</li>
          <li>예약 변경 시 연기료는 100,000원입니다.</li>
        </ul>
      </div>
      <div className="notice-section">
        <h3>5. 긴급 연락처</h3>
        <ul>
          <li>공연장 관리팀: 010-1234-5678</li>
          <li>예약 문의: 010-9876-5432</li>
        </ul>
      </div>
    </div>
  );
};

export default Notice;
