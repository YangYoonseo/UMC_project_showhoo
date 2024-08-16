import "../../../styles/Jisu/HotConcertHall.css";
import LikeButton from "./LikeButton";
import PeopleIcon from "./../../../assets/img_Booking/people_icon.svg";
import AreaIcon from "./../../../assets/img_Booking/area_icon.svg";
import DetailIcon from "./../../../assets/img_Booking/detail_icon.svg";
import StarPointImg from '../../../assets/img_Booking/vector19.svg';

const HotConcertHall = () => {
    return (
        <div className="HotConcertHall">
            <div className="LikeAndImg">
                <img
                    className="ConcertHallImg"
                    src="src/assets/img_Booking/_test_/concert_hall_2.jpg"
                    alt="Concert Hall"
                />
                <div className="LikeButton">
                    <LikeButton />
                </div>
            </div>
            <div className="ConcertHallBody">
                <div className="TopInfo">
                    <div className="TopInfoText">
                        <div className="Name">리엠아트센터</div>
                        <div className="Location">서울 강남구 학동로 2길 56</div>
                    </div>
                    <div className="StarRate">
                        <img src={StarPointImg} alt="Star Rating" />
                        <span className="StarRatePoint">4.7</span>
                    </div>
                </div>
                <div className="BottomInfo">
                    <div className="InfoItem">
                        <img className="Icon" src={PeopleIcon} alt="People Icon" />
                        <span className="InfoText">최대 300명</span>
                    </div>
                    <div className="InfoItem">
                        <img className="Icon" src={AreaIcon} alt="Area Icon" />
                        <span className="InfoText">661m2</span>
                    </div>
                    <div className="InfoItem">
                        <img className="Icon" src={DetailIcon} alt="Detail Icon" />
                        <span className="InfoText">공연 영상 제공</span>
                    </div>
                </div>
                <div className="Price">
                    ₩200,000~
                </div>
            </div>
        </div>
    );
};

export default HotConcertHall;
