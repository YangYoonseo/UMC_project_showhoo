import React from 'react';
import './VenueDetails.css';

const FacilityInfo = () => {
  return (
    <div className="facility-info">
      <div className="equipment-section">
        <h3>1. 음향장비 리스트</h3>
        <table className="equipment-table">
          <thead>
            <tr>
              <th>장비명</th>
              <th>모델명</th>
              <th>수량</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>스피커</td>
              <td>JBL PRX715</td>
              <td>2</td>
              <td>FOH 스피커</td>
            </tr>
            {/* 추가적인 음향장비 리스트 */}
          </tbody>
        </table>
      </div>
      <div className="equipment-section">
        <h3>2. 조명장비 리스트</h3>
        <table className="equipment-table">
          <thead>
            <tr>
              <th>장비명</th>
              <th>모델명</th>
              <th>수량</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>무빙라이트</td>
              <td>Vari-Lite VL2500</td>
              <td>4</td>
              <td>RGBW</td>
            </tr>
            {/* 추가적인 조명장비 리스트 */}
          </tbody>
        </table>
      </div>
      <div className="equipment-section">
        <h3>3. 무대 기타 장치</h3>
        <table className="equipment-table">
          <thead>
            <tr>
              <th>장치명</th>
              <th>모델명</th>
              <th>수량</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>천장 리프트</td>
              <td>XYZ-123</td>
              <td>2</td>
              <td>500kg</td>
            </tr>
            {/* 추가적인 무대 장치 리스트 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacilityInfo;
