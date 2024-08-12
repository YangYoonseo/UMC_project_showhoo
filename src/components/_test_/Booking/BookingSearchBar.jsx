import { useEffect, useState } from "react";
import React from "react";
import BookingSearchButton from "./BookingSearchButton";
import "../../../styles/Jisu/BookingSearchBar.css"

const BookingSearchBar = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked); // 클릭할 때마다 상태 반전
    };
    
    const RoundButton = ({topic, detail}) => {
        return <button
            className={`Concerthall ${isClicked ? 'clicked' : ''}`}
            onClick={handleClick}>
            <div className="topic">{topic}</div>
            <div className="detail">{detail}</div>
        </button>
    }

    return (<div className="BookingSearchBar">
        <RoundButton topic="공연장" detail="공연장 검색"/>

        <div className="topicDevide"></div>
        <button className="Locate">
            <div className="topic">지역</div>
            <div className="detail">지역 검색</div>
        </button>

        <div className="topicDevide"></div>
        <button className="Date">
            <div className="topic">날짜</div>
            <div className="detail">공연날짜 추가</div>
        </button>

        <div className="topicDevide"></div>
        <button className="category">
            <div className="topic">유형</div>
            <div className="detail">공연장 유형 추가</div>
        </button>
        <BookingSearchButton />
        </div>);
};

export default BookingSearchBar;