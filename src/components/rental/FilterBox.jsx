import React, { useState } from 'react';
import "../../styles/Jisu/FilterBox.css";

const FilterBox = ({ rangeText = "", rangeStartValue = 0 }) => {
    const [inputValue, setInputValue] = useState(rangeStartValue);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setInputValue(value);
        }
    };

    return (
        <div className='FilterBox'>
            <div className='filterLabel'>
                {rangeText}
            </div>
            <div className='CostArea'>
                <div className='₩'>₩</div>
                <input
                    className='InputCost'
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={rangeStartValue}
                />
            </div>
        </div>
    );
};

export default FilterBox;
