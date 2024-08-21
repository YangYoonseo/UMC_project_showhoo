import React from 'react';
import "../../styles/Jisu/RentalSearchFilterModal.css";
import FilterBox from './FilterBox';
import FilterPriceSlide from './FilterPriceSlide'

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
                        가격 검색의 최소단위는 10000원입니다
                    </div>
                    <div className='FilterBoxes'>
                        <FilterBox
                        rangeText="최저" rangeStartValue={0}
                        />
                        <div className='border31px' />
                        <FilterBox
                            rangeText="최고" rangeStartValue={999999}
                        />
                    </div>
                    <FilterPriceSlide
                        minPrice= {0} fixedMaxPrice = {3000000} priceGap = {100000}
                    />
                </div>
                <div className='RentalSearchFilterModalBody'>
                    <div className='Cost'>
                        수용인원
                    </div>
                    <div className='FilterBoxes'>
                        <FilterBox
                        rangeText="최저" rangeStartValue={0}
                        />
                        <div className='border31px' />
                        <FilterBox
                            rangeText="최고" rangeStartValue={999999}
                        />
                    </div>
                    <FilterPriceSlide
                        minPrice= {0} fixedMaxPrice = {3000000} priceGap = {100000}
                    />
                </div>
                <div className='twoButtons'>
                    <button
                        style={{
                            height: "38px",
                            width: "180px",
                            borderRadius: "11.09px",
                            backgroundColor: "#E8E8E8",
                            borderWidth: "1px",
                            borderColor: "transparent",
                            cursor: "pointer"
                        }}
                    >초기화
                    </button>
                    <button
                        style={{
                            height: "38px",
                            width: "180px",
                            borderRadius: "11.09px",
                            backgroundColor: "#09F1B9",
                            borderWidth: "1px",
                            borderColor: "transparent",
                            cursor: "pointer"
                        }}
                    >필터 적용하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RentalSearchFilterModal;
