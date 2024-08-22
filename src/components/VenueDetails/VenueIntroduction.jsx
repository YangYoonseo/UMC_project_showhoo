//VenueIntroduction.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VenueDetails.css';
import ex_map from '../../assets/images/venueregisterpage_introduce/ex_map.svg';

const VenueIntroduction = ({ spaceId }) => {
  const [descriptionData, setDescriptionData] = useState(null);
  //const spaceId = 7;

  useEffect(() => {
    const fetchVenueDescription = async () => {
      try {
        const response = await axios.get(
          `https://showhoo.site/spaces/${spaceId}/description`
        );
        if (response.data.isSuccess) {
          setDescriptionData(response.data.result);
        }
      } catch (error) {
        console.error("Failed to fetch venue description:", error);
      }
    };

    fetchVenueDescription();
  }, [spaceId]);

  // 요일 매핑
  const dayOfWeekMap = {
    "MONDAY": "월",
    "TUESDAY": "화",
    "WEDNESDAY": "수",
    "THURSDAY": "목",
    "FRIDAY": "금",
    "SATURDAY": "토",
    "SUNDAY": "일"
  };

  // ! 대관료 그룹화 로직 ! -> 모든 경우에 잘 작동하는지 확인 필요
  const groupRentalFees = (rentalFees) => {
    const feeGroups = {};

    rentalFees.forEach(({ dayOfWeek, fee }) => {
      const day = dayOfWeekMap[dayOfWeek]; // 한국어로 변환된 요일
      if (!feeGroups[fee]) {
        feeGroups[fee] = [day];
      } else {
        feeGroups[fee].push(day);
      }
    });

    return feeGroups;
  };

    // ! 대관료 그룹화 로직 ! -> 모든 경우에 잘 작동하는지 확인 필요
    const groupPeakRentalFees = (peakSeasonRentalFees) => {
      const feeGroups = {};
  
      peakSeasonRentalFees.forEach(({ dayOfWeek, fee }) => {
        const day = dayOfWeekMap[dayOfWeek]; // 한국어로 변환된 요일
        if (!feeGroups[fee]) {
          feeGroups[fee] = [day];
        } else {
          feeGroups[fee].push(day);
        }
      });
  
      return feeGroups;
    };

  if (!descriptionData) {
    return <div>no description data...</div>;
  }

  const groupedFees = groupRentalFees(descriptionData.rentalFees);
  const groupedPeakFees = groupPeakRentalFees(descriptionData.peakSeasonRentalFees);

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
      <p style={{marginLeft: '-10px', marginBottom:'0px'}}>[비성수기]</p>
        {Object.entries(groupedFees).map(([fee, days], index) => (
          <li key={index}>
            {days.join('/')} : {fee}₩
          </li>
        ))}
      </ul>
      <br></br>
      <ul className="value-list">
        <p style={{marginLeft: '-10px', marginBottom:'0px'}}>[성수기]</p>
        {Object.entries(groupedPeakFees).map(([fee, days], index) => (
          <li 
            className='value-list-li'
            key={index}>
            {days.join('/')} : {fee}₩
          </li>
        ))}
      </ul>
      <p className='value-list-p'><span className="label">추가 서비스 </span></p>
      <ul className="value-list2">
        {descriptionData.additionalServices.map((service, index) => (
          <li key={index}>{service.title}</li>
        ))}
      </ul>
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
