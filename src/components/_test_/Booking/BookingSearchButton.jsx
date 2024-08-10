import { useNavigate } from "react-router-dom";
import React from 'react';

import SearchImg from "../../../assets/img_Booking/search_button.svg"

const BookingSearchButton = () => {
    const nav = useNavigate();

    return <button className="searchButton"
    onClick={()=>{nav("/booking_after")
        }}>
        <div className="SearchImg">
            <img src={SearchImg} alt="SearchImg"/>
    </div>
    </button>
};

export default BookingSearchButton;