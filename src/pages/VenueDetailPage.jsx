// VenueDetailPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

// mockData 주석 처리
/*
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
*/

const VenueDetailPage = () => {
  const [selectedTab, setSelectedTab] = useState('introduction');
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태 관리
  const [venueData, setVenueData] = useState(null);
  const [images, setImages] = useState([]);
  const spaceId = 1; // 실제 spaceId 값으로 교체 필요
  const yourAccessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzNjYxNTg0NzU5IiwiZXhwIjoxNzIzODQxMDU1fQ.I6xy6SreNIN6HTsV7DjxPPMhVOumFruEtcC_4_AvMTsnzb2uOXvcaCmGSsVVGFj0WAH1WUTBJcWeEQ-37BP1IA";

  // useEffect : 컴포넌트가 마운트될 때 2개의 api 호출하여 데이터 가져옴
  useEffect(() => {
    // Venue 정보 가져오기
    const fetchVenueInfo = async () => {
      try {
        const response = await axios.get(`http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/spaces/${spaceId}/description`, {
          headers: {
            Authorization: `Bearer ${yourAccessToken}`, // 필요한 경우 헤더에 토큰 추가
          },
        });
        if (response.data.isSuccess) {
          const data = response.data.result;
          setVenueData({
            name: data.name, // 공연장 이름
            rating: data.grade, // 공연장 별점
            reviews: data.reviews || 0, // 공연장 리뷰들
            address: data.location, 
            rentalFee: data.rentalFee,
            capacity: data.seatingCapacity,
            parking: data.parking || "정보 없음", // 데이터에 따라 조정
            //이렇게 묶어도 되나?
            description: {
              about: data.description,
              area: data.area,
              capacity: `좌석: 약 ${data.seatingCapacity}석 내외 / 입석: 약 ${data.standingCapacity}명 내외`,
              rentalTime: data.rentalHours,
              rentalFee: data.rentalFee, // 대관료 데이터에 따라 조정
              additionalServices: data.additionalServices.map(service => `${service.title}: ${service.price}`).join('<br>'),
              tel: data.tel || "정보 없음",
              location: data.location,
              //안쓴정보 : created_at, 계좌정보 3,
            },
          });
        }
      } catch (error) {
        console.error("Failed to fetch venue information:", error);
      }
    };

    // Venue 이미지 가져오기
    // const fetchVenueImages = async () => {
    //   try {
    //     const response = await axios.get(`http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/spaces/${spaceId}/photos`, {
    //       headers: {
    //         Authorization: `Bearer ${yourAccessToken}`, // 필요한 경우 헤더에 토큰 추가
    //       },
    //     });
    //     if (response.data.isSuccess) {
    //       setImages(response.data.result.map(photo => photo.photoUrl));
    //     }
    //   } catch (error) {
    //     console.error("Failed to fetch venue images:", error);
    //   }
    // };

    fetchVenueInfo();
    // fetchVenueImages();
  }, [spaceId]);

  if (!venueData) {
  // if (!venueData || images.length === 0) {
    return <div>Loading...</div>;
  }

  // api로부터 가져온 데이터를 해당 컴포넌트에 전달
  return (
    <div className="navfot1">
      <Navbar_Performer />
      <Footer />
      <div className="venue-detail-page">
        <VenueInfo data={venueData} />
        <VenueInfo2 />
        <VenueImages images={images} />
        {/* <img
          src={all_image_btn}
          className="all_image_btn"
          onClick={() => setIsPopupOpen(true)} // 사진 팝업 열기
        /> */}
        <div className="venue-content">
          <div className="venue-main-content">
            <VenueTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {selectedTab === 'introduction' && <VenueIntroduction />}
            {/* {selectedTab === 'facility' && <FacilityInfo data={venueData.name} />} */}
            {/* {selectedTab === 'notice' && <Notice data={venueData} />} */}
            {/* {selectedTab === 'schedule' && <Schedule />} */}
            {/* {selectedTab === 'reviews' && <Reviews />} */}
          </div>
          {/* <BookingForm rentalFee={venueData.rentalFee} additionalServices1={venueData.additionalServices1 || []} /> */}
        </div>
      </div>
      {/* {isPopupOpen && (
        <AllImages
          images={images}
          onClose={() => setIsPopupOpen(false)}
        />
      )} */}
    </div>
  );
};

export default VenueDetailPage;