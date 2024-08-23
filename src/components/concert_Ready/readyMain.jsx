import "../../styles/Eojin/readyMain.css";
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

import ReadyHeader from "./readyHeader";
import ReadyQsheet from "./readyQsheet";
import ReadyRequest from "./readyRequest";
import ReadyComplete from "./readyComplete";

const ReadyMain = () => {

    const location = useLocation();
    console.log("location:", location);
    const spaceApplyId = location.state.id || "받아오지 못함";
    console.log("spaceApplyId:", spaceApplyId);

    const [step, setStep] = useState(1);
    const [showId, setShowId] = useState(0);  // 생성된 showId 

    const onClick = (num) => {
        setStep(num);
    };

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const preStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    return (
        <div className="Ready_container">
            <div className="Ready_header"><ReadyHeader step={step} onClick={onClick} spaceApplyId={spaceApplyId} /></div>
            <div className="Ready_content">
                <div style={{ display: step === 1 ? 'block' : 'none' }}>
                    <ReadyQsheet nextStep={nextStep} setShowId={setShowId} spaceApplyId={spaceApplyId} showId={showId} />
                </div>
                <div style={{ display: step === 2 ? 'block' : 'none' }}>
                    <ReadyRequest preStep={preStep} nextStep={nextStep} showId={showId} />
                </div>
                <div style={{ display: step === 3 ? 'block' : 'none' }}>
                    <ReadyComplete />
                </div>
            </div>
        </div>
    )
};

export default ReadyMain;