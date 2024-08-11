// VenueDetailPage.jsx
import React, { useState } from 'react';
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

import venue_image1 from '../assets/images/venuedetailpage/venue_image1.svg';
import venue_image2 from '../assets/images/venuedetailpage/venue_image2.svg';
import venue_image3 from '../assets/images/venuedetailpage/venue_image3.svg';
import venue_image4 from '../assets/images/venuedetailpage/venue_image4.svg';
import venue_image5 from '../assets/images/venuedetailpage/venue_image5.svg';
import venue_image6 from '../assets/images/venuedetailpage/venue_image6.svg';
import venue_image7 from '../assets/images/venuedetailpage/venue_image7.svg';
import venue_image8 from '../assets/images/venuedetailpage/venue_image8.svg';
import all_image_btn from '../assets/images/venuedetailpage/all_image_btn.svg';

const VenueDetailPage = () => {
  const [selectedTab, setSelectedTab] = useState('introduction');
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태 관리

  const mockData = {
    name: "001 클럽",
    rating: 4.0,
    reviews: 15,
    address: "서울특별시 강남구 도산대로99길 20",
    images: [venue_image1, venue_image2, venue_image3, venue_image4, venue_image5, venue_image6, venue_image7, venue_image8],
    rentalFee: 700000,
    capacity: 200,
    parking: "건물 내 주차 가능 (대형 밴드 포함 30대), 유료 발렛 파킹 서비스",
    description: {
      about: "001 클럽은 최신음향과 최신 시설을 갖추고 있으며, 밴드공연, 대관공연, 리허설, 녹화, 촬영, 음악 공연, 쇼케이스, 특강, 각종 소모임 등 수많은 대관행사를 할 수 있는 공간입니다.",
      area: "198m²",
      capacity: "좌석 수 80석 내외 / 최대 수용 120명 내외",
      rentalTime: "14:00 - 22:00 (기본 대관 시간)",
      rentalFee: "월·화·수·목: 70만원(8, 11, 12월은 +10만원)<br>금·일·공휴일: 90만원(8, 11, 12월은 +10만원)<br>토 : 110만원(8, 11, 12월은 + 10만원)",
      additionalServices: "프리미엄 영상(1~20곡)<br>MIDAS M32 디지털 콘솔<br>멀티트랙 음원 녹음<br>인이어 시스템 1채널<br>본공연 추가 30분",
      tel: "음향감독 : 010-2345-1235<br>조명감독 : 010-1253-1236<br>공연장 관리자 : 010-8919-1920",
      location: "서울 마포구 와우산로18길 20"
    },
    refundPolicy: `계약금 입금과 동시에 대관예약이 확정되며 계약금은 어떠한 경우에도 환불되지 않으니 계약 전 신중한 예약 바랍니다.<br><br>이용 60일 - 당일: 100% 환불<br>이용 30 - 60일 전: 70% 환불<br>이용 15 - 29일 전: 30% 환불<br>이용 14일 - 당일: 환불 불가`,
    rentalInfo: `대학생:<br><br>평일(월~목)은 80만원 (8월, 11월, 12월은 90만원)<br>금요일, 일요일, 공휴일, 공휴일 전일은 100만원 (8월, 11, 12월은 110만원)<br>토요일은 130만원 (8월, 11, 12월은 140만원)<br><br>**카드 및 현금영수증 발급시 10% VAT 별도 계산됩니다.**<br><br>**멤버에 직장인 포함 시 일반대관 적용됩니다. 대학원생은 대학생요금 적용되나 학생증 등 증명이 필요합니다.**<br><br>일반대관:<br><br>예약금 및 잔금:<br><br>예약금은 20만원이며 나머지 잔금은 대관 당일 리허설 전에 결제해 주시면 됩니다.<br><br>(국민은행 김의 123456-78-90123)`,
    precautions: `예약 후 변경이 필요한 경우, 반드시 전화로 문의해주시기 바랍니다.<br>예약 변경 시 추가 비용이 발생할 수 있습니다.`,
    amenities: `공연장 내 주차 가능, 유료 발렛 파킹 서비스 제공.<br>대기실 및 화장실은 공연장 내에 위치하고 있습니다.`,
    additionalServices1: [
      { name: "공연영상 제공", price: 100000 },
      { name: "MIDAS 콘솔", price: 100000 },
      { name: "멀티트랙 레코딩", price: 100000 },
      { name: "인이어 시스템", price: 30000 },
      { name: "추가 1시간", price: 100000 }
    ]
  };

  return (
    <div className="navfot1">
      <Navbar_Performer/>
      <Footer />
      <div className="venue-detail-page">
        <VenueInfo data={mockData} />
        <VenueInfo2 />
        <VenueImages images={mockData.images} />
        <img 
          src={all_image_btn} 
          className="all_image_btn"
          onClick={() => setIsPopupOpen(true)} // 사진 팝업 열기
        />
        <div className="venue-content">
          <div className="venue-main-content">
            <VenueTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {selectedTab === 'introduction' && <VenueIntroduction data={mockData.description} />}
            {selectedTab === 'facility' && <FacilityInfo data={mockData.name}/>}
            {selectedTab === 'notice' && <Notice data={mockData} />}
            {selectedTab === 'schedule' && <Schedule />}
            {selectedTab === 'reviews' && <Reviews />}
          </div>
          <BookingForm rentalFee={mockData.rentalFee} additionalServices1={mockData.additionalServices1 || []}/>
        </div>
      </div>
      {isPopupOpen && (
        <AllImages 
          images={mockData.images} 
          onClose={() => setIsPopupOpen(false)} // 사진 팝업 닫기
        />
      )}
    </div>
  );
};

export default VenueDetailPage;
