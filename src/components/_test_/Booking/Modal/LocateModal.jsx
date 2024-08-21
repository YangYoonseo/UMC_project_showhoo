import React, { useState } from 'react';
import "../../../../styles/Jisu/LocateModal.css";
import DoButton from "./Locate/DoButton.jsx";
import DistrictButton from './Locate/DistrictButton.jsx';

const LocateModal = ({ isOpen, onClose, onLocationSelect }) => { // onLocationSelect 프롭 추가
    if (!isOpen) return null;

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedDistrictIndex, setSelectedDistrictIndex] = useState(null);

    const locations = [
        { text: "서울", className: "topButton" },
        { text: "경기도" },
        { text: "대구광역시" },
        { text: "부산광역시" },
        { text: "대전광역시" },
        { text: "경상남도" },
        { text: "전라북도" },
        { text: "전라남도" },
        { text: "강원도" },
        { text: "충청남도" },
        { text: "충청북도" },
        { text: "인천광역시" },
        { text: "광주광역시", className: "bottomButton" }
    ];

    const districts = [
        { text: "강남구" },
        { text: "강동구" },
        { text: "강북구" },
        { text: "강서구" },
        { text: "관악구" },
        { text: "광진구" },
        { text: "구로구" },
        { text: "금천구" },
        { text: "노원구" },
        { text: "도봉구" },
        { text: "동대문구" },
        { text: "동작구" },
        { text: "마포구" },
        { text: "서대문구" },
        { text: "서초구" },
        { text: "성동구" },
        { text: "성북구" },
        { text: "송파구" },
        { text: "양천구" },
        { text: "영등포구" },
        { text: "용산구" },
        { text: "은평구" },
        { text: "종로구" },
        { text: "중구" },
        { text: "중랑구" }
    ];

    const handleButtonClick = (index) => {
        setSelectedIndex(index);
        setSelectedDistrictIndex(null); // 도를 변경할 때 선택된 구를 초기화
    };

    const handleDistrictClick = (index) => {
        setSelectedDistrictIndex(index);
        const selectedDo = locations[selectedIndex].text;
        const selectedDistrict = districts[index].text;
        onLocationSelect(selectedDo, selectedDistrict); // 선택된 도와 구를 상위 컴포넌트로 전달
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
                                onClick={() => handleButtonClick(index)}
                            />
                        ))}
                    </div>
                    <div className='Gu'
                        style={{
                            border: selectedIndex === null || locations[selectedIndex].text !== "서울" ? 'none' : '', 
                        }}>
                        {selectedIndex === null ? (
                            <p className='selectLocationText'>지역을 선택하세요</p>
                        ) : (
                            locations[selectedIndex].text === "서울" && districts.map((district, index) => (
                                <DistrictButton
                                    key={index}
                                    className={index === selectedDistrictIndex ? "clicked" : ""}
                                    text={district.text}
                                    onClick={() => handleDistrictClick(index)} // 구 클릭 핸들러 추가
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocateModal;
