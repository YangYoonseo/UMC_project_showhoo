//venuedetail_notfound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar_Performer from '../components/common/Navbar_Performer';
import Footer from '../components/common/Footer';
import '../styles/VenueDetailPage_NotFound.css';
import Logo from "../assets/images/notfound_logo.svg";
import bg1 from "../assets/img_Ready/background1.svg";
import bg2 from "../assets/img_Ready/background2.svg";

const VenueDetailPage_NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="navfot-notfound">
      <Navbar_Performer />
      <div className="venuedetail-notfound">
        <img src={bg1} alt="Background1" className='bg1'/>
        <img src={bg2} alt="Background2" className='bg2'/>
        <img src={Logo} alt="Logo" className="logo" />
        <h2>앗! 공연장 상세정보가 없어요.</h2>
        <button onClick={goBack} className="back-button">이전 페이지로 돌아가기</button>
      </div>
      <Footer />
    </div>
  );
};

export default VenueDetailPage_NotFound;

