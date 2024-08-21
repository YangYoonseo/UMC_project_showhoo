//Host_VenueIntroduction.jsx
import React, { useState } from 'react';
import '../../styles/VenueRegisterPage_Introduce/Host_VenueIntroduction.css';
import edit_icon from '../../assets/images/venueregisterpage_introduce/edit_icon.svg';
import ex_map from '../../assets/images/venueregisterpage_introduce/ex_map.svg';
import Pop_Service from './Pop_Service';
import Pop_Fee from './Pop_Fee';
import Pop_Category from './Pop_Category';

const Host_VenueIntroduction = ({ 
  openPlaceModal, 
  venueLocation,
  introductionDescription,
  setIntroductionDescription,
  venueArea,
  setVenueArea,
  venueCapacity,
  setVenueCapacity,
  Category,
  setCategory,
  rentalTime,
  setRentalTime,

  feeDescriptiontest,
  setFeeDescriptiontest,
  offSeasonFeestest,
  setOffSeasonFeestest,
  peakSeasonFeestest,
  setPeakSeasonFeestest,
  accountDetailstest,
  setAccountDetailstest,
  serviceDescriptiontest,
  setServiceDescriptiontest,
  serviceOptionstest,
  setServiceOptionstest 
  }) => {
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceOptions, setServiceOptions] = useState([]);
  const [feeDescription, setFeeDescription] = useState('');
  const [offSeasonFees, setOffSeasonFees] = useState({});
  const [peakSeasonFees, setPeakSeasonFees] = useState({});
  const [accountDetails, setAccountDetails] = useState({});
  
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // 새로운 상태 추가
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 유형

  const openServiceModal = () => setIsServiceModalOpen(true);
  const closeServiceModal = () => setIsServiceModalOpen(false);

  const openFeeModal = () => setIsFeeModalOpen(true);
  const closeFeeModal = () => setIsFeeModalOpen(false);

  const openCategoryModal = () => setIsCategoryModalOpen(true); // 카테고리 모달 열기
  const closeCategoryModal = () => setIsCategoryModalOpen(false); // 카테고리 모달 닫기

  // 추가서비스 정보 설정 함수
  const handleServiceConfirm = (description, options) => {
    setServiceDescriptiontest(description);
    setServiceOptionstest(options);
    closeServiceModal();
  };

  // 대관료 정보 설정 함수
  const handleFeeConfirm = (description, offSeason, peakSeason, accountInfo) => {
    setFeeDescriptiontest(description);
    setOffSeasonFeestest(offSeason);
    setPeakSeasonFeestest(peakSeason);
    setAccountDetailstest(accountInfo);
    closeFeeModal();
  };

  const handleCategoryConfirm = (category) => {
    setCategory(category);
    closeCategoryModal();
  };

  return (
    <div className="host-venue-introduction">
      <div className="introduction-header">
        <h2>공연장에 대하여</h2>
        <p>공연장을 5줄 이내로 소개해주세요!</p>
      </div>
      <textarea
        className="venue-description"
        value={introductionDescription}
        onChange={(e) => setIntroductionDescription(e.target.value)}
      ></textarea>
      
      <div className="input-group">
        <div className="input-container">
          <label htmlFor="area">면적</label>
          <div className="input-with-unit">
          <input
              type="text"
              id="area"
              name="area"
              className="input-type-1"
              value={venueArea}
              onChange={(e) => setVenueArea(e.target.value)}
            />
            <span>m²</span>
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="capacity">인원</label>
          <div className="input-with-unit">
          <input
              type="text"
              id="capacity"
              name="capacity"
              className="input-type-1"
              value={venueCapacity}
              onChange={(e) => setVenueCapacity(e.target.value)}
            />
            <span>명</span>
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="venuecategory">유형</label>
          <div className="input-with-unit">
          <input
              type="text"
              id="venuecategory"
              name="venuecategory"
              className="input-type-2"
              value={Category}
              readOnly
              onClick={openCategoryModal}
            />
            <button className="register-button23" onClick={openCategoryModal}>수정하기</button>
          </div>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="time">대관 시간</label>
        <textarea 
            className="time-field" 
            id="time" 
            name="time" 
            rows="4" 
            value={rentalTime}
            onChange={(e) => setRentalTime(e.target.value)}
        ></textarea>
      </div>

      <div className="info-row">
        <label htmlFor="fee">대관료</label>
        <textarea 
          className="fee-field"
          value={feeDescriptiontest
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => `- ${line}`)
            .join('\n')}
          readOnly
          onClick={openFeeModal}
        ></textarea>
        <button className="register-button" onClick={openFeeModal}>등록하기</button>
      </div>

      <div className="info-row">
        <label htmlFor="service">추가 서비스</label>
        <textarea 
          className="service-field"
          defaultValue={serviceDescriptiontest
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => `- ${line}`)
            .join('\n')}
          onClick={openServiceModal}
        ></textarea>
        <button className="register-button" onClick={openServiceModal}>등록하기</button>
      </div>

      <div className="location-section">
        <h2>위치</h2>
        <div className="location-header">
          <p>{venueLocation || '위치 등록하기'}</p> {/* venueLocation이 존재하면 표시, 없으면 '위치 등록하기' */}
          <img src={edit_icon} className="place_edit_icon" alt="edit icon" onClick={openPlaceModal} />
        </div>
        <div className="map">
          <img src={ex_map} className="ex_map" alt="map image" />
        </div>
      </div>

      <Pop_Service 
        isOpen={isServiceModalOpen} 
        onClose={closeServiceModal} 
        onConfirm={handleServiceConfirm}
        initialDescription={serviceDescriptiontest}
        initialOptions={serviceOptionstest}
      />
      <Pop_Fee 
        isOpen={isFeeModalOpen} 
        onClose={closeFeeModal} 
        onConfirm={handleFeeConfirm}
        initialDescription={feeDescriptiontest}
        initialOffSeasonFees={offSeasonFeestest}
        initialPeakSeasonFees={peakSeasonFeestest}
        initialAccountInfo={accountDetailstest}
      />
      <Pop_Category 
        isOpen={isCategoryModalOpen} 
        onClose={closeCategoryModal} 
        onConfirm={handleCategoryConfirm}
      />
    </div>
  );
};

export default Host_VenueIntroduction;
