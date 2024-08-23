import React, { useState } from 'react';
import "../../styles/Jisu/RentalSearchFilterModal.css";
import FilterBox from './FilterBox';
import FilterPriceSlide from './FilterPriceSlide';

const RentalSearchFilterModal = ({ isOpen, onClose, minPrice, maxPrice, selectedMinPrice, selectedMaxPrice, minCapacity, maxCapacity, selectedMinCapacity, selectedMaxCapacity, onPriceChange, onCapacityChange }) => {

    if (!isOpen) return null;

    return (
        <div className="RentalSearchFilterModalBackdrop" onClick={onClose}>
            <div className="RentalSearchFilterModalContent" onClick={(e) => e.stopPropagation()}>
                {/* 가격 필터 섹션 */}
                <div className='RentalSearchFilterModalBody'>
                    <div className='Cost'>
                        가격
                    </div>
                    <div className='Capacity'>
                        가격 검색의 최소단위는 10000원입니다
                    </div>
                    <div className='FilterBoxes'>
                        <FilterBox
                            rangeText="최저"
                            rangeValue={selectedMinPrice}
                        />
                        <div className='border31px' />
                        <FilterBox
                            rangeText="최고"
                            rangeValue={selectedMaxPrice}
                        />
                    </div>
                    <FilterPriceSlide
                        minPrice={minPrice}
                        fixedMaxPrice={maxPrice}
                        selectedMinValue={selectedMinPrice}
                        selectedMaxValue={selectedMaxPrice}
                        priceGap={100000}
                        onPriceChange={onPriceChange}
                    />
                </div>
                {/* 수용인원 필터 섹션 */}
                <div className='RentalSearchFilterModalBody'>
                    <div className='Cost'>
                        수용인원
                    </div>
                    <div className='FilterBoxes'>
                        <FilterBox
                            rangeText="최저" 
                            rangeValue={selectedMinCapacity}
                            index={2}
                        />
                        <div className='border31px' />
                        <FilterBox
                            rangeText="최고" 
                            rangeValue={selectedMaxCapacity}
                            index={2}
                        />
                    </div>
                    <FilterPriceSlide
                        minPrice={minCapacity} 
                        fixedMaxPrice={maxCapacity} 
                        selectedMinValue={selectedMinCapacity}
                        selectedMaxValue={selectedMaxCapacity}
                        priceGap={10} 
                        onPriceChange={onCapacityChange}  // 수용인원에 대한 핸들러 사용
                    />
                </div>
                {/* 버튼 섹션 */}
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
                        onClick={() => {
                            // 초기화 버튼 클릭 시 상태 초기화
                            onPriceChange(minPrice, maxPrice);
                            onCapacityChange(minCapacity, maxCapacity);
                            onClose();
                        }}
                    >
                        초기화
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
                        onClick={onClose} // 필터 적용 후 모달 닫기
                    >
                        필터 적용하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RentalSearchFilterModal;
