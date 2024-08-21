//VenuInfo2.jsx
import React, { useState, useEffect } from 'react';
import './VenueDetails.css';
import axios from 'axios';
import linkimage from "../../assets/images/venuedetailpage/link_icon.svg";
import heartimage from "../../assets/images/venuedetailpage/heartOFF.svg";
import heartonimage from "../../assets/images/venuedetailpage/heartON.svg";

const VenueInfo2 = ({ spaceId }) => {
  const [isHeartOn, setIsHeartOn] = useState(false);
  const [spacePreferId, setSpacePreferId] = useState(null);
  const performerId = sessionStorage.getItem("performerId");

  useEffect(() => {
    // 공연장 찜 유무 조회
    const fetchPreferStatus = async () => {
      try {
        const response = await axios.get(
          `https://showhoo.site/spaces/prefer/${spaceId}/${performerId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.data.isSuccess) {
          setIsHeartOn(response.data.result.status);
          setSpacePreferId(response.data.result.spacePreferId);
          console.log("찜 상태 조회 성공:",response.data.result);
        } else {
          console.warn("찜 상태 조회 실패:", response.data.message);
        }
      } catch (error) {
        console.error("찜 상태 조회 중 오류 발생:", error);
      }
    };

    fetchPreferStatus();
  }, [spaceId, performerId]);

  const handleToggleHeart = async () => {
    if (isHeartOn) {
      // 찜 해제 요청
      try {
        const response = await axios.delete(
          `https://showhoo.site/spaces/prefer/${spacePreferId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.data.isSuccess) {
          setIsHeartOn(false);
          setSpacePreferId(null);
          console.log("찜 해제 성공!");
        } else {
          console.warn("찜 해제 실패:", response.data.message);
        }
      } catch (error) {
        console.error("찜 해제 중 오류 발생:", error);
      }
    } else {
      // 찜 등록 요청
      try {
        const response = await axios.post(
          `https://showhoo.site/spaces/prefer`,
          {
            spaceId: spaceId,
            performerId: performerId,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.isSuccess) {
          setIsHeartOn(true);
          setSpacePreferId(response.data.result.spacePreferId);
          console.log("찜 등록 성공!",response.data.result);
        } else {
          console.warn("찜 등록 실패:", response.data.message);
        }
      } catch (error) {
        console.error("찜 등록 중 오류 발생:", error);
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert("링크가 복사되었습니다!");
      })
      .catch(err => {
        console.error('링크 복사 실패:', err);
      });
  };

  return (
    <div className="venue-info2">
      <div className="linkcopy" onClick={handleCopyLink}>
        <img src={linkimage} alt="Link Copy" />
        <span>링크 복사</span>
      </div>
      <div className="heart" onClick={handleToggleHeart}>
        <img src={isHeartOn ? heartonimage : heartimage} alt="Heart" />
        <span>관심</span>
      </div>
    </div>
  );
};

export default VenueInfo2;
