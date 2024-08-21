//Allimages.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllImages.css';
import back_arrow from '../../assets/images/venuedetailpage/back_arrow.svg';

const AllImages = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const spaceId = 9; // 수정해라

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://showhoo.site/spaces/${spaceId}/header`);
        if (response.data.isSuccess) {
          setImages(response.data.result.photos);
        } else {
          console.warn('api 호출 성공 & images 불러오기 실패:', response.data.message);
        }
      } catch (error) {
        console.error('api 호출 실패:', error);
      }
    };

    fetchImages();
  }, [spaceId]);

  return (
    <div className="all-images-popup">
      <div className="popup-header">
        <button className="close-button" onClick={onClose}>
          <img className="back-arrow-button" src={back_arrow} alt="Back" />
          <div className="allimagestext">사진 모두 보기</div>
        </button>
      </div>
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image} alt={`Venue ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllImages;

