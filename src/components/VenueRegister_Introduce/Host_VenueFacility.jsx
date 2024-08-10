import "../../styles/Eojin/Host_VenueFacility.css";
import FacilitySubmit from "./FacilitySubmit";
import { useState } from "react";

const Host_VenueFacility = () => {
    const [ facility, setFacility ] = useState ([
        {
            soundEquipment: false,
            lightingEquipment: false,
            stageMachinery: false,
            spaceDrawing: false,
            spacestaff: false,
            spaceSeat: false,
        }
    ]);

    const onCheck = (id) => {
        setFacility(prevState => {
            // 이전 상태의 복사본을 만듭니다.
            const updatedFacility = [...prevState];
            // 배열의 첫 번째 객체를 업데이트합니다.
            updatedFacility[0] = {
                ...updatedFacility[0],
                [id]: true
            };
            // 업데이트된 배열을 반환합니다.
            return updatedFacility;
        });
    };

    return (
        <div className="Host_VenueFacility">
            <h4>시설 자료</h4>
            <p>공연장 시설에 관한 자료들을 업로드 해주세요.</p>
            <div className="Facility_Top">
                <FacilitySubmit text={"무대장치"} id={"stageMachinery"} onCheck={onCheck}/>
                <FacilitySubmit text={"음향장비"} id={"soundEquipment"} onCheck={onCheck}/>
                <FacilitySubmit text={"조명장비"} id={"lightingEquipment"} onCheck={onCheck}/>
            </div>
            <div className="Facility_Bottom">
                <FacilitySubmit text={"공연장 도면"} id={"spaceDrawing"} onCheck={onCheck}/>
                <FacilitySubmit text={"공연장 인력 가이드"} id={"spacestaff"} onCheck={onCheck}/>
                <FacilitySubmit text={"좌석 배치도"} id={"spaceSeat"} onCheck={onCheck}/>
            </div>
        </div>
    )
}

export default Host_VenueFacility;