import "../../styles/yoonseo/Review.css";

import axios from "axios";
import { useState, useEffect } from "react";

import ReviewDelete from "../popup_Performer/ReviewDelete";

import Rectangle16 from "../../assets/img_Performer/Rectangle16.png";
import Rectangle19 from "../../assets/img_Performer/Rectangle19.png";
import review_star from "../../assets/img_Performer/review_star.svg";
import Line42 from "../../assets/img_Performer/Line42.png";

const Review = () => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [reviews, setReviews] = useState([]);
  const token = sessionStorage.getItem("accessToken");
  const performerId = sessionStorage.getItem("performerId");

  const myReview = async () => {
    try {
      const response = await axios.get(
        `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/review/performer/${performerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews(response.data.result);
      console.log("리뷰 보기", response.data.result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    myReview();
  }, []);

  const myReviewDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/review/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("리뷰삭제", response.data.message);
      AlarmDetail("삭제");
    } catch (error) {
      console.log("리뷰 삭제 에러", error);
    }
  };

  return (
    <div className="Review">
      <img src={Rectangle19} alt="" className="greenbar" />
      <img src={Rectangle16} alt="" className="graybar" />
      <div className="myReview">
        {reviews.length === 0 ? <p>리뷰가 없습니다</p> : null}
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="my">
              <h3>내 후기</h3>
              <div className="star">
                {Array(review.grade)
                  .fill()
                  .map((_, index) => (
                    <img key={index} src={review_star} alt={`grade-${index}`} />
                  ))}
              </div>
            </div>
            <p className="review_content">{review.content}</p>

            {review.imageUrls && review.imageUrls[0] !== "string" && (
              <img src={review.imageUrls} />
            )}

            <div className="content_button">
              <p className="updatedAt">{review.updatedAt}</p>
              <button
                onClick={() => {
                  setDeleteId(review.id);
                  setDeletePopup(true);
                }}
              >
                삭제
              </button>
            </div>

            {review.answers
              ? review.answers.map((answer) => (
                  <div className="answers" key={answer.id}>
                    <h3>공연장 답글</h3>
                    <p className="content">{answer.content}</p>
                    <p className="updatedAt">{answer.updatedAt}</p>
                  </div>
                ))
              : null}

            <img className="Line42" src={Line42} alt="" />
          </div>
        ))}
      </div>

      {deletePopup && (
        <ReviewDelete
          onClose={() => {
            setDeletePopup(false);
          }}
          onDelete={myReviewDelete}
          id={deleteId}
        />
      )}
    </div>
  );
};

export default Review;
