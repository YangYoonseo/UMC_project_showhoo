import "../../styles/readyHeader.css"

const ReadyHeader = ({ step }) => {
    return (
        <div className="ReadyHeader">
            <div className="ReadyHeader_Dday">
                <h3>D-9</h3>
                <p>2024-08-13</p>
            </div>
            <div className="Level">
                <div className={`Circle QCircle_${step}`}>
                    <p>큐시트<br />작성</p>
                </div>
                <div className={`Line QLine_${step}`}></div>
                <div className={`Circle RCircle_${step}`}>
                    <p>요청사항</p>
                </div>
                <div className={`Line RLine_${step}`}></div>
                <div className={`Circle TCircle_${step}`}>
                    <p>공연 포스터/<br />티켓 발행</p>
                </div>
                <div className={`Line TLine_${step}`}></div>
                <div className={`Circle CCircle_${step}`}>
                    <p>공연준비<br />완료</p>
                </div>
            </div>
        </div>
    )
};

export default ReadyHeader;