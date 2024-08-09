import React from 'react';
import './VenueDetails.css';

//** text -> red */
const highlightText = (text) => {
  const parts = text.split('**');
  return parts.map((part, index) =>
    index % 2 === 1 ? <span style={{ color: 'red' }} key={index}>{part}</span> : part
  );
};

const renderTextWithLineBreaks = (text) => {
  const lines = text.split('<br><br>').map((line, index) =>
    <div key={index}>
      {line.split('<br>').map((item, i) => <p key={i}>{highlightText(item)}</p>)}
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
            <li key={index}>{highlightText(item)}</li>
          ))}
        </ul>
      </div>
      <div className="notice-section">
        <h3>4. 주차, 화장실 및 대기실</h3>
        <ul>
          {data.amenities.split('<br>').map((item, index) => (
            <li key={index}>{highlightText(item)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notice;
