import "../../../styles/Jisu/HotConcertHall.css";
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import PeopleIcon from "./../../../assets/img_Booking/people_icon.svg";
import AreaIcon from "./../../../assets/img_Booking/area_icon.svg";
import DetailIcon from "./../../../assets/img_Booking/detail_icon.svg";
import StarPointImg from '../../../assets/img_Booking/vector19.svg';
import defaultHallImg from "../../../../src/assets/img_Booking/_test_/concert_hall_2.jpg"

const HotConcertHall = ({ hall }) => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleImageClick = () => {
        navigate(`/venue_detail/${hall.spaceId}`); // 클릭 시 해당 경로로 이동
    };

    return (
        <div className="HotConcertHall">
            <div className="LikeAndImg">
                <img
                    className="ConcertHallImg"
                    src={hall.imageURL || defaultHallImg}  // 기본 이미지 제공
                    alt={hall.name || "Concert Hall"}
                    onClick={handleImageClick} // 이미지 클릭 이벤트 핸들러
                    style={{ cursor: "pointer" }} // 클릭 가능한 커서 스타일 추가
                />
                <div className="LikeButton">
                    <LikeButton spaceId={hall.spaceId} performerId={1} />
                </div>
            </div>
            <div className="ConcertHallBody">
                <div className="TopInfo">
                    <div className="TopInfoText">
                        <div className="Name"
                            onClick={handleImageClick} // 이미지 클릭 이벤트 핸들러
                            style={{ cursor: "pointer" }} // 클릭 가능한 커서 스타일 추가
                        >{hall.name}</div>
                        <div className="Location">{hall.location}</div>
                    </div>
                    <div className="StarRate">
                        <img src={StarPointImg} alt="Star Rating" />
                        <span className="StarRatePoint">{hall.grade}</span>
                    </div>
                </div>
                <div className="BottomInfo">
                    <div className="InfoItem">
                        <img className="Icon" src={PeopleIcon} alt="People Icon" />
                        <span className="InfoText">최대 {hall.totalCapacity}명</span>
                    </div>
                    <div className="InfoItem">
                        <img className="Icon" src={AreaIcon} alt="Area Icon" />
                        <span className="InfoText">{hall.area}m²</span>
                    </div>
                    <div className="InfoItem">
                        <img className="Icon" src={DetailIcon} alt="Detail Icon" />
                        <span className="InfoText">{hall.additionalService}</span>
                    </div>
                </div>
                <div className="Price">
                    ₩{hall.minRentalFee != null ? hall.minRentalFee.toLocaleString() : 'N/A'}~
                </div>
            </div>
        </div>
    );
};

export default HotConcertHall;
