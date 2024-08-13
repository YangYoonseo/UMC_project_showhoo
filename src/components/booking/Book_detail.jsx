import "../../styles/Eojin/Book_detail.css";
import { useState } from "react";

import priceIcon from "../../assets/img_Booking/Booking/priceIcon.svg";
import arrow from "../../assets/img_Ready/arrow.svg";
import Button from "../common/Button";
import Popup_book from "./popup_book";
import Popup_payment from "./popup_payment";
import Popup_complete from "./popup_complete";

const Book_detail = ({ id, name, img, place, date, runningtime, host, cancel, concert_inf, sell_inf, price, amount }) => {
    const [isConcert, setIsConcert] = useState(true);
    const [isSell, setIsSell] = useState(false);
    const [text, setText] = useState("매수");
    const [count, setCount] = useState(1);
    const [isInput, setIsInput] = useState(false);
    const [isBook, setIsBook] = useState(false);
    const [isPayment, setIsPayment] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const onClick = (select) => {
        if (select === "concert") {
            setIsSell(false);
            setIsConcert(true);
        } else {
            setIsConcert(false);
            setIsSell(true);
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const formatDay = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes}`;
    };

    const onOpenInput = () => {
        setIsInput(!isInput); // 팝업 열고 닫기
        setText(count); // 텍스트를 count로 변경
    };

    const increase = () => {
        if (count < 3) { // 최대 3매로 제한
            setCount(prevCount => {
                const newCount = prevCount + 1;
                setText(newCount); // count가 변경될 때 text도 업데이트
                return newCount;
            });
        }
    };

    const decrease = () => {
        if (count > 1) { // 최소 1매로 제한
            setCount(prevCount => {
                const newCount = prevCount - 1;
                setText(newCount); // count가 변경될 때 text도 업데이트
                return newCount;
            });
        }
    };

    const closePopup = () => {
        setIsComplete(false);
        setIsPayment(false);
        setIsBook(false);
    };

    const onPopupBook = () => {
        setIsComplete(false);
        setIsPayment(false);
        setIsBook(true);
    };

    const onPopupPayment = () => {
        setIsComplete(false);
        setIsBook(false);
        setIsPayment(true);
    }

    const onPopupComplete = () => {
        setIsBook(false);
        setIsPayment(false);
        setIsComplete(true);
    }

    const onComplete = () => {
        setIsComplete(false);
        setIsBook(false);
        setIsPayment(false);
    }

    return (
        <div className="Book_detail">
            <div className="detail_container">
                <div className="detail_name">
                    {name}
                </div>
                <div className="detail_content1">
                    <div className="detail_poster">
                        <img className="poster" src={img} alt="poster" />
                    </div>
                    <div className="detail_inf">
                        <div className="inf1">
                            <p>장소&nbsp;&nbsp;<span>{place}</span></p>
                            <p>날짜&nbsp;&nbsp;<span>{formatDay(date)}</span></p>
                            <p>시간&nbsp;&nbsp;<span>{formatTime(date)}</span></p>
                            <p>러닝타임&nbsp;&nbsp;<span>{runningtime}분</span></p>
                            <p>호스트&nbsp;&nbsp;<span>{host}</span></p>
                            <p>예매 취소 기한&nbsp;&nbsp;<span>{formatDate(cancel)}</span></p>
                        </div>
                        <div className="inf2">
                            <p>본 공연은 쇼호서비스를 이용하여 온라인 예매를 실시하고 있으며, 예매하신 티켓의 취소/환불/배송에 관련된 사항은 쇼호의 약관을 참고하여 주십시오.</p>
                        </div>
                    </div>
                </div>
                <div className="detail_content2">
                    <div className="content_bar">
                        <div className={`bar_com bar_com_${isConcert}`} onClick={() => onClick("concert")}>공연 정보</div>
                        <div className={`bar_com bar_com_${isSell}`} onClick={() => onClick("sell")}>판매 정보</div>
                    </div>
                    <div className="bar_inf">
                        {isConcert &&
                            <div className="concert-info" dangerouslySetInnerHTML={{ __html: concert_inf }} />
                        }
                        {isSell &&
                            <div className="refund-info" dangerouslySetInnerHTML={{ __html: sell_inf }} />
                        }
                    </div>
                </div>
            </div>
            <div className="detail_price">
                <h5>₩{price}</h5>
                <div className="price_input">
                    <img className="price_icon" src={priceIcon} alt="price_icon" />
                    <div className="text">{text}</div>
                    <img className="arrow" src={arrow} alt="arrow" onClick={onOpenInput} />
                </div>
                {isInput &&
                    <div className="input_popup">
                        <div className="select_amount">
                            <p>매수 선택하기</p>
                            <button onClick={decrease}>-</button>
                            <span className="counter_value">{count}</span>
                            <button onClick={increase}>+</button>
                        </div>
                        <div className="ticket">
                            <p>인당 3매 제한</p>
                            <p>{amount}매 남음</p>
                        </div>
                    </div>
                }
                <Button text={"예매하기"} type={"green"} onClick={onPopupBook}/>
                {isBook && <Popup_book name={name} count={count} prev={closePopup} next={onPopupPayment} />}
                {isPayment && <Popup_payment name={name} count={count} prev={onPopupBook} next={onPopupComplete} />}
                {isComplete && <Popup_complete check={onComplete} />}
            </div>
        </div>
    );
}

export default Book_detail;
