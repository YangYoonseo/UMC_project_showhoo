import "../../styles/Eojin/readyHeader.css"

const ReadyHeader = ({ step, onClick }) => {
    return (
        <div>
            <div className="ReadyHeader_Dday">
                <h3>D-9</h3>
                <p>2024-08-13</p>
            </div>
            <div className="Level">
                <div className={`Circle QCircle_${step}`} onClick={() => onClick(1)}>
                    <p>큐시트<br />확인</p>
                </div>
                <div className={`Line QLine_${step}`}></div>
                <div className={`Circle RCircle_${step}`} onClick={() => onClick(2)}>
                    <p>요청사항<br />확인</p>
                </div>
                <div className={`Line RLine_${step}`}></div>
                <div className={`Circle TCircle_${step}`} onClick={() => onClick(3)}>
                    <p>공연 준비<br />완료</p>
                </div>
            </div>
        </div>
    )
};

export default ReadyHeader;