import "../../styles/readyQsheet.css";
import Button from "../common/Button";
import ReadySubmit from "./readySubmit";
import ReadyDownload from "./readyDownload";
import setList from "../../assets/img_Ready/setList.png";
import rentalTime from "../../assets/img_Ready/rentalTime.png";
import plus from "../../assets/img_Ready/plus.png";

const ReadyQsheet = ({ nextStep }) => {
    return (
        <div className="ReadyQsheet">
            <div className="Qsheet_download">
                <h4>다운로드</h4>
                <p>대관을 위해 제출해야 할 신청서 및 양식을 다운로드하실 수 있습니다.</p>
                <div className="download_container">
                    <ReadyDownload text={"공연 셋리스트 양식"} id={"setList"} img={setList} />
                    <ReadyDownload text={"대관 시간 양식"} id={"rentalTime"} img={rentalTime} />
                    <ReadyDownload text={"추가 주문 양식"} id={"plus"} img={plus} />
                </div>
            </div>
            <div className="Qsheet_submit">
                <h4>제출하기</h4>
                <div className="submit_container">
                    <ReadySubmit text={"공연 셋리스트"} />
                    <ReadySubmit text={"대관 시간"} />
                    <ReadySubmit text={"추가 주문 사항"} />
                </div>
            </div>
            <div className="Qsheet_button">
                <Button text={"다음 단계"} type={"green"} onClick={nextStep}/>
            </div>
        </div>
    )
};

export default ReadyQsheet;