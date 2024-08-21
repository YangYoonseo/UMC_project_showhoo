// FacilityInfo.jsx
// + 에러별 콘솔 출력까지 구현
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VenueDetails.css';
import venue_device from '../../assets/images/venuedetailpage/venue_device.svg';
import light_device from '../../assets/images/venuedetailpage/light_device.svg';
import light_device_hovered from '../../assets/images/venuedetailpage/light_device_hovered.svg';
import sound_device from '../../assets/images/venuedetailpage/sound_device.svg';
import sound_device_hovered from '../../assets/images/venuedetailpage/sound_device_hovered.svg';
import venue_blueprint from '../../assets/images/venuedetailpage/venue_blueprint.svg';
import venue_blueprint_hovered from '../../assets/images/venuedetailpage/venue_blueprint_hovered.svg';
import venue_pplguide from '../../assets/images/venuedetailpage/venue_pplguide.svg';
import venue_pplguide_hovered from '../../assets/images/venuedetailpage/venue_pplguide_hovered.svg';
import seating_chart from '../../assets/images/venuedetailpage/seating_chart.svg';
import seating_chart_hovered from '../../assets/images/venuedetailpage/seating_chart_hovered.svg';

const FacilityInfo = ({ name }) => {
  const [hovered, setHovered] = useState('');
  const [facilityData, setFacilityData] = useState({});
  const spaceId = 7;

  useEffect(() => {
    const fetchFacilityData = async () => {
      try {
        const response = await axios.get(
          `https://showhoo.site/spaces/${spaceId}/file`);


        // 1-1. API 호출 성공 + 결과도 제대로 나온 경우 -> result 부분 확인
        if (response.data.isSuccess) {
          // console.log("API 결과 조회 성공"); 

          const data = response.data.result;
        
          // 각 file의 null 확인
          if (!data.soundEquipment) console.log('Sound Equipment is null');
          if (!data.lightingEquipment) console.log('Lighting Equipment is null');
          if (!data.stageMachinery) console.log('Stage Machinery is null');
          if (!data.spaceDrawing) console.log('Space Drawing is null');
          if (!data.spaceStaff) console.log('Space Staff is null');
          if (!data.spaceSeat) console.log('Space Seat is null');
        
          setFacilityData(data);
        }
        // 1-2. API 호출은 성공 + 결과는 에러 (잘못된 입력데이터/서버내부오류/권한문제 등등)
        else {
          console.warn("API 결과 조회 실패:", response.data.message); 
        }
      } 
      // 2. API 호출 자체가 실패 (네트워크, 서버 오류 등)
      catch (error) {
        console.error('API 호출 실패 ; 시설정보를 가져오는데 실패했습니다:', error);
      }
    };

    fetchFacilityData();
  }, [spaceId]);

  const handleMouseEnter = (item) => {
    setHovered(item);
  };

  const handleMouseLeave = () => {
    setHovered('');
  };

  const downloadFile = (fileName, fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank'; // 필요 시 추가: 새 탭에서 파일을 열지 않고 바로 다운로드하도록 설정
    document.body.appendChild(link); // 링크를 DOM에 추가
    link.click();
    document.body.removeChild(link); // 클릭 후 링크를 DOM에서 제거
  };

  return (
    <div className="facility-info">            
      <div className="Qsheet_download">
          <h4 style={{ fontSize: '25px', fontWeight: 'bold'}}>시설자료</h4>
          <p style={{ fontSize: '18px', color: 'black' }}>
            {name || ''}의 시설에 관한 자료들을 다운로드하실 수 있습니다.
          </p>
          <div className="facility_download_grid">
            <div 
              className="facility_download_item" 
              onMouseEnter={() => handleMouseEnter('device')}
              onMouseLeave={handleMouseLeave}
              onClick={() => downloadFile('venue_device.pdf', facilityData.stageMachinery)}
            >
              <img 
                src={hovered === 'device' ? venue_device : venue_device} 
                alt="무대장치" 
              />
              <p>무대장치</p>
            </div>
            <div 
              className="facility_download_item" 
              onMouseEnter={() => handleMouseEnter('light')}
              onMouseLeave={handleMouseLeave}
              onClick={() => downloadFile('light_device.pdf', facilityData.lightingEquipment)}
            >
              <img 
                src={hovered === 'light' ? light_device_hovered : light_device} 
                alt="조명장비" 
              />
              <p>조명장비</p>
            </div>
            <div 
              className="facility_download_item" 
              onMouseEnter={() => handleMouseEnter('sound')}
              onMouseLeave={handleMouseLeave}
              onClick={() => downloadFile('sound_device.pdf', facilityData.soundEquipment)}
            >
              <img 
                src={hovered === 'sound' ? sound_device_hovered : sound_device} 
                alt="음향장비" 
              />
              <p>음향장비</p>
            </div>
            <div 
              className="facility_download_item" 
              onMouseEnter={() => handleMouseEnter('blueprint')}
              onMouseLeave={handleMouseLeave}
              onClick={() => downloadFile('venue_blueprint.pdf', facilityData.spaceDrawing)}
            >
              <img 
                src={hovered === 'blueprint' ? venue_blueprint_hovered : venue_blueprint} 
                alt="공연장 도면" 
              />
              <p>공연장 도면</p>
            </div>
            <div 
              className="facility_download_item" 
              onMouseEnter={() => handleMouseEnter('pplguide')}
              onMouseLeave={handleMouseLeave}
              onClick={() => downloadFile('venue_pplguide.pdf', facilityData.spaceStaff)}
            >
              <img 
                src={hovered === 'pplguide' ? venue_pplguide_hovered : venue_pplguide} 
                alt="공연장 인력 가이드" 
              />
              <p>공연장 인력 가이드</p>
            </div>
            <div 
              className="facility_download_item" 
              onMouseEnter={() => handleMouseEnter('seating')}
              onMouseLeave={handleMouseLeave}
              onClick={() => downloadFile('seating_chart.pdf', facilityData.spaceSeat)}
            >
              <img 
                src={hovered === 'seating' ? seating_chart_hovered : seating_chart} 
                alt="좌석 배치도" 
              />
              <p>좌석 배치도</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default FacilityInfo;
