// VenueRegisterPage.jsx
// 탭 바꿔도 정보 사라지지 않게 하는 코드 추가
import React, { useState, useEffect } from 'react';
import Host_VenueTabs from '../components/VenueRegister_Introduce/Host_VenueTabs';
import Host_VenueIntroduction from '../components/VenueRegister_Introduce/Host_VenueIntroduction';
import Host_VenueFacility from '../components/VenueRegister_Introduce/Host_VenueFacility';
import Host_VenueNotice from '../components/VenueRegister_Introduce/Host_VenueNotice';
import Host_VenueSchedule from '../components/VenueRegister_Introduce/Host_VenueSchedule';
import Host_VenueReviews from '../components/VenueRegister_Introduce/Host_VenueReviews';
import edit_icon from '../assets/images/venueregisterpage_introduce/edit_icon.svg';
import register_image_btn from "../assets/images/venueregisterpage_introduce/register_image_btn.svg";
import Pop_Name from '../components/VenueRegister_Introduce/Pop_Name';
import Pop_Place from '../components/VenueRegister_Introduce/Pop_Place';
import Pop_Image from '../components/VenueRegister_Introduce/Pop_Image';
import Footer from '../components/common/Footer';
import Navbar_Concert from '../components/common/Navbar_Concert';
import Popup_register from '../components/VenueRegister_Introduce/popup_register';
import Popup_complete from '../components/VenueRegister_Introduce/popup_complete';
import '../styles/VenueRegisterPage.css';


