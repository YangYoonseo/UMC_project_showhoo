import { useNavigate } from "react-router-dom";
import React from 'react';
import "../../../styles/Jisu/BookingSearchButton.css";
import SearchImg1 from "../../../assets/img_Booking/search_button.svg"; // size65용 이미지
import SearchImg2 from "../../../assets/img_Booking/search_button_2.svg"; // size46용 이미지

const BookingSearchButton = ({ size = '' , onClick}) => {
    const nav = useNavigate();
    let imageSrc;
    switch (size) {
        case 'size65':
            imageSrc = SearchImg1;
            break;
        case 'size46':
            imageSrc = SearchImg2;
            break;
        default:
            imageSrc = SearchImg1; // 기본 이미지 설정 (기본값)
            break;
    }

    {/*onClick={() => {
                nav("/rental_search");
     }} */}
    
    return (
        <button
            className={`RentalSearchButton ${size}`}
            onClick={onClick} // 외부에서 전달받은 onClick 핸들러를 사용
        >
            <div className="SearchImg">
                <img src={imageSrc} alt="SearchImg" />
            </div>
        </button>
    );
};

export default BookingSearchButton;
