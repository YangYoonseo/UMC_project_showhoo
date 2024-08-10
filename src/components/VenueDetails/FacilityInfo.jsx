//FacilityInfo.jsx
import React, { useState } from 'react';
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

const FacilityInfo = ({ data }) => {
  const [hovered, setHovered] = useState('');

  const handleMouseEnter = (item) => {
    setHovered(item);
  };

  const handleMouseLeave = () => {
    setHovered('');
  };

  const downloadFile = (fileName) => {
    const link = document.createElement('a');
    link.href = '/path-to-your-pdf-file/empty.pdf'; // 임시 파일 경로
    link.download = fileName;
    link.click();
  };

  return (
    <div className="facility-info">            
      <div className="Qsheet_download">
          <h4 style={{ fontSize: '25px', fontWeight: 'bold'}}>시설자료</h4>
          <p style={{ fontSize: '18px', color: 'black' }}>{data}의 시설에 관한 자료들을 다운로드하실 수 있습니다.</p>
          <div className="facility_download_grid">
            <div 
              className="facility_download_item" 
              onMouseEnter={() => handleMouseEnter('device')}
              onMouseLeave={handleMouseLeave}
              onClick={() => downloadFile('venue_device.pdf')}
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
              onClick={() => downloadFile('light_device.pdf')}
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
              onClick={() => downloadFile('sound_device.pdf')}
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
              onClick={() => downloadFile('venue_blueprint.pdf')}
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
              onClick={() => downloadFile('venue_pplguide.pdf')}
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
              onClick={() => downloadFile('seating_chart.pdf')}
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
