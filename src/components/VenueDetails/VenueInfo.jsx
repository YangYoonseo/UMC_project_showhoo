import React from 'react';
import './VenueDetails.css';

const VenueInfo = ({ data }) => {
  return (
    <div className="venue-info">
      <h1>{data.name}</h1>
      <div className="venue-rating">
        <span className="rating">{data.rating} ⭐</span>
        <span className="reviews">(후기 {data.reviews}개)</span>
        <span className="address">{data.address}</span>
      </div>
    </div>
  );
};

export default VenueInfo;