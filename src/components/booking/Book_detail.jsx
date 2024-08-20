import "../../styles/Eojin/Book_detail.css";
import { useState } from "react";
import axios from "axios";

import priceIcon from "../../assets/img_Booking/Booking/priceIcon.svg";
import arrow from "../../assets/img_Ready/arrow.svg";
import Button from "../common/Button";
import Popup_book from "./popup_book";
import Popup_payment from "./popup_payment";
import Popup_complete from "./popup_complete";

const Book_detail = (
    { id, audienceId, host, img, name, place, description, descriptionImg, date, time, cancelDate, cancelTime, runningtime, remainTicketNum, price, permaxTicket, bank, accountHolder, accountNum }
    ) => {
        const [isConcert, setIsConcert] = useState(true);   // 공연 정보
        const [isSell, setIsSell] = useState(false);        // 판매 정보
        const [text, setText] = useState("매수");           // 티켓 개수 (text)
        const [count, setCount] = useState(1);              // 티켓 개수 
        const [isInput, setIsInput] = useState(false);      // 티켓 개수 팝업 
        const [isBook, setIsBook] = useState(false);        // 티켓 예매 팝업(이름+전번)
        const [isPayment, setIsPayment] = useState(false);  // 티켓 예매 팝업(계산)
        const [isComplete, setIsComplete] = useState(false);// 티켓 예매 팝업(완료)
        const [bookName, setBookName] = useState("");       // 티켓 예매자 이름
        const [phoneNum, setPhoneNum] = useState("");       // 티켁 예매자 전번
        // 판매 정보 
        const sell_inf = `
                <strong>· 환불 안내</strong><br>
                공연이라는 상품의 특성상 공연이 종료되면 상품 가치가 소멸합니다. 따라서 공연 시작 이후에는 환불이 어렵습니다. 공연 시작 시간은 각 공연 상세 페이지에서 확인하실 수 있습니다. 취소 수수료는 따로 없습니다.<br><br>
                승인, 선착순 방식의 경우 <span style="color: #F01569;">공연 시작 전까지</span> 마이페이지 예매내역에서 환불 가능합니다.<br><br>
                <strong>· 공연 입장 안내</strong><br>
                공연 입장 전에 "이름"과 "전화번호"를 말씀하시면, 공연자가 예매자 확인 후 입장이 가능합니다.<br>
            `;

        // 예매자 공연 예매 API 연결 
        const uploadBookInf = async () => {
            const bookInf = {
                "name": bookName,
                "phoneNum": phoneNum,
                "ticketNum": count,
                "audienceId": audienceId,
                "showsId": id,
            };

            const token = sessionStorage.getItem("accessToken");
        
            try {
                const response = await axios.post(
                    `http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/book/post`,  // 실제 서버 API 엔드포인트
                    bookInf,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                console.log("서버 응답:", response.data);
            } catch (error) {
                console.error("업로드 실패:", error);
            }
        };

        // 공연 정보 || 판매 정보 
        const onClick = (select) => {
            if (select === "concert") {
                setIsSell(false);
                setIsConcert(true);
            } else {
                setIsConcert(false);
                setIsSell(true);
            }
        };

        // 티켓 입력창 열기 
        const onOpenInput = () => {
            setIsInput(!isInput); // 팝업 열고 닫기
            setText(count); // 텍스트를 count로 변경
        };

        // 티켓 개수 증가 
        const increase = () => {
            if (count < permaxTicket) { // 최대 3매로 제한
                setCount(prevCount => {
                    const newCount = prevCount + 1;
                    setText(newCount); // count가 변경될 때 text도 업데이트
                    return newCount;
                });
            }
        };

        // 티켓 개수 감소 
        const decrease = () => {
            if (count > 1) { // 최소 1매로 제한
                setCount(prevCount => {
                    const newCount = prevCount - 1;
                    setText(newCount); // count가 변경될 때 text도 업데이트
                    return newCount;
                });
            }
        };

        // 팝업창 
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
            uploadBookInf();
            setIsComplete(false);
            setIsBook(false);
            setIsPayment(false);
        }

        // 예매자 이름 + 전화번호 입력 
        const handleBookInf = (name, phoneNum) => {
            setBookName(name);
            setPhoneNum(phoneNum);
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
                                <p>날짜&nbsp;&nbsp;<span>{date}</span></p>
                                <p>시간&nbsp;&nbsp;<span>{time}</span></p>
                                <p>러닝타임&nbsp;&nbsp;<span>{runningtime}분</span></p>
                                <p>호스트&nbsp;&nbsp;<span>{host}</span></p>
                                <p>예매 취소 기한&nbsp;&nbsp;<span>{cancelDate} {cancelTime}</span></p>
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
                            {isConcert && (
                                <div className="concert-info">
                                    {descriptionImg && (<img src={descriptionImg} alt="descriptionimg" />)}
                                    <div dangerouslySetInnerHTML={{ __html: description }} />
                                </div>
                            )}
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
                                <p>인당 {permaxTicket}매 제한</p>
                                <p>{remainTicketNum}매 남음</p>
                            </div>
                        </div>
                    }
                    <Button text={"예매하기"} type={"green"} onClick={onPopupBook}/>
                    {isBook && 
                        <Popup_book 
                            name={name} 
                            count={count} 
                            prev={closePopup} 
                            next={onPopupPayment} 
                            handleBookInf={handleBookInf} 
                        />
                    }
                    {isPayment && 
                        <Popup_payment 
                            name={name} 
                            price={price} 
                            count={count} 
                            prev={onPopupBook} 
                            next={onPopupComplete} 
                            bookName={bookName} 
                            phoneNum={phoneNum}
                            bank={bank} 
                            accountHolder={accountHolder} 
                            accountNum={accountNum} 
                        />
                    }
                    {isComplete && <Popup_complete complete={onComplete} />}
                </div>
            </div>
        );
    }

export default Book_detail;
