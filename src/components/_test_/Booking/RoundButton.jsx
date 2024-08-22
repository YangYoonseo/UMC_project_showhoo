import React, { useState } from "react";
import "../../../styles/Jisu/RoundButton.css";

const RoundButton = ({ className, topic, detail, index, isClicked, onClick, style, onOpenModal, onChange }) => {
    const [inputTextColor, setInputTextColor] = useState("#000000"); // 기본 텍스트 색상

    const handleFocus = () => {
        setInputTextColor("#09F1B9"); // 입력 중일 때 텍스트 색상 변경
    };

    const handleBlur = () => {
        setInputTextColor("#9C9C9C"); // 입력이 끝나면 텍스트 색상을 기본 색상으로 복원
    };

    return (
        <button
            className={`RoundButton ${isClicked ? 'clicked' : ''}`}
            onClick={() => {
                if (onClick) {
                    onClick(index); // onClick이 존재할 경우에만 실행
                }
                if (onOpenModal) {
                    onOpenModal(); // onOpenModal이 존재할 경우에만 실행
                }
            }}
            style={style}
        >
            {className === "searchHall" ? (
                <div className="searchHallContent">
                    <div className="topic">{topic}</div>
                    <input 
                        className="searchHallInputText" 
                        style={{ color: inputTextColor }} // 입력 중일 때 텍스트 색상 변경
                        onFocus={handleFocus} 
                        onBlur={handleBlur} 
                        placeholder="공연장 검색"
                        onChange={onChange}
                    />
                </div>
            ) : (
                <>
                    {/* 기본 렌더링 내용 */}
                    <div className="topic">{topic}</div>
                    <div className="detail">{detail}</div>
                </>
            )}
        </button>
    );
};

export default RoundButton;
