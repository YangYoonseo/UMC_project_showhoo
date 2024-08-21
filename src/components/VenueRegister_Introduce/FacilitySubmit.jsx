import "../../styles/Eojin/FacilitySubmit.css";
import { useState } from 'react';
import submit from "../../assets/img_Ready/submit.svg";
import FacilityUploader from "./FacilityUploader";

const FacilitySubmit = ({ text, id, onCheck, updateData }) => {
    const [showUploader, setShowUploader] = useState(false);
    const [complete, setComplete] = useState(false);

    const onClick = () => {
        setShowUploader(true);
    };

    const closeModal = () => {
        setShowUploader(false);
    };

    const uploadSuc = () => {
        setComplete(true);
        onCheck(id);
    };
    const uploadFail = () => {
        setComplete(false);
    };

    return (
        <div className={`facilitySubmit facilitySubmit_${complete}`} onClick={onClick}>
            <img src={submit} alt="download" />
            <p>{text}</p>
            {showUploader && <FacilityUploader onClose={closeModal} uploadSuc={uploadSuc} uploadFail={uploadFail} updateData={updateData} />}
        </div>
    )
}

export default FacilitySubmit;