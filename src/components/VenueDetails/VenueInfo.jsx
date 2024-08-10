import React from 'react';
import './VenueDetails.css';
import star from "../../assets/images/venuedetailpage/colored_star.png";

const VenueInfo = ({ data }) => {
  return (
    <div className="venue-info">
      <h1>{data.name}</h1>
      <div className="venue-rating">
        <span className="rating">
          <img src={star} alt="Star" className="star-icon" /> {data.rating.toFixed(1)} 
        </span>
        <span className="reviews">(후기 {data.reviews}개)</span>
        <span className="address">{data.address}</span>
      </div>
    </div>
  );
};

export default VenueInfo;
