import "../../styles/Eojin/readyQsheet.css";
import { useState } from "react";
import Button from "../common/Button";
import ReadySubmit from "./readySubmit";
import ReadyDownload from "./readyDownload";
import setList from "../../assets/img_Ready/setList.svg";
import rentalTime from "../../assets/img_Ready/rentalTime.svg";
import plus from "../../assets/img_Ready/plus.svg";

const ReadyQsheet = ({ nextStep, check }) => {
    const [ qsheet, setQsheet ] = useState ([
        {
            setList: false,
            rentalTime: false,
            plus: false,
        }
    ]);

    const onCheck = (id) => {
        setQsheet(prevState => {
            // 이전 상태의 복사본을 만듭니다.
            const updatedQsheet = [...prevState];
            // 배열의 첫 번째 객체를 업데이트합니다.
            updatedQsheet[0] = {
                ...updatedQsheet[0],
                [id]: true
            };
            // 업데이트된 배열을 반환합니다.
            return updatedQsheet;
        });
    };

    const allValuesTrue = () => {
        // qsheet 배열의 첫 번째 객체를 가져옵니다.
        const sheet = qsheet[0];
    
        // 객체의 모든 값이 true인지 확인합니다.
        return Object.values(sheet).every(value => value === true);
    };

    const checkQsheet = () => {
        console.log(qsheet);
        if (allValuesTrue()) {
            check("Qsheet");
            nextStep();
        } else {
            console.log("이전 단계를 채워주세요.");
        }
    };

    return (
        <div className="ReadyQsheet">
            <div className="Qsheet_submit">
                <h4>업로드하기</h4>
                <p>공연자가 대관을 위해 제출해야 할 신청서 및 양식을 업로드해주세요.</p>
                <div className="submit_container">
                    <ReadySubmit text={"공연 셋리스트"} id={"setList"} onCheck={onCheck}/>
                    <ReadySubmit text={"대관 시간"} id={"rentalTime"} onCheck={onCheck} />
                    <ReadySubmit text={"추가 주문 사항"} id={"plus"} onCheck={onCheck} />
                </div>
            </div>
            <div className="Qsheet_download">
                <h4>다운받기</h4>
                <p>공연자가 제출한 서류들입니다. 클릭하여 다운받아주세요.</p>
                <div className="download_container">
                    <ReadyDownload text={"공연 셋리스트 양식"} id={"setList"} img={setList} />
                    <ReadyDownload text={"대관 시간 양식"} id={"rentalTime"} img={rentalTime} />
                    <ReadyDownload text={"추가 주문 양식"} id={"plus"} img={plus} />
                </div>
            </div>
            <div className="Qsheet_button">
                <Button text={"다음 단계"} type={"green"} onClick={nextStep}/>
            </div>
        </div>
    )
};

export default ReadyQsheet;