import "../../styles/yoonseo/Review.css";

import axios from "axios";
import { useState, useEffect } from "react";

import Rectangle16 from "../../assets/img_Performer/Rectangle16.png";
import Rectangle19 from "../../assets/img_Performer/Rectangle19.png";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const token = sessionStorage.getItem("accessToken");

  const myReview = async () => {
    try {
      const response = await axios.get(
        "http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/review/performer/1",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews(response.data.result);
      console.log("리뷰 보기", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    myReview();
  }, []);

  return (
    <div className="Review">
      <img src={Rectangle19} alt="" className="greenbar" />
      <img src={Rectangle16} alt="" className="graybar" />
      <div className="myReview">
        {reviews.length === 0 ? <p>리뷰가 없습니다</p> : null}
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <h3>Grade: {review.grade}</h3>
            <p>{review.content}</p>
            <div className="answers">
              {review.answers.map((answer) => (
                <div key={answer.id} className="answer-item">
                  <p>{answer.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
