import "../../styles/Eojin/popup_complete.css";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const Popup_complete = ({ complete }) => {
    const nav = useNavigate();

    const onClick = () => {
        complete();
        nav("/booking_history");
    }

    return (
        <div className="popup_backdrop">
            <div className="popup_complete">
                <h5>예매 완료됐습니다!</h5>
                <p>공연자가 승인하면 예매 내역에 '승인 완료' 티켓이 뜰거에요</p>
                <div className="complete_button">
                    <Button text={"확인"} type={"green"} onClick={onClick}/>
                </div>
            </div>
        </div>
    )
}

export default Popup_complete;