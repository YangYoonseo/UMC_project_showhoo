import React from 'react';
import './VenueDetails.css';

const VenueIntroduction = ({ data }) => {
  return (
    <div className="venue-introduction">
      <h2>001 클럽에 대하여</h2>
      <br></br>
      <p>{data.about}</p>
      <br></br>
      <p><span style={{ color: 'gray' ,marginRight: '10px' }}>면적</span> {data.area}</p>
      <p><span style={{ color: 'gray' ,marginRight: '10px'}}>인원</span> {data.capacity}</p>
      <p><span style={{ color: 'gray' ,marginRight: '10px'}}>대관시간</span> {data.rentalTime}</p>
      <p><span style={{ color: 'gray' ,marginRight: '10px'}}>대관료</span> {data.rentalFee}</p>
      <p><span style={{ color: 'gray',marginRight: '10px' }}>추가 서비스</span> {data.additionalServices}</p>
      <br></br>
      <h2>위치</h2>
      <p>{data.location}</p>
    </div>
  );
};

export default VenueIntroduction;
