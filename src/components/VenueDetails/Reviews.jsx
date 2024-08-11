import React, { useState } from "react";
import "./VenueDetails.css";
import reviewimage1 from "../../assets/images/venuedetailpage/reviewimage1.png";
import coloredstar from "../../assets/images/venuedetailpage/colored_star.png";
import noncoloredstar from "../../assets/images/venuedetailpage/non_colored_star.png";
import imageaddpanel from "../../assets/images/venuedetailpage/imageaddpanel.png";
import profileimage from "../../assets/images/venuedetailpage/profileimage.png";

// 마이페이지에서 내 후기만 보여주기 위해 props 지정했어요 이거 때문에 오류 나면 알려주세요!(윤서)
const Reviews = ({ filterName }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    {
      id: 1,
      profileImage: profileimage, // 프로필 이미지 파일 경로
      profileName: "홍길동",
      rating: 4,
      reviewText: "사장님이 심보가 고약하십니다. 공연장은 좋네요.",
      timestamp: "2024.08.23 14:43:50",
      answer:
        "안녕하세요 소울님. 저희 001 클럽에서 만족스러운 시간 보내셨길 바랍니다. 이용해주셔서 감사합니다.",
      answerTimestamp: "2024.08.23 14:43:54",
    },
    {
      id: 2,
      profileImage: profileimage, // 프로필 이미지 파일 경로
      profileName: "김지서",
      rating: 4,
      reviewText:
        "사장님이 살짝 불친절하셨지만 공연장 시설은 좋았습니다. 시설 괜찮은 소규모 공연장 찾기 힘든데 만족스럽습니다.",
      timestamp: "2024.08.21 13:43:54",
      reviewImage: reviewimage1, // 후기 이미지 파일
      answer:
        "안녕하세요 지서님. 저희 001 클럽에서 만족스러운 시간 보내셨길 바랍니다. 이용해주셔서 감사합니다.",
      answerTimestamp: "2024.08.21 13:43:54",
    },
    // 추가적인 후기를 이 배열에 추가할 수 있습니다.
  ]);

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim() !== "") {
      const newReview = {
        id: reviews.length + 1,
        profileImage: profileimage,
        profileName: "사용자",
        rating,
        reviewText,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      };
      setReviews([...reviews, newReview]);
      setReviewText("");
      setRating(0);
    }
  };

  const displayedReviews = filterName
    ? reviews.filter((review) => review.profileName === filterName)
    : reviews;

  return (
    <div className="venue-reviews">
      {/* 여기도 한번 필터링했어요! 오류시 (윤서) */}
      {displayedReviews === reviews && (
        <div className="reviews-header">
          <h2 className="reviews-title">
            후기 {reviews.length}개 · 평균 평점{" "}
            <span className="average-rating">{averageRating.toFixed(1)}</span>
          </h2>
          <div className="rating-section">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < rating ? coloredstar : noncoloredstar}
                alt="Star"
                onClick={() => handleRatingClick(index + 1)}
                style={{ cursor: "pointer" }}
              />
            ))}
            <span className="rating-score">{rating}/5</span>
          </div>
          <div className="review-input-container">
            <textarea
              className="review-input"
              placeholder="작성한 후기는 마이페이지와 장소상세에 노출되며 공연장을 포함한 다른 사람들이 볼 수 있으니, 서로를 배려하는 마음으로 작성해주세요"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <button className="submit-button" onClick={handleReviewSubmit}>
              등록
            </button>
          </div>
          <div className="image-add-panel">
            <img src={imageaddpanel} alt="Image Add Panel" />
            <span className="image-add-text"></span>
          </div>
          <div className="review-warning">후기 작성 시 주의사항</div>
        </div>
      )}
      {/* 여기도 한번 필터링한 review로 했어요! 오류시 알려주세요(윤서) */}
      {displayedReviews.map((review) => (
        <div key={review.id} className="review-item">
          <img
            src={review.profileImage}
            alt="Profile"
            className="profile-image"
          />
          <div className="review-content">
            <div className="review-header">
              <span className="profile-name">{review.profileName}</span>
              <div className="review-rating">
                {[...Array(review.rating)].map((_, index) => (
                  <img key={index} src={coloredstar} alt="Star" />
                ))}
              </div>
            </div>
            <p>{review.reviewText}</p>
            {review.reviewImage && (
              <img
                src={review.reviewImage}
                alt="Review"
                className="review-image"
              />
            )}
            <p></p>
            <span className="timestamp">{review.timestamp}</span>
            {review.answer && (
              <div className="answer-content">
                <span className="answer">공연장의 답글</span>
                <p>{review.answer}</p>
                <span className="answer-timestamp">
                  {review.answerTimestamp}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
