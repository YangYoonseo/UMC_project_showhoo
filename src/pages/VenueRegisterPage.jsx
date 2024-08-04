// VenueRegisterPage.jsx
import React, { useState } from 'react';
import Host_VenueTabs from '../components/VenueRegister_Introduce/Host_VenueTabs';
import Host_VenueIntroduction from '../components/VenueRegister_Introduce/Host_VenueIntroduction';
import edit_icon from '../assets/images/venueregisterpage_introduce/edit_icon.svg';
import register_image_btn from "../assets/images/venueregisterpage_introduce/register_image_btn.svg";
import '../styles/VenueRegisterPage.css';

const VenueRegisterPage = () => {
  const [selectedTab, setSelectedTab] = useState('introduction');

  return (
    <div className="venue-register-page">
      <h1 className="venue-name">공연장 이름</h1>
      <img src={edit_icon} className="name_edit_icon"></img>
      <p className="venue-location">공연장 위치</p>
      <button className="registerbtn">등록하기</button>
      <div className="imagepanel1"></div>
      <div className="imagepanel2"></div>
      <div className="imagepanel3"></div>
      <div className="imagepanel4"></div>
      <div className="imagepanel5"></div>
      <img src={register_image_btn} className="register_image_btn"></img>
      {/* 코드 짜야 할 부분 */}
      <div className="venue-content">
        <div className="venue-main-content">
          <Host_VenueTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          {selectedTab === 'introduction' && <Host_VenueIntroduction />}
        </div>
      </div>
    </div>
  );
};

export default VenueRegisterPage;
