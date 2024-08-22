import "../../styles/Eojin/readyRequest.css";
import React, { useState } from "react";
import Button from "../common/Button";
import axios from "axios";

const ReadyRequest = ({ preStep, nextStep, check }) => {
    const [text, setText] = useState('');
    const maxLength = 200;

    const handleChange = (e) => {
        if (e.target.value.length <= maxLength) {
            setText(e.target.value);
        }
    };

    // 텍스트 길이에 따라 request 상태 업데이트
    const checkRequest = () => {
        // 상태가 바뀌는 경우만 업데이트하도록 조건을 추가
        if (text.length >= 10) {
            check("Request");
            uploadData();
            nextStep();
        } else if (text.length < 10) {
            console.log("이전 단계를 채워주세요.")
        }
    };

    const showId = 1;

    const uploadData = async () => {
        const token = sessionStorage.getItem("accessToken");

        try {
            const res = await axios.post(
                `https://showhoo.site/${showId}/requirement-register`,
                {
                    "requirement": text,  // 서버로 전송할 텍스트 데이터
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("업로드 성공:", res.data);
            nextStep();  // 서버 전송 후 다음 단계로 진행
        } catch (error) {
            console.error("업로드 실패:", error);
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
                <Button text={"제출하기"} type={"green"} onClick={checkRequest} />
            </div>
        </div>
    )
};

export default ReadyRequest;