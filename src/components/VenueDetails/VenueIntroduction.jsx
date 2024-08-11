//VenueIntroduction.jsx
import React from 'react';
import './VenueDetails.css';
import ex_map from '../../assets/images/venueregisterpage_introduce/ex_map.svg';

const VenueIntroduction = ({ data }) => {
  
  // <br> 태그를 기준으로 데이터를 나누어 리스트로 변환하는 함수
  const formatTextToList = (text) => {
    return text.split('<br>').map((item, index) => (
      <li key={index}>{item.trim()}</li>
    ));
  };

  return (
    <div className="venue-introduction">
      <h2>001 클럽에 대하여</h2>
      <br />
      <p>{data.about}</p>
      <br />
      <p><span className="label">면적 </span> <span className="value">{data.area}</span></p>
      <p><span className="label">인원 </span> <span className="value">{data.capacity}</span></p>
      <p><span className="label">대관시간 </span> <span className="value">{data.rentalTime} </span></p>
      <p><span className="label">대관료 </span></p>
      <ul className="value-list">
        {formatTextToList(data.rentalFee)}</ul>
      <p><span className="label">추가 서비스 </span></p>
      <ul className="value-list2">
        {formatTextToList(data.additionalServices)}</ul>
      <p><span className="label">연락처 </span></p>
      <ul className="value-list">
        {formatTextToList(data.tel)}</ul>
      <br />
      <div className="location-section2">
        <h2>위치</h2>
        <div className="location-header2">
          <p className="location2">{data.location}</p>
        </div>
        <div className="map-image">
          <img src={ex_map} className="ex_map2" alt="map image" />
        </div>
      </div>
    </div>
  );
};

export default VenueIntroduction;
