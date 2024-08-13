import React from 'react';
import "../../styles/Jisu/RentalSearchFilterModal.css";
import FilterBox from './FilterBox';

const RentalSearchFilterModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="RentalSearchFilterModalBackdrop" onClick={onClose}>
            <div className="RentalSearchFilterModalContent" onClick={(e) => e.stopPropagation()}>
                <div className='RentalSearchFilterModalBody'>
                    <div className='Cost'>
                        가격
                    </div>
                    <div className='Capacity'>
                        Capacity
                        {/* 가격 검색의 최소단위는 10000원입니다 */}
                    </div>
                    <FilterBox
                        rangeText="최저"
                        rangeStartValue={0}
                    />
                </div>
            </div>
        </div>
    );
};

export default RentalSearchFilterModal;
