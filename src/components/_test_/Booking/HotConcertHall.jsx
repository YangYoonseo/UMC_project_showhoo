import "../../../styles/Jisu/HotConcertHall.css";
import LikeButton from "./LikeButton";
import PeopleIcon from "./../../../assets/img_Booking/people_icon.svg";
import AreaIcon from "./../../../assets/img_Booking/area_icon.svg";
import DetailIcon from "./../../../assets/img_Booking/detail_icon.svg";
import StarPointImg from '../../../assets/img_Booking/vector19.svg';
import defaultHallImg from "../../../../src/assets/img_Booking/_test_/concert_hall_2.jpg"

const HotConcertHall = ({ hall }) => {
    return (
        <div className="HotConcertHall">
            <div className="LikeAndImg">
                {/* hall 객체에서 이미지 URL을 받아와서 출력 */}
                <img
                    className="ConcertHallImg"
                    src={hall.imageUrl || defaultHallImg}
                    // hall.imageUrl이 없을 경우 기본 이미지 사용
                    alt={hall.name || "Concert Hall"}
                    // hall.name이 없을 경우 기본 텍스트 사용
                />
                <div className="LikeButton">
                    <LikeButton spaceId={1} performerId={1} />
                    {/*<LikeButton spaceId={hall.spaceId} performerId={1} />*/}
                </div>
            </div>
            <div className="ConcertHallBody">
                <div className="TopInfo">
                    <div className="TopInfoText">
                        <div className="Name">{hall.name}</div>
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
                    {/* ₩{hall.minRentalFee.toLocaleString()}~*/}
                    ₩{hall.minRentalFee}~
                </div>
            </div>
        </div>
    );
};

export default HotConcertHall;
