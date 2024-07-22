import React from 'react';
import './VenueDetails.css';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      profileImage: 'profile1.png', // 프로필 이미지 파일 경로
      profileName: '놀부',
      rating: 1,
      reviewText: '사장님이 심보가 고약하십니다. 공연장은 좋네요.',
      timestamp: '2024.06.26 23:43:45',
      reviewImage: 'review1.png', // 후기 이미지 파일 경로
      answer: '비판적인 후기 감사합니다 :)',
      answerTimestamp: '2024.06.26 23:45:35',
    },
    // 추가적인 후기를 이 배열에 추가할 수 있습니다.
  ];

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="venue-reviews">
      <div className="reviews-header">
        <div className="reviews-title">
          <h2>이용후기</h2>
          <span className="review-count">{reviews.length}개</span>
          <h2>평균평점</h2>
          <span className="average-rating">{averageRating.toFixed(1)}</span>
        </div>
        <button className="reviews-button">후기 작성하기</button>
      </div>
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <img src={review.profileImage} alt="Profile" className="profile-image" />
          <div className="review-content">
            <div className="review-header">
              <span className="profile-name">{review.profileName}</span>
              <span className="review-rating">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </span>
            </div>
            <p>{review.reviewText}</p>
            {review.reviewImage && <img src={review.reviewImage} alt="Review" className="review-image" />}
            <span className="timestamp">{review.timestamp}</span>
            {review.answer && (
              <div className="answer-content">
                <span className="answer">공연장의 답글</span>
                <p>{review.answer}</p>
                <span className="answer-timestamp">{review.answerTimestamp}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;

