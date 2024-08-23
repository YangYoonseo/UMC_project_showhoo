import "../../styles/Eojin/concert_readyRequest.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';

import Button from "../common/Button";

const ReadyRequest = ({ preStep, nextStep }) => {
    const [request, setRequest] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 작성된 요청사항 API 연결 
    const showId = 8;

    async function getDownloadData() {
        const token = sessionStorage.getItem("accessToken");
        try {
            const res = await axios.get(
                `https://showhoo.site/space/${showId}/show-prepare`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },           
                }
            );
            const getReq = res.data.result.requirement;
            setRequest(getReq);
            setLoading(false);
            console.log("다운로드 양식 보기", res.data);
        } catch (error) {
            console.log("Error:", error);
            setError("Error");
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getDownloadData();
    }, []);

    return (
        <div className="ReadyRequest">
            <div className="Request_content">
                <h4>요청사항</h4>
                <p>공연자가 추가적으로 요청한 사항입니다.</p>
                <div className="Request">
                    {loading && <p>로딩 중...</p>}
                    {error && <p>{error}</p>}
                    {!loading && !error && <p>{request}</p>}
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

