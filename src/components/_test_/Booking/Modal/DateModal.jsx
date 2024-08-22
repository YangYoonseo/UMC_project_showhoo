import React from 'react';
import "../../../../styles/Jisu/DateModal.css";
import DateSearchCalender from './Date/DateSearchCalender';

const DateModal = ({ isOpen, onClose, onDateSelect }) => { // onDateSelect 프롭 추가
    if (!isOpen) return null;

    return (
        <div className="DateModalBackdrop" onClick={onClose}>
            <div className="DateModalContent" onClick={(e) => e.stopPropagation()}>
                <DateSearchCalender onDateSelect={onDateSelect} /> {/* onDateSelect 전달 */}
            </div>
        </div>
    );
};

export default DateModal;
