//VenueImages.jsx
import React, { useEffect } from 'react';
import './VenueDetails.css';

const VenueImages = ({ images }) => {

  useEffect(() => {
    if (!images) {
      console.error("이미지가 전달되지 않았습니다");
    } else if (images.length === 0 || images.every(img => img === null)) {
      console.error("이미지가 null입니다");
    }
  }, [images]);

  return (
    <div className="venue-images">
      {/* 메인 이미지 패널 */}
      <div className="venue-imagepanel1">
        {images && images[0] && <img src={images[0]} alt="Main Venue" className="imagepanel-img" />}
      </div>
      
      {/* 서브 이미지 패널들 */}
      <div className="venue-imagepanel2">
        {images && images[1] && <img src={images[1]} alt="Sub-Venue1" className="imagepanel-img" />}
      </div>
      <div className="venue-imagepanel3">
        {images && images[2] && <img src={images[2]} alt="Sub-Venue2" className="imagepanel-img" />}
      </div>
      <div className="venue-imagepanel4">
        {images && images[3] && <img src={images[3]} alt="Sub-Venue3" className="imagepanel-img" />}
      </div>
      <div className="venue-imagepanel5">
        {images && images[4] && <img src={images[4]} alt="Sub-Venue4" className="imagepanel-img" />}
      </div>
    </div>
  );
};

export default VenueImages;


