import React, { useState } from 'react';
import './VenueDetails.css';
import linkimage from "../../assets/images/venuedetailpage/lucide_link.png";
import heartimage from "../../assets/images/venuedetailpage/ph_heart-light.png";
import heartonimage from "../../assets/images/venuedetailpage/ph_heart-on.png";

const VenueInfo2 = () => {
  const [isHeartOn, setIsHeartOn] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert("링크가 복사되었습니다!");
      })
      .catch(err => {
        console.error('링크 복사 실패:', err);
      });
  };

  const handleToggleHeart = () => {
    setIsHeartOn(!isHeartOn);
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
