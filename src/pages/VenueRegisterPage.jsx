// VenueRegisterPage.jsx
import React, { useState } from 'react';
import Host_VenueTabs from '../components/VenueRegister_Introduce/Host_VenueTabs';
import Host_VenueIntroduction from '../components/VenueRegister_Introduce/Host_VenueIntroduction';
import Host_VenueFacility from '../components/VenueRegister_Introduce/Host_VenueFacility';
import Host_VenueNotice from '../components/VenueRegister_Introduce/Host_VenueNotice';
import Host_VenueSchedule from '../components/VenueRegister_Introduce/Host_VenueSchedule';
import Host_VenueReviews from '../components/VenueRegister_Introduce/Host_VenueReviews';
import edit_icon from '../assets/images/venueregisterpage_introduce/edit_icon.svg';
import register_image_btn from "../assets/images/venueregisterpage_introduce/register_image_btn.svg";
import Pop_Name from '../components/VenueRegister_Introduce/Pop_Name';
import Pop_Place from '../components/VenueRegister_Introduce/Pop_Place'; // Pop_Place 컴포넌트 추가
import '../styles/VenueRegisterPage.css';

const VenueRegisterPage = () => {
  const [selectedTab, setSelectedTab] = useState('introduction');
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
  const [venueName, setVenueName] = useState('공연장 이름');
  const [venueLocation, setVenueLocation] = useState('공연장 위치');

  const openNameModal = () => setIsNameModalOpen(true);
  const closeNameModal = () => setIsNameModalOpen(false);

  const openPlaceModal = () => setIsPlaceModalOpen(true);
  const closePlaceModal = () => setIsPlaceModalOpen(false);

  // 이름 업데이트 함수
  const updateVenueName = (newName) => {
    setVenueName(newName);
    closeNameModal(); // 모달 닫기
  };

  // 장소 업데이트 함수
  const updateVenueLocation = (newLocation) => {
    setVenueLocation(newLocation);
    closePlaceModal(); // 모달 닫기
  };

  return (
    <div className="venue-register-page">
      <div className="venue-name-wrapper">
        <h1 className="venue-name">{venueName}</h1>
        <img src={edit_icon} className="name_edit_icon" onClick={openNameModal} />
      </div>
      <p className="venue-location">{venueLocation}</p> {/* 공연장 위치를 상태에서 가져옴 */}
      <button className="registerbtn">등록하기</button>
      <div className="imagepanel1"></div>
      <div className="imagepanel2"></div>
      <div className="imagepanel3"></div>
      <div className="imagepanel4"></div>
      <div className="imagepanel5"></div>
      <img src={register_image_btn} className="register_image_btn"></img>
      
      <div className="venue-content">
        <div className="venue-main-content">
          <Host_VenueTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div className="main-content">
              {selectedTab === 'introduction' && (
                <Host_VenueIntroduction openPlaceModal={openPlaceModal} /> // 장소 모달 여는 함수 전달
              )}
              {selectedTab === 'facility' && (
                <Host_VenueFacility openPlaceModal={openPlaceModal} /> // 장소 모달 여는 함수 전달
              )}
              {selectedTab === 'notice' && (
                <Host_VenueNotice openPlaceModal={openPlaceModal} /> // 장소 모달 여는 함수 전달
              )}
              {selectedTab === 'schedule' && (
                <Host_VenueSchedule openPlaceModal={openPlaceModal} /> // 장소 모달 여는 함수 전달
              )}
              {selectedTab === 'reviews' && (
                <Host_VenueReviews openPlaceModal={openPlaceModal} /> // 장소 모달 여는 함수 전달
              )}
            </div>
        </div>
      </div>

      <Pop_Name isOpen={isNameModalOpen} onClose={closeNameModal} onConfirm={updateVenueName} />
      <Pop_Place isOpen={isPlaceModalOpen} onClose={closePlaceModal} onConfirm={updateVenueLocation} /> {/* Pop_Place 추가 */}
    </div>
  );
};

export default VenueRegisterPage;

