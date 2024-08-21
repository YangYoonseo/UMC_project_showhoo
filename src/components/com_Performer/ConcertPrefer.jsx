import "../../styles/Jisu/HotConcertHall.css";
import PeopleIcon from "./../../assets/img_Booking/people_icon.svg";
import AreaIcon from "./../../assets/img_Booking/area_icon.svg";
import DetailIcon from "./../../assets/img_Booking/detail_icon.svg";
import StarPointImg from "../../assets/img_Booking/vector19.svg";
import likeImg from "../../assets/img_Booking/like.svg";

const ConcertPrefer = ({
  name,
  location,
  totalCapacity,
  area,
  additionalService,
  imageURL,
  grade,
  minRentalFee,
}) => {
  return (
    <div className="HotConcertHall">
      <div className="LikeAndImg">
        <img className="ConcertHallImg" src={imageURL} alt="Concert Hall" />
        <div className="LikeButton">
          <img src={likeImg} alt="찜" />
        </div>
      </div>
      <div className="ConcertHallBody">
        <div className="TopInfo">
          <div className="TopInfoText">
            <div className="Name">{name}</div>
            <div className="Location">{location}</div>
          </div>
          <div className="StarRate">
            <img src={StarPointImg} alt="Star Rating" />
            <span className="StarRatePoint">{grade}</span>
          </div>
        </div>
        <div className="BottomInfo">
          <div className="InfoItem">
            <img className="Icon" src={PeopleIcon} alt="People Icon" />
            <span className="InfoText">최대 {totalCapacity}명</span>
          </div>
          <div className="InfoItem">
            <img className="Icon" src={AreaIcon} alt="Area Icon" />
            <span className="InfoText">{area}</span>
          </div>
          <div className="InfoItem">
            <img className="Icon" src={DetailIcon} alt="Detail Icon" />
            <span className="InfoText">{additionalService}</span>
          </div>
        </div>
        <div className="Price">₩{minRentalFee}~</div>
      </div>
    </div>
  );
};

export default ConcertPrefer;
