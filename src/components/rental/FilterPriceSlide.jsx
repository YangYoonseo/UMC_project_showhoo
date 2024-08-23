import React, { useState, useEffect } from 'react';
import '../../styles/Jisu/FilterPriceSlide.css';

const FilterPriceSlide = ({ minPrice = 0, fixedMaxPrice = 3000000, selectedMinValue, selectedMaxValue, priceGap = 100000, onPriceChange }) => {
  const [minValue, setMinValue] = useState(selectedMinValue); // 선택된 최솟값
  const [maxValue, setMaxValue] = useState(selectedMaxValue); // 선택된 최댓값
  const [minPercent, setMinPercent] = useState(0);
  const [maxPercent, setMaxPercent] = useState(100);

  useEffect(() => {
    setMinValue(selectedMinValue);
    setMaxValue(selectedMaxValue);
  }, [selectedMinValue, selectedMaxValue]);

  // 퍼센트 값을 업데이트하는 함수
  const updatePercentages = () => {
    setMinPercent(((minValue - minPrice) / (fixedMaxPrice - minPrice)) * 100);
    setMaxPercent(100 - (((maxValue - minPrice) / (fixedMaxPrice - minPrice)) * 100));
  };

  // 슬라이더 값이 변경될 때 호출되는 핸들러
  const handleMinValueChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue > maxValue - priceGap) {
      setMaxValue(newValue + priceGap);
    }
    setMinValue(newValue);
  };

  const handleMaxValueChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue < minValue + priceGap) {
      setMinValue(newValue - priceGap);
    }
    setMaxValue(newValue);
  };

  // 값이 변경된 후 퍼센트 및 부모 컴포넌트로 값 전달
  useEffect(() => {
    updatePercentages();
    onPriceChange(minValue, maxValue);
  }, [minValue, maxValue]);

  return (
    <div className="FilterPriceSlide">
      <div
        className="FilterPriceSlideInner"
        style={{
          left: `${minPercent}%`,
          right: `${maxPercent}%`,
        }}
      />
      <div className="FilterPriceRangeWrap">
        <input
          className="FilterPriceRangeMin"
          type="range"
          min={minPrice}
          max={fixedMaxPrice - priceGap}
          step={priceGap}
          value={minValue}
          onChange={handleMinValueChange}
        />
        <input
          className="FilterPriceRangeMax"
          type="range"
          min={minPrice + priceGap}
          max={fixedMaxPrice}
          step={priceGap}
          value={maxValue}
          onChange={handleMaxValueChange}
        />
      </div>
    </div>
  );
};

export default FilterPriceSlide;
