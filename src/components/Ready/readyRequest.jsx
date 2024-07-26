import "../../styles/readyRequest.css";
import React, { useState } from "react";
import Button from "../common/Button";

const ReadyRequest = ({ preStep, nextStep }) => {
    const [text, setText] = useState('');
    const maxLength = 200;

    const handleChange = (e) => {
        if (e.target.value.length <= maxLength) {
            setText(e.target.value);
        }
    };

    return (
        <div className="ReadyRequest">
            <div className="Request_content">
                <h4>요청사항</h4>
                <p>공연장에게 추가적으로 요청하고 싶은 사항이 있다면 적어주세요.</p>
                <textarea
                    className={"Request_input"} 
                    value={text}
                    onChange={handleChange}
                    maxLength={maxLength}
                />
                <h5>{text.length}/{maxLength}</h5>
            </div>
            <div className="Request_button">
                <Button text={"뒤로 가기"} type={"gray"} onClick={preStep} />
                <Button text={"제출하기"} type={"green"} onClick={nextStep} />
            </div>
        </div>
    )
};

export default ReadyRequest;