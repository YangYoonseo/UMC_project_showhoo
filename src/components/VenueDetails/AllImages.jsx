//Allimages.jsx
import React from 'react';
import './AllImages.css';
import back_arrow from '../../assets/images/venuedetailpage/back_arrow.svg';

const AllImages = ({ images, onClose }) => {
  return (
    <div className="all-images-popup">
      <div className="popup-header">
        <button className="close-button" onClick={onClose}>
          <img className="back-arrow-button" src={back_arrow}  /> 
          <div className='allimagestext'>사진 모두 보기</div>
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
