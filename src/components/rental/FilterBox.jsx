import React from 'react';
import "../../styles/Jisu/FilterBox.css";

const FilterBox = ({ rangeText = "", rangeValue = 0, index = 1 }) => {
    return (
        <div className='FilterBox'>
            <div className='filterLabel'>
                {rangeText}
            </div>
            {index === 1 && (
                <div className='CostArea'>
                    <div className='₩'>₩</div>
                    <input
                        className='InputCost'
                        type="text"
                        value={rangeValue.toLocaleString()}  // 천 단위 콤마 추가
                        readOnly
                    />
                </div>
            )}
            {index === 2 && (
                <div className='CostArea'>
                    <input
                        className='InputCost a'
                        type="text"
                        value={rangeValue.toLocaleString()}  // 천 단위 콤마 추가
                        readOnly
                    />
                    <div className='myong'>명</div>
                </div>
            )}
        </div>
    );
};

export default FilterBox;
