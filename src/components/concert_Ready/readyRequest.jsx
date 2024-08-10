import "../../styles/Eojin/perform_readyRequest.css";
import React, { useState, useEffect } from "react";
import Button from "../common/Button";
import axios from 'axios';

const ReadyRequest = ({ preStep, nextStep }) => {
    const [request, setRequest] = useState(`일단, 곡에 대한 요청사항은 큐시트에 작성한 바와 같습니다. 하지만 곡 외적인 퍼포먼스를 위한요청사항이 있습니다. <br><br> 
        첫번째 공연곡 이전에 스모그를 통해 공연 시작의 분위기를 만들어 주시면 감사하겠습니다. <br><br>
        또한, 마지막 공연곡 이후에 카운트 10 이후에 다시 마지막 후렴부분으로 돌아갈 예정입니다. 바로 조명 OFF 해주시고, 카운트 이후 모든 조명을 보컬에게 맞춰서 쏴주시면 감사하겠습니다.`);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    

    return (
        <div className="ReadyRequest">
            <div className="Request_content">
                <h4>요청사항</h4>
                <p>공연자가 추가적으로 요청한 사항입니다.</p>
                <div className="Request">
                    <p><div className="concert-info" dangerouslySetInnerHTML={{ __html: request }} /></p>
                </div>
            </div>
            <div className="Request_button">
                <Button text={"뒤로 가기"} type={"gray"} onClick={preStep} />
                <Button text={"다음 단계"} type={"green"} onClick={nextStep} />
            </div>
        </div>
    );
};

export default ReadyRequest;

