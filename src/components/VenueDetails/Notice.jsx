// Notice.jsx
// + 로딩까지 구현

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VenueDetails.css';

// 텍스트 자르는 함수 
const renderTextWithLineBreaks = (text) => {
  const lines = text.split('<br><br>').map((line, index) =>
    <div key={index}>
      {line.split('<br>').map((item, i) => <p key={i}>{item}</p>)}
      {index < text.split('<br><br>').length - 1 && <br />}
    </div>
  );
  return <>{lines}</>;
};

  const Notice = ({spaceId}) => {
    const [noticeData, setNoticeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      const fetchNoticeData = async () => {
        try {
          const response = await axios.get(
            `https://showhoo.site/spaces/${spaceId}/notice`);
  
          if (response.data.isSuccess) {
            // console.log("API 결과 조회:", response.data.result);

            // 개발자 시점 : 데이터의 받아온 값이 유효하지 않음을 알린다
            if (!response.data.result.notice) console.log('Notice description is null');

            setNoticeData(response.data.result.notice);
          } 
          else {
            console.warn("[Notice] API 결과 조회 실패:", response.data.message);
          }
        } 
        catch (error) {
          console.error('[Notice] API 호출 실패 ; 유의사항을 가져오는데 실패했습니다:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchNoticeData();
    }, [spaceId]);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    // ux시점 : 데이터가 없을 때 사용자에게 데이터를 제공할 수 없음을 알린다
    if (!noticeData) {
      return <div>No data available</div>;
    }
  
    return (
      <div className="venue-notice">
        <div className="notice-section">
          <h3>유의사항</h3>
          <div dangerouslySetInnerHTML={{ __html: noticeData }} />
          {/* {renderTextWithLineBreaks(noticeData)} */}
        </div>
      </div>
    );
  };
  

export default Notice;
