import React from 'react';
import './VenueDetails.css';

// 텍스트 자르는 함수 
// but 백엔드로부터 받아오는 데이터에 따라서 수정해야 할 가능성 높음
const renderTextWithLineBreaks = (text) => {
  const lines = text.split('<br><br>').map((line, index) =>
    <div key={index}>
      {line.split('<br>').map((item, i) => <p key={i}>{item}</p>)}
      {index < text.split('<br><br>').length - 1 && <br />}
    </div>
  );
  return <>{lines}</>;
};

const Notice = ({ data }) => {
  return (
    <div className="venue-notice">
      <div className="notice-section">
        <h3>1. 환불 규정</h3>
        {renderTextWithLineBreaks(data.refundPolicy)}
      </div>
      <div className="notice-section">
        <h3>2. 대관비, 예약금 및 잔금</h3>
        {renderTextWithLineBreaks(data.rentalInfo)}
      </div>
      <div className="notice-section">
        <h3>3. 예약 시 주의사항</h3>
        <ul>
          {data.precautions.split('<br>').map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="notice-section">
        <h3>4. 주차, 화장실 및 대기실</h3>
        <ul>
          {data.amenities.split('<br>').map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notice;
