//VenueIntroduction.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VenueDetails.css';
import ex_map from '../../assets/images/venueregisterpage_introduce/ex_map.svg';

const VenueIntroduction = () => {
  const [descriptionData, setDescriptionData] = useState(null);
  const spaceId = 1; // Use the actual spaceId as needed
  const yourAccessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const fetchVenueDescription = async () => {
      try {
        const response = await axios.get(
          `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/spaces/${spaceId}/description`,
          {
            headers: {
              Authorization: `Bearer ${yourAccessToken}`,
            },
          }
        );
        console.log("API 전체 응답 조회:", response.data);  // API 응답 전체를 로그로 확인
        if (response.data.isSuccess) {
          console.log("API 결과 조회:", response.data.result);  // 응답의 result 부분을 로그로 확인

          // 데이터를 검증하여 undefined나 null 값이 있는지 확인
          const data = response.data.result;
          if (!data.rentalFee) data.rentalFee = '기본설정<br>월·화·수·목: 70만원(8, 11, 12월은 +10만원)<br>금·일·공휴일: 90만원(8, 11, 12월은 +10만원)<br>토 : 110만원(8, 11, 12월은 + 10만원)';  // rentalFee가 없으면 빈 문자열로 초기화
          if (!data.additionalServices) data.additionalServices = [];  // additionalServices가 없으면 빈 배열로 초기화

          setDescriptionData(response.data.result);
        }else {
          console.warn("API call was not successful:", response.data.message);  // 성공 여부가 false인 경우
        }
      } catch (error) {
        console.error("[실패]Failed to fetch venue description:", error);
      }
    };

    fetchVenueDescription();
  }, [spaceId]);

  // Function to split and format text as a list
  const formatTextToList = (text) => {
    if (!text) return null; // text가 undefined나 null인 경우 처리
    return text.split('<br>').map((item, index) => (
      <li key={index}>{item.trim()}</li>
    ));
  };

  if (!descriptionData) {
    return <div>no description data...</div>;
  }

  return (
    <div className="venue-introduction">
      <h2>{descriptionData.name}에 대하여</h2>
      <br />
      <p>{descriptionData.description}</p>
      <br />
      <p><span className="label">면적 </span> <span className="value">{`${descriptionData.area} m²`}</span></p>
      <p><span className="label">인원 </span> <span className="value">{`좌석: 약 ${descriptionData.seatingCapacity}석 내외 / 입석: 약 ${descriptionData.standingCapacity}명 내외`}</span></p>
      <p><span className="label">대관시간 </span> <span className="value">{descriptionData.rentalHours}</span></p>
      <p><span className="label">대관료 </span></p>
      <ul className="value-list">
        {formatTextToList(descriptionData.rentalFee)}
      </ul>
      <p><span className="label">추가 서비스 </span></p>
      <ul className="value-list2">
        {formatTextToList(descriptionData.additionalServices.map(service => `${service.title}`).join('<br>') )}
      </ul>
      {/* <p><span className="label">연락처 </span></p>
      <ul className="value-list">
        {formatTextToList(descriptionData.tel)}
      </ul> */}
      <br />
      <div className="location-section2">
        <h2>위치</h2>
        <div className="location-header2">
          <p className="location2">{descriptionData.location}</p>
        </div>
        <div className="map-image">
          <img src={ex_map} className="ex_map2" alt="map image" />
        </div>
      </div>
    </div>
  );
};

export default VenueIntroduction;
