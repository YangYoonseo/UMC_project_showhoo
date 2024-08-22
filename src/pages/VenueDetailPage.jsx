// VenueDetailPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import VenueInfo from '../components/VenueDetails/VenueInfo';
import VenueInfo2 from '../components/VenueDetails/VenueInfo2';
import VenueImages from '../components/VenueDetails/VenueImages';
import BookingForm from '../components/VenueDetails/BookingForm';
import VenueTabs from '../components/VenueDetails/VenueTabs';
import VenueIntroduction from '../components/VenueDetails/VenueIntroduction';
import FacilityInfo from '../components/VenueDetails/FacilityInfo';
import Notice from '../components/VenueDetails/Notice';
import Schedule from '../components/VenueDetails/Schedule';
import Reviews from '../components/VenueDetails/Reviews';
import Navbar_Concert from '../components/common/Navbar_Concert';
import Navbar_Performer from '../components/common/Navbar_Performer';
import Footer from '../components/common/Footer';
import AllImages from '../components/VenueDetails/AllImages';
import '../components/VenueDetails/VenueDetails.css';

import all_image_btn from '../assets/images/venuedetailpage/all_image_btn.svg';



const VenueDetailPage = () => {
  const { spaceId } = useParams();
  console.log("스페이스아이디:",spaceId);
  const [selectedTab, setSelectedTab] = useState('introduction');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [venueData, setVenueData] = useState(null);
  const [images, setImages] = useState([]);
  //const spaceId = 8;


  useEffect(() => {
    const fetchVenueInfo = async () => {
      try {
        const response = await axios.get(`https://showhoo.site/spaces/${spaceId}/description`);
        if (response.data.isSuccess) {
          const data = response.data.result;
          setVenueData({
            name: data.name, 
            rating: data.grade, 
            reviews: data.reviews || 0,
            address: data.location, 
            rentalFee: data.rentalFee,
            capacity: data.seatingCapacity,
            parking: data.parking || "정보 없음",

            description: {
              about: data.description,
              area: data.area,
              capacity: `좌석: 약 ${data.seatingCapacity}석 내외 / 입석: 약 ${data.standingCapacity}명 내외`,
              rentalTime: data.rentalHours,
              rentalFee: data.rentalFee, // 대관료 데이터에 따라 조정
              additionalServices: data.additionalServices.map(service => `${service.title}: ${service.price}`).join('<br>'),
              tel: data.tel || "정보 없음",
              location: data.location,

            },
          });
        }
      } catch (error) {
        console.error("Failed to fetch venue information:", error);
      }
    };


    fetchVenueInfo();
  }, [spaceId]);

  if (!venueData) {
    return <div>Loading...</div>;
  }

  // api로부터 가져온 데이터를 해당 컴포넌트에 전달
  return (
    <div className="navfot1">
      <Navbar_Performer />
      <Footer />
      <div className="venue-detail-page">
        <VenueInfo data={venueData} spaceId={spaceId}/>
        <VenueInfo2 spaceId={spaceId}/>
        <VenueImages spaceId={spaceId}/>
        <img
          src={all_image_btn}
          className="all_image_btn"
          onClick={() => setIsPopupOpen(true)} 
        />
        <div className="venue-content">
          <div className="venue-main-content">
            <VenueTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {selectedTab === 'introduction' && <VenueIntroduction spaceId={spaceId} />}
            {selectedTab === 'facility' && <FacilityInfo name={venueData.name} spaceId={spaceId}/>}
            {selectedTab === 'notice' && <Notice spaceId={spaceId}/>}
            {selectedTab === 'schedule' && <Schedule spaceId={spaceId}/>}
            {selectedTab === 'reviews' && <Reviews spaceId={spaceId}/>}
          </div>
          <BookingForm spaceId={spaceId}/>
        </div>
      </div>
      {isPopupOpen && (
        <AllImages
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default VenueDetailPage;