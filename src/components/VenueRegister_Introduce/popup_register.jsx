import "../../styles/Eojin/popup_register.css";
import Button from "../common/Button";

const Popup_register = ({prev, next}) => {
    return (
        <div className="popup_backdrop">
            <div className="popup_register">
                <h5>공연장을 등록하시겠습니까?</h5>
                <p><span>모든 내용을 빠짐없이 작성하였는지&nbsp;</span>다시 한번 확인해주세요</p>
                <div className="register_button">   
                    <Button text={"취소"} type={"gray"} onClick={prev} />
                    <Button text={"등록하기"} type={"green"} onClick={next} />
                </div>
            </div>
        </div>
    )
}

export default Popup_register;