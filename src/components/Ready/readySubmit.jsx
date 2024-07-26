import "../../styles/readySubmit.css";
import { useState } from 'react';
import submit from "../../assets/img_Qsheet/submit.png";
import ReadyUploader from "./readyUploader";

const ReadySubmit = ({ text }) => {
    const [showUploader, setShowUploader] = useState(false);
    const [complete, setComplete] = useState(0);

    const onClick = () => {
        setShowUploader(true);
    };

    const closeModal = () => {
        setShowUploader(false);
    };

    const uploder = () => {
        setComplete(1);
    };

    return (
        <div className={`readySubmit readySubmit_${complete}`} onClick={onClick}>
            <img src={submit} alt="download" />
            <p>{text}</p>
            {showUploader && <ReadyUploader onClose={closeModal} uploder={uploder} />}
        </div>
    )
}

export default ReadySubmit;