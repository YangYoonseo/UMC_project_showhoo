//reviews.jsx
import React, { useState } from 'react';
import './VenueDetails.css';

import reviewimage1 from '../../assets/images/venuedetailpage/reviewimage1.png';
import profileimage from "../../assets/images/venuedetailpage/profileimage.png";
import ReviewPanel from './ReviewPanel';

const mockdata = [
  {
    id: 0,
    profileImage: [profileimage], // 프로필 이미지 파일 경로
    name: '홍길동',
    grade: 4,
    context: '사장님이 심보가 고약하십니다. 공연장은 좋네요.',
    date: new Date('2024-08-10T10:30:00'),
    reviewImage: [],
    answer: '안녕하세요 소울님. 저희 001 클럽에서 만족스러운 시간 보내셨길 바랍니다. 이용해주셔서 감사합니다.',
    dateAnswer: new Date('2024-08-23T14:43:54'),
  },
  {
    id: 1,
    profileImage: [profileimage],
    name: '김지서',
    grade: 4,
    context: '사장님이 살짝 불친절하셨지만 공연장 시설은 좋았습니다. 시설 괜찮은 소규모 공연장 찾기 힘든데 만족스럽습니다.',
    date: new Date('2024-08-09T16:15:00'),
    reviewImage: [reviewimage1], // 후기 이미지 파일
    answer: '안녕하세요 지서님. 저희 001 클럽에서 만족스러운 시간 보내셨길 바랍니다. 이용해주셔서 감사합니다.',
    dateAnswer: new Date('2024-08-21T13:43:54'),
  }
];

const Reviews = () => {
  const [reviews, setReviews] = useState(mockdata);

  const reviewCount = reviews.length;
  const averageScore = (reviews.reduce((acc, curr) => acc + curr.grade, 0) / reviewCount).toFixed(1);

  return (
    <div className="venue-reviews">            
      <h4>후기 {reviewCount}개<span className="hightlight">&nbsp;•&nbsp;</span>평균 평점<span className="hightlight">&nbsp;{averageScore}</span></h4>
      
      {/* 후기 작성란 추가 */}
      <ReviewPanel reviews={reviews} setReviews={setReviews} />

      <div className="reviews-container">
          {reviews.map((review) => (
              <ReviewPanel
                  key={review.id}
                  id={review.id}
                  profileImage={review.profileImage}
                  name={review.name}
                  context={review.context}
                  reviewImage={review.reviewImage}
                  grade={review.grade}
                  date={review.date}
                  answer={review.answer}
                  dateAnswer={review.dateAnswer}
              />
          ))}
      </div>
    </div>
  );
};

export default Reviews;
