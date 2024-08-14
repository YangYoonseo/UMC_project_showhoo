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

const Popup_payment = ({name, count, person, phone, prev, next}) => {
    const [complete, setComplete] = useState(false);
    const [agreeNote, setAgreeNote] = useState(false);
    const [agreeRefund, setAgreeRefund] = useState(false);

    const accountInfo = "우리은행 1002061254000";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(accountInfo).then(() => {
            alert("계좌 정보가 복사되었습니다!");
        }).catch(err => {
            console.error('복사 실패: ', err);
        });
    };

    const onNote = () => {
        setAgreeNote(!agreeNote);
    };

    const onRefund = () => {
        setAgreeRefund(!agreeRefund);
    };

    const onComplete = () => {
        if (!complete) {
            setAgreeNote(true);
            setAgreeRefund(true);
        } else {
            setAgreeNote(false);
            setAgreeRefund(false);
        }
    };

    useEffect(() => {
        if (agreeNote && agreeRefund) {
            setComplete(true);
        } else {
            setComplete(false);
        }
    }, [agreeNote, agreeRefund]);

    return (
        <div className="payment_backdrop">
            <div className="popup_payment">
                <div className="part_book">
                    <h5>예매하기</h5>
                    <p>{name} <span className="color">{count}매</span></p>
                    <div className="book_input">
                        <div className="book book_name">
                            <img src={personIcon} alt="" />
                            <input placeholder="이름 (입금자명과 동일)" />
                        </div>
                        <div className="book book_phone">
                            <img src={phoneIcon} alt="" />
                            <input placeholder="전화번호" />
                        </div>
                    </div>
                </div>
                <div className="total_container">
                    <div className="total_content">
                        <h5>결제금액</h5>
                        <div className="total">
                            <p>티켓   X {count}</p>
                            <p>12000원</p>
                        </div>
                        <div className="total">
                            <p>할인</p>
                            <p>0원</p>
                        </div>
                    </div>
                    <div className="total_payment">
                        <p>총 결제금액</p>
                        <p>12000원</p>
                    </div>
                </div>
                <div className="payment_inf">
                    <div className="payment_content">
                        <h5>결제 정보</h5>
                        <p>입금자명은 '홍길동'으로 해주세요</p>
                        <div className="inf_account">
                            <p>입금 계좌</p>
                            <p>(예금주) 쇼호</p>
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
                    <Button text={"예매하기"} type={"green"} onClick={next}/>
                </div>
            </div>
        </div>
    )

}

export default Popup_payment;