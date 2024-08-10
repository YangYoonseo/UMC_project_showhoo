import { useEffect } from "react";
import React from "react";
import BookingSearchButton from "./BookingSearchButton";

const BookingSearchBar = () => {  
    return (<div className="BookingSearchBar">
        <div className="Concerthall">
            <div className="topic">공연장</div>
            <div className="detail">공연장 검색</div>
        </div>

        <div className="topicDevide"></div>
        <div className="Locate">
            <div className="topic">지역</div>
            <div className="detail">지역 검색</div>
        </div>

        <div className="topicDevide"></div>
        <div className="Date">
            <div className="topic">날짜</div>
            <div className="detail">공연날짜 추가</div>
        </div>

        <div className="topicDevide"></div>
        <div className="category">
            <div className="topic">유형</div>
            <div className="detail">공연장 유형 추가</div>
        </div>
        <BookingSearchButton />
        </div>);
};

export default BookingSearchBar;