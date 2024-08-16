//Host_VenueIntroduction.jsx
import React, { useState } from 'react';
import '../../styles/VenueRegisterPage_Introduce/Host_VenueIntroduction.css';
import edit_icon from '../../assets/images/venueregisterpage_introduce/edit_icon.svg';
import ex_map from '../../assets/images/venueregisterpage_introduce/ex_map.svg';
import Pop_Service from './Pop_Service';
import Pop_Fee from './Pop_Fee';
import Pop_Category from './Pop_Category'; // 새로운 팝업 파일 추가

const Host_VenueIntroduction = ({ openPlaceModal }) => {
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceOptions, setServiceOptions] = useState([]);
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [feeDescription, setFeeDescription] = useState('');
  const [offSeasonFees, setOffSeasonFees] = useState({});
  const [peakSeasonFees, setPeakSeasonFees] = useState({});
  const [accountDetails, setAccountDetails] = useState({});
  
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // 새로운 상태 추가
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 유형

  const openServiceModal = () => setIsServiceModalOpen(true);
  const closeServiceModal = () => setIsServiceModalOpen(false);

  const openFeeModal = () => setIsFeeModalOpen(true);
  const closeFeeModal = () => setIsFeeModalOpen(false);

  const openCategoryModal = () => setIsCategoryModalOpen(true); // 카테고리 모달 열기
  const closeCategoryModal = () => setIsCategoryModalOpen(false); // 카테고리 모달 닫기

  const handleServiceConfirm = (description, options) => {
    setServiceDescription(description);
    setServiceOptions(options);
    closeServiceModal();
  };

  const handleFeeConfirm = (description, offSeason, peakSeason, accountInfo) => {
    setFeeDescription(description);
    setOffSeasonFees(offSeason);
    setPeakSeasonFees(peakSeason);
    setAccountDetails(accountInfo);
    closeFeeModal();
  };

  const handleCategoryConfirm = (category) => {
    setSelectedCategory(category);
    closeCategoryModal();
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
          <label htmlFor="area">면적</label>
          <div className="input-with-unit">
            <input type="text" id="area" name="area" className='input-type-1'/>
            <span>m²</span>
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="capacity">인원</label>
          <div className="input-with-unit">
            <input type="text" id="capacity" name="capacity" className='input-type-1' />
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
              value={selectedCategory}
              readOnly
              onClick={openCategoryModal}
            />
            <button className="register-button23" onClick={openCategoryModal}>수정하기</button>
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
          defaultValue={serviceDescription
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
        onConfirm={handleServiceConfirm}
      />
      <Pop_Fee 
        isOpen={isFeeModalOpen} 
        onClose={closeFeeModal} 
        onConfirm={handleFeeConfirm}
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

