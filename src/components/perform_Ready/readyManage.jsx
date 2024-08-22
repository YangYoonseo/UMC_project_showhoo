import "../../styles/Eojin/readyManage.css";
import { useState, useEffect } from "react";
import Button from "../common/Button";
import ReservationTicket from "./manage/reservationTicket";
import AwaitPermission from "./manage/awaitPermission";
import CheckEntrance from "./manage/checkEntrance";
import Refund from "./manage/refund";

const ReadyManage = ({ preStep, nextStep }) => {
    const [activeTab, setActiveTab] = useState('reservationTicket');
    /* 
    const [bookData, setBookData] = useState([]);

    const showId = 6;

    async function getDownloadData() {
        const token = sessionStorage.getItem("accessToken");
        try {
            const res = await axios.get(
                `https://showhoo.site/performer/${showId}/prepare/book-admin`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },           
                }
            );
            const data = res.data.result;
            setBookData(data);
            console.log("다운로드 양식 보기", res.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        getDownloadData();
    }, []);
    */

    const renderContent = () => {
        switch(activeTab) {
            case 'reservationTicket':
                return <ReservationTicket />;
            case 'awaitPermission':
                return <AwaitPermission />;
            case 'checkEntrance':
                return <CheckEntrance />;
            default:
                return null;
        }
    };

    return (
        <div className="readyManage">
            <div className="Reservation">
                <h4>예매자 관리</h4>
                <p>계좌 송금 확인 후 '주문 승인'을 통해 예매자를 확인할 수 있어요.</p>
                <div className="Reservation_table">
                    <div className="table_bar">
                        <p 
                            onClick={() => setActiveTab('reservationTicket')} 
                            className={activeTab === 'reservationTicket' ? 'active' : ''}
                        >예매 티켓</p>
                        <p 
                            onClick={() => setActiveTab('awaitPermission')} 
                            className={activeTab === 'awaitPermission' ? 'active' : ''}
                        >주문 승인 대기</p>
                        <p 
                            onClick={() => setActiveTab('checkEntrance')} 
                            className={activeTab === 'checkEntrance' ? 'active' : ''}
                        >입장 확인</p>
                    </div>
                    <div className="table_content">
                        {renderContent()}   
                    </div>
                </div>
            </div>
            <div className="Refund">
                <h4>환불 관리</h4>
                <p>환불 요청이 들어왔을 시 관람자에게 티켓 금액을 환불하고 체크 표시해주세요. 체크 후 취소는 불가능하니 유의해주세요.</p>
                <div className="Refund_table">
                    <div className="table_bar">
                        <p className='active'>환불요청</p>
                    </div>
                    <div className="table_content">
                        <Refund />   
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

export default ReadyManage;