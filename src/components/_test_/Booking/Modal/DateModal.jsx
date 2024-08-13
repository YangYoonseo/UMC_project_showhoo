import React from 'react';
import "../../../../styles/Jisu/DateModal.css";

const DateModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="DateModalBackdrop" onClick={onClose}>
            <div className="DateModalContent" onClick={(e) => e.stopPropagation()}>
                <div className='DateModalBody'>
                    asdasdddddd
                </div>
            </div>
        </div>
    );
};

export default DateModal;