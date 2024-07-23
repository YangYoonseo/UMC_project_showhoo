import React, { useState } from 'react';
import VenueInfo from '../components/VenueDetails/VenueInfo';
import VenueImages from '../components/VenueDetails/VenueImages';
// import VenueMap from '../components/VenueDetails/VenueMap';
import BookingForm from '../components/VenueDetails/BookingForm';
import VenueTabs from '../components/VenueDetails/VenueTabs';
import VenueIntroduction from '../components/VenueDetails/VenueIntroduction';
import FacilityInfo from '../components/VenueDetails/FacilityInfo';
import Notice from '../components/VenueDetails/Notice';
import QnA from '../components/VenueDetails/QnA';
import Reviews from '../components/VenueDetails/Reviews';
import '../components/VenueDetails/VenueDetails.css';

const VenueDetailComponent = () => {
  const [selectedTab, setSelectedTab] = useState('introduction');

  const mockData = {
    name: "001 클럽",
    rating: 4.0,
    reviews: 15,
    address: "서울특별시 강남구 도산대로99길 20",
    images: ["image1.jpg", "image2.jpg", "image3.jpg"],
    rentalFee: 700000,
    hours: "10:00 - 22:00",
    capacity: 200,
    parking: "건물 내 주차 가능 (대형 밴드 포함 30대), 유료 발렛 파킹 서비스",
    description: {
      about: "001 클럽은 최신음향과 최신 시설을 갖추고 있으며, 밴드공연, 대관공연, 리허설, 녹화, 촬영, 음악 공연, 쇼케이스, 특강, 각종 소모임 등 수많은 대관행사를 할 수 있는 공간입니다.",
      area: "198m²",
      capacity: "좌석 수 80석 내외 / 최대 수용 120명 내외",
      rentalTime: "14:00 - 22:00 (기본 대관 시간)",
      rentalFee: "기본 대관료 700,000원",
      additionalServices: "음향시설, 음향조명 스텝 (10만원 별도 추가)",
      location: "서울 마포구 와우산로18길 20"
    }
  };

  return (
    <div className="venue-detail-component">
      <VenueInfo data={mockData} />
      <VenueImages images={mockData.images} />
      <div className="venue-content">
        <div className="venue-main-content">
          <VenueTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          {selectedTab === 'introduction' && <VenueIntroduction data={mockData.description} />}
          {selectedTab === 'facility' && <FacilityInfo />}
          {selectedTab === 'notice' && <Notice />}
          {selectedTab === 'qna' && <QnA />}
          {selectedTab === 'reviews' && <Reviews />}
        </div>
        <BookingForm rentalFee={mockData.rentalFee} />
        {/* <VenueMap address={mockData.address} /> */}
      </div>
    </div>
  );
};

export default VenueDetailComponent;