const VenueRegisterPage = () => {
  const [selectedTab, setSelectedTab] = useState('introduction');
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [venueName, setVenueName] = useState('공연장 이름');
  const [venueLocation, setVenueLocation] = useState('공연장 위치');
  const [uploadedImages, setUploadedImages] = useState([]); // 추가: 업로드된 이미지들
  const [isRegister, setIsRegister] = useState(false);
  const [isComplete, setComplete] = useState(false);


  // 공연장 소개 탭과 관련한 정보들 
  const [introductionDescription, setIntroductionDescription] = useState('');
  const [venueArea, setVenueArea] = useState('');
  const [venueCapacity, setVenueCapacity] = useState('');
  const [Category, setCategory] = useState('');
  const [rentalTime, setRentalTime] = useState('');
  const [feeDescriptiontest, setFeeDescriptiontest] = useState('');
  const [offSeasonFeestest, setOffSeasonFeestest] = useState({});
  const [peakSeasonFeestest, setPeakSeasonFeestest] = useState({});
  const [accountDetailstest, setAccountDetailstest] = useState({});
  const [serviceDescriptiontest, setServiceDescriptiontest] = useState('');
  const [serviceOptionstest, setServiceOptionstest] = useState([]);


  const openNameModal = () => setIsNameModalOpen(true);
  const closeNameModal = () => setIsNameModalOpen(false);

  const openPlaceModal = () => setIsPlaceModalOpen(true);
  const closePlaceModal = () => setIsPlaceModalOpen(false);

  const openImageModal = () => setIsImageModalOpen(true);
  const closeImageModal = () => setIsImageModalOpen(false);

  // 이름 업데이트 함수
  const updateVenueName = (newName) => {
    setVenueName(newName);
    closeNameModal();
  };

  // 장소 업데이트 함수
  const updateVenueLocation = (newLocation) => {
    setVenueLocation(newLocation);
    closePlaceModal();
  };

  // 이미지 업데이트 함수
  const updateUploadedImages = (images) => {
    setUploadedImages(images.slice(0, 5)); // 최대 5개 이미지로 제한
  };

  const onRegister = () => {
    setIsRegister(true);
  };

  const onComplete = () => {
    setIsRegister(false);
    setComplete(true);
  };

  const closePopup = () => {
    setIsRegister(false);
    setComplete(false);
  };

  // (노출되지 않는 정보 확인용) 탭 변경 시 콘솔 로그로 상태 출력
  useEffect(() => {
    console.log("<!!탭 변경!!>");
    console.log("비성수기 대관료:", offSeasonFeestest);
    console.log("성수기 대관료:", peakSeasonFeestest);
    console.log("계좌정보:", accountDetailstest);
    console.log("추가서비스 옵션:", serviceOptionstest);
  }, [selectedTab]);

  return (
    <div className="navfot">
      <Navbar_Concert/>
      <Footer />
      <div className="venue-register-page">
        <div className="venue-name-wrapper">
          <h1 className="venue-name">{venueName}</h1>
          <img src={edit_icon} className="name_edit_icon" onClick={openNameModal} />
        </div>
        <p className="venue-location">{venueLocation}</p>
        <button className="registerbtn" onClick={onRegister}>등록하기</button>
        {isRegister && <Popup_register prev={closePopup} next={onComplete} />}
        {isComplete && <Popup_complete check={closePopup} />}

        {/* 이미지 패널들 */}
        <div className="imagepanel1">
          {uploadedImages[0] && <img src={uploadedImages[0]} alt="Venue 1" className="imagepanel-img" />}
        </div>
        <div className="imagepanel2">
          {uploadedImages[1] && <img src={uploadedImages[1]} alt="Venue 2" className="imagepanel-img" />}
        </div>
        <div className="imagepanel3">
          {uploadedImages[2] && <img src={uploadedImages[2]} alt="Venue 3" className="imagepanel-img" />}
        </div>
        <div className="imagepanel4">
          {uploadedImages[3] && <img src={uploadedImages[3]} alt="Venue 4" className="imagepanel-img" />}
        </div>
        <div className="imagepanel5">
          {uploadedImages[4] && <img src={uploadedImages[4]} alt="Venue 5" className="imagepanel-img" />}
        </div>
        <img src={register_image_btn} className="register_image_btn" onClick={openImageModal}></img>

        <div className="venue-content">
          <div className="venue-main-content">
            <Host_VenueTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div className="main-content">
              {selectedTab === 'introduction' && (
                <Host_VenueIntroduction 
                  openPlaceModal={openPlaceModal} 
                  venueLocation={venueLocation}
                  introductionDescription={introductionDescription}
                  setIntroductionDescription={setIntroductionDescription}
                  venueArea={venueArea}
                  setVenueArea={setVenueArea}
                  venueCapacity={venueCapacity}
                  setVenueCapacity={setVenueCapacity}
                  Category={Category}
                  setCategory={setCategory}
                  rentalTime={rentalTime}
                  setRentalTime={setRentalTime}
                  feeDescriptiontest={feeDescriptiontest}
                  setFeeDescriptiontest={setFeeDescriptiontest}
                  offSeasonFeestest={offSeasonFeestest}
                  setOffSeasonFeestest={setOffSeasonFeestest}
                  peakSeasonFeestest={peakSeasonFeestest}
                  setPeakSeasonFeestest={setPeakSeasonFeestest}
                  accountDetailstest={accountDetailstest}
                  setAccountDetailstest={setAccountDetailstest}
                  serviceDescriptiontest={serviceDescriptiontest}
                  setServiceDescriptiontest={setServiceDescriptiontest}
                  serviceOptiontests={serviceOptionstest}
                  setServiceOptionstest={setServiceOptionstest}
                  />
              )}
              {selectedTab === 'facility' && (
                <Host_VenueFacility openPlaceModal={openPlaceModal} />
              )}
              {selectedTab === 'notice' && (
                <Host_VenueNotice openPlaceModal={openPlaceModal} />
              )}
              {selectedTab === 'schedule' && (
                <Host_VenueSchedule openPlaceModal={openPlaceModal} />
              )}
              {selectedTab === 'reviews' && (
                <Host_VenueReviews openPlaceModal={openPlaceModal} />
              )}
            </div>
          </div>
        </div>

        <Pop_Name isOpen={isNameModalOpen} onClose={closeNameModal} onConfirm={updateVenueName} />
        <Pop_Place isOpen={isPlaceModalOpen} onClose={closePlaceModal} onConfirm={updateVenueLocation} />
        <Pop_Image isOpen={isImageModalOpen} onClose={closeImageModal} onConfirm={updateUploadedImages} />
      </div>
    </div>
  );
};

export default VenueRegisterPage;