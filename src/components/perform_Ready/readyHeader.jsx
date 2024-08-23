import "../../styles/Eojin/readyHeader.css"
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ReadyHeader = ({ step, onClick }) => {
    const [date, setDate] = useState('');
    const [dDay, setDDay] = useState('');
    /*
    const location = useLocation();
    console.log("location:", location);
    const spaceApplyId = location.state.id || "받아오지 못함";
    console.log("spaceApplyId:", spaceApplyId);
    */

    const spaceApplyId = 2;
    

    // 다운로드 양식 받기 
    async function getDay() {
        const token = sessionStorage.getItem("accessToken");
        try {
            const res = await axios.get(
                `https://showhoo.site/${spaceApplyId}/show-date`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },           
                }
            );
            const Date = res.data.result.date;
            setDate(Date);
            console.log(date);
            const DDay = res.data.result.dday;
            setDDay(DDay);
            console.log(dDay);
            console.log("결과:", res.data.isSuccess);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(()=>{
        getDay();
    }, []);

    return (
        <div className="ReadyHeader">
            <div className="ReadyHeader_Dday">
                <h3>{dDay}</h3>
                <p>{date}</p>
            </div>
            <div className="Level">
                <div className={`Circle QCircle_${step}`} onClick={() => onClick(1)}>
                    <p>큐시트<br />작성</p>
                </div>
                <div className={`Line QLine_${step}`}></div>
                <div className={`Circle RCircle_${step}`} onClick={() => onClick(2)}>
                    <p>요청사항</p>
                </div>
                <div className={`Line RLine_${step}`}></div>
                <div className={`Circle TCircle_${step}`} onClick={() => onClick(3)}>
                    <p>공연 포스터/<br />티켓 발행</p>
                </div>
                <div className={`Line TLine_${step}`}></div>
                <div className={`Circle MCircle_${step}`} onClick={() => onClick(5)}>
                    <p>예매자 관리</p>
                </div>
                <div className={`Line MLine_${step}`}></div>
                <div className={`Circle CCircle_${step}`} onClick={() => onClick(6)}>
                    <p>공연준비<br />완료</p>
                </div>
            </div>
        </div>
    )
};

export default ReadyHeader;