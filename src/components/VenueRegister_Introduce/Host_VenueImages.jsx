//사용하지 않음
import React from 'react';
import mainImage from '../../assets/images/eximage1.png';
import galleryImage1 from '../../assets/images/eximage2.png';
import galleryImage2 from '../../assets/images/eximage3.png';
import galleryImage3 from '../../assets/images/eximage4.png';
import galleryImage4 from '../../assets/images/eximage5.png';

const VenueImages = () => {
  // 이미지 파일 경로를 불러옵니다.
  const images = [mainImage, galleryImage1, galleryImage2,galleryImage3,galleryImage4];

  return (
    <div className="venue-images">
      <div className="main-image">
        <img src={images[0]} alt="Main Venue" />
      </div>
      <div className="sub-image">
        <img className="sub1" src={images[1]} alt="Sub-Venue1"/>
        <img className="sub2" src={images[2]} alt="Sub-Venue2"/>
        <img className="sub3" src={images[3]} alt="Sub-Venue3"/>
        <img className="sub4" src={images[4]} alt="Sub-Venue4"/>
      </div>
    </div>
  );
};

export default VenueImages;


