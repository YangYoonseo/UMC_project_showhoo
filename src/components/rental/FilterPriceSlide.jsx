import React, { useState } from 'react';
import '../../styles/Jisu/FilterPriceSlide.css';

const FilterPriceSlide = ({ rangeMinPercent = 30, rangeMaxPercent = 60 }) => {
  return (
        <div className="FilterPriceSlide">
            <div
                className="FilterPriceSlideInner"
                style={{
                    left: `${rangeMinPercent}%`,
                    right: `${100 - rangeMaxPercent}%`,
                }}
            />
            <div className="FilterPriceRangeWrap">
                <input
                    className="FilterPriceRangeMin"
                    type="range"
                    min="rangeMinPercent"
                    max="100"
                    value={rangeMinPercent}
                    onChange={() => {}}
                />
                <input
                    className="FilterPriceRangeMax"
                    type="range"
                    min="rangeMinPercent"
                    max="100"
                    value={rangeMaxPercent}
                    onChange={() => {}}
                />
            </div>
        </div>
    );
};

export default FilterPriceSlide;