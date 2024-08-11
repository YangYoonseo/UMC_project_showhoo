import "../../styles/yoonseo/Review.css";

import Rectangle16 from "../../assets/img_Performer/Rectangle16.png";
import Rectangle19 from "../../assets/img_Performer/Rectangle19.png";

import Reviews from "../VenueDetails/Reviews";

const Review = () => {
  return (
    <div className="Review">
      <img src={Rectangle19} alt="" className="greenbar" />
      <img src={Rectangle16} alt="" className="graybar" />
      <div className="myReview">
        <Reviews filterName="홍길동" /> {/* filterName prop 전달 */}
      </div>
    </div>
  );
};

export default Review;
