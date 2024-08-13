import React, { useState, useEffect } from 'react';
import '../../styles/Jisu/FilterPriceSlide.css';

const FilterPriceSlide = ({ minPrice = 0, fixedMaxPrice = 3000000, priceGap = 100000 }) => {
  const [rangeMinValue, setRangeMinValue] = useState(minPrice); // 최솟값 저장
  const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice); // 최댓값 저장
  const [rangeMinPercent, setRangeMinPercent] = useState(0);
  const [rangeMaxPercent, setRangeMaxPercent] = useState(100);

  // 퍼센트 값을 업데이트하는 함수
  const updatePercentages = () => {
    setRangeMinPercent(((rangeMinValue - minPrice) / (fixedMaxPrice - minPrice)) * 100);
    setRangeMaxPercent(100 - (((rangeMaxValue - minPrice) / (fixedMaxPrice - minPrice)) * 100));
  };

  // 슬라이더 값이 변경될 때 호출되는 핸들러
  const handleRangeMinChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue > rangeMaxValue - priceGap) {
      setRangeMaxValue(newValue + priceGap);
    }
    setRangeMinValue(newValue);
  };

  const handleRangeMaxChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue < rangeMinValue + priceGap) {
      setRangeMinValue(newValue - priceGap);
    }
    setRangeMaxValue(newValue);
  };

  // 값이 변경된 후 퍼센트 업데이트
  useEffect(() => {
    updatePercentages();
  }, [rangeMinValue, rangeMaxValue]);

  return (
    <div className="FilterPriceSlide">
      <div
        className="FilterPriceSlideInner"
        style={{
          left: `${rangeMinPercent}%`,
          right: `${rangeMaxPercent}%`,
        }}
      />
      <div className="FilterPriceRangeWrap">
        <input
          className="FilterPriceRangeMin"
          type="range"
          min={minPrice}
          max={fixedMaxPrice - priceGap}
          step={priceGap}
          value={rangeMinValue}
          onChange={handleRangeMinChange}
        />
        <input
          className="FilterPriceRangeMax"
          type="range"
          min={minPrice + priceGap}
          max={fixedMaxPrice}
          step={priceGap}
          value={rangeMaxValue}
          onChange={handleRangeMaxChange}
        />
      </div>
      <div>
        rangeMinPercent: {rangeMinPercent} <br />
        rangeMaxPercent: {rangeMaxPercent} <br />
        rangeMinValue: {rangeMinValue} <br />
        rangeMaxValue: {rangeMaxValue}
      </div>
    </div>
  );
};

export default FilterPriceSlide;
