import React from 'react';
import "../../../../styles/Jisu/TypeModal.css";

const TypeModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="TypeModalBackdrop" onClick={onClose}>
            <div className="TypeModalContent" onClick={(e) => e.stopPropagation()}>
                <div className='TypeModalBody'>
                </div>
            </div>
        </div>
    );
};

export default TypeModal;