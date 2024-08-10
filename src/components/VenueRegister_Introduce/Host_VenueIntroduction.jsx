//Host_VenueIntroduction.jsx
import React, { useState } from 'react';
import '../../styles/VenueRegisterPage_Introduce/Host_VenueIntroduction.css';
import edit_icon from '../../assets/images/venueregisterpage_introduce/edit_icon.svg';
import ex_map from '../../assets/images/venueregisterpage_introduce/ex_map.svg';
import Pop_Service from './Pop_Service';
import Pop_Fee from './Pop_Fee';

const Host_VenueIntroduction = ({ openPlaceModal }) => {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceOptions, setServiceOptions] = useState([]); // 옵션 필드 데이터 저장
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false); // 대관료 모달 상태 추가
  const [feeDescription, setFeeDescription] = useState('');
  const [offSeasonFees, setOffSeasonFees] = useState({});
  const [peakSeasonFees, setPeakSeasonFees] = useState({});
  const [accountDetails, setAccountDetails] = useState({});

  const openServiceModal = () => setIsServiceModalOpen(true); // 추가서비스 모달
  const closeServiceModal = () => setIsServiceModalOpen(false);

  const openFeeModal = () => setIsFeeModalOpen(true); // 대관료 모달
  const closeFeeModal = () => setIsFeeModalOpen(false);

  // Pop_Service에서 받아온 데이터를 처리하는 함수
  const handleServiceConfirm = (description, options) => {
    setServiceDescription(description);
    setServiceOptions(options); // 옵션 필드 데이터 저장
    closeServiceModal();
  };

  // Pop_Fee에서 받아온 데이터를 처리하는 함수
  const handleFeeConfirm = (description, offSeason, peakSeason, accountInfo) => {
    setFeeDescription(description);
    setOffSeasonFees(offSeason);
    setPeakSeasonFees(peakSeason);
    setAccountDetails(accountInfo);

    // 데이터 확인용 콘솔 출력
    console.log("비성수기 요일별 대관료:", offSeason);
    console.log("성수기 요일별 대관료:", peakSeason);
    console.log("계좌 정보:", accountInfo);

    closeFeeModal();
  };

  return (
    <div className="host-venue-introduction">
      <div className="introduction-header">
        <h2>공연장에 대하여</h2>
        <p>공연장을 5줄 이내로 소개해주세요!</p>
      </div>
      <textarea className="venue-description"></textarea>
      
      <div className="input-group">
        <div className="input-container">
          <label htmlFor="area">공연장</label>
          <div className="input-with-unit">
            <input type="text" id="area" name="area" />
            <span></span>
          </div>
        </div>
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
        <textarea 
          className="fee-field"
          value={feeDescription
            .split('\n')
            .filter(line => line.trim() !== '') // 빈 줄은 필터링
            .map(line => `- ${line}`)
            .join('\n')} // 리스트 형식으로 변환
          readOnly
          onClick={openFeeModal}
        ></textarea>
        <button className="register-button" onClick={openFeeModal}>등록하기</button>
      </div>

      <div className="info-row">
        <label htmlFor="service">추가 서비스</label>
        <textarea 
          className="service-field"
          defaultValue={serviceDescription
            .split('\n')
            .filter(line => line.trim() !== '') // 빈 줄은 필터링
            .map(line => `- ${line}`)
            .join('\n')} // 리스트 형식으로 변환
          onClick={openServiceModal}
        ></textarea>
        <button className="register-button" onClick={openServiceModal}>등록하기</button>
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

      <Pop_Service 
        isOpen={isServiceModalOpen} 
        onClose={closeServiceModal} 
        onConfirm={handleServiceConfirm} // Pop_Service에서 데이터를 받아옴
      />
      <Pop_Fee 
        isOpen={isFeeModalOpen} 
        onClose={closeFeeModal} 
        onConfirm={handleFeeConfirm} // Pop_Fee에서 데이터를 받아옴
      />
    </div>
  );
};

export default Host_VenueIntroduction;
