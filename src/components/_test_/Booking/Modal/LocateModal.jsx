import React from 'react';
import "../../../../styles/Jisu/LocateModal.css";
import AdministrativeButton from "./Locate/AdministrativeButton.jsx";

const LocateModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const locations = [ /* API로 수정 */
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

    return (
        <div className="LocateModalBackdrop" onClick={onClose}>
            <div className="LocateModalContent" onClick={(e) => e.stopPropagation()}>
                <div className='LocateModalBody'>
                    <div className='Administrative'>
                        {locations.map((location, index) => (
                            <AdministrativeButton
                                key={index}
                                className={location.className || ""}
                                text={location.text}
                            />
                        ))}
                    </div>
                    <div className='City'></div>
                </div>
            </div>
        </div>
    );
};

export default LocateModal;
