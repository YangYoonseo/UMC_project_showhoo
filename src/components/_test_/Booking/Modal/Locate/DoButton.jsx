import React from "react";
import "../../../../../styles/Jisu/DoButton.css";

const DoButton = ({ className = "", text = "", isActive, onClick }) => {
    return (
        <button
            className={`DoButton ${className} ${isActive ? "clicked" : ""}`}
            onClick={onClick} // 상위 컴포넌트에서 상태관리
        >
            {text}
        </button>
    );
};

export default DoButton;