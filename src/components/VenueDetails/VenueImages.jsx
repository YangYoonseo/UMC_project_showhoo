//VenueImages.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VenueDetails.css';

const VenueImages = ({spaceId}) => {
  const [images, setImages] = useState([]);
  const yourAccessToken = sessionStorage.getItem("accessToken"); // 토큰 가져오기

  useEffect(() => {
    const fetchVenueHeader = async () => {
      try {
        const response = await axios.get(`https://showhoo.site/spaces/${spaceId}/header`);
        if (response.data.isSuccess) {
          setImages(response.data.result.photos);
        }
      } catch (error) {
        console.error("Failed to fetch venue header information:", error);
      }
    };

    fetchVenueHeader();
  }, [yourAccessToken, spaceId]);

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

