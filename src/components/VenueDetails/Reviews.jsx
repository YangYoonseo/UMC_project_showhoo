//reviews.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VenueDetails.css';
import ReviewPanel from './ReviewPanel';
import default_profile_image from "../../assets/images/venuedetailpage/default_profile_image.svg";
import delete_btn from "../../assets/images/venuedetailpage/delete_btn.svg";

const Reviews = ({ spaceId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageScore, setAverageScore] = useState(0);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `https://showhoo.site/review/space/${spaceId}`);

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
      
      <ReviewPanel reviews={reviews} setReviews={setReviews} fetchReviews={fetchReviews} spaceId={spaceId}/>

      <div className="reviews-container">
          {reviews.map((review) => (
              <ReviewPanel
                  key={review.id}
                  id={review.id}
                  spaceId={spaceId}
                  // 프로필 이미지와 사용자 이름, 이미지의 경우 일단 기본설정을 해놓음
                  profileImage={review.memberUrl || default_profile_image}
                  name={review.memberName || '사용자'}
                  date={new Date(review.updatedAt)} // 리뷰 작성 시각
                  context={review.content}
                  reviewImage={review.imageUrls || []}
                  grade={review.grade}
                  answer={review.answers && review.answers[0] ? review.answers[0].content : ''}
                  dateAnswer={review.answers && review.answers[0] ? new Date(review.answers[0].updatedAt) : null} // 답글 작성 시각
              />
          ))}
      </div>
    </div>
  );
};

export default Reviews;
