import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../../styles/Jisu/HotConcertHall.css"

const HotConcertHall = () => {
    const nav = useNavigate();
        
    return <div className="HotConcertHall">
        <img className="ConcertHallImg"
            src="src\assets\img_Booking\_test_\concert_hall_2.jpg">
            </img>
        <div className="Info">
            <div className="TopInfo">
                <div className="TopInfoText">
                    <div className="Name">리엠아트센터</div>
                    <div className="Loacate">서울 강남구 학동로 2길 56</div>
                </div>
                <div className="StarRate">★</div>
            </div>
            <div className="BottomInfo">
                <div className="People">
                    최대 300명
                </div>
                <div className="Size">
                    661m2
                </div>
                <div className="Detail">
                    공연 영상 제공</div>
            </div>
        </div>
        <div className="Price">
            ₩200,000~
        </div>
    </div>
};

export default HotConcertHall;