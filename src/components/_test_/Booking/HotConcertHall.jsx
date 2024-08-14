import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../../styles/Jisu/HotConcertHall.css"
import LikeButton from "./LikeButton";
import PeopleIcon from "./../../../assets/img_Booking/people_icon.svg"
import AreaIcon from "./../../../assets/img_Booking/area_icon.svg"
import DetailIcon from "./../../../assets/img_Booking/detail_icon.svg"

import StarPointImg from '../../../assets/img_Booking/vector19.svg'

const HotConcertHall = () => {
    const nav = useNavigate();
        
    return <div className="HotConcertHall">
            <div className="LikeAndImg">
            <img
                className="ConcertHallImg"
                src="src/assets/img_Booking/_test_/concert_hall_2.jpg"
                alt="Concert Hall"
            />
            <div className="LikeButton">
                <LikeButton className="LikeButtonBody" />
            </div>
        </div>
        
        <div className="Info">
            <div className="TopInfo">
                <div className="TopInfoText">
                    <div className="Name">리엠아트센터</div>
                    <div className="Location">서울 강남구 학동로 2길 56</div>
                </div>
                <div className="StarRate">
                    <img src={StarPointImg} alt="StarRateImg" />
                    <div className='StarRatePoint'>4.7</div>
                </div>
            </div>
            <div className="BottomInfo">
                <div className="People">
                    <div className="Icon">
                        <img src={PeopleIcon} alt="PeopleIcon" />
                    </div>
                    <div>
                        최대 300명
                    </div>
                </div>
                <div className="Size">
                    <div className="Icon">
                        <img src={AreaIcon} alt="AreaIcon" />
                    </div>
                    <div>
                        661m2
                    </div>
                </div>
                <div className="Detail">
                    <div className="Icon">
                        <img src={DetailIcon} alt="DetailIcon" />
                    </div>
                    <div>
                        공연영상 제공
                    </div></div>
            </div>
            <div className="Price">
                ₩200,000~
            </div>
        </div>
    </div>
};

export default HotConcertHall;