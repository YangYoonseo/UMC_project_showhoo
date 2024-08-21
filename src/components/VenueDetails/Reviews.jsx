//reviews.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VenueDetails.css';
import ReviewPanel from './ReviewPanel';
import default_profile_image from "../../assets/images/venuedetailpage/default_profile_image.svg";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const spaceId = 2; // Replace with the actual spaceId
  const yourAccessToken = sessionStorage.getItem("accessToken");

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `https://showhoo.site/review/space/${spaceId}`,
        {
          headers: {
            Authorization: `Bearer ${yourAccessToken}`,
          },
        }
      );

      if (response.data.isSuccess) {
        const reviewsData = response.data.result;
        setReviews(reviewsData);
        setAverageScore(
          (reviewsData.reduce((acc, curr) => acc + curr.grade, 0) / reviewsData.length).toFixed(1)
        );
      } else {
        console.warn("Failed to fetch reviews:", response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [spaceId]);

  return (
    <div className="venue-reviews">            
      <h4>후기 {reviews.length}개<span className="hightlight">&nbsp;•&nbsp;</span>평균 평점<span className="hightlight">&nbsp;{averageScore}</span></h4>
      
      <ReviewPanel reviews={reviews} setReviews={setReviews} fetchReviews={fetchReviews} />

      <div className="reviews-container">
          {reviews.map((review) => (
              <ReviewPanel
                  key={review.id}
                  id={review.id}
                  // 프로필 이미지와 사용자 이름, 이미지의 경우 일단 기본설정을 해놓음
                  profileImage={review.profileImage || default_profile_image}
                  name={review.name || '사용자'}
                  context={review.content}
                  reviewImage={review.imageUrls || []}
                  grade={review.grade}
                  date={new Date(review.date)} // 날짜를 Date 객체로 변환하여 전달
                  answer={review.answers && review.answers[0] ? review.answers[0].content : ''}
                  dateAnswer={new Date(review.date)} // 날짜를 Date 객체로 변환하여 전달
              />
          ))}
      </div>
    </div>
  );
};

export default Reviews;
