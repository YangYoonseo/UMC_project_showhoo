import "../../styles/readySubmit.css";
import { useState } from 'react';
import submit from "../../assets/img_Ready/submit.png";
import ReadyUploader from "./readyUploader";

const ReadySubmit = ({ text }) => {
    const [showUploader, setShowUploader] = useState(false);
    const [complete, setComplete] = useState(false);

    const onClick = () => {
        setShowUploader(true);
    };

    const closeModal = () => {
        setShowUploader(false);
        console.log('closeModal');
    };

    const uploadSuc = () => {
        setComplete(true);
    };
    const uploadFail = () => {
        setComplete(false);
        console.log('nonFile');
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