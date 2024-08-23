import "../../styles/Eojin/readyTicket.css";
import React, { useState, useEffect } from 'react';
import Button from "../common/Button";


const ReadyDetail = ({ preStep, nextStep }) => {
    const [bank, setBank] = useState('');
    const [accountHolder, setAccountHolder] = useState('');
    const [accountNum, setAccountNum] = useState('');
    const [ticketNum, setTicketNum] = useState(0);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [perMaxticket, setPermaxticket] = useState(0);

    // 티켓 발행 등록 API 연결 
    const showId = 8;

    const uploadTicket = async () => {
        const token = sessionStorage.getItem("accessToken");

        const getBank = bank;
        const getAccountHolder = accountHolder;
        const getAccountNum = accountNum;
        const getTicketNum = ticketNum;
        const getTicketPrice = ticketPrice;
        const getPerMaxticket = perMaxticket;

        const formData = {
            "bank": getBank,
            "accountHolder": getAccountHolder,
            "accountNum": getAccountNum,
            "ticketNum": getTicketNum,
            "ticketPrice": getTicketPrice,
            "perMaxticket": getPerMaxticket
        }

        console.log("서버로 전송할 데이터:", formData);

        try {
            const res = await axios.post(
                `https://showhoo.site/${showId}/ticket-register`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("업로드 성공:", res.data);
            nextStep();  // 서버 전송 후 다음 단계로 진행
        } catch (error) {
            console.error("업로드 실패:", error);
        }
    };

    const increase = () => {
        setPermaxticket(perMaxticket + 1); // 숫자 증가
    };
    
      const decrease = () => {
        setPermaxticket(perMaxticket - 1); // 숫자 감소
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
                            <input 
                                className="bank" 
                                type="text" 
                                placeholder="은행명" 
                                onChange={(e) => setBank(e.target.value)} 
                            />
                            <input 
                                className="accountHolder" 
                                type="text" 
                                placeholder="예금주" 
                                onChange={(e) => setAccountHolder(e.target.value)} 
                            />
                        </div>
                        <input 
                            className="account" 
                            type="text" 
                            placeholder="계좌번호" 
                            onChange={(e) => setAccountNum(e.target.value)} 
                        />
                    </div>
                    <div className="Ticket_num">
                        <div className="Ticket_input1">
                            <div className="Ticket_price">
                                <h5>티켓 가격</h5>
                                <p>송금받을 티켓 가격을 써주세요.</p>
                                <div className="input">
                                    <input className="input-left" onChange={(e) => setTicketPrice(e.target.value)} />
                                    <span className="unit"> 원</span>
                                </div>
                            </div>
                            <div className="Ticket_amount">
                                <h5>발행 매수</h5>
                                <p>공연장의 최대 수용 인원만큼 가능해요.</p>
                                <div className="input">
                                    <input type="number" className="input-left" onChange={(e) => setTicketNum(e.target.value)} />
                                    <span className="unit"> 매</span>
                                </div>
                            </div>
                        </div>
                        <div className="Ticket_limit">
                            <h5>1인당 구매 가능 매수 제한</h5>
                            <button onClick={decrease}>-</button>
                            <span className="counter_value">{perMaxticket}</span>
                            <button onClick={increase}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Ticket_button">
                <Button text={"뒤로 가기"} type={"gray"} onClick={preStep} />
                <Button text={"다음 단계"} type={"green"} onClick={uploadTicket} />
            </div>
        </div>
    )
};

export default ReadyDetail;