import "../../styles/Eojin/popup_book.css";
import { useState } from "react";

import personIcon from "../../assets/img_Booking/Booking/personIcon.svg";
import phoneIcon from "../../assets/img_Booking/Booking/phoneIcon.svg";
import Button from "../common/Button";


const Popup_book = ({ name, count, next, prev, handleBookInf }) => {
    const [bookinf, setBookinf] = useState({
        name: "",
        phoneNum: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookinf((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onClick = (name, phoneNum) => {
        handleBookInf(name, phoneNum);
        next();
    }

    return (
        <div className="popup_backdrop">
            <div className="popup_book">
                <h5>예매하기</h5>
                <p>{name} <span className="color">{count}매</span></p>
                <div className="book_input">
                    <div className="book book_name">
                        <img src={personIcon} alt="" />
                        <input onChange={handleChange} name="name" placeholder="이름 (입금자명과 동일)" />
                    </div>
                    <div className="book book_phone">
                        <img src={phoneIcon} alt="" />
                        <input onChange={handleChange} name="phoneNum" placeholder="전화번호" />
                    </div>
                </div>
                <div className="book_button">
                    <Button text={"취소"} type={"gray"} onClick={prev}/>
                    <Button text={"다음"} type={"green"} onClick={onClick(bookinf.name, bookinf.phoneNum)}/>
                </div>
            </div>
        </div>
    )

}

export default Popup_book;