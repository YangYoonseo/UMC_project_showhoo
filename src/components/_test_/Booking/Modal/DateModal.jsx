import React from 'react';
import "../../../../styles/Jisu/DateModal.css";
import DateSearchCalender from './Date/DateSearchCalender';

const DateModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="DateModalBackdrop" onClick={onClose}>
            <div className="DateModalContent" onClick={(e) => e.stopPropagation()}>
                <div className='DateModalBody'>
                    <DateSearchCalender></DateSearchCalender>
                </div>
            </div>
        </div>
    );
};

export default DateModal;