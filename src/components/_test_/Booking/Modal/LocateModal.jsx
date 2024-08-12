import React from 'react';
import "../../../../styles/Jisu/LocateModal.css";

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="LocateModalBackdrop" onClick={onClose}>
            <div className="LocateModalContent" onClick={(e) => e.stopPropagation()}>
                <div className='LocateModalBody'>
                    <div className='Administrative'>
                        
                    </div>
                    <div className='City'>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
