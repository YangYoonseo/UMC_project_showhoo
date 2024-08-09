// VenueRegisterPage.jsx
import React, { useState } from 'react';
// import VenueInfo from '../components/VenueDetails/VenueInfo';
// import VenueInfo2 from '../components/VenueDetails/VenueInfo2';
// import VenueImages from '../components/VenueDetails/VenueImages';
// import BookingForm from '../components/VenueDetails/BookingForm';
// import VenueTabs from '../components/VenueDetails/VenueTabs';
// import VenueIntroduction from '../components/VenueDetails/VenueIntroduction';
// import FacilityInfo from '../components/VenueDetails/FacilityInfo';
// import Notice from '../components/VenueDetails/Notice';
// import Schedule from '../components/VenueDetails/Schedule';
// import Reviews from '../components/VenueDetails/Reviews';
import '../components/VenueDetails/VenueDetails.css';

const VenueDetailPage = () => {
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
    },
    refundPolicy: `계약금 입금과 동시에 대관예약이 확정되며 계약금은 어떠한 경우에도 환불되지 않으니 계약 전 신중한 예약 바랍니다.<br><br>이용 60일 - 당일: 100% 환불<br>이용 30 - 60일 전: 70% 환불<br>이용 15 - 29일 전: 30% 환불<br>이용 14일 - 당일: 환불 불가`,
    rentalInfo: `대학생:<br><br>평일(월~목)은 80만원 (8월, 11월, 12월은 90만원)<br>금요일, 일요일, 공휴일, 공휴일 전일은 100만원 (8월, 11월, 12월은 110만원)<br>토요일은 130만원 (8월, 11월, 12월은 140만원)<br><br>**카드 및 현금영수증 발급시 10% VAT 별도 계산됩니다.**<br><br>**멤버에 직장인 포함 시 일반대관 적용됩니다. 대학원생은 대학생요금 적용되나 학생증 등 증명이 필요합니다.**<br><br>일반대관:<br><br>예약금 및 잔금:<br><br>예약금은 20만원이며 나머지 잔금은 대관 당일 리허설 전에 결제해 주시면 됩니다.<br><br>(국민은행 김의 123456-78-90123)`,
    precautions: `예약 후 변경이 필요한 경우, 반드시 전화로 문의해주시기 바랍니다.<br>예약 변경 시 추가 비용이 발생할 수 있습니다.`,
    amenities: `공연장 내 주차 가능, 유료 발렛 파킹 서비스 제공.<br>대기실 및 화장실은 공연장 내에 위치하고 있습니다.`
  };

function VenueDetailPage() {
  return (
    <div className="venue-detail-page">
      <VenueDetailComponent />
    </div>
  );
}
}

export default VenueDetailPage;
