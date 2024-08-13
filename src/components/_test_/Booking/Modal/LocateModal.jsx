import React, { useState } from 'react';
import "../../../../styles/Jisu/LocateModal.css";
import DoButton from "./Locate/DoButton.jsx";
import DistrictButton from './Locate/DistrictButton.jsx';

const LocateModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // 어떤 도가 선택되었는지
    const [selectedIndex, setSelectedIndex] = useState(null);

    const locations = [
        { text: "서울", className: "topButton" },
        { text: "경기도" },
        { text: "대구" },
        { text: "부산" },
        { text: "경상남도" },
        { text: "전라북도" },
        { text: "전라남도" },
        { text: "강원도" },
        { text: "충청남도" },
        { text: "인천" },
        { text: "광주", className: "bottomButton" }
    ];

    const districts = [
        { text: "1" }
    ];

    // 버튼 클릭 시 호출되는 함수
    const handleButtonClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <div className="LocateModalBackdrop" onClick={onClose}>
            <div className="LocateModalContent" onClick={(e) => e.stopPropagation()}>
                <div className='LocateModalBody'>
                    <div className='Do'>
                        {locations.map((location, index) => (
                            <DoButton
                                key={index}
                                className={location.className || ""}
                                text={location.text}
                                isActive={selectedIndex === index}
                                onClick={() => {handleButtonClick(index), console.log("D")}}
                            />
                        ))}
                    </div>
                    <div className='Gu'>
                        {districts.map((district, index) => (
                            <DistrictButton
                                key={index}
                                className={district.className || ""}
                                text={district.text}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocateModal;
