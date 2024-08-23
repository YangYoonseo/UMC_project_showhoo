import React from 'react';
import "../../styles/Jisu/FilterBox.css";

const FilterBox = ({ rangeText = "", rangeValue = 0 }) => {
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
                    value={rangeValue.toLocaleString()}  // 천 단위 콤마 추가
                    readOnly
                />
            </div>
        </div>
    );
};

export default FilterBox;
