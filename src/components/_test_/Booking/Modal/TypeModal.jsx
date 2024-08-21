import React, { useState } from 'react';
import "../../../../styles/Jisu/TypeModal.css";

const TypeModal = ({ isOpen, onClose, onTypeSelect }) => { // onTypeSelect 프롭 추가
    const [selectedButton, setSelectedButton] = useState(null); // State to track the selected button

    if (!isOpen) return null;

    const buttons = ["콘서트홀", "아트홀", "대공연장",
        "소공연장", "대극장", "소극장"];

    const handleButtonClick = (index) => {
        setSelectedButton(index);
        onTypeSelect(buttons[index]); // 선택된 유형을 부모 컴포넌트로 전달
    };

    return (
        <div className="TypeModalBackdrop" onClick={onClose}>
            <div className="TypeModalContent" onClick={(e) => e.stopPropagation()}>
                <div className='TypeModalBody'>
                    {buttons.map((typeText, index) => (
                        <button
                            key={index}
                            className={`type-button ${selectedButton === index ? "selected" : ""}`}
                            onClick={() => handleButtonClick(index)}
                        >
                            {typeText}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TypeModal;
