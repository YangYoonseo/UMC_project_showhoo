import "../../styles/Eojin/popup_payment.css";
import React, { useState, useEffect } from "react";

import personIcon from "../../assets/img_Booking/Booking/personIcon.svg";
import phoneIcon from "../../assets/img_Booking/Booking/phoneIcon.svg";
import checkbox from "../../assets/img_Ready/checkbox.svg";
import check from "../../assets/img_Ready/check.svg";
import checkIcon from "../../assets/img_Booking/Booking/checkIcon.svg";
import nonCheckIcon from "../../assets/img_Booking/Booking/nonCheckIcon.svg";
import copyIcon from "../../assets/img_Booking/Booking/copyIcon.svg";

import Button from "../common/Button";

const Popup_payment = ({name, count, price, bookName, phoneNum, prev, next, bank, accountHolder, accountNum }) => {
    const [complete, setComplete] = useState(false);        // 전체 동의
    const [agreeNote, setAgreeNote] = useState(false);      // 유의사항 동의
    const [agreeRefund, setAgreeRefund] = useState(false);  // 환불규정 동의
    const accountInfo = `${bank} ${accountNum}`;            // 계좌번호 

    // 전체 금액 계산 
    function calculator(price, amount) {
        // 금액 문자열을 정수로 변환
        const priceNumber = parseInt(price, 10);
    
        // 총 금액 계산
        const totalAmount = priceNumber * amount;
    
        // 총 금액을 문자열로 변환하여 반환
        return totalAmount.toString();
    }

    // 계좌번호 복사 
    const copyToClipboard = () => {
        navigator.clipboard.writeText(accountInfo).then(() => {
            alert("계좌 정보가 복사되었습니다!");
        }).catch(err => {
            console.error('복사 실패: ', err);
        });
    };

    // 유의사항 동의
    const onNote = () => {
        setAgreeNote(!agreeNote);
    };

    // 환뷸규정 동의
    const onRefund = () => {
        setAgreeRefund(!agreeRefund);
    };

    // 전체 동의 
    const onComplete = () => {
        if (!complete) {
            setAgreeNote(true);
            setAgreeRefund(true);
        } else {
            setAgreeNote(false);
            setAgreeRefund(false);
        }
    };

    // 전체 동의 (자동)
    useEffect(() => {
        if (agreeNote && agreeRefund) {
            setComplete(true);
        } else {
            setComplete(false);
        }
    }, [agreeNote, agreeRefund]);

    // 전체 동의 확인 
    const checkComplete = () => {
        if (complete) {
            
            next();
        } else {
            alert("전체 동의해주셔야 예매가 가능합니다.");
        }
    };

    return (
        <div className="payment_backdrop">
            <div className="popup_payment">
                <div className="part_book">
                    <h5>예매하기</h5>
                    <p>{name} <span className="color">{count}매</span></p>
                    <div className="book_input">
                        <div className="book book_name">
                            <img src={personIcon} alt="personIcon" />
                            <div className="input">{bookName}</div>
                        </div>
                        <div className="book book_phone">
                            <img src={phoneIcon} alt="phoneIcon" />
                            <div className="input">{phoneNum}</div>
                        </div>
                    </div>
                </div>
                <div className="total_container">
                    <div className="total_content">
                        <h5>결제금액</h5>
                        <div className="total">
                            <p>티켓   X {count}</p>
                            <p>{calculator(price, count)}원</p>
                        </div>
                        <div className="total">
                            <p>할인</p>
                            <p>0원</p>
                        </div>
                    </div>
                    <div className="total_payment">
                        <p>총 결제금액</p>
                        <p>{calculator(price, count)}원</p>
                    </div>
                </div>
                <div className="payment_inf">
                    <div className="payment_content">
                        <h5>결제 정보</h5>
                        <p>입금자명은 '{bookName}'으로 해주세요</p>
                        <div className="inf_account">
                            <p>입금 계좌</p>
                            <p>(예금주) {accountHolder}</p>
                        </div>
                        <div className="inf_account">
                            <p>{accountInfo}</p>
                            <p className="copy" onClick={copyToClipboard} style={{ cursor: 'pointer', color: '#058F6F' }}>
                                <img src={copyIcon} alt="복사하기" />
                                계좌 복사하기
                            </p>
                        </div>
                    </div>
                </div>
                <div className="agreement_container">
                    <div className="agreement_complete">
                        <img
                            src={complete ? check : checkbox }
                            alt={complete ? "동의함" : "동의하지 않음"}
                            onClick={onComplete} 
                        />
                        <h5>결제 내용 확인 및 동의</h5>
                    </div>
                    <div className="agreement_content">
                        <div className="agreement_check">
                            <img
                                src={agreeNote ? checkIcon : nonCheckIcon }
                                alt={agreeNote ? "동의함" : "동의하지 않음"}
                                onClick={onNote} 
                            />
                            <p>유의사항</p>
                        </div>
                        <p>보기</p>
                    </div>
                    <div className="agreement_content">
                        <div className="agreement_check">
                            <img
                                src={agreeRefund ? checkIcon : nonCheckIcon }
                                alt={agreeRefund ? "동의함" : "동의하지 않음"}
                                onClick={onRefund} 
                            />
                            <p>환불규정</p>
                        </div>
                        <p>보기</p>
                    </div>
                </div>
                <div className="payment_button">
                    <Button text={"뒤로 가기"} type={"gray"} onClick={prev}/>
                    <Button text={"예매하기"} type={"green"} onClick={checkComplete}/>
                </div>
            </div>
        </div>
    )

}

export default Popup_payment;