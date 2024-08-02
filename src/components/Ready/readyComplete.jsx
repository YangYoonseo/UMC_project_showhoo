import "../../styles/readyComplete.css";

import { useNavigate } from "react-router-dom";
import Star1 from "../../assets/img_Ready/Star1.svg";
import Star2 from "../../assets/img_Ready/Star2.svg";
import Logo from "../../assets/img_Ready/Logo.svg";
import background1 from "../../assets/img_Ready/background1.svg";
import background2 from "../../assets/img_Ready/background2.svg";
import Button from "../common/Button";

const ReadyComplete = () => {
    const nav = useNavigate();

    return (
        <div className="readyComplete">
            <div className="Complete_img">
                <img className="background2" src={background2} arc="background" />
                <img className="background1" src={background1} arc="background" />
                <img className="Logo" src={Logo} arc="Logo" />
                <img className="Star1" src={Star1} arc="Star" />
                <img className="Star2" src={Star2} arc="Star" />
            </div>
            <div className="Complete_text">
                <h4>축하합니다!</h4>
                <p>쇼호가 당신의 성공적인 공연을 응원합니다</p>
            </div>
            <div className="Complete_button">
                <Button text={"확인"} type={"green"}  onClick={()=>{nav("/rental_history");}} />
            </div>
        </div>
    )
};

export default ReadyComplete;