import "../../styles/readyTicket.css";
import React, { useState } from "react";
import Button from "../common/Button";

const ReadyTicket = ({ preStep, nextStep }) => {
    const [accountData, setAccountData] = useState({
        bank: '',
        accountHolder: '',
        account: ''
    });

    const [count, setCount] = useState(0);

    const increase = () => {
        setCount(count + 1); // 숫자 증가
      };
    
      const decrease = () => {
        setCount(count - 1); // 숫자 감소
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountData((prevData) => ({
          ...prevData,
          [name]: value
        }));
    };

    return (
        <div className="readyTicket">
            <div className="Ticket_container">
                <div className="Ticket">
                    <h4>티켓 발행하기</h4>
                    <p>계좌 송금을 통해 수수료 없이 티켓값을 받을 수 있어요.</p>
                    <div className="Ticket_account">
                        <h5>계좌번호 입력</h5>
                        <p>계좌 번호를 적어주세요. (ex. 우리 전채운 1002061254000)</p>
                        <div className="Account_table">
                            <input className="bank" type="text" value={accountData.bank} placeholder="은행명" onChange={handleChange} />
                            <input className="accountHolder" type="text" value={accountData.accountHolder} placeholder="예금주" onChange={handleChange} />
                        </div>
                        <input className="account" type="text" value={accountData.account} placeholder="계좌번호" onChange={handleChange} />
                    </div>
                    <div className="Ticket_num">
                        <div className="Ticket_price">
                            <h5>티켓 가격</h5>
                            <p>송금받을 티켓 가격을 써주세요.</p>
                            <input type="number" />
                        </div>
                        <div className="Ticket_amount">
                            <h5>발행 매수</h5>
                            <p>공연장의 최대 수용 인원만큼 가능해요.</p>
                            <input type="number" />
                        </div>
                    </div>
                    <div className="Ticket_limit">
                        <h5>1인당 구매 가능 매수 제한</h5>
                        <button onClick={decrease}>-</button>
                        <span className="counter_value">{count}</span>
                        <button onClick={increase}>+</button>
                    </div>
                </div>
                <div className="Reservation">
                    <h4>예매자 관리</h4>
                    <p>계좌 송금 확인 후 '주문 승인'을 통해 예매자를 확인할 수 있어요.</p>
                    <div className="Reservation_table"></div>
                    <div className="Reservation_refund"></div>
                </div>
            </div>
            <div className="Ticket_button">
                <Button text={"뒤로 가기"} type={"gray"} onClick={preStep} />
                <Button text={"다음 단계"} type={"green"} onClick={nextStep} />
            </div>
        </div>
    )
};

export default ReadyTicket;