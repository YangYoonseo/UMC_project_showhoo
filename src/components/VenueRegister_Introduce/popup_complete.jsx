import "../../styles/Eojin/popup_complete.css";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const Popup_complete = ({ check }) => {
    const nav = useNavigate();

    const onClick = () => {
        check();
        nav("/concert_ready");
    }

    return (
        <div className="popup_backdrop">
            <div className="popup_complete">
                <h5>등록이 완료됐습니다!</h5>
                <p>이제 공연자와 빠르고 쉽게 공연을 준비하세요</p>
                <div className="complete_button">
                    <Button text={"확인"} type={"green"} onClick={onClick}/>
                </div>
            </div>
        </div>
    )
}

export default Popup_complete;