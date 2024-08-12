import React from "react";
import "../../../styles/Jisu/RoundButton.css";

const RoundButton = ({ topic, detail, index, isClicked, onClick, style, onOpenModal }) => {
    return (
        <button
            className={`RoundButton ${isClicked ? 'clicked' : ''}`}
            onClick={() => {
                onClick(index);
                onOpenModal(); // 모달 열기
            }}
            style={style}
        >
            <div className="topic">{topic}</div>
            <div className="detail">{detail}</div>
        </button>
    );
};

export default RoundButton;
