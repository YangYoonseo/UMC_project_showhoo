import React from "react";
import "../../../../../styles/Jisu/DoButton.css";
import locationSearchButton from "../../../../../assets/img_Booking/locationSearchButton.svg"; // 이미지 경로를 변수로 가져옴

const DoButton = ({ className = "", text = "", isActive, onClick }) => {
    return (
        <button
            className={`DoButton ${className} ${isActive ? "clicked" : ""}`}
            onClick={onClick} // 상위 컴포넌트에서 상태관리
        >
            <span className="button-text">{text}</span>
            <img className="arrow-icon"
                src={locationSearchButton} alt="arrow icon" /> {/* 변수를 사용해서 이미지 경로를 설정 */}
        </button>
    );
};

export default DoButton;
