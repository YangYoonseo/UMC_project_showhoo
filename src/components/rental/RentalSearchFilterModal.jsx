import React, { useState } from 'react';
import "../../styles/Jisu/RentalSearchFilterModal.css";
import FilterBox from './FilterBox';
import FilterPriceSlide from './FilterPriceSlide';

const RentalSearchFilterModal = ({ isOpen, onClose }) => {
    // 가격 필터 상태
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(3000000);

    // 수용인원 필터 상태
    const [minCapacity, setMinCapacity] = useState(0);
    const [maxCapacity, setMaxCapacity] = useState(999999);

    const handlePriceChange = (min, max) => {
        setMinPrice(min);
        setMaxPrice(max);
    };

    const handleCapacityChange = (min, max) => {
        setMinCapacity(min);
        setMaxCapacity(max);
    };

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
                            rangeValue={minPrice}
                            index={1}
                        />
                        <div className='border31px' />
                        <FilterBox
                            rangeText="최고"
                            rangeValue={maxPrice}
                            index={1}
                        />
                    </div>
                    <FilterPriceSlide
                        minPrice={0}
                        fixedMaxPrice={3000000}
                        priceGap={100000}
                        onPriceChange={handlePriceChange}
                    />
                </div>
                {/* 수용인원 필터 섹션 */}
                <div className='RentalSearchFilterModalBody'>
                    <div className='Cost'>
                        수용인원
                    </div>
                    <div className='FilterBoxes'>
                        <FilterBox
                            rangeText="최저" rangeValue={minCapacity}
                            index={2}
                        />
                        <div className='border31px' />
                        <FilterBox
                            rangeText="최고" rangeValue={maxCapacity}
                            index={2}
                        />
                    </div>
                    <FilterPriceSlide
                        minPrice={0} 
                        fixedMaxPrice={300} 
                        priceGap={10} 
                        onPriceChange={handleCapacityChange}  // 수용인원에 대한 핸들러 사용
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
                            setMinPrice(0);
                            setMaxPrice(3000000);
                            setMinCapacity(0);
                            setMaxCapacity(999999);
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
                        onClick={() => {
                            // 필터 적용하기 버튼 클릭 시 수행할 동작 추가
                            console.log('필터 적용:', { minPrice, maxPrice, minCapacity, maxCapacity });
                        }}
                    >
                        필터 적용하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RentalSearchFilterModal;
