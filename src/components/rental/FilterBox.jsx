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
            <label className='filterLabel'>
                {rangeText}
            </label>
            <div className='CostArea'>
                <div>₩</div>
                <input
                    className='InputCost'
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="0"
                />
            </div>
        </div>
    );
};

export default FilterBox;
