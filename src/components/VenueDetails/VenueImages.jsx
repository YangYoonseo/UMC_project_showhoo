import React from 'react';
import './VenueDetails.css';

import mainImage from '../../assets/images/eximage1.png';
import galleryImage1 from '../../assets/images/eximage2.png';
import galleryImage2 from '../../assets/images/eximage3.png';
import galleryImage3 from '../../assets/images/eximage4.png';

const VenueImages = () => {
  // 이미지 파일 경로를 불러옵니다.
  const images = [mainImage, galleryImage1, galleryImage2,galleryImage3];

  return (
    <div className="venue-images">
      <div className="main-image">
        <img src={images[0]} alt="Main Venue" />
        <img src={images[0]} alt="Main Venue" />
      </div>
    </div>
  );
};

export default VenueImages;


