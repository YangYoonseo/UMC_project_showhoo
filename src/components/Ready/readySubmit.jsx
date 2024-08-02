import "../../styles/readySubmit.css";
import { useState } from 'react';
import submit from "../../assets/img_Ready/submit.svg";
import ReadyUploader from "./readyUploader";

const ReadySubmit = ({ text, id, onCheck }) => {
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
        <div className={`readySubmit readySubmit_${complete}`} onClick={onClick}>
            <img src={submit} alt="download" />
            <p>{text}</p>
            {showUploader && <ReadyUploader onClose={closeModal} uploadSuc={uploadSuc} uploadFail={uploadFail} />}
        </div>
    )
}

export default ReadySubmit;