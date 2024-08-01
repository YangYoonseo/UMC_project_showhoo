import React from 'react';
import './VenueDetails.css';

const VenueIntroduction = ({ data }) => {
  return (
    <div className="venue-introduction">
      <h2>001 클럽에 대하여</h2>
      <br />
      <p>{data.about}</p>
      <br />
      <p><span className="label">면적 </span> <span className="value">{data.area}</span></p>
      <p><span className="label">인원 </span> <span className="value">{data.capacity}</span></p>
      <p><span className="label">대관시간 </span> <span className="value">{data.rentalTime}</span></p>
      <p><span className="label">대관료 </span> <span className="value">{data.rentalFee}</span></p>
      <p><span className="label">추가 서비스 </span> <span className="value">{data.additionalServices}</span></p>
      <br />
      <h2>위치</h2>
      <p className="location">{data.location}</p>
      <div className="map-image"></div>
    </div>
  );
};

export default VenueIntroduction;

