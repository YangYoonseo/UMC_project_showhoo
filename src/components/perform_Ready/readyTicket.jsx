import "../../styles/Eojin/readyTicket.css";
import React, { useState } from 'react';
import Button from "../common/Button";


const ReadyDetail = ({ preStep, nextStep }) => {
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [count, setCount] = useState(0);

    const [ticket, setTicket] = useState([
        {
            bank: '',
            accountHolder: '',
            account: '',
            ticketPrice: {price},
            ticketAmount: {quantity},
            ticketPossible: {count}
        }
    ])

    const increase = () => {
        setCount(count + 1); // 숫자 증가
    };
    
      const decrease = () => {
        setCount(count - 1); // 숫자 감소
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicket((prevData) => ({
          ...prevData,
          [name]: value
        }));
    };
    
    return (
        <div className="readyTicket">
            <div className="Ticket_container">
                <h4>티켓 발행하기</h4>
                <p>계좌 송금을 통해 수수료 없이 티켓값을 받을 수 있어요.</p>
                <div className="Ticket">
                    <div className="Ticket_account">
                        <h5>계좌번호 입력</h5>
                        <p>계좌 번호를 적어주세요. (ex. 우리 전채운 1002061254000)</p>
                        <div className="Account_table">
                            <input className="bank" type="text" placeholder="은행명" onChange={handleChange} />
                            <input className="accountHolder" type="text" placeholder="예금주" onChange={handleChange} />
                        </div>
                        <input className="account" type="text" placeholder="계좌번호" onChange={handleChange} />
                    </div>
                    <div className="Ticket_num">
                        <div className="Ticket_input1">
                            <div className="Ticket_price">
                                <h5>티켓 가격</h5>
                                <p>송금받을 티켓 가격을 써주세요.</p>
                                <div className="input">
                                    <input type="number" className="input-left" onChange={(e) => setPrice(e.target.value)} />
                                    <span className="unit"> 원</span>
                                </div>
                            </div>
                            <div className="Ticket_amount">
                                <h5>발행 매수</h5>
                                <p>공연장의 최대 수용 인원만큼 가능해요.</p>
                                <div className="input">
                                    <input type="number" className="input-left" onChange={(e) => setQuantity(e.target.value)} />
                                    <span className="unit"> 매</span>
                                </div>
                            </div>
                        </div>
                        <div className="Ticket_limit">
                            <h5>1인당 구매 가능 매수 제한</h5>
                            <button onClick={decrease}>-</button>
                            <span className="counter_value">{count}</span>
                            <button onClick={increase}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Ticket_button">
                <Button text={"뒤로 가기"} type={"gray"} onClick={preStep} />
                <Button text={"다음 단계"} type={"green"} onClick={nextStep} />
            </div>
        </div>
    )
};

export default ReadyDetail;