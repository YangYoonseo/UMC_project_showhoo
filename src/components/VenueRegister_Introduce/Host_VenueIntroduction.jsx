//Host_VenueIntroduction.jsx
import React from 'react';
import '../../styles/VenueRegisterPage_Introduce/Host_VenueIntroduction.css';
import edit_icon from '../../assets/images/venueregisterpage_introduce/edit_icon.svg';
import ex_map from '../../assets/images/venueregisterpage_introduce/ex_map.svg';

const Host_VenueIntroduction = ({ openPlaceModal }) => {
  return (
    <div className="host-venue-introduction">
      <div className="introduction-header">
        <h2>공연장에 대하여</h2>
        <p>공연장을 5줄 이내로 소개해주세요!</p>
      </div>
      <textarea className="venue-description"></textarea>
      
      <div className="input-group">
        <div className="input-container">
          <label htmlFor="area">면적</label>
          <div className="input-with-unit">
            <input type="text" id="area" name="area" />
            <span>m²</span>
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="capacity">인원</label>
          <div className="input-with-unit">
            <input type="text" id="capacity" name="capacity" />
            <span>명</span>
          </div>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="time">대관 시간</label>
        <textarea className="time-field" id="time" name="time" rows="4" />
      </div>

      <div className="info-row">
        <label htmlFor="fee">대관료</label>
        <textarea className="fee-field"></textarea>
        <button className="register-button">등록하기</button>
        <br></br><br></br>
      </div>

      <div className="info-row">
        <label htmlFor="service">추가 서비스</label>
        <textarea className="service-field"></textarea>
        <button className="register-button">등록하기</button>
      </div>

      <div className="location-section">
        <h2>위치</h2>
        <div className="location-header">
          <p>위치 등록하기</p>
          <img src={edit_icon} className="place_edit_icon" alt="edit icon" onClick={openPlaceModal} />
        </div>
        <div className="map">
          <img src={ex_map} className="ex_map" alt="map image" />
        </div>
      </div>
    </div>
  );
};

export default Host_VenueIntroduction;
